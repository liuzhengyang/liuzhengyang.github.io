---
title: JVM实现原理分析之safepoint
date: 2020-05-18 09:52:46
tags: JVM
categories:
    - JVM
---

safepoint又称为安全点，它是hotspot等JVM中的一个重要概念。下面我们分部分了解下safepoint是什么、safepoint的作用、safepoint是如何实现的以及作为开发者有哪些需要注意的地方。

<!-- more -->

## safepoint是什么

JVM的主要任务是执行Java程序，而JVM运行时本身也是一个程序，但是为了执行Java程序JVM还有不少辅助工作，比如进行GC、JIT编译等等。一般会把运行在JVM上的用户Java程序称为mutator。


以GC为例，JVM中一般的GC都使用可达性分析，也就是从应用程序的一些GC Root(比如运行中的线程栈里的方法栈帧中本地变量表、操作数表中的引用、静态变量引用等)开始通过引用进行引用图遍历，如果在JVM遍历的过程中mutator也在运行，则mutator则可能会修改这个对象图的引用关系，如果JVM不对这种并发修改进行特殊处理，可能导致一些非可回收对象没有被遍历到，从而被标记成垃圾对象而被错误的回收。

如果要完全并发GC，JVM的实现成本会比较大，并且很多情况下整体的吞吐量是会降低的。（联想下并发编程中cas原子操作和加锁的使用，如果竞争比较激烈使用加锁效率更高，因为能够减少cas循环的cpu消耗）   

因此在很多GC收集器中都会有一些StopTheWorld阶段，这个StopTheWorld就是safepoint。在safepoint中不会有mutator操作对象，并且线程栈和heap中每个位置的数据类型也是确定的(比如一个8bit的数据是long还是对象引用)。

一个线程要么在safepoint中，要么不在safepoint中。上面提到的StopTheWorld指的是全局safepoint(针对hotspot)，也就是要求所有线程都处于safepoint状态。后面如果没有特别说明safepoint也指的是全局safepoint。

## safepoint是如何实现的

### JVM如何通知线程进入safepoint

在hotspot实现中safepoint是协作式的，当JVM需要mutator进入safepoint时，会设置一个状态标记表示要进入safepoint了，每个mutator线程都会在合适的时机检查这个状态标记，如果发现需要进入safepoint则会暂停自己。这里的合适的时机的选取，既要不那么频繁，避免增大运行时开销（不能每走一步看一次），也不能太久不检查，避免进入safepoint进入太慢（需要线程们都进入safepoint状态才行，如果有一个线程一直干活不检查safepoint会影响其他线程，毕竟其他线程都在等着）。
如果是compiled code(JIT编译后的代码)，JIT会在某些地方插入检查代码，比如方法调用返回和循环跳回的地方。
如果是interpreted code（解释执行），JVM有两个字节码分发表，如果需要进入safepoint，则JVM会切换到有safepoint状态检查的那个分发表上。

### 各个线程如何检查是否要进入safepoint

为了尽量减少开销，hotspot中safepoint的状态检查的实现方式是读取一个内存值，如果需要进入safepoint，则将这个内存页设置成被保护的，这样就会触发一个page fault，然后就可以通过异常处理进入safepoint了。这种方式比准确读取一个内存值（比如一个boolean数据)要轻量（因为需要内存同步)
大家可能会想到如果一个线程处于sleep

线程在执行JNI代码时也处于safepoint中，并且其他的"阻塞"状态也是在safepoint中，比如Thread.sleep，如果要退出线程要退出safepoint需要JVM允许，这样就不会出现sleep状态的线程在其他线程进入safepoint后突然运行这种情况了。


## 有哪些会引发safepoint的情况

除了一些GC阶段需要safepoint内执行，其他的比较常见的操作有。

- revoke bias(偏向锁撤销，如果频繁看到偏向锁撤销可以考虑关闭偏向锁 -XX:-UseBiasedLocking)
- dump线程栈，无论是通过jstack还是通过jmx的ThreadMXBean.getThreadInfo（maxDepth>0的情况)还是Thread.getAllStackTraces等方法，都会触发safepoint，如果线程非常多则可能导致比较长时间的暂停
- class redefinition(通过Instrument对象对类进行retransform或redefine)
- code deoptimization
- 还有很多其他操作

## 如何排查safepoint相关问题

在JVM启动参数上增加一些参数可以打印出应用暂停和safepoint相关信息。
如果版本<=jdk8
```
-XX:+PrintGCApplicationStoppedTime -XX:+PrintGCApplicationConcurrentTime -XX:+PrintSafepointStatistics -XX:PrintSafepointStatisticsCount=1
```
如果版本>jdk8
```
-Xlog:gc*=info::time,tags,tid -Xlog:safepoint=info::time,tags,tid
```

一个示例
```
[2020-05-18T09:18:55.978-0800][19459][safepoint    ] Application time: 1.0038747 seconds
[2020-05-18T09:18:55.978-0800][19459][safepoint    ] Entering safepoint region: ThreadDump
[2020-05-18T09:18:55.980-0800][19459][safepoint    ] Leaving safepoint region
[2020-05-18T09:18:55.980-0800][19459][safepoint    ] Total time for which application threads were stopped: 0.0017502 seconds, Stopping threads took: 0.0000312 seconds
```
这个表示应用线程运行了1.0038747秒后，因为ThreadDump开始进入safepoint，应用线程被暂停了0.0017502秒，暂停这些线程花了0.0000312秒

## Resources

- http://psy-lob-saw.blogspot.com/2015/12/safepoints.html
- https://psy-lob-saw.blogspot.com/2014/03/where-is-my-safepoint.html
- http://blog.ragozin.info/2012/10/safepoints-in-hotspot-jvm.html
- http://hg.openjdk.java.net/jdk8/jdk8/hotspot/file/1ae0472ff3a0/src/share/vm/runtime/safepoint.cpp
- https://stackoverflow.com/questions/16558746/what-mechanism-jvm-use-to-block-threads-during-stop-the-world-pause
- https://www.kernel.org/doc/Documentation/memory-barriers.txt