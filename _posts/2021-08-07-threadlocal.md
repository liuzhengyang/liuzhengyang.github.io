---
title: ThreadLocal里的巧妙设计、常见面试问题，其他文章里写的一定是对的吗？
tags: Java
categories:
    - Java
---

# ThreadLocal

ThreadLocal的作用是什么？使用时有哪些注意事项？为什么ThreadLocalMap中的Entry要使用WeakReference？netty中FastThreadLocal又做了什么优化？
答案尽在本文中。

## ThreadLocal介绍

用ThreadLocal<T>修饰的变量，一般我们成为线程本地变量。那么一般什么情况下回使用ThreadLocal呢？

1. 解决线程安全问题。
线程安全问题一般是多个线程对共享可变变量变量的修改问题，那么如果线程之间不共享变量，自然就解决了这个问题，通过线程本地变量就可以不共享，每个线程只能获取到自己的线程本地变量，线程间互不打扰。比如`java.text.SimpleDateFormat`不是线程安全的，如果多个线程都使用同一个SimpleDateFormat对象进行日期操作，则会出现线程安全问题。一种解决方案就是把SimpleDateFormat对象进行ThreadLocal封装，代码示例如下。
```java
private static final ThreadLocal<SimpleDateFormat> simpleDateFormat = ThreadLocal.withInitial(SimpleDateFormat::new);

public void say() {
    simpleDateFormat.get().format(new Date());
}
```
2. 同一线程内代码间传递上下文信息
在一些框架中，需要在不同的代码间传递信息，比如分布式追踪(tracing)框架一般都需要在各个开源框架中进行埋点上报，比如上报一个请求处理开始和请求处理结束的埋点，但是如果开始和请求在不同的方法中，该怎么不修改框架方法参数实现埋点串联id的传递呢？通过通过ThreadLocal我们就可以实现id的透传；spring在aop、事务等功能中都使用了ThreadLocal来进行线程内方法间的对象传递
; 在业务代码中，也经常会用ThreadLocal传递一些公共参数比如请求的用户id，这样可以减少参数的传递。

## ThreadLocal的方法和使用介绍

ThreadLocal提供的方法有get(),set(T value), remove()，并且有一个可以override的initialValue()方法。

|   方法	|   方法介绍	|
|---	|---	|
|   get	|   获取这个ThreadLocal在当前线程内的值	|
|   set(T value) | 设置这个ThreadLocal在当前线程内的值	|   	
|   remove	|   删除这个ThreadLocal在当前线程内的值	|
|   initialValue()	|   如果这个ThreadLocal在当前线程内没有值，会通过initialValue()进行初始化，默认返回null。可以通过匿名内部类或Thread.withInitial(Supplier<? extends S> supplier)实现override initialValue()方法	|

一般我们定义ThreadLocal变量都定义成static final的变量，然后就可以通过这个ThreadLocal变量进行get set了。

```java
private static final ThreadLocal<SimpleDateFormat> simpleDateFormat = ThreadLocal.withInitial(SimpleDateFormat::new);

public void say() {
    simpleDateFormat.get().format(new Date());
}
```


## ThreadLocal实现

了解了ThreadLocal的作用后，我们开始分析一下内部实现。
![picture 1](/assets/images/9f0c6a885959b6c7f8a6b4a821dc1e369723d0908a2c5e1d4198de282116672c.png)  
首先，每个线程Thread对象内有一个ThreadLocalMap类型的threadLocals字段，里面保存着key为ThreadLocal到value为Object的映射。
```java
class Thread{ 
    /* ThreadLocal values pertaining to this thread. This map is maintained
     * by the ThreadLocal class. */
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```
ThreadLocal的get,set,remove方法都是通过操作当前线程内的ThreadLocalMap字段实现的，操作的key为自己(this)

