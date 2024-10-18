(window.webpackJsonp=window.webpackJsonp||[]).push([[242],{673:function(s,n,a){"use strict";a.r(n);var e=a(34),t=Object(e.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"threadaswisp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#threadaswisp"}},[s._v("#")]),s._v(" ThreadAsWisp")]),s._v(" "),a("p",[s._v("Java中的线程，通过"),a("code",[s._v("new Thread")]),s._v("创建，然后通过"),a("code",[s._v("Thread.start")]),s._v("启动。\nwisp在start方法中加入了wisp逻辑，如果开启了"),a("code",[s._v("+UseWisp2")]),s._v("并且没有给要启动的线程加到全转黑名单。\n则会把对应的线程对象转变成协程，并且不会调用start0也就不会创建操作系统的线程。")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('public synchronized void start() {\n        /**\n         * This method is not invoked for the main method thread or "system"\n         * group threads created/set up by the VM. Any new functionality added\n         * to this method in the future may have to also be added to the VM.\n         *\n         * A zero status value corresponds to state "NEW".\n         */\n        if (threadStatus != 0)\n            throw new IllegalThreadStateException();\n\n        /* Notify the group that this thread is about to be started\n         * so that it can be added to the group\'s list of threads\n         * and the group\'s unstarted count can be decremented. */\n        group.add(this);\n\n        boolean started = false;\n        try {\n            if (!(WEA != null &amp;&amp; WispEngine.enableThreadAsWisp() &amp;&amp;\n                    WEA.tryStartThreadAsWisp(this, target, this.stackSize))) {\n                start0();\n            }\n            started = true;\n        } finally {\n            try {\n                if (!started) {\n                    group.threadStartFailed(this);\n                }\n            } catch (Throwable ignore) {\n                /* do nothing. If start0 threw a Throwable then\n                  it will be passed up the call stack */\n            }\n        }\n    }\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])]),a("p",[s._v("TODO: Thread.start0方法做了什么？")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("static boolean tryStart(Thread thread, Runnable target, long stackSize) {\n        // 判定当前线程是否是EngineThread(carrier thread)\n        if (WispEngine.isEngineThread(thread)) {\n            return false;\n        }\n        // 全转协程\n        if (WispConfiguration.ALL_THREAD_AS_WISP) {\n            // 过滤黑名单\n            if (matchList(thread, target, WispConfiguration.getThreadAsWispBlacklist())) {\n                return false;\n            }\n        }\n        // 不是全转的时候，判定白名单\n         else if (!matchList(thread, target, WispConfiguration.getThreadAsWispWhitelist())) {\n            return false;\n        }\n        // 不是daemon线程，因为Carrier线程是daemon线程，需要避免jvm进程退出，jvm在没有非daemon线程的时候会退出。\n        // preventShutdownThread会在协程退出的时候，进行判断，如果没有非daemon的协程，则会关闭preventShutdownThread\n        if (!thread.isDaemon()) {\n            synchronized (ThreadAsWisp.class) {\n                if (nonDaemonCount++ == 0) { // start a non-daemon thread to prevent jvm exit\n                    assert preventShutdownThread == null;\n                    preventShutdownThread = new PreventShutdownThread();\n                    preventShutdownThread.start();\n                }\n            }\n        }\n\n        // pthread_create always return before new thread started, so we should not wait here\n        WispEngine.JLA.setWispAlive(thread, true); // thread.isAlive() should be true\n        // startAsThread\n        WispEngine.current().startAsThread(thread, thread.getName(), thread, stackSize);\n        return true;\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])]),a("p",[s._v("WispEngine.current调用的是WispCarrier.current().engine")]),s._v(" "),a("p",[s._v("WispCarrier.current")]),s._v(" "),a("p",[s._v("获取当前线程，获取线程的当前WispTask，如果WispTask是null，创建WispCarrier对象，并且初始化。\nengine默认用的是WispEngine.WISP_ROOT_ENGINE")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("/**\n     * The user can only get thread-specific carrier by calling this method.\n     * &lt;p>\n     * We can not use ThreadLocal any more, because if transparentAsync, it behaves as a coroutine local.\n     *\n     * @return thread-specific carrier\n     */\n    static WispCarrier current() {\n        Thread thread = WispEngine.JLA.currentThread0();\n        WispTask current = WispEngine.JLA.getWispTask(thread);\n        if (current == null) {\n            WispCarrier carrier = new WispCarrier(WispEngine.WISP_ROOT_ENGINE);\n            if (carrier.threadTask.ctx != null) {\n                WispEngine.JLA.setWispTask(thread, carrier.getCurrentTask());\n                carrier.init();\n            } // else: fake carrier used in jni attach\n            return carrier;\n        } else {\n            return current.carrier;\n        }\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br")])]),a("p",[s._v("startAsThread向scheduler(WispScheduler)中增加执行一个TaskDispatcher对象。\nscheduler.execute会找到一个合适(idle)的Worker，调用Worker.pushAndSignal(command), command就是TaskDispatcher。")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    void startAsThread(Runnable target, String name, Thread thread, long stackSize) {\n        scheduler.execute(new TaskDispatcher(WispCarrier.current().current.ctxClassLoader,\n                target, name, thread, stackSize));\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("TaskDispatcher实现StealAwareRunnable接口，run方法获取当前的WispCarrier，调用WispCarrier的runTaskInternal方法。")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class TaskDispatcher implements StealAwareRunnable {\n    private final ClassLoader ctxClassLoader;\n    private final long enqueueTime;\n    private final Runnable target;\n    private final String name;\n    private final Thread thread;\n    private final long stackSize;\n\n    TaskDispatcher(ClassLoader ctxClassLoader, Runnable target, String name, Thread thread, long stackSize) {\n        this.ctxClassLoader = ctxClassLoader;\n        this.enqueueTime = WispEngine.getNanoTime();\n        this.target = target;\n        this.name = name;\n        this.thread = thread;\n        this.stackSize = stackSize;\n    }\n\n    @Override\n    public void run() {\n        WispCarrier current = WispCarrier.current();\n        current.countEnqueueTime(enqueueTime);\n        current.runTaskInternal(target, name, thread,\n                ctxClassLoader == null ? current.current.ctxClassLoader : ctxClassLoader,\n                this.stackSize);\n    }\n}\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br")])]),a("p",[s._v("runTaskInternal中，会从缓存获取或创建WispTask，通过WispTask的reset(target, name, thread, ctxLoader)设置\n要执行的Runnable的数据（减少WispTask对象的创建）\n然后调用yieldTo让底层的carrier去执行这个WispTask")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('final WispTask runTaskInternal(Runnable target, String name, Thread thread, ClassLoader ctxLoader, long stackSize) {\n        if (engine.hasBeenShutdown &amp;&amp; !WispTask.SHUTDOWN_TASK_NAME.equals(name)) {\n            throw new RejectedExecutionException("Wisp carrier has been shutdown");\n        }\n        assert current == threadTask;\n        boolean isInCritical0 = isInCritical;\n        isInCritical = true;\n        WispTask wispTask;\n        try {\n            counter.incrementCreateTaskCount();\n            if ((wispTask = getTaskFromCache(stackSize)) == null) {\n                wispTask = new WispTask(this, null, true, false, stackSize);\n                WispTask.trackTask(wispTask);\n            }\n            wispTask.reset(target, name, thread, ctxLoader);\n            TASK_COUNT_UPDATER.incrementAndGet(engine);\n        } finally {\n            isInCritical = isInCritical0;\n        }\n        yieldTo(wispTask, false);\n        runWispTaskEpilog();\n\n        return wispTask;\n    }\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br")])]),a("p",[s._v("WispTask.reset")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("void reset(Runnable runnable, String name, Thread thread, ClassLoader ctxLoader) {\n        assert ctx != null;\n        this.status       = Status.ALIVE;\n        this.runnable     = runnable;\n        this.name         = name;\n        this.controlGroup = null;\n        interrupted       = 0;\n        ctxClassLoader    = ctxLoader;\n        ch                = null;\n        enqueueTime       = 0;\n        parkTime          = 0;\n        blockingTime      = 0;\n        registerEventTime = 0;\n\n        activeCount       = 0;\n        stealCount        = 0;\n        stealFailureCount = 0;\n        preemptCount      = 0;\n\n        // thread status\n        if (thread != null) { // calling from Thread.start()\n            NATIVE_INTERRUPTED_UPDATER.lazySet(this, 1);\n            isThreadAsWisp = true;\n            WispEngine.JLA.setWispTask(thread, this);\n            threadWrapper = thread;\n        } else {\n            // for WispThreadWrapper, skip native interrupt check\n            NATIVE_INTERRUPTED_UPDATER.lazySet(this, 0);\n            isThreadAsWisp = false;\n            if (threadWrapper == null) {\n                threadWrapper = new WispThreadWrapper(this);\n            }\n            WispEngine.JLA.setWispAlive(threadWrapper, true);\n        }\n        assert WispEngine.JLA.getWispTask(threadWrapper) == this;\n\n        if (!isThreadTask() &amp;&amp; name != null &amp;&amp; !threadWrapper.getName().equals(name)) {\n            threadWrapper.setName(name);\n        }\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br")])]),a("p",[s._v("WispEngine.JLA.setWispTask会设置wispTask到Thread类的wispTask属性上。这是wisp jdk新增的字段。")]),s._v(" "),a("p",[s._v("runTaskInternal完成wispTask创建/获取、wispTask.reset后，最后会执行yieldTo(wispTask, false)")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("final WispTask runTaskInternal(Runnable target, String name, Thread thread, ClassLoader ctxLoader, long stackSize) {\n    ...\n    yieldTo(wispTask, false);\n    runWispTaskEpilog();\n    return wispTask;\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("yieldTo调用WispTask.switchTo，最终调用到CoroutineSupport的unsafeSymmetricYieldTo(next.ctx)\nctx是WispTask中的Coroutine字段，runTaskInternal时会创建WispTask对象（或从缓存中获取），创建时，isRealTask赋值true。\nisRealTask为trueWispTask会创建一个CacheableCoroutine对象赋值给ctx字段。")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    WispTask(WispCarrier carrier, Coroutine ctx, boolean isRealTask, boolean isThreadTask, long stackSize) {\n        this.isThreadTask = isThreadTask;\n        this.id = isRealTask ? idGenerator.addAndGet(1) : -1;\n        this.stackSize = stackSize;\n        setCarrier(carrier);\n        if (isRealTask) {\n            this.ctx = ctx != null ? ctx : new CacheableCoroutine(this.stackSize);\n            this.ctx.setWispTask(id, this, carrier);\n        } else {\n            this.ctx = null;\n        }\n        resumeEntry = isThreadTask ? null : carrier.createResumeEntry(this);\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("private boolean yieldTo(WispTask task, boolean terminal) {\n    assert task != null;\n    assert WispCarrier.current() == this;\n    assert task.carrier == this;\n    assert task != current;\n\n    schedTick++;\n\n    if (task.status != WispTask.Status.ALIVE) {\n        unregisterEvent(task);\n        return false;\n    }\n\n    WispTask from = current;\n    current = task;\n    counter.incrementSwitchCount();\n    switchTimestamp = WispEngine.getNanoTime();\n    assert !isInCritical;\n    WispTask.switchTo(from, task, terminal);\n    // Since carrier is changed with stealing, we shouldn't directly access carrier's member any more.\n    assert WispCarrier.current().current == from;\n    assert !from.carrier.isInCritical;\n    return true;\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br")])]),a("p",[s._v("CacheableCoroutine继承于Coroutine类，覆写了run方法。CacheableCoroutine类不是static类，所以\n它实际上也持有WispTask的引用, run方法中的runnable就是WispTask的runnable字段。\nrun方法运行while(true)循环，每次循环都判断当前WispTask的runnable，如果不为null，则调用runCommand()去执行这个runnable。\nrunCommand判断当前ResourceContainer如果是root，则直接调用runnable.run();")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    class CacheableCoroutine extends Coroutine {\n        CacheableCoroutine(long stacksize) {\n            super(stacksize);\n        }\n\n        @Override\n        protected void run() {\n            while (true) {\n                assert !WispConfiguration.WISP_USE_STEAL_LOCK || stealLock != 0;\n                assert WispCarrier.current() == carrier;\n                assert carrier.current == WispTask.this;\n                if (runnable != null) {\n                    Throwable throwable = null;\n                    try {\n                        runCommand();\n                    } catch (Throwable t) {\n                        throwable = t;\n                    } finally {\n                        assert timeOut == null;\n                        assert controlGroup == null; // terminated\n                        runnable = null;\n                        WispEngine.JLA.setWispAlive(threadWrapper, false);\n                        if (isThreadAsWisp) {\n                            ThreadAsWisp.exit(threadWrapper);\n                        }\n                        if (throwable instanceof CoroutineExitException) {\n                            throw (CoroutineExitException) throwable;\n                        }\n                        carrier.taskExit();\n                    }\n                } else {\n                    carrier.schedule(false);\n                }\n            }\n        }\n    }\n    private void runCommand() {\n        ResourceContainer irc = WispEngine.JLA.getInheritedResourceContainer(threadWrapper);\n        if (irc != ResourceContainer.root()) {\n            irc.run(wrapRunOutsideWisp(runnable));\n        } else {\n            runOutsideWisp(runnable);\n        }\n    }\n\n    /**\n     * Mark if wisp is running internal scheduling code or user code, this would\n     * be used in preempt to identify if it's okay to preempt\n     * Modify Coroutine::is_usermark_frame accordingly if you need to change this\n     * method, because it's name and sig are used\n     */\n    static void runOutsideWisp(Runnable runnable) {\n        runnable.run();\n    }\n\n    static Runnable wrapRunOutsideWisp(Runnable runnable) {\n        return () -> runOutsideWisp(runnable);\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br")])]),a("p",[s._v("runnable.run如果执行过程中调用了阻塞方法比如Thread.sleep、LockSupport.park、synchronized等待加锁等，都会把当前协程让出，让底层的线程去执行其他的协程。")]),s._v(" "),a("p",[s._v("LockSupport.park调用到Unsafe，然后调用到WispTask.parkInternal, WispTask.parkInternal中调用到carrier.schedule(false)。\ncarrier.schedule(false)会把WispCarrier正在执行的WispTask从阻塞的WispTask切换到初始的threadTask。")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("current = threadTask = new WispTask(this,\n                cs == null ? null : cs.threadCoroutine(),\n                cs != null, true, WispConfiguration.STACK_SIZE);\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("threadTask传入的第二个参数是cs.threadCoroutine()。cs是thread.getCoroutineSupport。\nthreadCoroutine是创建CoroutineSupport的构造函数中创建，调用new Coroutine创建，第二个参数传入getNativeThreadCoroutine。")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('public CoroutineSupport(Thread thread) {\n        if (thread.getCoroutineSupport() != null) {\n            throw new IllegalArgumentException("Cannot instantiate CoroutineThreadSupport for existing Thread");\n        }\n        id = idGen.incrementAndGet();\n        this.thread = thread;\n        threadCoroutine = new Coroutine(this, getNativeThreadCoroutine());\n        markThreadCoroutine(threadCoroutine.nativeCoroutine, threadCoroutine);\n        currentCoroutine = threadCoroutine;\n    }\n\n    /**\n     * return the threadCoroutine\n     *\n     * @return threadCoroutine\n     */\n    public Coroutine threadCoroutine() {\n        return threadCoroutine;\n    }\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    /**\n     * Creates the initial coroutine for a new thread\n     *\n     * @param threadSupport the CoroutineSupport\n     * @param data          the value\n     */\n    Coroutine(CoroutineSupport threadSupport, long nativeCoroutine) {\n        super(threadSupport, nativeCoroutine);\n        this.target = null;\n    }\n    \n    /**\n     * Creates the initial coroutine for a new thread\n     *\n     * @param threadSupport CoroutineSupport\n     * @param data          value\n     */\n    CoroutineBase(CoroutineSupport threadSupport, long nativeCoroutine) {\n        this.threadSupport = threadSupport;\n        this.nativeCoroutine = nativeCoroutine;\n    }\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br")])]),a("p",[s._v("getNativeThreadCoroutine是native方法")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("    private static native long getNativeThreadCoroutine();\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("返回的是线程的coroutine_list引用地址")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('JVM_ENTRY(jlong, CoroutineSupport_getNativeThreadCoroutine(JNIEnv* env, jclass klass))\n  DEBUG_CORO_PRINT("CoroutineSupport_getNativeThreadCoroutine\\n");\n  assert(EnableCoroutine, "pre-condition");\n\n  Coroutine* list = thread->coroutine_list();\n  assert(list != NULL, "thread isn\'t initialized for coroutines");\n\n  return (jlong)list;\nJVM_END\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])])])}),[],!1,null,null,null);n.default=t.exports}}]);