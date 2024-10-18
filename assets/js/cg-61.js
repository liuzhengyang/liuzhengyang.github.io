(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{492:function(a,e,s){"use strict";s.r(e);var t=s(34),r=Object(t.a)({},(function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"redis源码本地调试-md"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redis源码本地调试-md"}},[a._v("#")]),a._v(" redis源码本地调试.md")]),a._v(" "),s("p",[a._v("通过断点调试redis代码，能够让我们深入了解redis的内部执行流程。")]),a._v(" "),s("h2",{attrs:{id:"下载redis代码、构建、测试"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#下载redis代码、构建、测试"}},[a._v("#")]),a._v(" 下载redis代码、构建、测试")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" clone git@github.com:redis/redis.git\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" redis\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("make")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("p",[a._v("make构建好后，就可以启动redis-server并用redis-cli链接调用了。")]),a._v(" "),s("p",[a._v("启动redis-server")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("./src/redis-server\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("启动redis-cli")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("./src/redis-cli\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("然后就可以通过命令行调用测试redis。")]),a._v(" "),s("h2",{attrs:{id:"用ide打开代码、debug调试"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用ide打开代码、debug调试"}},[a._v("#")]),a._v(" 用IDE打开代码、debug调试")]),a._v(" "),s("p",[a._v("我们使用Jetbrains提供的"),s("a",{attrs:{href:"https://www.jetbrains.com/clion/download",target:"_blank",rel:"noopener noreferrer"}},[a._v("Clion"),s("OutboundLink")],1),a._v("，点击菜单栏的File -> Open，选择redis项目的目录打开。")]),a._v(" "),s("p",[a._v("打开项目后，点击Add Configuration, 添加一个Makefile Application")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 1","data-src":"/assets/images/redis/76d255b41f7c5bf2a6aaafdf5ba3d0592b9fa097c53cb05a59dc7afaefebcf2e.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("Configuration配置里name随便填写，比如make redis。然后点击Target后边的按钮添加Custom Build Target")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 2","data-src":"/assets/images/redis/c16658e817596e1bb88c5dfc591ff2505808a9447865946e5ba75d6eed6bba51.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("点击Add target，名字填make redis，点击Build右边的三个点的按钮。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 3","data-src":"/assets/images/redis/45fe88f455ac3cb333f6ef1120caf5f099e3a11ced0d6d451f117ad33f3952a6.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("添加一个make redis的External Tools, Program填make, working directory选择redis的项目目录")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 4","data-src":"/assets/images/redis/c440b271be6660740cd52df708e3c6b8d7d3eb6b9eeec1e551c64dd6a90cc521.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("然后依次点击Apply,OK保存。\nConfiguration中配置按Target后，Executable选择src/redis-server，点击Apply, OK保存。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 7","data-src":"/assets/images/redis/3e21e85fb0278845ff46a3ebf0163533f36d5e341196a47e9defa17075d9c6a3.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("菜单栏会出现我们添加的make redis，点击debug按钮")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 6","data-src":"/assets/images/redis/0ed4e6a97d37c5e6faaba4e20a51e64ebad2b21e314fc9a2ea1ac23c45455d3d.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("就可以成功构建并启动redis server了，不过要注意要提前停止之前在命令行启动的redis-server避免端口冲突。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 8","data-src":"/assets/images/redis/5b69d6443bb89941174ec0bd0402492c6ecf1f799f42fcfdf5b518c43fef6fc0.png",loading:"lazy"}})]),a._v(" "),s("p",[a._v("在代码dict.c文件中dictFind方法左侧加上一个断点，用redis-cli发送一个get hello的命令，就可以看到redis停在这个断点上。\n有了debug功能，我们就可以单步调试、查看变量、查看调用栈，了解redis细节不再是难事。")]),a._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"picture 9","data-src":"/assets/images/redis/dc825aef68abbed7fec0e36e8688d055280c117c25c15e7ca5cb5a99b15e1df5.png",loading:"lazy"}})])])}),[],!1,null,null,null);e.default=r.exports}}]);