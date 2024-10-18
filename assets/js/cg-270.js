(window.webpackJsonp=window.webpackJsonp||[]).push([[270],{699:function(a,r,t){"use strict";t.r(r);var e=t(34),s=Object(e.a)({},(function(){var a=this,r=a.$createElement,t=a._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"kafka"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kafka"}},[a._v("#")]),a._v(" kafka")]),a._v(" "),t("h2",{attrs:{id:"kafka介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kafka介绍"}},[a._v("#")]),a._v(" kafka介绍")]),a._v(" "),t("p",[a._v("kafka是一种高性能的消息队列，在平时开发过程中，消息队列常用于系统间异步通信、削峰填谷、数据同步等。")]),a._v(" "),t("ul",[t("li",[a._v("异步通信: 一些不需要同步处理的操作可以通过消息队列异步处理，比如订单支付成功给用户推送消息功能，可以在订单系统中发送一条订单支付成功的消息，负责发送订单成功的系统监听到消息后发送消息，异步通信降低了系统间的耦合，降低了订单支付流程的耗时，提升了可靠性，比如消息系统短暂故障也不影响订单支付的成功率和耗时。同时异步通信也可以实现发布订阅模型，比如订单系统发布订单支付成功消息，关心这个事件的下游可以消费这个消息，而订单系统不需要关心有哪些下游在消费，降低了耦合。")]),a._v(" "),t("li",[a._v("削峰填谷: 在一些流量比较突发的场景，比如定时秒杀、抢购等场景，经常会出现短时间非常高的流量，对于很多下游系统，如果为了支持这个流量而准备足够的资源是比较浪费的，很多系统都可以异步处理，通过kafka的异步通信将消息慢慢消费，从而实现了削峰填谷。")]),a._v(" "),t("li",[a._v("数据同步: 通过消息队列可以进行数据同步，比如日志同步、mysql同步到hive、mysql同步elasticsearch等。")])]),a._v(" "),t("h2",{attrs:{id:"kafka概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kafka概念"}},[a._v("#")]),a._v(" kafka概念")]),a._v(" "),t("h3",{attrs:{id:"消息message"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#消息message"}},[a._v("#")]),a._v(" 消息message")]),a._v(" "),t("p",[a._v("消息是消息的发送内容，比如订单的数据、用户信息变更记录等，消息在系统间的传递以及存储都是使用byte数组进行存储，所以需要对应编码、解码，常见的有json（字符串utf8编码）、protobuf等编解码方式。\n每个消息都要有一个topic，topic用户对消息进行分类，比如订单状态变化使用一个topic、用户信息变更记录使用另一个topic。")]),a._v(" "),t("h3",{attrs:{id:"消息分区partition"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#消息分区partition"}},[a._v("#")]),a._v(" 消息分区partition")]),a._v(" "),t("p",[a._v("为了让消息的生产消费存储能够横向扩展，kafka中支持给消息设置多个分区")]),a._v(" "),t("h3",{attrs:{id:"生产者producer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生产者producer"}},[a._v("#")]),a._v(" 生产者producer")]),a._v(" "),t("p",[a._v("producer是生产消息的角色，可以由多个producer实例。producer向broker发送消息，消息发送支持同步（等待发送结果）、异步（调用发送接口后不关心发送结果）。\n发送时，可以通过指定要发送的partition（默认随机选择）")]),a._v(" "),t("h3",{attrs:{id:"消费者consumer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#消费者consumer"}},[a._v("#")]),a._v(" 消费者consumer")]),a._v(" "),t("p",[a._v("consumer消费者负责消费消息，消费者消费时要指定要消费的topic。消费者同时要指定自己的consumer group，消费组，同一个消费组内的不同消费者共同分散消费消息。\n也就是一个消息只会被一个消费组中的一个消费者消费。不同消费组之间的消费没有影响。")]),a._v(" "),t("h3",{attrs:{id:"kafka服务器broker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kafka服务器broker"}},[a._v("#")]),a._v(" kafka服务器broker")]),a._v(" "),t("p",[a._v("broker是指的kafka的server，broker负责接收producer的发送消息请求，将消息按序保存到对应的topic的对应partition中，broker负责接收consumer的消费拉取消息请求。")]),a._v(" "),t("h2",{attrs:{id:"kafka使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kafka使用"}},[a._v("#")]),a._v(" kafka使用")]),a._v(" "),t("h3",{attrs:{id:"producer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#producer"}},[a._v("#")]),a._v(" Producer")]),a._v(" "),t("h3",{attrs:{id:"消费"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#消费"}},[a._v("#")]),a._v(" 消费")]),a._v(" "),t("h2",{attrs:{id:"kafka使用注意事项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kafka使用注意事项"}},[a._v("#")]),a._v(" kafka使用注意事项")]),a._v(" "),t("h3",{attrs:{id:"参考配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考配置"}},[a._v("#")]),a._v(" 参考配置")]),a._v(" "),t("h3",{attrs:{id:"消息顺序性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#消息顺序性"}},[a._v("#")]),a._v(" 消息顺序性")]),a._v(" "),t("p",[a._v("在一些业务场景下，希望消息是有序生产、消费的，比如订单状态的变化，在下游消费时希望拿到的是订单的正确顺序，而不是先拿到订单支付成功再拿到订单创建消息。\n常见的有序消费解决方案是利用partition分区的有序性保证整体链路的有序性，首先在发送消息时，按照消息的业务维度进行分区，比如订单状态变更消息按照订单id进行分区（比如hash后取模），\n这样同一个订单的消息就发到了同一个partition中，在消费时一个partition只会被一个消费者实例消费，消费时，拉取到消息后，交给一个线程数组或单线程的线程池数组消费，\n选择数组哪个index通过消息业务id比如订单id的hash对数组长度取模保证相同订单id由相同的线程顺序消费，由此保证了整体的消息生产存储消费的顺序性。")]),a._v(" "),t("h3",{attrs:{id:"消息可靠性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#消息可靠性"}},[a._v("#")]),a._v(" 消息可靠性")]),a._v(" "),t("p",[a._v("消息可靠性是指发送的消息数据是否会丢失，在kafka中有如下可靠性的保证方案")]),a._v(" "),t("ol",[t("li",[a._v("每个partition都有一个leader节点（broker机器）和若干个follower(broker机器)，成为replica，producer发送给leader后，leader写入本地后，会同步给replica")]),a._v(" "),t("li",[a._v("通过producer发送数据时，可以通过acks来配置producer成功返回的时机。分别是0: producer加入本地的buffer队列后，不等待leader写入就返回；1: leader写入本地成功后不等follower成功就返回；all: leader等待所有的in-sync replica（后面文章会讲到）才返回。对可靠性要求非常高，在调用Producer发送接口时，可以选择等待Future返回获取发送结果。")]),a._v(" "),t("li",[a._v("消费时，默认情况下consumer会自动提交拉取到的批量消息记录，可以调整enable.auto.commit参数，改成手动提交，避免出现异常或宕机导致消息没有消费但是已经提交commit的问题")])]),a._v(" "),t("p",[a._v("数据可靠性会降低一部分性能，要根据具体的业务场景进行分析取舍。如果需要使用分布式事务保证系统间一致性，可以考虑RocketMQ的分布式事务功能，一般来说kafka更适合高吞吐，可靠性不是非常严格要求的场景。")]),a._v(" "),t("p",[a._v("acks在代码中是如何实现的？")])])}),[],!1,null,null,null);r.default=s.exports}}]);