```java
public class ThreadLocal<T> {
    // 每个ThreadLocal的hashCode，用来在ThreadLocalMap中寻找自己的位置。ThreadLocalMap使用的是线性探查的开放寻址法解决hash冲突而不是HashMap中的链表法
    private final int threadLocalHashCode = nextHashCode();

    // 用来生成分配ThreadLocal的hashCode的AtomicInteger
    private static AtomicInteger nextHashCode =
        new AtomicInteger();

    // AtomicInteger每次增加的间隔，0x61c88647这个魔数在映射到2的次方的数组中能够保证比较高好的分散性，减少冲突
    // https://stackoverflow.com/questions/38994306/what-is-the-meaning-of-0x61c88647-constant-in-threadlocal-java
    private static final int HASH_INCREMENT = 0x61c88647;

    // 生成hashCode，在ThreadLocal对象构造的时候（构造代码块中）调用
    private static int nextHashCode() {
        return nextHashCode.getAndAdd(HASH_INCREMENT);
    }

    // 覆盖initialValue()可以定制ThreadLocal的默认值
    protected T initialValue() {
        return null;
    }

    public ThreadLocal() {}

    public T get() {
	// 获取当前线程Thread对象
        Thread t = Thread.currentThread();
	// 从Thread对象拿到ThreadLocalMap字段
        ThreadLocalMap map = getMap(t);
	// 如果map不为空，从map中尝试获取当前ThreadLocal对应的value值
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T)e.value;
                return result;
            }
        }
	// map为空，或者map中没有找到当前ThreadLocal对应的value的映射，则会进行创建ThreadLocalMap、在map中设置初始默认值
        return setInitialValue();
    }

    private T setInitialValue() {
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            map.set(this, value);
        } else {
            createMap(t, value);
        }
        if (this instanceof TerminatingThreadLocal) {
            TerminatingThreadLocal.register((TerminatingThreadLocal<?>) this);
        }
        return value;
    }

    public void set(T value) {
	// 获取当前Thread，从中取出ThreadLocalMap
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
	    // map不空则调用map的set设置当前ThreadLocal到value的映射
            map.set(this, value);
        } else {
	    // map为空则创建包含当前ThreadLocal到value映射的map
	    createMap(t, value);
        }
    }

     public void remove() {
         ThreadLocalMap m = getMap(Thread.currentThread());
         if (m != null) {
	     // 从当前map中删除映射
             m.remove(this);
         }
     }

    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }

    void createMap(Thread t, T firstValue) {
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }
}
```

上面的ThreadLocal的实现中大部分都是对ThreadLocalMap的操作封装，那么ThreadLocalMap是怎么实现的呢？
ThreadLocalMap是ThreadLocal类的静态内部类。

### 线性探查法的Map
ThreadLocalMap和HashMap有所不同，ThreadLocalMap使用线性探查法而不是拉链法解决hash冲突问题。

线性探查法可以用一个小例子来理解，想象一个停车场的场景，停车场中有一排停车位，停车时，会计算车子的hashCode算出在停车位中的序号，停上去，如果那个车位有车了，
则尝试停到它的下一个车位，如果还有车则继续尝试，到末尾之后从头再来。当取车时，则按照hashCode去找车，找到对应的位置后，要看一下对应的车位上是不是自己的车，如果不是，
尝试找下一个车位，如果找到了自己的车，则说明车存在，如果遇到车位为空，说明车不在。要开走车时，不光是简单开走就可以了，还得把自己车位后面的车重新修改车位，因为那些车可能因为
hash冲突更换了位置，修改车位的范围是当前位置到下一个为空的车位位置。当然还有扩容的情况，后面代码里会具体介绍。

那么为什么使用线性探测法而不是链表法呢？主要是因为数组结构更节省内存空间，并且一般ThreadLocal变量不会很多，通过0x61c88647这个黄金分割的递增hashCode也能比较好的分布在数组上减少冲突。

### 使用WeakReference引用ThreadLocal对象

Map中的元素用一个Entry类表示，Entry包含了对ThreadLocal的WeakReference，以及对ThreadLocal值的强引用。

```java
// Map中的Entry，也是数组中的元素，会使用WeakReference引用ThreadLocal对象，value的对象是默认的强引用
static class Entry extends WeakReference<ThreadLocal<?>> {
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```

