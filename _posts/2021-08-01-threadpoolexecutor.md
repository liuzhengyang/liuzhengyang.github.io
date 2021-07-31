---
title: 最强线程池解析，线程池的这些细节你真的会了吗
tags: Java
categories:
    - Java
---
## 本文整体整体结构

![picture 4](/assets/images/f62f0d5ebbaa6de940f4a304d133b5626c8f465c3e8bd62a8ace125e7a898767.png)  

## ThreadPoolExecutor介绍

首先我们要思考一下为什么要使用线程池。Java提供了多线程机制让我们能够同时运行多个任务，就像多个任务由多个人同时执行，而不是一个人依次执行这些任务。但是如果我们每次执行任务都创建一个线程，导致的问题有
1. 每次创建销毁线程都有一定的开销
2. 线程数量不好控制，过多的线程会导致内存占用过多，也可能超过操作系统的限制导致异常

因此Java提供了默认的线程池，帮助大家解决这些问题，通过ThreadPoolExecutor，我们可以实现多种线程创建回收策略，以适应不同的需求场景。

线程池可以使用的场景有
1. 批量处理，例如我们进行一个分表扫描任务，各个任务之间也没有有依赖，则我们可以把每个分表的任务提交到线程池中，提高整体任务的执行速度。
2. 优化接口耗时，假如我们的接口中会进行3个互相独立的耗时的IO操作，则我们可以把这三个IO操作提交到线程池中，再等待这三个操作完成，从串行到并行，可以减少接口的耗时。
3. 进程内异步解耦，例如注册流程中，用户信息写完数据库后会给用户发送一个邮件再返回，把发送邮件放到线程池中执行，可以减少注册接口耗时，还可以避免发送邮件接口失败影响注册接口。当然这个也可以用kafka实现类似功能。

## ThreadPoolExecutor参数介绍、使用示例

要正确使用线程池，我们需要理解其中的几个重要参数，通过ThreadPoolExecutor的构造函数可以看到参数如下

```java
(int corePoolSize,
int maximumPoolSize,
long keepAliveTime,
TimeUnit unit,
BlockingQueue<Runnable> workQueue,
ThreadFactory threadFactory,
RejectedExecutionHandler handler)
```

