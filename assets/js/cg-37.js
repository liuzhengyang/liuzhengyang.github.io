(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{470:function(a,s,t){"use strict";t.r(s);var n=t(34),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"arthas"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#arthas"}},[a._v("#")]),a._v(" arthas")]),a._v(" "),t("h2",{attrs:{id:"安装使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装使用"}},[a._v("#")]),a._v(" 安装使用")]),a._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -O https://arthas.aliyun.com/arthas-boot.jar\njava -jar arthas-boot.jar\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[t("a",{attrs:{href:"https://arthas.aliyun.com/doc/",target:"_blank",rel:"noopener noreferrer"}},[a._v("arthas网站"),t("OutboundLink")],1)]),a._v(" "),t("h2",{attrs:{id:"其他使用问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#其他使用问题"}},[a._v("#")]),a._v(" 其他使用问题")]),a._v(" "),t("h3",{attrs:{id:"输出保存到文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#输出保存到文件"}},[a._v("#")]),a._v(" 输出保存到文件")]),a._v(" "),t("p",[a._v("命令后增加"),t("code",[a._v(">> &")]),a._v("，比如"),t("code",[a._v("ognl -x 1 '#field=@io.netty.buffer.PooledByteBufAllocator@DEFAULT,#field.usedDirectMemory()' -c 4835e4e >> &")])]),a._v(" "),t("h2",{attrs:{id:"关闭"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关闭"}},[a._v("#")]),a._v(" 关闭")]),a._v(" "),t("p",[a._v("注意关闭需要使用stop，stop会回退所有的增强。exit只是断开当前命令行到arthas目标端口的连接。")]),a._v(" "),t("h2",{attrs:{id:"实现原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#实现原理"}},[a._v("#")]),a._v(" 实现原理")]),a._v(" "),t("h3",{attrs:{id:"trace"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#trace"}},[a._v("#")]),a._v(" trace")]),a._v(" "),t("p",[a._v("选定一个方法要进行trace后，会修改该方法的字节码，在invokevirtual、invokestatic等方法调用指令执行前后增加trace，从而能够统计调用其他方法的耗时。")]),a._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[a._v("public class TraceAdviceListener extends AbstractTraceAdviceListener implements InvokeTraceable "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\n    /**\n     * Constructor\n     */\n    public TraceAdviceListener"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("TraceCommand command, CommandProcess process, boolean verbose"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        super"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("command, process"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n        super.setVerbose"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("verbose"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n    /**\n     * trace 会在被观测的方法体中，在每个方法调用前后插入字节码，所以方法调用开始，结束，抛异常的时候，都会回调下面的接口\n     */\n    @Override\n    public void invokeBeforeTracing"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("ClassLoader classLoader, String tracingClassName, String tracingMethodName, String tracingMethodDesc, int tracingLineNumber"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n            throws Throwable "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        // normalize className later\n        threadLocalTraceEntity"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("classLoader"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(".tree.begin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("tracingClassName, tracingMethodName, tracingLineNumber, "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n    @Override\n    public void invokeAfterTracing"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("ClassLoader classLoader, String tracingClassName, String tracingMethodName, String tracingMethodDesc, int tracingLineNumber"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n            throws Throwable "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        threadLocalTraceEntity"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("classLoader"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(".tree.end"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n    @Override\n    public void invokeThrowTracing"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("ClassLoader classLoader, String tracingClassName, String tracingMethodName, String tracingMethodDesc, int tracingLineNumber"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n            throws Throwable "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        threadLocalTraceEntity"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("classLoader"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(".tree.end"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("true"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br"),t("span",{staticClass:"line-number"},[a._v("14")]),t("br"),t("span",{staticClass:"line-number"},[a._v("15")]),t("br"),t("span",{staticClass:"line-number"},[a._v("16")]),t("br"),t("span",{staticClass:"line-number"},[a._v("17")]),t("br"),t("span",{staticClass:"line-number"},[a._v("18")]),t("br"),t("span",{staticClass:"line-number"},[a._v("19")]),t("br"),t("span",{staticClass:"line-number"},[a._v("20")]),t("br"),t("span",{staticClass:"line-number"},[a._v("21")]),t("br"),t("span",{staticClass:"line-number"},[a._v("22")]),t("br"),t("span",{staticClass:"line-number"},[a._v("23")]),t("br"),t("span",{staticClass:"line-number"},[a._v("24")]),t("br"),t("span",{staticClass:"line-number"},[a._v("25")]),t("br"),t("span",{staticClass:"line-number"},[a._v("26")]),t("br"),t("span",{staticClass:"line-number"},[a._v("27")]),t("br"),t("span",{staticClass:"line-number"},[a._v("28")]),t("br"),t("span",{staticClass:"line-number"},[a._v("29")]),t("br"),t("span",{staticClass:"line-number"},[a._v("30")]),t("br"),t("span",{staticClass:"line-number"},[a._v("31")]),t("br"),t("span",{staticClass:"line-number"},[a._v("32")]),t("br"),t("span",{staticClass:"line-number"},[a._v("33")]),t("br"),t("span",{staticClass:"line-number"},[a._v("34")]),t("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);