为什么使用WeakReference对象引用呢? 很多文章都提到内存泄漏，但是都没有说明白具体是什么样的内存泄漏，不少文章写道是因为value是强引用，如果线程一直存活会一直让value释放不了，这个其实并不准确，因为如果ThreadLocal字段是static的，这个static变量对象的声明周期和class对象是一致的，而class对象出现卸载的条件非常少，大部分类加载后一直存活，因此即使Entry声明成WeakReference，GC后static的ThreadLocal对象也不会被回收。
原因究竟是为什么呢？这个要从要求ThreadLocal变量声明成static final说起。
如果不是static final，比如是实例字段，则这个ThreadLocal字段可能会出现非常多个ThreadLocal实例，而不是静态常量一样一个classloader内只有一个。
如果有非常多ThreadLocal实例，想想ThreadLocal的实现，是在线程内有一个Map保存ThreadLocal到value的映射。这样即使ThreadLocal实例对象已经不使用了，只要Thread对象存活，被引用的对象就无法释放。
这就是使用WeakReference的原因，WeakReference引用不会影响对象被GC。这样gc后会清理掉ThreadLocalMap中已经失效的映射。也就是当我们没有正确使用ThreadLocal时（没有使用static字段），是可能出现内存泄露的，因为ThreadLocalMap中保存了对ThreadLocal的引用，ThreadLocalMap通过WeakReference以及清理机制在一定程度上缓解了这个问题。

下面用一段代码来阐述一下。
```java
public static void main(String[] args) {
    for (int i = 0; i <100; i++) {
        new People().say();
    }
}

static class People {
    static AtomicInteger counter = new AtomicInteger();
    private final ThreadLocal<String> threadLocal = ThreadLocal.withInitial(() -> "hello" + counter.getAndIncrement());
    public void say() {
        System.out.println(threadLocal.get());
    }
}
```
我们创建了一个People类，并且创建了一个类型为ThreadLocal<String>的实例字段，我们在main方法中连续调用say()方法，会发现打印出来的threadLocal的值是不一样的，虽然我们这些调用都在
同一个线程中，但是因为每次调用的ThreadLocal对象是不同的，也就是ThreadLocalMap的key不相同。如果我们把ThreadLocal字段加上static，就会发现打印出来的都是相同的值了。
长时间运行的线程是有可能出现的，比如tomcat的http处理线程，grpc的rpc业务处理线程等都是长时间一直运行的。

另外因为Entry有对value的强引用，所以在线程业务处理的最后可以主动调用remove方法清理ThreadLocal，加快垃圾对象的回收，可以避免长时间存活而晋升到老年代。
例如如果我们在Filter中使用ThreadLocal,一般在处理之前获取设置ThreadLocal，处理完成后，remove()删除ThreadLocal。
```java
private static final ThreadLocal<String> userNameThreadLocal = new ThreadLocal<>();
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
	FilterChain filterChain) {
	userNameThreadLocal.set(getName(request));
	try {
		filterChain.doFilter(request, response);
	} finally {
		userNameThreadLocal.remove();
	}
}
```

下面看一下ThreadLocalMap的实现，也就是线性探测法的具体实现。
使用数组存放ThreadLocal到value的映射Entry，也有一个threshold(按照数组长度乘以2/3得到)，元素数量达到threshold时，会触发resize。
在ThreadLocalMap中也有清理stale Entry的处理，当ThreadLocal对象没有强引用后，Entry.get()就会返回null，这个Entry就称为stale entry，就可以触发清理工作来回收空间。


ThreadLocalMap中定义了Entry[]数组，可以想象成循环数组，在线性探查中，如果遍历到边界后会从另一头继续遍历。
threshold是扩容的阈值，当Map中元素数量达到threshold的时候会进行扩容，threshold通过数组长度乘以2/3得到，2/3就是Map的load factor（也翻译成负载因子）

```java
static class ThreadLocalMap {

    // 初始数组的大小
    private static final int INITIAL_CAPACITY = 16;

    // 存放Entry的数组，和HashMap一样是惰性创建的，并且长度是2的次方，每次扩容乘以2.
    private Entry[] table;

    private int size = 0;

    // 触发resize的阈值，
    private int threshold; // Default to 0

    // threshold是数组长度乘以2/3
    private void setThreshold(int len) {
	    threshold = len * 2 / 3;
    }

    // 线性探测法使用的计算后一个数组index的方法，到达数组最后之后会从0开始
    private static int nextIndex(int i, int len) {
	    return ((i + 1 < len) ? i + 1 : 0);
    }

    // 线性探测法使用的计算前一个数组index的方法，到达数组最前面后会总数组的最后开始
    private static int prevIndex(int i, int len) {
	    return ((i - 1 >= 0) ? i - 1 : len - 1);
    }
}
```

