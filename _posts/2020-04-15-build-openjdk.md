---
title: 手把手教你构建、debug、开发Java虚拟机
date: 2020-04-06 10:34:16
tags: JVM
categories:
    - JVM
    - Java
---

## 目的

Java虚拟机是Java开发者最常使用的平台，了解其中的运行原理可以帮助我们成为更好的开发者、遇到问题更快解决。对于很多虚拟机知识点，大多数人通常是通过看书或文章来了解相关知识的。这样的缺点是一个知识经过了两次信息理解传递，可能导致信息不准，那么为什么不自己去探究虚拟机的实现原理呢。了解自己常使用的工具的原理，便于更好的使用工具，就像更了解轮胎的赛车手能更好地驾驶汽车、更了解锅和菜刀的厨师可以练出更好的厨艺。而了解虚拟机的最直接的方式就是去构建、debug、开发它！

<!-- more -->

## 下载代码

openjdk的代码在[mercurial](http://hg.openjdk.java.net/jdk/)中，下载起来很慢。我们使用github上的mirror即可，这里选择了一个比较新的jdk14分支，代码比较多，下载时间会稍长一些。
```
git clone https://github.com/openjdk/jdk14u
```

## 编译

为了构建虚拟机、以及debug调试，需要对代码进行编译。

### 编译依赖

编译依赖Xcode，通过AppStore搜索下载安装就可以。
编译jdk需要一个低一些版本的jdk作为boot jdk，对于jdk14先到[jdk官网](https://www.oracle.com/java/technologies/javase-jdk13-downloads.html)下载安装一下jdk13

然后安装编译需要的一些依赖包
```
brew install autoconf freetype ccache
```

### 开始编译
```
#首先cd到代码目录中
cd jdk14u
# 进行configure
bash configure --with-debug-level=slowdebug --enable-dtrace --with-jvm-variants=server --with-target-bits=64 --enable-ccache --with-num-cores=8 --with-memory-size=8000 --disable-warnings-as-errors
# 进行make，这个过程稍久一些
make all
```
make成功   

![openjdkmake](/images/openjdkmake.png)  

验证下build出来的热乎的jdk

```
./build/macosx-x86_64-server-slowdebug/jdk/bin/java -version
```

![openjdkimage](/images/openjdkversion.png)

## 导入IDE

openjdk中的代码包含了Java(jdk各种jar包)和C++(hotspot虚拟机部分)，本文主要针对hotspot部分。
现代化的IDE是阅读、开发、调试代码的好工具，这里推荐使用Jetbrains公司(也是开发IntelliJ Idea的)提供的[CLion](https://www.jetbrains.com/clion/)。

打开CLion后，选择File -> New CMake Project from Sources..   
选择jdk14u下面的src/hotspot目录，然后点OK。
CLion会帮助我们配置好CMake项目使用的CMakeLists.txt，并且构建代码索引、符号表等，等待加载完成。
加载后完成点击Clion右上角部分的hotspot|Debug这里，添加一个新的Configuration。   
![clionconfiguration](/images/addnewconfiguration.png)

点击Configure Custom Build Targets，点击Add target。   

![addbuildtarget](/images/addbuildtarget.png)   

name设置成build openjdk，点击Build右边的...，创建External Tools, 点击左下角加号，创建一个Tool，name填make, Program填make，Working directory填下载的openjdk的代码的目录的路径位置，点击OK，保存。

![addbuildtool](/images/addbuildtool.png)

![customtargetdone](/images/customtargetdone.png)

然后在Run/Debug Configurations页面中，Target选择刚才创建好的target。Executable选择build出来的jdk的java文件，即上两层目录下的jdk14u/build/macosx-x86_64-server-slowdebug/jdk/bin/java。Program arguments暂时填一个 -version。最后点击Apply OK保存。

![application](/images/CustomBuildApplication.png)

然后点击debug

![startdebug](/images/startdebug.png)

经过几个断点后，可以看到熟悉的java -version的结果

![javaversion](/images/javaversiondebug.png)

## 解决IDE代码大量红色提示

我们随便打开几个cpp文件，发现里面有大量的红色的提示，让不是强迫症的我都有些难受，并且问题较大的是不能够跳转，给代码阅读带来了很大困难，还是要解决一下。
这里主要原因是一些代码路径问题，我们修改下CMakeLists.txt，先加上这几行，然后点击Reload changes，大部分代码都正常了，如果有遇到其他的，可以按照类似方法解决。并且即使是红色提示，大部分代码都是可跳转的。
```
include_directories(share)
include_directories(../java.base/unix/native/include)
include_directories(../java.base/share/native/include)
include_directories(../../build/macosx-x86_64-server-slowdebug/jdk/include)
include_directories(../../build/macosx-x86_64-server-slowdebug/hotspot/variant-server/gensrc)
include_directories(../../build/macosx-x86_64-server-slowdebug/hotspot/variant-server/gensrc/jvmtifiles)
```
![CMakeListsModify](/images/CMakeListsModify.png)

## 修改hotspot代码

这里我们对代码进行一些简单的修改，验证一下修改流程。
找到执行java -version的相关代码, abstract_vm_version.cpp，用目前不太熟悉的C++语言打印出一个Hello World。然后重新点击debug按钮。

![debugcodemodify](/images/vmversion.png)

## 其他问题

根据jdk版本不同，编译主机环境不同，上述步骤可能会遇到一些其他问题，不过定位问题、解决问题的方法还是不变的。

## 总结

上述部分就是编译、debug、开发openjdk的一个简单流程了，授人以鱼不如授人以渔，有了这些方法就可以更方便的查看实现以及排查问题了。
但是最后也要提醒大家保持初心、不要过于沉溺于底层实现、不要盲目崇拜开发虚拟机认为是什么高深莫测的工作。这里引用[王垠](http://www.yinwang.org/blog-cn/2019/12/24/compilers)的一段话
> 每当有人向我表示编译器高深莫测，向往却又高攀不上，我都会给他打一个比方：做编译器就像做菜刀。你可以做出非常好的菜刀，然而你终究只是一个铁匠。铁匠不知道如何用这菜刀做出五花八门，让人心旷神怡，米其林级别的菜肴，因为那是大厨的工作。要做菜还是要打铁，那是你自己的选择，并没有贵贱之分。