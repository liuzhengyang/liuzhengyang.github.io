(window.webpackJsonp=window.webpackJsonp||[]).push([[260],{690:function(a,e,r){"use strict";r.r(e);var t=r(34),o=Object(t.a)({},(function(){var a=this,e=a.$createElement,r=a._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h1",{attrs:{id:"kafka-raft"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kafka-raft"}},[a._v("#")]),a._v(" kafka raft")]),a._v(" "),r("p",[a._v("新版本kafka使用内部实现的raft协议来代替zookeeper，实现配置管理、leader选举等功能。")]),a._v(" "),r("h2",{attrs:{id:"为什么要替换zookeeper"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#为什么要替换zookeeper"}},[a._v("#")]),a._v(" 为什么要替换zookeeper")]),a._v(" "),r("ol",[r("li",[a._v("简化kafka的部署和配置，使用zookeeper时，管理人员还需要掌握zookeeper的搭建、配置、维护。")]),a._v(" "),r("li",[a._v("减少外部依赖")]),a._v(" "),r("li",[a._v("提升一致性，当前kafka的broker集群中的实例的部分状态存储在zookeeper中，导致kafka无法实时判断自己的状态是否是最新的。")])]),a._v(" "),r("h2",{attrs:{id:"架构变化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#架构变化"}},[a._v("#")]),a._v(" 架构变化")]),a._v(" "),r("p",[r("img",{staticClass:"lazy",attrs:{alt:"img.png","data-src":"/assets/images/kafka/kafka-raft01.png",loading:"lazy"}})]),a._v(" "),r("p",[a._v("在旧的架构中，broker中的controller节点和zookeeper连接，然后把状态变化推送给其他broker节点。\n而在新的架构中，broker中的几个controller节点组成raft集群代替了zookeeper，其他的broker节点从controller的raft集群的leader中拉取metadata的变化。")])])}),[],!1,null,null,null);e.default=o.exports}}]);