getEntry方法返回ThreadLocal对应的Entry，通过与操作得到非负数的数组index
```java
// 获取某个ThreadLocal对应的Entry
private Entry getEntry(ThreadLocal<?> key) {
    // 通过hashCode和（数组长度-1）做与操作，在数组长度为2的次方时，等价于对数组长度取余并且不会返回负数，因为数组长度-1的高位都是0
    int i = key.threadLocalHashCode & (table.length - 1);
    Entry e = table[i];
    // 数组对应index位置的元素是当前ThreadLocal对象时，直接返回这个Entry
    if (e != null && e.get() == key)
        return e;
    else
        // 其他情况都调用getEntryAfterMiss处理，会到后面的位置继续查找
        return getEntryAfterMiss(key, i, e);
}
```

getEntryAfterMiss方法在ThreadLocal计算的hashCode直接找到的数组中的位置和ThreadLocal不匹配时，继续在后面的Entry查找（直接找到的Entry不为空的情况，为空直接返回null）
如果遇到Entry.get返回null情况，说明这个Entry的ThreadLocal对象没有强引用了，也就是stale entry，会进行清理，也就是调用expungeStaleEntry方法。
```java
private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
    Entry[] tab = table;
    int len = tab.length;

    // 从i数组位置开始不断遍历，直到数组Entry为null
    while (e != null) {
        // 调用Entry.get获取ThreadLocal对象
        ThreadLocal<?> k = e.get();
        // 如果是同一个对象，说明找到了，返回
        if (k == key)
            return e;
        // 如果ThreadLocal对象为null，说明被回收了，需要进行清理
        if (k == null)
            // expungeStaleEntry方法会负责清理，并且如果后面的元素是因为和当前i所在的ThreadLocal冲突而后移的，则会把后面的元素向左移动归位
            expungeStaleEntry(i);
        else
            // 否则，继续遍历下一个元素，到头之后从0重来
            i = nextIndex(i, len);
        // 获取下一个位置的Entry对象
        e = tab[i];
    }
    return null;
}
```
set方法负责在Map中写入ThreadLocal到value的映射。
```java

private void set(ThreadLocal<?> key, Object value) {
	Entry[] tab = table;
	int len = tab.length;
    // 计算出index
	int i = key.threadLocalHashCode & (len-1);

    // 从index开始遍历，会不会出现满了没有地方添加的情况呢？是不会的，因为这个方法的最后有判断threshold(load factor 2/3，数组初始大小为16)扩容的逻辑
	for (Entry e = tab[i];
		e != null;
		e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();

        // 找到了相同的ThreadLocal，说明Entry已经存在，进行value覆盖
        if (k == key) {
            e.value = value;
            return;
        }

        // 如果ThreadLocal对象是null，调用replaceStaleEntry替换stale entry
        if (k == null) {
            replaceStaleEntry(key, value, i);
            return;
        }
	}
    // 说明没有找到ThreadLocal或替换stale entry，则会创建一个新的Entry放在i的位置。
	tab[i] = new Entry(key, value);
    // 记录元素数量
	int sz = ++size;
    // 先清理一部分数组中的stale entry，再判断下元素数量是否超过threshold
	if (!cleanSomeSlots(i, sz) && sz >= threshold)
        // 如果元素数量达到了threshold，进行rehash扩容
	    rehash();
}
```
remove方法，会从Map中删除ThreadLocal对象的映射，并且也会触发expungeStaleEntry清理
```java
private void remove(ThreadLocal<?> key) {
    Entry[] tab = table;
    int len = tab.length;
    int i = key.threadLocalHashCode & (len-1);
    for (Entry e = tab[i];
        e != null;
        e = tab[i = nextIndex(i, len)]) {
        // 找到了TheadLocal对应的Entry后
        if (e.get() == key) {
            // 调用clear清理掉队ThreadLocal的引用，clear完之后中调用get就会返回null，相当于是stale entry了
            e.clear();
            // 触发清理，也会释放对value的引用
            expungeStaleEntry(i);
            return;
        }
    }
}
```

