---
title: 设计和分析Java动态代理的技术实现
tags: Java
categories:
    - Java
---

你了解Java中的动态代理的作用是什么吗？动态代理又有哪些实现方式，真正的实现原理是什么呢？
掌握本章内容，在面试遇到aop如何实现的问题时，就不会只知道jdk代理接口和cglib集成子类、不知道真正的实现原理了。

本文将会讲解动态代理技术能够解决的问题、如何自己设计实现动态代理、以及Java中是如何实现的以及一些开源框架中的典型应用。

![picture 2(/assets/images//627153892e0b6dccc954114b79050d548f8c5d59a23f9b2a228ac99919fca9a0.png)  


## dynamic proxy是什么，可以用来做什么？

通过dynamic proxy动态代理，我们可以在运行为接口创建实现类，或为特定类进行功能增强（aop功能）。常用在框架实现中，在retrofit、spring、dubbo中都大量使用了动态代理技术，框架并不能提前知道用户编写的类是什么样的，而通过动态代理，可以在运行时进行实现接口或增强用户类。

举一些实际的例子。
例如在retrofit(一种Http调用框架）中，用户通过下面的方式来定义和使用远程http接口。

```java
public interface GitHubService {
  @GET("users/{user}/repos")
  Call<List<Repo>> listRepos(@Path("user") String user);
}

```
先定义远程的http的接口形式，通过注解标注http method, url, 参数，返回对象等。然后就可以利用Retrofit类传入这个接口获得对象进行调用了。

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.github.com/")
    .build();

GitHubService service = retrofit.create(GitHubService.class);
```
背后就是使用了动态代理技术来生成这个接口类的实现，在用户调用listRepos方法的时候，封装成http请求进行调用，并把结果反序列化成接口的返回值返回给用户，用户不需要感知这些实现细节，大大减少了使用成本。

如果不用retrofit proxy，需要怎么实现呢?

```java
List<Repo> listRepos(String user) throws Exception {
    String url = String.format("https://api.github.com/users/%s/repos", user);
    OkHttpClient client = new OkHttpClient().newBuilder()
            .build();
    Request request = new Request.Builder()
            .url(url)
            .method("GET", null)
            .build();
    Response response = client.newCall(request).execute();
    String body = response.body().string();
    return JSONUtils.jsonToModel(body, List.class);
}
```

不用retrofit直接用okhttp开发的话，就需要使用者手动拼url、把请求参数构建成Map，调用okhttp接口后，手动把string body反序列化转成业务类对象。
这样就需要使用者了解底层实现和调用方式，这些额外的细节信息增加了使用成本。使用动态代理则可以屏蔽这些可以由框架实现的细节，让使用者面向接口编程，把更多的精力放在实现业务功能而不是底层细节上。

## Java中动态代理的不同实现方式

### 我们来实现动态代理，该如何实现

在Java生态中有多种实现动态代理的方式，在介绍各个实现方案之前，我们不妨想一下，如果我们要来实现这个动态代理功能该如何设计呢？

我们需要先明确动态代理要实现的功能，以为接口创建动态代理为例，动态代理工厂(Proxy工厂)要负责为用户指定的接口类（被Proxy目标类）创建实现类，并且能够让
用户传入指定的实现(InvocationHandler)，最终在运行时得到一个这个接口类的实现类(Proxy结果类）的对象实例。

![picture 1(/assets/images//a1aaf17b98847390b40f0bfaab871e7e53f609fbc524989a65572cd17617743d.png)  

这里的关键点就是，明确我们要生成一个什么样的类，以及怎么在运行时生成这个类。

第一步先定义我们要生成的类的内容，我们要生成的类，需要实现用户定义的接口类，并且实现这个接口的所有方法。实现的方法体内，调用用户传入的InvocationHandler对象处理，并返回对应的结果。

例如我们把InvocationHandler定义为
```
interface InvocationHandler {
    Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable;
}
```

用户定义的接口类（被Proxy类）为
```
interface Service {
    String hello();
}
```

那么我们要生成的代理类ProxyImpl可以是如下的类，构造函数接收InvocationHandler对象，然后在具体的方法中，转发给InvocationHnalder对象处理。
```
class ProxyImpl implements Service {

    private static Method helloMethod;

    static {
        try {
            helloMethod = Service.class.getDeclaredMethod("hello", int.class);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }

    private final InvocationHandler invocationHandler;

    public ProxyImpl(InvocationHandler invocationHandler) {
        this.invocationHandler = invocationHandler;
    }

    @Override
    public String hello(int arg) {
        try {
            return (String) invocationHandler.invoke(this, helloMethod, new Object[]{arg});
        } catch (Throwable throwable) {
            throw new RuntimeException(throwable);
        }
    }
}
```

明确了要生成的类的内容，下一步就是该如何实现了。该怎么才能在运行时生成一个具体的类呢？幸好Java的类加载机制提供了这种可能，Java中具备在运行时加载类的能力，我们所需要做的就是在运行时生成这个类的class文件字节码。

class文件格式在Java虚拟机规范(https://docs.oracle.com/javase/specs/jvms/)中有的明确详细介绍，我们按照规范拼出对应的字节码就可以了。
自己拼字节码繁琐且容易出错（就像写机器码），我们可以利用asm、bytebuddy等字节码工具来提高效率减少错误（就像用汇编）。
除了拼字节码还有一种方式是拼好源代码然后使用Java编译器编译源代码到字节码，我们可以使用[java compiler api](https://docs.oracle.com/en/java/javase/16/docs/api/java.compiler/module-summary.html)或[javassist](https://www.javassist.org/)来实现。

最终得到需要的类的字节码后，再使用classloader来进行加载就可以得到一个可以使用的class对象了，最后利用反射创建对应类的实例对象返回给用户。

### Java中的不同动态代理的实现和以及各自优缺点

在Java生态中，大家常用的动态代理的方式有jdk proxy和cglib，这两种方式提供了直接的接口。javassist，asm是更底层通用的字节码层面操作工具，它们也能实现对等的功能。
   

| 实现方案   | 优点  |  缺点 |
|---|---|---|
| jdk proxy  |  jdk自带实现，无需外部依赖  | 只能支持接口的代理  |
|  cglib | 能够支持普通类的代理，并能够实现aop等功能 | 需要cglib依赖  |
| javassist,asm  | 可以不在编译期依赖，在运行时使用(通过javaagent或attach)，来实现类似框架监控、日志、tracing等能力  | 比较底层，需要单独开发aop这种功能  |

### jdk proxy的实现的详细分析

最后我们以jdk proxy为例，结合代码看一下具体的实现。

![picture 3(/assets/images//c21d64fecfb53984f4f37eb8209cb7b5e44b9752021f6903ed6b8d8f7ccc5a3c.png)  

我们顺着jdk proxy的方法入口(java.lang.reflect.Proxy#newProxyInstance)，可以看到Proxy先得到了Constructor，然后利用反射调用Constructor传入InvocationHandler参数得到了代理类实例。

![picture 4(/assets/images//c19c7373d1a6bec429d536256a650ade5bfc306890a09d2f4d276b287011ebde.png)  

getProxyConstructor方法中，调用了ProxyBuilder来构建Proxy代理类。

最终生成代理类的函数是java.lang.reflect.ProxyGenerator#generateClassFile。

![picture 5(/assets/images//2c1602ef9fc1ce9e44c7630196991c019b77cc76e65a114048e7123c15f1cd98.png)  

generateClassFile做的事情就是我们在前面提到的按照class文件字节码格式要求拼出对应的字节码数组。
![picture 6(/assets/images//4433bf0a97864f719e9a6c58fd888267fe01bb744593a7a513ffa015a06f74ee.png) 

会针对每个proxy方法创建Method字段，创建静态代码块获取Method，然后创建各个Proxy类的方法的实现。
![picture 7(/assets/images//0fe19d3f570befff18c4617696cacec3097bfc11851558b9100e0a1fbee68e71.png)  

## 动态代理在开源框架中的应用

下面分析一下retrofit中对于动态代理的使用。
如本文最开始的示例，我们通过retrofit.create(GitHubService.class)就可以生成GitHubService这个接口的代理类的对象。

create方法的实现也非常简洁，classloader使用传入接口类的classloader，接口列表使用传入的接口类，invocationHandler的实现是通过method生成调用okhttp的逻辑来调用（对jdk8的default方法进行了特殊处理，因为default方法是用户的实现，不需要代理)。
![picture 8(/assets/images//f902a4e1003427b80aacee56b7e8d8ef322763bdde9b03e53dd8ebfb48f38d2f.png)  
