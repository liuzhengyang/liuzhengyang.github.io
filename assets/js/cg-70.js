(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{501:function(e,s,n){"use strict";n.r(s);var a=n(34),l=Object(a.a)({},(function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"内存逐出淘汰机制"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#内存逐出淘汰机制"}},[e._v("#")]),e._v(" 内存逐出淘汰机制")]),e._v(" "),n("h2",{attrs:{id:"淘汰策略"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#淘汰策略"}},[e._v("#")]),e._v(" 淘汰策略")]),e._v(" "),n("p",[e._v("为了避免内存不断增加超过系统上限，redis提供了maxmemory参数控制redis的最大内存量。\n当超过内存量时，redis提供了几种处理策略")]),e._v(" "),n("ul",[n("li",[e._v("noeviction 不会继续处理写请求但是会继续响应读请求，能够保证不丢数据，但是新的写请求无法处理。这是默认策略")]),e._v(" "),n("li",[e._v("volatile-lru 会使用lru的策略尝试清除设置了过期时间的key。LRU优先清除最近没有使用的key。")]),e._v(" "),n("li",[e._v("volatile-lfu 会使用lfu的策略尝试清除设置了过期时间的key。LRU优先清除最近使用使用次数少的key。")]),e._v(" "),n("li",[e._v("volatile-ttl 淘汰设置了过期时间的key，优先淘汰ttl比较小的key。")]),e._v(" "),n("li",[e._v("volatile-random 随机淘汰设置了过期时间的key")]),e._v(" "),n("li",[e._v("allkeys-lru 淘汰全部的key，按照lru策略")]),e._v(" "),n("li",[e._v("allkeys-lfu 淘汰全部的key，按照lfu策略")]),e._v(" "),n("li",[e._v("allkeys-random 淘汰全部的key，随机选择")])]),e._v(" "),n("h2",{attrs:{id:"redis-lru实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#redis-lru实现"}},[e._v("#")]),e._v(" redis LRU实现")]),e._v(" "),n("p",[e._v("LRU是Least Recently Used的缩写。\n一种常见的LRU实现是通过双向链表加Map实现，在redis中并没有使用这种方式因为这样会占用比较多的额外内存。\nredis使用的是一种近似LRU实现。\nredis为每个key中保存了一个24bit的数据，记录的是最近访问的时间戳。\n当发现内存超过maxmemory时，redis会随机采样出5个key，根据最近访问时间戳淘汰掉最旧的key。\n如果淘汰后还是超过maxmemory，则继续采样淘汰直到内存小于maxmemory。")]),e._v(" "),n("div",{staticClass:"language-text line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("typedef struct redisObject {\n    unsigned type:4;\n    unsigned encoding:4;\n    unsigned lru:LRU_BITS; /* LRU time (relative to global lru_clock) or\n                            * LFU data (least significant 8 bits frequency\n                            * and most significant 16 bits access time). */\n    int refcount;\n    void *ptr;\n} robj;\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br")])]),n("p",[e._v("lru字段更新时间")]),e._v(" "),n("div",{staticClass:"language-text line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("int objectSetLRUOrLFU(robj *val, long long lfu_freq, long long lru_idle,\n                       long long lru_clock, int lru_multiplier) {\n    if (server.maxmemory_policy &amp; MAXMEMORY_FLAG_LFU) {\n        if (lfu_freq >= 0) {\n            serverAssert(lfu_freq &lt;= 255);\n            val->lru = (LFUGetTimeInMinutes()&lt;&lt;8) | lfu_freq;\n            return 1;\n        }\n    } else if (lru_idle >= 0) {\n        /* Provided LRU idle time is in seconds. Scale\n         * according to the LRU clock resolution this Redis\n         * instance was compiled with (normally 1000 ms, so the\n         * below statement will expand to lru_idle*1000/1000. */\n        lru_idle = lru_idle*lru_multiplier/LRU_CLOCK_RESOLUTION;\n        long lru_abs = lru_clock - lru_idle; /* Absolute access time. */\n        /* If the LRU field underflows (since lru_clock is a wrapping clock),\n         * we need to make it positive again. This be handled by the unwrapping\n         * code in estimateObjectIdleTime. I.e. imagine a day when lru_clock\n         * wrap arounds (happens once in some 6 months), and becomes a low\n         * value, like 10, an lru_idle of 1000 should be near LRU_CLOCK_MAX. */\n        if (lru_abs &lt; 0)\n            lru_abs += LRU_CLOCK_MAX;\n        val->lru = lru_abs;\n        return 1;\n    }\n    return 0;\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br")])]),n("h2",{attrs:{id:"lfu"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#lfu"}},[e._v("#")]),e._v(" LFU")]),e._v(" "),n("p",[e._v("redis4.0之后提供了LFU的策略，LFU是Least Frequently Used的缩写，也就是访问次数多的key有更大概率留在内存中。")]),e._v(" "),n("h2",{attrs:{id:"更多参考"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#更多参考"}},[e._v("#")]),e._v(" 更多参考")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://redis.io/docs/reference/eviction/",target:"_blank",rel:"noopener noreferrer"}},[e._v("redis官网对于eviction的介绍"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=l.exports}}]);