replaceStaleEntry会替换staleSlot上的Entry为ThreadLocal对象到value的映射
```java
private void replaceStaleEntry(ThreadLocal<?> key, Object value,
            int staleSlot) {
    Entry[] tab = table;
    int len = tab.length;
    Entry e;

    // 向前找第一个不为null的数组位置，作为这次replace中会清理的起点，避免频繁全量rehash
    int slotToExpunge = staleSlot;
    for (int i = prevIndex(staleSlot, len);
        (e = tab[i]) != null;
        i = prevIndex(i, len)) {
        if (e.get() == null)
            slotToExpunge = i;
    }

    for (int i = nextIndex(staleSlot, len);
        (e = tab[i]) != null;
        i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();

        // 找到了元素，进行替换
        if (k == key) {
            e.value = value;

            tab[i] = tab[staleSlot];
            tab[staleSlot] = e;

            if (slotToExpunge == staleSlot)
                slotToExpunge = i;
            cleanSomeSlots(expungeStaleEntry(slotToExpunge), len);
            return;
        }

        // 在上面for循环中没有找到stale entry的情况下，如果这个for循环中找到了，替换slotToExpunge
        if (k == null && slotToExpunge == staleSlot)
            slotToExpunge = i;
    }

    // 如果没有找到原有的key，则直接替换staleSlot
    tab[staleSlot].value = null;
    tab[staleSlot] = new Entry(key, value);

    // 清理
    if (slotToExpunge != staleSlot)
        cleanSomeSlots(expungeStaleEntry(slotToExpunge), len);
}
```

expungeStaleEntry方法从staleSlot开始清理stale entry，直到遇到一个null的entry
```java
private int expungeStaleEntry(int staleSlot) {
    Entry[] tab = table;
    int len = tab.length;

    // 先清理staleSlot位置的Entry的引用
    tab[staleSlot].value = null;
    tab[staleSlot] = null;
    size--;

    // 从staleSlot后面开始重新计算Entry位置，直到遇到null数组元素
    Entry e;
    int i;
    for (i = nextIndex(staleSlot, len);
        (e = tab[i]) != null;
        i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();
        // k == null说明是stale entry，清理
        if (k == null) {
            e.value = null;
            tab[i] = null;
            size--;
        } else {
            // 否则重新计算存放entry位置
            int h = k.threadLocalHashCode & (len - 1);
            if (h != i) {
                tab[i] = null;

                // Unlike Knuth 6.4 Algorithm R, we must scan until
                // null because multiple entries could have been stale.
                while (tab[h] != null)
                    h = nextIndex(h, len);
                tab[h] = e;
            }
        }
    }
    return i;
}
```

rehash方法会先完整清理一遍，然后再check下size，如果刚才的清理后size还是大于3/4 threshold，也就是大约1/2 数组长度，则发起resize扩容
```java
private void rehash() {
    expungeStaleEntries();

    // Use lower threshold for doubling to avoid hysteresis
    if (size >= threshold - threshold / 4)
        resize();
}
```

resize扩容，会把数组长度扩大一倍，并且对Entry元素重新计算存放位置
```java
private void resize() {
    Entry[] oldTab = table;
    int oldLen = oldTab.length;
    // 计算新数组长度为老数组的两倍
    int newLen = oldLen * 2;
    // 创建新数组
    Entry[] newTab = new Entry[newLen];
    int count = 0;

    // 循环遍历老数组的元素，依次放到新数组中，相当于依次调用set方法
    for (Entry e : oldTab) {
        if (e != null) {
            ThreadLocal<?> k = e.get();
            // 如果resize的时候发现stale entry，把value设置成null释放对应的引用
            if (k == null) {
                e.value = null; // Help the GC
            } else {
                // 否则在新数组中寻找可以存放的位置，先计算hash index
                int h = k.threadLocalHashCode & (newLen - 1);
                // 如果数组中对应位置有元素，则一直向后遍历
                while (newTab[h] != null)
                    h = nextIndex(h, newLen);
                // 直到一个新位置可以存放
                newTab[h] = e;
                // 计数加一
                count++;
            }
        }
    }

    // 数组元素转移完成，修改threshold
    setThreshold(newLen);
    // 修改size
    size = count;
    // 替换table数组
    table = newTab;
}
```

expungeStaleEntries方法清理数组中所有的staleEntry
```java
private void expungeStaleEntries() {
    Entry[] tab = table;
    int len = tab.length;
    // 遍历所有的数组元素
    for (int j = 0; j < len; j++) {
        Entry e = tab[j];
        // 如果entry不为空但是get出来的ThreadLocal为空
        if (e != null && e.get() == null)
            // 从j位置开始清理
            expungeStaleEntry(j);
        }
    }
}
```

