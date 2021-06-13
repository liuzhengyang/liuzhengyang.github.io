---
title: 为什么Java的lambda或匿名内部类中用到的外部局部变量需要声明成final或是effectively final的?
tags: Java
categories:
    - Java
---

![picture 1](/assets/images/28f44647051ada9e6c2b5eb63028c0ace25b1d7c899394b417bdb5fbc2d13b22.png)  
相信很多同学在开发过程中都遇到过类似的IDE提示，当我们在lambda表示中或匿名内部类中访问一个局部变量时，这个变量如果在方法内进行了重新赋值，则IDE/编译器会抛出一个`Variable used in lambda expression should be final or effectively final`这样的异常，那么为什么lambda表达式或匿名内部类中用到的变量需要是final或effectively final的呢？
(effective final是指虽然变量没有声明final关键字但是在方法中指声明创建后没有修改，也就是事实上的final)


官方是怎么解释的呢？
JLS(Java Language Specification)中的解释是

> Similar rules on variable use apply in the body of an inner class (§8.1.3). The restriction to effectively final variables prohibits access to dynamically-changing local variables, whose capture would likely introduce concurrency problems. Compared to the final restriction, it reduces the clerical burden on programmers.

JLS是为了避免引入并发问题。那么究竟可能有什么并发问题呢？

如果有并发问题，说明肯定是多个线程在访问共享可变数据，那么只可能是lambda或匿名内部类中有代码在另一个线程中执行比如创建新线程或提交线程池去执行，那么共享可变数据会是什么呢？既然JLS这个规则是限制局部变量，那这里肯定就是指的局部变量，Java中的数据类型分为基本类型primitive type(int, long, float等)和引用类型（对象的引用），但是lambda或匿名内部类的调用理论上都是将基本类型或对象引用传递到另一个类的构造函数中，在这个类中的代码执行，是不会影响外部的局部变量的值的（因为Java中并没有C语言中的指针，Java中方法栈属于线程私有数据，只能由执行该方法的线程访问操作）。

当然如果修改的是对象引用的对象中的数据，是可能有并发问题的，但是即使给引用声明final也是无法避免的，因为修改的是引用的对象中的数据，而不是引用本身。知道本地变量的final关键字在字节码层面是没有表示的，也就是局部变量声明final与否只是Java语言在编译时的要求。

那么问题来了，要求局部变量是final的真正目的是什么呢？

我认为是防止让开发者误以为lambda表达式或匿名内部类中的代码可以修改局部变量的值。

例如如下的代码，假设能编译运行的话，最后输出的a的值是多少呢？

```java
public static void main(String[] args) {
    int a = 1;
    ((Runnable) () -> a++).run();
    System.out.println(a);
}
```
最后输出的会是1，而不是2，因为第二行的lambda表达式在创建的时候，就会把用到的局部变量作为lambda表达式运行时生成的类的构造函数的参数传入进去，创建完之后，lambda表达式中的a就和外面方法中的a完全没有关联了，互相不会影响。
但是开发者可能并不了解这个限制可能会以为能够修改，导致程序出现不符合预期的情况(关于lambda的实现机制可以参考我前面写的《lambda表达式实现原理分析》），这里用匿名内部类也是一个道理，可以把lambda表达式想象成是调用了另一个方法，这样局部变量就是作为参数传递到对应的方法中的，这个方法内的任何修改都不会影响调用的方法中的局部变量的值。
这个限制我认为也是Java安全性易用性的一种体现，能够防止程序员在这里出错，提升了开发效率。


如果我们确实想修改局部变量的值呢？其实是一般的目的都是想和局部变量中的状态有一些交互
可以通过数组或包装类（把这个变量放到一个类中作为字段，例如AtomicInteger、MutableInt等）

```java
public static void main(String[] args) {
    AtomicInteger counter = new AtomicInteger(1);
    ((Runnable) () -> counter.incrementAndGet()).run();
    System.out.println(counter.get());
}
```

额外拓展: [Java 有值类型吗？](http://www.yinwang.org/blog-cn/2016/06/08/java-value-type)