---
title: 并发编程基础之-如何用数组实现阻塞队列？
tags: Java
categories:
    - Java
---

ArrayBlockingQueue顾名思义，是基于数组实现的阻塞队列，阻塞队列可以用于缓冲任务，实现生产者消费者模式，例如线程池中的工作队列。那么怎么才能用数组实现阻塞队列呢？

我们先从ArrayBlockingQueue的功能说起
1. 首先它是一个队列，队列需要具备入队、出队的能力
2. 由于是BlockingQueue，需要在队列已满时，对入队的请求进行阻塞，当队列有剩余空间时，释放入队请求；在队列为空时，需要对出队的请求进行阻塞，当队列中有元素时，释放出队请求；
3. 由于ArrayBlockingQueue是一个在多线程情况下使用的数据结构，需要保证它的操作的线程安全性

## 拆解ArrayBlockingQueue实现步骤

我们先拆解一下问题，把这个问题分成

1. 用数组实现队列
2. 给队列加上阻塞能力和保证线程安全

### 用数组实现队列

如何用数组实现数据的入队出队操作呢，很多同学第一时间会想到，通过一个index字段存储当前数组下一个写入的位置。那么如何处理出队呢，很多同学会想到出队就是返回数组第一个元素，并且把后面所有的元素向前移动一位。

这个方案的问题在于出队时会移动大量的元素，它的时间复杂度是O(n)，那有没有更高效的方案呢？还有另一个循环数组的方案，我们通过两个int字段，分别记录下一个要入队和下一个要出队的元素的位置，当入队到数组末尾时，从0开始，同样当出队到末尾时，也从0开始。

另外当队列为空和队列已满的时候，takeIndex和putIndex都指向相同的位置，所以为了进行区分，我们可以用一个count字段存储队列元素数量，这样当count=0的时候说明队列为0，count=数组容量的时候说明队列已满

![picture 1](/assets/images/6834fda3ac5dbd52b8122bc0bf71b2f24531ef8df38a62fe3fd8af9ddca8ff1d.png)  

下面代码展示了用数组实现队列的具体实现。
```java
class ArrayBlockingQueue<E> {
    final Object[] items;
    int takeIndex;
    int putIndex;
    int count;
    public ArrayBlockingQueue(int capacity) {
        if (capacity <= 0)
            throw new IllegalArgumentException();
        this.items = new Object[capacity];
    }
    private void enqueue(E e) {
        Object[] items = this.items;
        items[putIndex] = e;
        if (++putIndex == items.length) putIndex = 0;
        count++;
    }
    private E dequeue() {
        Object[] items = this.items;
        E e = (E) items[takeIndex];
        items[takeIndex] = null;
        if (++takeIndex == items.length) takeIndex = 0;
        count--;
        return e;
    }
}
```

### 实现条件阻塞和线程安全

![picture 2](/assets/images/285bb5a5cc450bb1bb97a1d50e36197f8ee3db09f85c4984bc358e332bd48df0.png) 

「在队列已满时，对入队的请求进行阻塞，当队列有剩余空间时，释放入队请求」这个需求本质上是一个条件等待的特例，写入的条件是队列不满，不满足条件的时候需要等待，直到满足条件为止。

在Java中，实现条件等待有synchronized+Object.wait和Lock+Condition.await两种方式，这里不用synchronized方案，是因为

1. synchronized不支持interrupt
2. synchronized无法支持多个条件

通过Lock和Condition的方案，还能够保证线程安全，因为上面的环形数组实现中，线程间共享的变量有items数组、takeIndex、putIndex、count，线程安全涉及到原子性可见性重排序几个方面，通过Lock类加锁可以对共享变量的读写操作进行保护。

定义阻塞的Lock对象和Condition，条件分为不满和不空两个条件。
```java
class ArrayBlockingQueue<E> {
    final Object[] items;
    int takeIndex;
    int putIndex;
    int count;
    ReentrantLock lock;
    private final Condition notEmpty;
    private final Condition notFull;
    public ArrayBlockingQueue(int capacity) {
        if (capacity <= 0)
            throw new IllegalArgumentException();
        this.items = new Object[capacity];
        // 创建lock对象
        lock = new ReentrantLock();
        // 创建非空的Condition
        notEmpty = lock.newCondition();
        // 创建不满的Condition
        notFull =  lock.newCondition();
    }
}
```

以入队操作添加实现为例，能够入队的条件是队列不满，也就是count < items.length，不能入队的条件反过来就是count == items.length。
当满足条件后，我们就可以入队了，入队之后，还需要唤醒等待出队的线程。

put方法的流程为

1. 先加锁
2. 在锁中while循环判断条件是否满足，不满足调用notFull.await()，await()方法会释放锁，被其他线程signal唤醒后会重新抢锁，再次获得锁后会继续走到while循环判断条件的地方。
3. 如果条件已经满足，则执行入队操作
4. 入队完之后调用notEmpty.signal()唤醒一个等待notFull条件的线程
5. finally中释放锁

```java
public void put(E e) throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        while (count == items.length)
            notFull.await();
        enqueue(e);
        notEmpty.signal();
    } finally {
        lock.unlock();
    }
}
```

方法中还有一些小细节

1. put方法中，为什么要先用一个声明一个lock局部变量呢？

`ReentrantLock lock = this.lock;`
这是因为如果不使用局部变量，后面所有使用实例变量的调用，在字节码指令层面需要变成先调用aload 0获取到this，再调用getField指令获取字段值，再进行其他操作。而先把lock存到局部变量中，后面所有的获取lock就可以变成一个aload xxx指令，从而节省了指令数量，也就会加快方法的执行速度。

2. 为什么while循环需要放在锁内呢？

如果不放在锁内，则可能会出现多个线程同时看到满足条件，进而去加锁入队。虽然入队还是在临界区，但是会出现队列已满，仍然在执行入队操作的情况。这个问题和单例的double check locking中少些一个check的问题类似。

take方法是和put相对应的出队方法，和put流程基本一致
```java
public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        while (count == 0)
            notEmpty.await();
        E element = dequeue();
        notFull.signal()
        return element;
    } finally {
        lock.unlock();
    }
}
```
