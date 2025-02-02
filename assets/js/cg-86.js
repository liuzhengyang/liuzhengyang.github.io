(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{517:function(t,r,e){"use strict";e.r(r);var a=e(34),_=Object(a.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"ddd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ddd"}},[t._v("#")]),t._v(" DDD")]),t._v(" "),e("h2",{attrs:{id:"问题、背景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#问题、背景"}},[t._v("#")]),t._v(" 问题、背景")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("微服务怎么拆分和设计才算合理，拆分多小才叫微服务？")])]),t._v(" "),e("li",[e("p",[t._v("DDD、微服务和中台之间的关系")])]),t._v(" "),e("li",[e("p",[t._v("通过战略设计，建立领域模型，划分微服务边界。")])]),t._v(" "),e("li",[e("p",[t._v("通过战术设计，从领域模型转向微服务设计和落地，形成边界清晰、可持续严谨的微服务架构。")])]),t._v(" "),e("li",[e("p",[t._v("DDD10大核心概念")])]),t._v(" "),e("li",[e("p",[t._v("DDD分层架构，微服务分层和代码模型设计")])]),t._v(" "),e("li",[e("p",[t._v("DDD战略设计和事件风暴完成领域建模和企业级中台业务建模")])]),t._v(" "),e("li",[e("p",[t._v("微服务架构设计原则和注意事项")])])]),t._v(" "),e("h2",{attrs:{id:"领域驱动设计为什么要选择ddd"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#领域驱动设计为什么要选择ddd"}},[t._v("#")]),t._v(" 领域驱动设计为什么要选择DDD？")]),t._v(" "),e("p",[t._v("三步来划定领域模型和微服务的边界")]),t._v(" "),e("ul",[e("li",[t._v("在事件风暴中梳理业务过程中的用户操作、事件以及外部依赖关系等，根据这些要素梳理出领域实体等领域对象")]),t._v(" "),e("li",[t._v("根据领域实体之间的业务关联性，将业务紧密相关的实体进行组合形成聚合，同时确定聚合中的聚合根、值对象、和实体。")]),t._v(" "),e("li",[t._v("根据业务及语义边界等因素，将一个或多个聚合划定在一个限界上下文内，形成领域模型。")])]),t._v(" "),e("p",[t._v("DDD架构设计方法，微服务架构设计风格。\n从业务视角分离应用系统建设复杂度的手段。")]),t._v(" "),e("p",[t._v("DDD主要关注：从业务领域视角划分领域边界，构建领域语义进行高效沟通，通过业务抽象，建立领域模型，维持业务和代码的逻辑一致性。")]),t._v(" "),e("h2",{attrs:{id:"领域、子域、核心域、通用域、支撑域"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#领域、子域、核心域、通用域、支撑域"}},[t._v("#")]),t._v(" 领域、子域、核心域、通用域、支撑域")]),t._v(" "),e("p",[t._v("领域：从事一种专门活动或事业的范围、领域具体指特定的范围。业务范围。领域用来确定范围、范围即边界。")]),t._v(" "),e("p",[t._v("限界上下文：描述领域边界和环境。\n通用语言：统一语言。")]),t._v(" "),e("h2",{attrs:{id:"实体"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实体"}},[t._v("#")]),t._v(" 实体")]),t._v(" "),e("p",[t._v("战略设计时，实体（Entity）是领域模型的一个重要对象。\n领域模型中的实体是多个属性、操作和行为的载体。在事件风暴中，我们可以根据命令、操作或者时间，找出产生这些行为的业务实体对象，\n进而按照一定的业务规则将依存度高和业务关联紧密的多个实体对象和值对象进行聚类，形成聚合。")]),t._v(" "),e("p",[t._v("实体的代码形态")]),t._v(" "),e("p",[t._v("在代码模型中，实体的表现形式是实体类，这个类包含了实体的属性和方法，通过这些方法实现自身的业务逻辑。\n在DDD里，这些实体类通常采用充血模型，与这个实体相关的所有业务逻辑都在实体类的方法中实现，跨多个实体的领域逻辑则在领域\n服务中实现。")]),t._v(" "),e("p",[t._v("实体的运行形态，实体以DO（领域对象）的形式存在，每个实体对象都有唯一的ID。我们可以对一个实体对象进行多次修改。")]),t._v(" "),e("h2",{attrs:{id:"聚合"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#聚合"}},[t._v("#")]),t._v(" 聚合")]),t._v(" "),e("h2",{attrs:{id:"领域事件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#领域事件"}},[t._v("#")]),t._v(" 领域事件")]),t._v(" "),e("h2",{attrs:{id:"参考"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://tech.meituan.com/2017/12/22/ddd-in-practice.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("领域驱动设计在互联网业务开发中的实践"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://modelbaba.com/architecture/ddd/2100.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("一文看懂DDD领域驱动设计"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"http://docs.eventstorming.net.cn/docs/node/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ddd相关链接"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://mp.weixin.qq.com/s/bNjoMOo6c1fkn-PdmWbhKQ",target:"_blank",rel:"noopener noreferrer"}},[t._v("DDD领域驱动设计理论｜得物技术"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://mp.weixin.qq.com/s/_FKXKC-M22FyCv9K7slISg",target:"_blank",rel:"noopener noreferrer"}},[t._v("阿里DDD大佬：从0到1，带大家精通DDD"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);r.default=_.exports}}]);