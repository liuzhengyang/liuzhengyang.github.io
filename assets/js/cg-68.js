(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{499:function(t,e,s){"use strict";s.r(e);var a=s(34),v=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"字符串使用和内部原理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#字符串使用和内部原理"}},[t._v("#")]),t._v(" 字符串使用和内部原理")]),t._v(" "),s("h2",{attrs:{id:"使用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用场景"}},[t._v("#")]),t._v(" 使用场景")]),t._v(" "),s("p",[t._v("redis中的字符串常用于存储key value数据或计数数据。")]),t._v(" "),s("h3",{attrs:{id:"key-value字符串存储"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#key-value字符串存储"}},[t._v("#")]),t._v(" key value字符串存储")]),t._v(" "),s("p",[t._v("在平时的需求中存在大量的存储key value数据的场景，比如存储一个用户的用户名，我们把用户id作为key，用户名字符串作为value值；\n如果是复杂的对象，则可以通过json等方式序列化成字符串存储，比如一篇文章的文章标题、内容、创建时间等信息作为一个对象序列化成json存储。")]),t._v(" "),s("p",[t._v("常用命令")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("命令")]),t._v(" "),s("th",[t._v("命令说明")]),t._v(" "),s("th",[t._v("时间复杂度")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("get key")]),t._v(" "),s("td",[t._v("获取可以对应的value值，如果没有返回null")]),t._v(" "),s("td",[t._v("O(1)")])]),t._v(" "),s("tr",[s("td",[t._v("set key value [过期时间/KEEPTTL] [NX/XX] [GET]")]),t._v(" "),s("td",[t._v("设置key对应的value值, 可以传入过期时间，过期时间可以是相对时间或绝对时间。如果没有传过期时间，则set方法会覆盖实现的过期时间设置即把key变成不过期的，可以传入KEEPTTL避免保存之前的过期时间，如果传入NX标记，则只有当对应的key不存在的时候才会设置值。如果传入XX标记，则只有在key存在的时候才会设置值。如果set操作成功，返回OK字符串，否则返回空(比如因为NX或XX导致没有设置值)。如果传入GET，则会返回key对应的旧的值。")]),t._v(" "),s("td",[t._v("O(1)")])]),t._v(" "),s("tr",[s("td",[t._v("mget")]),t._v(" "),s("td",[t._v("批量获取一批key的value")]),t._v(" "),s("td",[t._v("O(N) N是key的数量")])]),t._v(" "),s("tr",[s("td",[t._v("mset")]),t._v(" "),s("td",[t._v("批量设置一批key的value")]),t._v(" "),s("td",[t._v("O(N) N是key的数量")])]),t._v(" "),s("tr",[s("td",[t._v("setnx")]),t._v(" "),s("td",[t._v("相当于前面的set key value NX的简化版本，区别是setnx操作成功返回1否则返回0")]),t._v(" "),s("td",[t._v("O(1)")])])])]),t._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),t._v(".0.1:637"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("9")]),t._v(">")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" hello world\nOK\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(".37s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),t._v(".0.1:637"),s("span",{pre:!0,attrs:{class:"token operator"}},[s("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[t._v("9")]),t._v(">")]),t._v(" get hello\n"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"world"')]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("h4",{attrs:{id:"实现分布式锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现分布式锁"}},[t._v("#")]),t._v(" 实现分布式锁")]),t._v(" "),s("p",[t._v("通过redis可以快速实现一个简单的分布式锁。给要锁的资源生成key（比如userId对应userId的字符串），然后再生成一个随机字符串做为value。\n然后尝试通过set带有nx标记以及过期时间写入key value值，过期时间目的是为了防止宕机等异常导致锁一直不释放。\n如果成功，说明获取到了这个分布式锁，然后在锁内执行业务逻辑，执行完成后（finally模块中)，删除对应的key value（删除之前需要再get获取判断\nvalue值是否还是前面生成的随机数，防止持有锁超时后误删其他客户端的加锁，这个操作分为了两步所以尽量放到一个lua script保证原子删除）。")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://redis.io/docs/reference/patterns/distributed-locks/",target:"_blank",rel:"noopener noreferrer"}},[t._v("distributed-locks"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"计数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计数"}},[t._v("#")]),t._v(" 计数")]),t._v(" "),s("p",[t._v("字符串类型也可以作为数值来存储(可以存储整数或浮点数），由于redis使用单线程处理用户请求，有原子操作保证并发使用线程安全，可以类比成Java里的AtomicLong。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("命令")]),t._v(" "),s("th",[t._v("命令说明")]),t._v(" "),s("th",[t._v("时间复杂度")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("incr key")]),t._v(" "),s("td",[t._v("给指定的key的值加1，如果对应的key不存在，则会先初始化为0再加一")]),t._v(" "),s("td",[t._v("O(1)")])]),t._v(" "),s("tr",[s("td",[t._v("decr key")]),t._v(" "),s("td",[t._v("给指定的key的值减1，如果对应的key不存在，则会先初始化为0再减一")]),t._v(" "),s("td",[t._v("O(1)")])]),t._v(" "),s("tr",[s("td",[t._v("incrby key")]),t._v(" "),s("td",[t._v("给指定的key增加指定的值，如果对应的key不存在，则会先初始化为0再加")]),t._v(" "),s("td",[t._v("O(1)")])]),t._v(" "),s("tr",[s("td",[t._v("decrby key")]),t._v(" "),s("td",[t._v("给指定的key减去指定的值，如果对应的key不存在，则会先初始化为0再减")]),t._v(" "),s("td",[t._v("O(1)")])])])]),t._v(" "),s("p",[t._v("通过计数功能能够实现非常多的计数场景需求，比如评论数、粉丝数等等。除此之外分布式的计数器还有很多业务架构上的应用场景比如实现分布式限流等。")]),t._v(" "),s("h4",{attrs:{id:"实现分布式计数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现分布式计数"}},[t._v("#")]),t._v(" 实现分布式计数")]),t._v(" "),s("p",[t._v("实现分布式计数的注意事项")]),t._v(" "),s("p",[t._v("在实现分布式计数时，我们需要分析使用场景，评估请求量、请求数据热点情况、读写请求比例、是否对计数一致性要求高，来做出更合适的取舍。")]),t._v(" "),s("p",[t._v("比如有的场景对计数数据一致性要求不高，比如展示某个活动的参数人数，我们可以在读取计数时增加本地缓存配合本地缓存过期时间/刷新时间，减少\nredis的请求压力；如果写入量比较大，则对写入请求在本地进行聚合（类似kafka的内存buffer)，每隔一定时间异步写入redis；\n如果对一致性要求比较高，比如使用redis存储一件商品的库存数量，则在扣减库存时，可以先读取本地缓存判断有库存后，再调用decr尝试扣减库存，decr结果>=0\n说明扣减成功否则失败。")]),t._v(" "),s("p",[t._v("更多的redis使用技巧可以参考高并发应用缓存设计与实现这篇文章。")]),t._v(" "),s("h4",{attrs:{id:"实现分布式限流、分布式计数限制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现分布式限流、分布式计数限制"}},[t._v("#")]),t._v(" 实现分布式限流、分布式计数限制")]),t._v(" "),s("p",[t._v("在系统稳定性保护中，限流是一个重要的功能，然而现有的大部分限流都是进程内的限流，比如各种ratelimiter。\n加入我们现在的服务会调用数据库，数据库能够支持1w qps的写流量，那么我们需要限制全局的写入qps小于1w，这就需要实现分布式限流。\n通过redis的计数即可实现，我们分析可知这个限流限制不需要保证严格的一致性，所以可以使用缓存、buffer等策略降低redis的调用量。\n比如我们把每一秒作为一个key来统计调用次数，本地缓存每100ms从redis中读取当前秒调用次数到本地，本地的调用量也按照每100ms一次聚合写入到redis\n中，如果调用次数超过阈值，说明超限不能继续请求抛出异常。")]),t._v(" "),s("p",[t._v("上述的间隔、key表示的时间范围都可以按照实际情况进行调整。")]),t._v(" "),s("p",[t._v("另外在业务需求中，还有一类比较常见的计数限制，比如限制一个用户一天只能发表N个文章，则我们可以把用户和日期作为key，用户发表文章调用incr判断是否超过N\n如果没有超过继续执行否则返回超过阈值异常。如果要考虑异常情况比如发表过程中因为某种原因失败了，我们还可以通过decr回退计数。")]),t._v(" "),s("h2",{attrs:{id:"字符串实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#字符串实现"}},[t._v("#")]),t._v(" 字符串实现")]),t._v(" "),s("h3",{attrs:{id:"编码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#编码"}},[t._v("#")]),t._v(" 编码")]),t._v(" "),s("p",[t._v("编码选择")]),t._v(" "),s("p",[t._v("int类型: 如果在LONG_MIN和LONG_MAX之间，使用OBJ_ENCODING_INT编码。否则使用OBJ_ENCODING_RAW编码(long转换成字符串表示)。\nstring类型: 长度小于44字符时，使用OBJ_ENCODING_EMBSTR编码，长度大于等于55字符时使用OBJ_ENCODING_RAW编码")]),t._v(" "),s("p",[t._v("OBJ_ENCODING_EMBSTR和OBJ_ENCODING_RAW有什么区别？")]),t._v(" "),s("h3",{attrs:{id:"空间预分配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#空间预分配"}},[t._v("#")]),t._v(" 空间预分配")]),t._v(" "),s("p",[t._v("当字符串长度增加后，redis会增加对应字符串的空间，同时为了避免拼接字符串命令时频繁申请新的空间的开销，redis会通过预分配的策略提前多预留一些空间。\n预留需要和内存占用进行取舍。")]),t._v(" "),s("p",[t._v("预分配的优化思想在计算机中非常常用，比如Java中ArrayList、HashMap等扩容时会进行进行充分的扩容而不是只增加到需要的大小。")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")])])}),[],!1,null,null,null);e.default=v.exports}}]);