## ThreadLocal的使用注意事项

1. ThreadLocal字段应该声明成static final
2. ThreadLocal在线程处理完成后建议主动remove
3. 注意跨线程使用ThreadLocal的问题
4. ThreadLocal通过避免线程间共享数据，可以解决一些线程安全问题，并且可以跨代码区域传递参数，但是也带来了一些隐式约定，要避免滥用作参数隐式传递

## 延伸: netty中FastThreadLocal的优化

jdk中ThreadLocal的实现就是最好的吗？并不见得，高性能的io框架netty中就对ThreadLocal进行了优化，提供了FastThreadLocal。那么FastThreadLocal究竟Fast快在哪里呢？

在上面ThreadLocal的实现分析中我们可以看到ThreadLocal中是有可能出现hash冲突而进行线性探测的问题的，而FastThreadLocal通过简单的方法巧妙的解决了这个问题。

1. FastThreadLocal类中保存了一个数组中的index，这样get操作就变成了先直接拿到index再从数组中按照index读取，而不会像ThreadLoacl还可能需要向后遍历。index是通过0开始递增分配的。
2. FastTheadLocal中增加了UNSET和initialValue的null做区分，避免ThreadLocal在get遇到initialValue()返回null时每次get()总会调用setInitialValue的问题

FastThreadLocal要搭配FastThreadLocalThread使用, FastThreadLocalThread继承Thread并定义了一个InternalThreadLocalMap对象，和ThreadLocalMap类似，InternalThreadLocalMap也是存放当前线程的FastThreadLocal到value的映射。

```java
public class FastThreadLocalThread extends Thread {
    private InternalThreadLocalMap threadLocalMap;
}
```

get方法实现是获取当前线程FastThreadLocalThread的InternalThreadLocalMap，然后从FastThreadLocal拿到index调用indexedVariable获取value。
```java
public class FastThreadLocal<V> {
    // 每个FastThreadLocal对象有自己的index，对应数组中的位置
    private final int index;

    public FastThreadLocal() {
        index = InternalThreadLocalMap.nextVariableIndex();
    }

    public final V get() {
        InternalThreadLocalMap threadLocalMap = InternalThreadLocalMap.get();
        Object v = threadLocalMap.indexedVariable(index);
        // 如果initialValue返回了null，则不会多次执行initialize方法
        if (v != InternalThreadLocalMap.UNSET) {
            return (V) v;
        }

        return initialize(threadLocalMap);
    }

    private V initialize(InternalThreadLocalMap threadLocalMap) {
        V v = null;
        try {
            v = initialValue();
        } catch (Exception e) {
            PlatformDependent.throwException(e);
        }

        threadLocalMap.setIndexedVariable(index, v);
        addToVariablesToRemove(threadLocalMap, this);
        return v;
    }
}
```
InternalThreadLocalMap的indexedVariable方法直接按照index获取数组元素
```java
public final class InternalThreadLocalMap {
    static final AtomicInteger nextIndex = new AtomicInteger();
    
    public static final Object UNSET = new Object();

    public static InternalThreadLocalMap get() {
        Thread thread = Thread.currentThread();
        return thread instanceof FastThreadLocalThread ? fastGet((FastThreadLocalThread)thread) : slowGet();
    }

    private static InternalThreadLocalMap fastGet(FastThreadLocalThread thread) {
        InternalThreadLocalMap threadLocalMap = thread.threadLocalMap();
        if (threadLocalMap == null) {
            thread.setThreadLocalMap(threadLocalMap = new InternalThreadLocalMap());
        }

        return threadLocalMap;
    }

    Object[] indexedVariables;

    public Object indexedVariable(int index) {
        Object[] lookup = indexedVariables;
        return index < lookup.length? lookup[index] : UNSET;
    }
}
class UnpaddedInternalThreadLocalMap {
    
}
```

不过FastThreadLocal没有做内存泄漏保护，如果我们使用不正确，比如创建了大量ThreadLocal对象，则可能会出现数组内存不断增长，这就需要我们在使用时注意ThreadLocal声明成static，并且尽量在线程处理完成后主动remove