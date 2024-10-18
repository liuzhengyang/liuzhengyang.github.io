(window.webpackJsonp=window.webpackJsonp||[]).push([[237],{668:function(s,e,t){"use strict";t.r(e);var a=t(34),n=Object(a.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"coroutine"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#coroutine"}},[s._v("#")]),s._v(" Coroutine")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("public class Coroutine extends CoroutineBase {\nprivate final Runnable target;\n\n    /**\n     * Allocates a new {@code Coroutine} object.\n     */\n    public Coroutine() {\n        this.target = null;\n        threadSupport.addCoroutine(this, -1);\n    }\n\n    /**\n     * Allocates a new {@code Coroutine} object.\n     *\n     * @param target the runnable\n     */\n    public Coroutine(Runnable target) {\n        this.target = target;\n        threadSupport.addCoroutine(this, -1);\n    }\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br")])]),t("p",[s._v("Coroutine提供了yieldTo和unsafeYieldTo方法。\nyieldTo是在当前协程阻塞时让出线程执行给另一个Coroutine协程。\nunsafeYieldTo也是让出协程的方法，不过有几个优化")]),s._v(" "),t("ol",[t("li",[s._v("不会同时从其他线程steal Coroutine")]),s._v(" "),t("li",[s._v("不会switch到正在被steal的协程")]),s._v(" "),t("li",[s._v("不会steal正在运行的coroutine")])]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("/**\n     * Yields execution to the target coroutine.\n     * @param target Coroutine\n     */\n    public static void yieldTo(Coroutine target) {\n        SharedSecrets.getJavaLangAccess().currentThread0().getCoroutineSupport().symmetricYieldTo(target);\n    }\n    /**\n     * optimized version of yieldTo function for wisp based on the following assumptions:\n     * 1. we won't simultaneously steal a {@link Coroutine} from other threads\n     * 2. we won't switch to a {@link Coroutine} that's being stolen\n     * 3. we won't steal a running {@link Coroutine}\n     * @param target target coroutine\n     */\n    public static void unsafeYieldTo(Coroutine target) {\n        SharedSecrets.getJavaLangAccess().currentThread0().getCoroutineSupport().unsafeSymmetricYieldTo(target);\n    }\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("p",[s._v("setWispTask会调用setWispTask这个同名的native方法。\nregisterNatives方法会向jvm注册native方法，注册的是setWispTask")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("/**\n * Relate Coroutine to wisp data structures\n *\n * @param id     wispTask id\n * @param task   task oop\n * @param engine wispEngine oop\n */\npublic void setWispTask(int id, Object task, Object engine) {\n    setWispTask(nativeCoroutine, id, task, engine);\n}\nstatic {\n    registerNatives();\n}\n\nprivate static native void registerNatives();\n\nprivate static native void setWispTask(long coroutine, int id, Object task, Object engine);\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("p",[s._v("Coroutine.c中的实现")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('#include "jni.h"\n#include "jvm.h"\n#include "java_dyn_Coroutine.h"\n\n#define ARRAY_LENGTH(a) (sizeof(a)/sizeof(a[0]))\n\n#define LANG "Ljava/lang/"\n#define OBJ LANG"Object;"\n\nstatic JNINativeMethod methods[] = {\n  {"setWispTask","(JI"OBJ OBJ")V", (void *)&amp;JVM_SetWispTask},\n};\n\nJNIEXPORT void JNICALL\nJava_java_dyn_Coroutine_registerNatives(JNIEnv *env, jclass cls)\n{\n    (*env)->RegisterNatives(env, cls, methods, ARRAY_LENGTH(methods));\n}\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br")])]),t("p",[s._v("setWispTask的实现在jvm.cpp中。")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('JVM_ENTRY(void, JVM_SetWispTask(JNIEnv* env, jclass klass, jlong coroutinePtr, jint task_id, jobject task, jobject engine))\n  JVMWrapper("JVM_SetWispTask");\n  assert(EnableCoroutine, "Coroutine is disabled");\n  Coroutine* coro = (Coroutine*)coroutinePtr;\n  coro->set_wisp_task_id(task_id);\n  coro->set_wisp_engine(JNIHandles::resolve_non_null(engine));\n  coro->set_wisp_task(JNIHandles::resolve_non_null(task));\nJVM_END\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h2",{attrs:{id:"coroutine-hpp-native实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#coroutine-hpp-native实现"}},[s._v("#")]),s._v(" Coroutine.hpp native实现")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"coroutinestack"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#coroutinestack"}},[s._v("#")]),s._v(" CoroutineStack")]),s._v(" "),t("p",[s._v("CoroutineStack是协程的方法栈。")]),s._v(" "),t("h2",{attrs:{id:"switchto切换协程的实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#switchto切换协程的实现"}},[s._v("#")]),s._v(" switchTo切换协程的实现")]),s._v(" "),t("p",[s._v("在create_switchTo_contents")]),s._v(" "),t("p",[s._v("把当前线程JavaThread的状态，保存到旧的协程(source)上，然后把新的协程(target)的数据，恢复到JavaThread上。")]),s._v(" "),t("ul",[t("li",[s._v("设置Coroutine::last_Java_pc_offset到JavaThread的last_Java_pc_offset")]),s._v(" "),t("li",[s._v("设置线程栈，CoroutineStack::stack_base_offset、CoroutineStack::stack_size_offset")]),s._v(" "),t("li",[s._v("设置stack pointer last_sp_offset到rsp堆栈指针寄存器上。")])]),s._v(" "),t("p",[s._v("把当前线程的数据，保存到旧的(source)协程coroutine上")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("__ movl(Address(old_coroutine, Coroutine::state_offset()) , Coroutine::_onstack);\n\n    // rescue old handle and resource areas\n    __ movptr(temp, Address(thread, Thread::handle_area_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::handle_area_offset()), temp);\n    __ movptr(temp, Address(thread, Thread::resource_area_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::resource_area_offset()), temp);\n    __ movptr(temp, Address(thread, Thread::last_handle_mark_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::last_handle_mark_offset()), temp);\n    __ movptr(temp, Address(thread, Thread::active_handles_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::active_handles_offset()), temp);\n    __ movptr(temp, Address(thread, Thread::metadata_handles_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::metadata_handles_offset()), temp);\n    __ movptr(temp, Address(thread, JavaThread::last_Java_pc_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::last_Java_pc_offset()), temp);\n    __ movptr(temp, Address(thread, JavaThread::last_Java_sp_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::last_Java_sp_offset()), temp);\n    __ movptr(temp, Address(thread, JavaThread::privileged_stack_top_offset()));\n    __ movptr(Address(old_coroutine, Coroutine::privileged_stack_top_offset()), temp);\n    __ movptr(temp, Address(thread, JavaThread::threadObj_offset()));\n    __ movl(temp, Address(temp, java_lang_Thread::thread_status_offset()));\n    __ movl(Address(old_coroutine, Coroutine::thread_status_offset()), temp);\n    __ movl(temp, Address(thread, JavaThread::java_call_counter_offset()));\n    __ movl(Address(old_coroutine, Coroutine::java_call_counter_offset()), temp);\n\n    __ movptr(Address(old_stack, CoroutineStack::last_sp_offset()), rsp);\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br")])]),t("p",[s._v("把新的(target) coroutine的数据恢复到线程上")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("    // perform the switch to the new stack\n    //\n    // valid registers: rdx = target Coroutine\n\n    __ movl(Address(target_coroutine, Coroutine::state_offset()), Coroutine::_current);\n\n    Register temp = r8;\n    Register temp2 = r9;\n    {\n      Register thread = r15;\n      __ movptr(Address(thread, JavaThread::current_coroutine_offset()), target_coroutine);\n      // set new handle and resource areas\n      __ movptr(temp, Address(target_coroutine, Coroutine::handle_area_offset()));\n      __ movptr(Address(thread, Thread::handle_area_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::resource_area_offset()));\n      __ movptr(Address(thread, Thread::resource_area_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::last_handle_mark_offset()));\n      __ movptr(Address(thread, Thread::last_handle_mark_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::active_handles_offset()));\n      __ movptr(Address(thread, Thread::active_handles_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::metadata_handles_offset()));\n      __ movptr(Address(thread, Thread::metadata_handles_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::last_Java_pc_offset()));\n      __ movptr(Address(thread, JavaThread::last_Java_pc_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::last_Java_sp_offset()));\n      __ movptr(Address(thread, JavaThread::last_Java_sp_offset()), temp);\n      __ movptr(temp, Address(target_coroutine, Coroutine::privileged_stack_top_offset()));\n      __ movptr(Address(thread, JavaThread::privileged_stack_top_offset()), temp);\n      __ movl(temp2, Address(target_coroutine, Coroutine::thread_status_offset()));\n      __ movptr(temp, Address(thread, JavaThread::threadObj_offset()));\n      __ movl(Address(temp, java_lang_Thread::thread_status_offset()), temp2);\n      __ movl(temp, Address(target_coroutine, Coroutine::java_call_counter_offset()));\n      __ movl(Address(thread, JavaThread::java_call_counter_offset()), temp);\n#ifdef ASSERT\n      __ movptr(Address(target_coroutine, Coroutine::handle_area_offset()), (intptr_t)NULL_WORD);\n      __ movptr(Address(target_coroutine, Coroutine::resource_area_offset()), (intptr_t)NULL_WORD);\n      __ movptr(Address(target_coroutine, Coroutine::last_handle_mark_offset()), (intptr_t)NULL_WORD);\n      __ movl(Address(target_coroutine, Coroutine::java_call_counter_offset()), 0);\n#endif\n\n      // update the thread's stack base and size\n      __ movptr(temp, Address(target_stack, CoroutineStack::stack_base_offset()));\n      __ movptr(Address(thread, JavaThread::stack_base_offset()), temp);\n      __ movl(temp2, Address(target_stack, CoroutineStack::stack_size_offset()));\n      __ movl(Address(thread, JavaThread::stack_size_offset()), temp2);\n\n      __ movptr(temp2, Address(target_stack, CoroutineStack::stack_overflow_limit_offset()));\n      __ movptr(Address(thread, JavaThread::stack_overflow_limit_offset()), temp2);\n\n      // update JavaThread::_reserved_stack_activation for @ReservedStackAccess support\n      __ movptr(Address(thread, JavaThread::reserved_stack_activation_offset()), temp);\n    }\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br"),t("span",{staticClass:"line-number"},[s._v("38")]),t("br"),t("span",{staticClass:"line-number"},[s._v("39")]),t("br"),t("span",{staticClass:"line-number"},[s._v("40")]),t("br"),t("span",{staticClass:"line-number"},[s._v("41")]),t("br"),t("span",{staticClass:"line-number"},[s._v("42")]),t("br"),t("span",{staticClass:"line-number"},[s._v("43")]),t("br"),t("span",{staticClass:"line-number"},[s._v("44")]),t("br"),t("span",{staticClass:"line-number"},[s._v("45")]),t("br"),t("span",{staticClass:"line-number"},[s._v("46")]),t("br"),t("span",{staticClass:"line-number"},[s._v("47")]),t("br"),t("span",{staticClass:"line-number"},[s._v("48")]),t("br"),t("span",{staticClass:"line-number"},[s._v("49")]),t("br"),t("span",{staticClass:"line-number"},[s._v("50")]),t("br"),t("span",{staticClass:"line-number"},[s._v("51")]),t("br"),t("span",{staticClass:"line-number"},[s._v("52")]),t("br")])])])}),[],!1,null,null,null);e.default=n.exports}}]);