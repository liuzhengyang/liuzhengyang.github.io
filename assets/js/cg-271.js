(window.webpackJsonp=window.webpackJsonp||[]).push([[271],{702:function(s,a,t){"use strict";t.r(a);var n=t(34),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"kotlin-basic"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kotlin-basic"}},[s._v("#")]),s._v(" kotlin basic")]),s._v(" "),t("p",[s._v("kotlin介绍\n为什么用kotlin\n能用在哪些场景")]),s._v(" "),t("h2",{attrs:{id:"kotlin介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kotlin介绍"}},[s._v("#")]),s._v(" kotlin介绍")]),s._v(" "),t("p",[s._v("kotlin是由jetbrains主导的一个现代jvm语言，能够和java生态无缝集成。\n谈到jvm语言，大家熟悉的还有scala、groovy、jruby等语言，但是现在发展都不太好。\n我认为根本原因是这些语言背后的开发者还不够强大，无论是技术、资金、用户等，都不如kotlin有优势。\n广大Java开发者使用最多的IDEA（Java IDE)就是由jetbrains开发的。\n相比Java语言，kotlin在设计和更新时更加激进，jetbrains公司雄厚的研发实力和资金实力确保了kotlin语言的高质量，并且在IDEA中给与了强力支持。\njetbrains作为当前世界上最流行的Java语言IDE的开发厂商，必然对语言特性十分熟悉。")]),s._v(" "),t("p",[s._v("在android开发领域，kotlin已经非常流行（google早已将kotlin作为安卓首选语言，另外可能和android中的冗余代码比较多有关？）")]),s._v(" "),t("p",[s._v("开发者友好：相比Java代码，表达相同的代码逻辑，使用的代码量、行数更少，比如POJO的setter, getter等，大家一般用lombok等方式解决，但是在kotlin中有更强大、灵活的支持。\n安全：null-safety等\n协程coroutine：kotlin协程让jvm支持更高并发(java虚拟线程在jdk19刚推出）。\n互操作性：kotlin能够和已有的Java代码无缝互相调用\n生态支持: 使用kotlin，依然能够使用原有的spring等框架开发")]),s._v(" "),t("p",[s._v("风险点:")]),s._v(" "),t("ul",[t("li",[s._v("团队成员需要统一学习语法，避免编写出来的代码，让其他人看不懂")]),s._v(" "),t("li",[s._v("目前idea的kotlin类反编译并不是很友好。")])]),s._v(" "),t("h2",{attrs:{id:"basic-syntax"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#basic-syntax"}},[s._v("#")]),s._v(" basic syntax")]),s._v(" "),t("h3",{attrs:{id:"基础"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[s._v("#")]),s._v(" 基础")]),s._v(" "),t("ul",[t("li",[s._v("不需要 "),t("code",[s._v(";")]),s._v(" 结尾")]),s._v(" "),t("li",[s._v("和Java明显不同的一点是，kotlin中类型放在字段名后面通过"),t("code",[s._v(":")]),s._v("分隔，比如"),t("code",[s._v("val a: Int")]),s._v("，不论是定义字段还是方法中的参数")])]),s._v(" "),t("h3",{attrs:{id:"类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类"}},[s._v("#")]),s._v(" 类")]),s._v(" "),t("h4",{attrs:{id:"类定义"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类定义"}},[s._v("#")]),s._v(" 类定义")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" A "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" A "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"构造函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#构造函数"}},[s._v("#")]),s._v(" 构造函数")]),s._v(" "),t("p",[s._v("通过class 定义主要构造函数primary constructor，默认构造函数只是简单赋值不能包含方法体。\n可以通过"),t("code",[s._v("init {}")]),s._v("定义初始化代码，和Java中的"),t("code",[s._v("{}")]),s._v("构造代码块一样。")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("A")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" a"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Int"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" b"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" String"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("如果想实现业务逻辑")]),s._v(" "),t("p",[s._v("secondary constructor")]),s._v(" "),t("p",[s._v("如果除了")]),s._v(" "),t("h4",{attrs:{id:"data-class"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#data-class"}},[s._v("#")]),s._v(" data class")]),s._v(" "),t("p",[s._v("在开发中，POJO类是非常常见的类，里面包含一些字段，和它们的getter/setter方法、hashCode/equals方法、toString方法。\n虽然可以用IDE生成，但是修改代码时维护起来还是比较麻烦并且代码行数多带来阅读困难。lombok能够一定程度解决这一问题，\n不过kotlin相比lombok会更加强大灵活。")]),s._v(" "),t("p",[s._v("如下，在class前增加"),t("code",[s._v("data")]),s._v("关键字即可把一个类变成"),t("code",[s._v("data class")]),s._v("。")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("data")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Person")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" name"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" String"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" age"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Int\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h3",{attrs:{id:"builder"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#builder"}},[s._v("#")]),s._v(" builder")]),s._v(" "),t("p",[s._v("构造函数\n字段")]),s._v(" "),t("p",[s._v("集成")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" A"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("B")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"getter-setter方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getter-setter方法"}},[s._v("#")]),s._v(" getter setter方法")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("A")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" a"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Int"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" b"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" String"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("B")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"hashcode-equals方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#hashcode-equals方法"}},[s._v("#")]),s._v(" hashCode equals方法")]),s._v(" "),t("h4",{attrs:{id:"tostring方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tostring方法"}},[s._v("#")]),s._v(" toString方法")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[s._v("#")]),s._v(" 方法")]),s._v(" "),t("p",[s._v("通过"),t("code",[s._v("fun")]),s._v("声明方法，方法中的参数定义")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fun")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("funName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Int"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" String "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" b "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string-literal singleline"}},[t("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')])]),s._v("\n    b "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" b "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string-literal singleline"}},[t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"c"')])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" b\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("静态方法定义、调用\n实例方法定义、调用")]),s._v(" "),t("h4",{attrs:{id:"调用构造函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#调用构造函数"}},[s._v("#")]),s._v(" 调用构造函数")]),s._v(" "),t("p",[s._v("类名加括号，如果有参数，放到括号中，相比\njava不需要new 关键字")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" date "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Date")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"static-方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#static-方法"}},[s._v("#")]),s._v(" static 方法")]),s._v(" "),t("h3",{attrs:{id:"注解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#注解"}},[s._v("#")]),s._v(" 注解")]),s._v(" "),t("p",[s._v("使用\n类注解，和Java一样直接加到类上")]),s._v(" "),t("p",[s._v("定义")]),s._v(" "),t("h3",{attrs:{id:"枚举"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#枚举"}},[s._v("#")]),s._v(" 枚举")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("enum")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" Type "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h3",{attrs:{id:"循环、调用、赋值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#循环、调用、赋值"}},[s._v("#")]),s._v(" 循环、调用、赋值")]),s._v(" "),t("h3",{attrs:{id:"companion-object"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#companion-object"}},[s._v("#")]),s._v(" companion object")]),s._v(" "),t("p",[s._v("kotlin中没有Java的static关键字，需要使用companion object（伴随对象）机制提供Java中的static功能。")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" Person "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("companion")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("object")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" staticField"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Int "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fun")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getById")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Long"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Person "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Person")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[s._v("另外companion object中的元素不能被Java代码访问到，需要增加"),t("code",[s._v("@JvmStatic")]),s._v("注解才行")]),s._v(" "),t("div",{staticClass:"language-kotlin line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-kotlin"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" Person "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("companion")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("object")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token annotation builtin"}},[s._v("@JvmStatic")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("val")]),s._v(" staticField"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Int "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token annotation builtin"}},[s._v("@JvmStatic")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fun")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getById")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Long"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Person "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Person")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("h2",{attrs:{id:"泛型-in-out"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#泛型-in-out"}},[s._v("#")]),s._v(" 泛型 in out")]),s._v(" "),t("h2",{attrs:{id:"kotlin-spring"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kotlin-spring"}},[s._v("#")]),s._v(" kotlin spring")]),s._v(" "),t("h3",{attrs:{id:"写controller"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#写controller"}},[s._v("#")]),s._v(" 写Controller")]),s._v(" "),t("p",[s._v("Autowired bean字段")]),s._v(" "),t("p",[s._v("Autowired 构造函数")]),s._v(" "),t("h3",{attrs:{id:"写service"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#写service"}},[s._v("#")]),s._v(" 写Service")]),s._v(" "),t("h3",{attrs:{id:"写configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#写configuration"}},[s._v("#")]),s._v(" 写Configuration")]),s._v(" "),t("h2",{attrs:{id:"kotlin-单元测试"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kotlin-单元测试"}},[s._v("#")]),s._v(" kotlin 单元测试")])])}),[],!1,null,null,null);a.default=e.exports}}]);