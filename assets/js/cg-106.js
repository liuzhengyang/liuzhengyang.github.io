(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{537:function(t,s,a){"use strict";a.r(s);var n=a(34),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"安卓hotreload"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安卓hotreload"}},[t._v("#")]),t._v(" 安卓hotreload")]),t._v(" "),a("h2",{attrs:{id:"robust"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#robust"}},[t._v("#")]),t._v(" robust")]),t._v(" "),a("p",[t._v("编译时，为每个函数前插入代码，增加动态更新的预留调用，如果有最新代码，则转发到最新代码上。")]),t._v(" "),a("p",[t._v("比如")]),t._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getIndex")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("改为")]),t._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("public static ChangeQuickRedirect changeQuickRedirect;\npublic long getIndex() {\n    if(changeQuickRedirect != null) {\n        //PatchProxy中封装了获取当前className和methodName的逻辑，并在其内部最终调用了changeQuickRedirect的对应函数\n        if(PatchProxy.isSupport(new Object[0], this, changeQuickRedirect, false)) {\n            return ((Long)PatchProxy.accessDispatch(new Object[0], this, changeQuickRedirect, false)).longValue();\n        }\n    }\n    return 100L;\n}\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])]),a("p",[t._v("参考 "),a("a",{attrs:{href:"https://tech.meituan.com/2016/09/14/android-robust.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Android热更新方案Robust"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("和spring-loaded方案有点像，不过spring-loaded是在启动时通过字节码增强注入，对运行、启动性能都有一定影响。")]),t._v(" "),a("h2",{attrs:{id:"google-instant-run"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#google-instant-run"}},[t._v("#")]),t._v(" google instant run")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://developer.android.com/studio/run#instant-run",target:"_blank",rel:"noopener noreferrer"}},[t._v("instant-run"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);