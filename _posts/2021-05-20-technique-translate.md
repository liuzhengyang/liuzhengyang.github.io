---
title: 谈两个容易让技术人员困扰的技术名词
tags: 基础
categories:
    - 基础
---

本文预计阅读时间: 5分钟。

## just in time

了解Java的朋友应该知道Java中有just in time compiler，简称JIT，中文翻译一般是即时编译器。

JIT是JVM在运行时对热点代码编译成本地代码来提高执行速度的编译器，有了JIT后Java代码能够具备媲美native code的执行速度，而且具备跨平台特性，真香。

有很多Java相关书籍或文章对JIT的原理进行了讲解介绍，但是很少有人解释它为什么叫just in time，中文的「即时」更是难以理解。

根据[wikipedia](https://en.wikipedia.org/wiki/Just-in-time_compilation)中对just in time的解释，这个名字来源于生产制造业。

> The code can be compiled when it is about to be executed (hence the name "just-in-time"), and then cached and reused later without needing to be recompiled.
> The term "Just-in-time compilation" was borrowed from the manufacturing term "Just in time" and popularized by Java, with James Gosling using the term from 1993.

上面这两句话的意思是JIT会在代码将要被执行的时候进行编译，并且缓存下来这样后面调用就可以直接使用不需要再次编译。(JVM中的JIT的触发时机会有一些不同)

我们再看一下生产制造业中的just in time的解释

> 及时制度（JIT）的想法很简单：库存是资源浪费。JIT库存系统认为，库存带来了隐含的成本，因此高效率的企业应该不存在库存。公司需要采取一系列新的管理办法，进行变革。需要采取统计学、工业工程学、生产管理和行为科学中的管理办法。及时库存逻辑阐述了库存的内涵以及与管理的关系。
> 简单来说，及时制度主要的核心是“让正确的物资，在正确的时间，流动到正确的地方，数量是刚刚好的数量。”

工业制造业中的JIT的意思是减少库存，让物资的使用恰到好处、按需使用。

那我们把”即时“理解成”刚刚好、按需“，就比较容易理解JIT这个名字的含义了。运行时过早进行编译可能导致两个问题，1是启动速度变慢(编译需要cpu消耗)，2是内存消耗变大（需要保存native code到内存中)，因为不是所有的代码都会被执行，提前编译不会执行的代码，是一种浪费，不如在恰到好处的时候进行编译（也就是just in time的理念)。

那有同学又要问了，为什么不在编译时就编译成本地代码呢？

没错，的确可以，通过AOT(ahead of time compile)技术可以实现，比如[graal](https://www.graalvm.org/why-graalvm/#create-a-native-image)可以把Java代码直接打包成native image，这样就可以减少Java程序的内存需要（不再在JVM虚拟机内执行)和提高启动速度（没有解释执行和JIT阶段，直接执行native code)。AOT的缺点是生成的native image失去了跨平台运行能力（问题不是很大），以及一些兼容性问题，比如[反射功能需要单独的配置文件](https://www.graalvm.org/reference-manual/native-image/BuildConfiguration/#building-native-image-with-java-reflection-example)，不过相信Java社区一定可以解决这些问题，最终让Java变得更加强大。

## random 

计算机中另一个单词也困扰我很久，它就是random access memory中的random，中文翻译一般是随机，比如随机读写内存。
这个”随机“的含义就很抽象了，难道我访问的内存的内容或地址是”随机出来的、不确定的“？

要理解random这个单词，我们要先看一下字典里的解释:「随机的；任意的；胡乱的」，突然看到random还有个含义是「任意的」，「任意的」在这个场景下是不是更适合一点？

没错，和[random access](https://en.wikipedia.org/wiki/Random_access)相对应的是[sequential access](https://en.wikipedia.org/wiki/Sequential_access)。

内存存储是random access的，可以指定任意一个地址直接访问到，速度很快，或者理解成直接访问（direct access)更好。而磁带磁盘存储是sequential access的，它需要从某个位置开始顺序查找访问，比如通过磁带旋转，磁盘旋转。

Java数据结构中的ArrayList和LinkedList也是这种关系，ArrayList给定一个元素index可以通过O(1)的时间复杂度定位到这个元素，也就是random access（任意访问或直接访问），而LinkedList需要引用遍历，它的时间复杂度是O(N)，也就是sequential access（顺序访问）。