- corePoolSize: 线程池核心线程数，后面线程的创建回收机制中会详细介绍
- maximumPoolSize: 线程池最大线程，后面线程的创建回收机制中会详细介绍数
- keepAliveTime: 线程可回收时，空闲时间超过这个时间会回收线程。默认情况下，非核心线程会进行回收，也可以通过allowCoreThreadTimeOut来控制让核心线程也能够被回收。
- workQueue: 任务队列，需要是BlockingQueue,常见的有SynchronousQueue(无队列直接递交的队列),ArrayBlockingQueue, LinkedBlockingQueue（有界无界两种）,DelayQueue(延迟队列), PriorityBlockingQueue(优先级队列）等
- threadFactory: 创建线程的工厂，可以控制线程名称、priority等
- handler: 拒绝策略，当队列已满，并且线程数量已经达到maximumPoolSize时，再提交的任务会交给RejectedExecutionHandler来处理，常见的拒绝策略有AbortPolicy, CallerRunsPoicy, DiscardPolicy, DiscardOldestPolicy

了解了这些参数之后我们就可以创建一个线程池并使用了，通过下面的注释先对线程池的使用和机制有一个初步认识，后面会进行详细分析。

```java
// 通过构造函数创建一个核心线程数为1，最大线程数为4，keepAliveTime为1分钟，任务队列是容量为10的数组阻塞队列
// 拒绝策略是CallerRunsPolicy，即会由调用线程来执行任务
ExecutorService executorService = new ThreadPoolExecutor(1, 4, 1, TimeUnit.MINUTES,
                new ArrayBlockingQueue<>(10), new ThreadPoolExecutor.CallerRunsPolicy());
// 通过submit接口提交一个Callable任务，返回一个字符串，这个任务会先sleep 1秒
Future<String> task1Result = executorService.submit(() -> {
        Thread.sleep(1000);
        return "hello";
});
// 再通过submit接口提交一个Callable任务，返回一个字符串，这个任务会先sleep 1秒
Future<String> task2Result = executorService.submit(() -> {
        Thread.sleep(1000);
        return "hello";
});
// 通过Future.get获取第一个任务的结果
System.out.println(task1Result.get());
// 通过Future.get获取第二个任务的结果
System.out.println(task2Result.get());
// 线程池使用完了，我们需要关闭，不然JVM不会退出，因为JVM退出的条件是当前没有非daemon状态的线程了
// 调用完shutdown之后再提交的线程会被reject，由拒绝策略处理。线程池会继续处理执行任务队列中的任务
executorService.shutdown();
// 等待线程池结束
if (!executorService.awaitTermination(1, TimeUnit.MINUTES)) {
    // 如果执行时间内还没结束，调用shutdownNow情况任务队列
    executorService.shutdownNow();
    // 再等一分钟
    executorService.awaitTermination(1, TimeUnit.MINUTES);
}
```

## ThreadPoolExecutor实现机制分析

了解了ThreadPoolExecutor的使用之后，我们通过一张图看一下线程池的内部大体架构

![picture 2](/assets/images/ab5f289a6c9cb7aa8ec6c416db6c74e2590e773e5e88d9bf7f889261655b763e.png)  

通过上图可以看到ThreadPoolExecutor比较重要的组件是workerPool（工作线程池）、workQueue（任务队列）、rejectionExecutionHandler(拒绝策略)。
1. workerPool中包含了Worker对象，每个Worker对象中有一个线程负责执行提交的任务，并且不断到workQueue中获取新任务来执行。
2. workQueue是存放缓冲任务的队列，当corePool也就是核心线程满了之后，会优先把任务放到workQueue中，workQueue满了则会尝试添加非核心线程
3. 当非核心线程也满了，或者在线程池SHUTDOWN关闭后仍然提交的任务，会通过拒绝策略来执行。

整个ThreadPoolExecutor比较重要的部分有
1. 任务接收、执行流程
2. worker创建回收机制
3. 关闭流程

### 线程池状态

先看一下线程池的状态，线程池一共有5个状态
每个状态的描述为
- RUNNING: 线程池创建后正常运行
- SHUTDOWN: 调用shutdown后变成SHUTDOWN状态，拒绝新的execute提交任务，队列和Worker中已有的任务会继续执行
- STOP: 调用shutdownNow方法后进入STOP状态，会清空任务队列，并中断Worker
- TIDYING: SHUTDOWN阶段完成或STOP阶段完成
- TERMINATED: 调用完terminated hook方法后，线程池已经完成关闭

状态机如下
![picture 1](/assets/images/49abd4c845388a81969cdae7c80680e97635578b107b51ccb6fcbc0fd1a87812.png)  


### 任务提交处理流程(execute方法逻辑)

首先看一下ThreadPoolExecutor的execute的执行逻辑，流程图如下
核心逻辑为
1. 如果worker数量小于核心线程数，则优先创建一个核心线程来处理该任务
2. 如果worker数量大于等于核心线程数，则尝试入队，如果入队失败，则创建非核心线程来处理该任务
3. 如果线程池处于关闭中状态或入队失败，则使用rejectHandler拒绝策略来处理该任务

![picture 3](/assets/images/e786ede58fefa4adc7fc167a22f36d35c74d45123cbf6794d88994d1cb2bfca7.png)  

更多细节可以通过代码中的注释查看。

```java
public void execute(Runnable command) {
    if (command == null)
        throw new NullPointerException();
    // 先读取control state
    int c = ctl.get();
    // 如果当前的worker数量比corePoolSize核心线程数少
    if (workerCountOf(c) < corePoolSize) {
        // 则尝试添加一个core worker，并且传入command作为firstTask执行
        if (addWorker(command, true))
            // 添加成功，则直接返回，没有添加成功，说明可能其他execute线程触发了addWorker并争抢成功或者
            return;
        // 再重新判断下状态，这段时间内，线程池状态可能出现变化
        c = ctl.get();
    }
    // 这时候说明workerCount已经大于等于corePoolSize了，则需要添加到workQueue中，如果添加不了
    // 则需要尝试增加非核心线程worker
    if (isRunning(c) && workQueue.offer(command)) {
        // 再检查下线程池是不是关闭了
        int recheck = ctl.get();
        // 如果已经在关闭，则重workQueue里删掉，并调用reject拒绝策略
        if (! isRunning(recheck) && remove(command))
            reject(command);
        // 如果现在线程池的worker数量为0了，说明核心线程回收了，则添加一个worker来执行，避免出现任务没有worker执行的情况
        else if (workerCountOf(recheck) == 0)
            // 添加一个worker，core参数为false
            addWorker(null, false);
    }
    // 如果线程池关闭或队列已满，都会走到这里
    // 1. 关闭的情况在addWorker的时候会失败，交由rejectHandler处理
    // 2. 如果队列已满，则会尝试添加非核心线程worker，添加失败交由rejectHandler处理
    else if (!addWorker(command, false))
        reject(command);
}
```

### Worker类

addWorker方法负责创建Worker对象。
首先看一下Worker类的内容。
Worker类需要区分当前是在等待获取任务还是在执行任务中，Worker通过一个不可重入的锁来实现的，先获取到锁才能执行任务。

这是为了把等待任务和执行任务的interrupt区分开。

为了防止worker处理的task中调用corePoolSize的时候会加锁后去interrupt各个worker，如果能重入，则也会把自己的线程中断状态设置成interrupted导致运行中的任务后面可能被中断。
只有在线程池处于STOP之后的状态，才能够interrupt在运行任务中的worker线程。

看一下Worker类的定义

![picture 2](/assets/images/50b5fe65b528ee89042fef97e1b00e35d7cb06834c6869b49ea9eca2794a5414.png)  


```java
private final class Worker
        extends AbstractQueuedSynchronizer
        implements Runnable
{
    // 负责执行任务的线程，如果ThreadFactory失败则会是null
    final Thread thread;
    // 通过execute方法创建时，可能会传入初始的任务
    Runnable firstTask;

    Worker(Runnable firstTask) {
        // 防止被其他线程设置interrupt状态影响任务执行
        setState(-1); // inhibit interrupts until runWorker
        this.firstTask = firstTask;
        this.thread = getThreadFactory().newThread(this);
    }

    // worker的执行逻辑，也是线程start之后调用的run方法
    public void run() {
        runWorker(this);
    }

    protected boolean isHeldExclusively() {
        return getState() != 0;
    }

    // 实现AQS的tryAcquire来实现加锁功能。把state 从0cas到1说明加锁成功
    protected boolean tryAcquire(int unused) {
        if (compareAndSetState(0, 1)) {
            setExclusiveOwnerThread(Thread.currentThread());
            return true;
        }
        return false;
    }

    // 实现AQS的tryRelease来实现释放锁功能，释放锁实现为把锁状态改为0
    protected boolean tryRelease(int unused) {
        setExclusiveOwnerThread(null);
        setState(0);
        return true;
    }

    // 加锁方法
    public void lock()        { acquire(1); }
    // 尝试加锁方法
    public boolean tryLock()  { return tryAcquire(1); }
    // 释放锁方法
    public void unlock()      { release(1); }
    // 判断是否在加锁中
    public boolean isLocked() { return isHeldExclusively(); }

    // 这个是给shutdownNow方法用的，可以在不获取锁的情况下interrupt线程
    void interruptIfStarted() {
        Thread t;
        if (getState() >= 0 && (t = thread) != null && !t.isInterrupted()) {
            try {
                t.interrupt();
            } catch (SecurityException ignore) {
            }
        }
    }
}
```

### addWorker方法的流程

![picture 3](/assets/images/13706aed304d6f82edc44781bccd4d2cd469c64eb6c591d90e348695f61f5fa3.png)  


```java
private boolean addWorker(Runnable firstTask, boolean core) {
    retry:
    // 不断循环重试
    for (int c = ctl.get();;) {
        // SHUTDOWN状态时，如果任务队列已经为空了，则不需要新增worker，并且也不能创建Worker执行firstTask
        // 如果是STOP状态，则肯定返回false，不创建Worker
        if (runStateAtLeast(c, SHUTDOWN)
            && (runStateAtLeast(c, STOP)
                || firstTask != null
                || workQueue.isEmpty()))
            return false;

        // 下面这个cas重试抢占添加worker的机会，区分创建核心还是非核心线程
        for (;;) {
            if (workerCountOf(c)
                >= ((core ? corePoolSize : maximumPoolSize) & COUNT_MASK))
                // 已经超过对应的线程的数量，直接返回
                return false;
            // cas失败的重试
            if (compareAndIncrementWorkerCount(c))
                break retry;
            // 如果SHUTDOWN，退出到外层的循环重试
            c = ctl.get();  // Re-read ctl
            if (runStateAtLeast(c, SHUTDOWN))
                continue retry;
            // else CAS failed due to workerCount change; retry inner loop
        }
    }

    boolean workerStarted = false;
    boolean workerAdded = false;
    Worker w = null;
    try {
        // 创建Worker对象
        w = new Worker(firstTask);
        final Thread t = w.thread;
        if (t != null) {
            // 加锁，works这个HashSet通过mainLock加锁实现线程安全
            final ReentrantLock mainLock = this.mainLock;
            mainLock.lock();
            try {
                // Recheck while holding lock.
                // Back out on ThreadFactory failure or if
                // shut down before lock acquired.
                int c = ctl.get();

                // 再次check线程池状态
                if (isRunning(c) ||
                    (runStateLessThan(c, STOP) && firstTask == null)) {
                    if (t.getState() != Thread.State.NEW)
                        throw new IllegalThreadStateException();
                    workers.add(w);
                    workerAdded = true;
                    int s = workers.size();
                    if (s > largestPoolSize)
                        largestPoolSize = s;
                }
            } finally {
                // 释放锁
                mainLock.unlock();
            }
            if (workerAdded) {
                // 启动worker中的线程，开始运行run方法，也就是runWorker
                t.start();
                workerStarted = true;
            }
        }
    } finally {
        // 如果启动失败，比如出现OOM，回滚workerCount等
        if (! workerStarted)
            addWorkerFailed(w);
    }
    return workerStarted;
}
```

再看一下runWorker方法，里面包含的就是worker的任务获取、执行逻辑。

![picture 1](/assets/images/419f6251cb2d467f67855124a11096b2e5e44324dcc8010dd852619131d63215.png)  


```java
final void runWorker(Worker w) {
    Thread wt = Thread.currentThread();
    Runnable task = w.firstTask;
    w.firstTask = null;
    // 为什么在这之前不能interrupt?
    w.unlock(); // allow interrupts
    boolean completedAbruptly = true;
    try {
        // 如果有firstTask，直接运行firstTask，否则通过getTask从任务队列中阻塞等待获取新任务，如果从队列中获取的是null说明被interrupt了，worker需要退出
        while (task != null || (task = getTask()) != null) {
            // 执行任务之前，先加锁
            w.lock();
            // 如果现在在STOP状态，则任务需要interrupt
            // 如果不是，则可能是因为调整参数导致的interrupt需要调用Thread.interrupted方法清理掉中断状态，避免影响任务执行
            // If pool is stopping, ensure thread is interrupted;
            // if not, ensure thread is not interrupted.  This
            // requires a recheck in second case to deal with
            // shutdownNow race while clearing interrupt
            if ((runStateAtLeast(ctl.get(), STOP) ||
                    (Thread.interrupted() &&
                    runStateAtLeast(ctl.get(), STOP))) &&
                !wt.isInterrupted())
                wt.interrupt();
            try {
                // 任务执行前的回调方法
                beforeExecute(wt, task);
                try {
                    // 传入的Runnable的run方法被执行。
                    task.run();
                    // 任务执行后的回调方法
                    afterExecute(task, null);
                } catch (Throwable ex) {
                    // 任务执行后的回调方法                    afterExecute(task, ex);
                    throw ex;
                }
            } finally {
                task = null;
                w.completedTasks++;
                // 执行完当前任务后或任务异常退出后，释放锁
                w.unlock();
            }
        }
        // 如果执行到这里，说明是从while循环条件中退出的
        completedAbruptly = false;
    } finally {
        // 调用processWorkerExit，如果是异常退出会导致worker线程挂掉，会重新创建一个新的worker代替当前worker
        processWorkerExit(w, completedAbruptly);
    }
}
```

### getTask实现

getTask方法负责从任务队列中不断获取任务，其中可以看到当线程能回收时，会使用keepAliveTime时间进行阻塞队列poll等待来实现的Worker线程超过一定idle空闲时间后回收功能。

```java
private Runnable getTask() {
    boolean timedOut = false; // Did the last poll() time out?

    for (;;) {
        int c = ctl.get();
        // 如果线程池处于SHUTDOWN状态，并且任务队列空了，或者处于STOP状态，则当前worker需要退出，因此会返回null
        if (runStateAtLeast(c, SHUTDOWN)
            && (runStateAtLeast(c, STOP) || workQueue.isEmpty())) {
            decrementWorkerCount();
            return null;
        }

        int wc = workerCountOf(c);

        // allowCoreThreadTimeOut为true说明核心线程也可以回收，否则只回收非核心线程
        boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;

        // 
        if ((wc > maximumPoolSize || (timed && timedOut))
            && (wc > 1 || workQueue.isEmpty())) {
            if (compareAndDecrementWorkerCount(c))
                return null;
            continue;
        }

        try {
            // 从任务阻塞队列中poll任务，可以回收时加上等待时间，否则无限期等待。
            Runnable r = timed ?
                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :
                workQueue.take();
            if (r != null)
                return r;
            // 
            timedOut = true;
        } catch (InterruptedException retry) {
            // 线程池关闭或者调整线程池配置的时候会被interrupt，
            // 关闭的情况下次循环中会退出，调整配置则不会影响worker下次获取task
            timedOut = false;
        }
    }
}

```


### shutdown实现

已有的task会继续执行，但是不会接受新的task

```java
public void shutdown() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
        // 把线程池状态改为SHUTDOWN
        advanceRunState(SHUTDOWN);
        // 对各个idle worker也就是没有在执行任务的worker的线程调用interrupt方法
        interruptIdleWorkers();
        // shutdown 回调
        onShutdown(); // hook for ScheduledThreadPoolExecutor
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
}
```

shutdownNow方法，和shutdown的区别是会修改状态为STOP，并且把队列中的task drain出来
```java
public List<Runnable> shutdownNow() {
    List<Runnable> tasks;
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
        // 修改线程池状态为STOP
        advanceRunState(STOP);
        // interrupt所有的worker
        interruptWorkers();
        // 情况队列
        tasks = drainQueue();
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
    return tasks;
}
```

tryTerminate方法会尝试关闭线程池
```java
final void tryTerminate() {
    for (;;) {
        int c = ctl.get();
        // 如果是RUNNING状态，不需要关闭
        if (isRunning(c) ||
            // 如果是TIDYING，说明有其他线程在terminate，当前线程不需要处理，也return
            runStateAtLeast(c, TIDYING) ||
            // 如果是SHUTDOWN状态，并且任务队列中还有任务，还需要等待任务执行完
            (runStateLessThan(c, STOP) && ! workQueue.isEmpty()))
            return;
        // 走到这里，说明是如下两种情况中的一种
        // 1. SHUTDOWN状态并且队列已经为空
        // 2. STOP状态
        // 判断如果还有worker存在，则尝试interrupt
        if (workerCountOf(c) != 0) { // Eligible to terminate
            interruptIdleWorkers(ONLY_ONE);
            return;
        }

        // 走到这里，说明worker和任务队列都空了，则需要修改状态为TIDYING并调用terminated回调方法。
        final ReentrantLock mainLock = this.mainLock;
        mainLock.lock();
        try {
            // cas修改状态，保证terminated方法不会重复调用
            if (ctl.compareAndSet(c, ctlOf(TIDYING, 0))) {
                try {
                    terminated();
                } finally {
                    // 修改成TERMINATED状态
                    ctl.set(ctlOf(TERMINATED, 0));
                    // awaitTerminate会await这个condition
                    termination.signalAll();
                }
                return;
            }
        } finally {
            mainLock.unlock();
        }
        // else retry on failed CAS
    }
}
```



### BlockingQueue选择

|   队列类型	|   特性 |
|---	|---	|
|   ArrayBlockingQueue	|   基于数组的阻塞队列，有界队列 |
|   LinkedBlockingQueue	|   基于链表的阻塞队列，和ArrayBlockingQueue功能上的区别在于可以创建一个无界队列，例如Executors.newFixedThreadPool(int)创建的线程池的队列就是无界的，这种情况下可能出现队列堆积导致OOM的问题|
|   SynchronizedQueue	|   同步阻塞队列，这个队列是一个没有长度的队列，可以保证任务最快被处理，减少在队列中的停留时间	|   
|   PriorityBlockingQueue	|   带有优先级的阻塞队列	|   
|   DelayQueue	|   延迟队列，ScheduledThreadPoolExecutor就是使用这个队列实现定时执行和延迟执行功能的|   


### RejectedExecutionHandler选择

这里介绍一下常见的RejectedExecutionHandler

|   RejectedExecutionHandler	|   |
|---	|---	|
|   AbortPolicy	|   拒绝时抛出RejectedExecutionException异常，这是默认的拒绝策略	|   
|   DiscardPolicy	|   会忽略任务，提交时没有异常	|  
|   DiscardOldestPolicy	|   会从任务队列中移除最早的任务并重试提交当前任务	| 
|   CallerRunsPolicy	|   使用提交任务的线程也就是调用execute方法的线程去执行这个任务	| 

当然我们也可以自定义自己的拒绝策略，例如实现一个阻塞提交线程的拒绝策略，这个和CallerRunsPolicy一样都能让提交者慢下来，但是不会用提交线程去执行任务。
```java
class BlockSubmitRejectedExecutionHandler implements RejectedExecutionHandler {
    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        try {
            executor.getQueue().put(r);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```


### 动态修改参数

ThreadPoolExecutor还提供了修改corePoolSize和maximumPoolSize等参数的方法，使得我们可以动态调整线程池的参数。

```java
public void setCorePoolSize(int corePoolSize) {
    if (corePoolSize < 0 || maximumPoolSize < corePoolSize)
        throw new IllegalArgumentException();
    int delta = corePoolSize - this.corePoolSize;
    this.corePoolSize = corePoolSize;
    if (workerCountOf(ctl.get()) > corePoolSize)
        interruptIdleWorkers();
    else if (delta > 0) {
        // We don't really know how many new threads are "needed".
        // As a heuristic, prestart enough new workers (up to new
        // core size) to handle the current number of tasks in
        // queue, but stop if queue becomes empty while doing so.
        int k = Math.min(delta, workQueue.size());
        while (k-- > 0 && addWorker(null, true)) {
            if (workQueue.isEmpty())
                break;
        }
    }
}
public void setMaximumPoolSize(int maximumPoolSize) {
    if (maximumPoolSize <= 0 || maximumPoolSize < corePoolSize)
        throw new IllegalArgumentException();
    this.maximumPoolSize = maximumPoolSize;
    if (workerCountOf(ctl.get()) > maximumPoolSize)
        interruptIdleWorkers();
}
```

如何修改队列长度呢？我们可以实现一个可变长度的阻塞队列即可，通过在LinkedBlockingQueue基础上增加一个加锁修改capacity的队列比较容易实现，因为LinkedBlockingQueue中capacity只作为一个int字段存储没有像ArrayBlockingQueue那样会影响数组长度。所以我们加锁修改capacity后调用notFull.signalAll即可。
