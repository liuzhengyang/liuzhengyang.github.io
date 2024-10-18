(window.webpackJsonp=window.webpackJsonp||[]).push([[217],{648:function(e,s,a){"use strict";a.r(s);var n=a(34),t=Object(n.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"string-deduplication"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string-deduplication"}},[e._v("#")]),e._v(" String Deduplication")]),e._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[e._v("#")]),e._v(" 介绍")]),e._v(" "),a("p",[e._v("string deduplication即字符串去重是JDK在1.8开始提供的功能，目的是减少相同内容字符串的内存占用，相同内容是指equals为true的两个字符串。\n目前只有在使用G1收集器的情况下才能开启，默认不开启，开启方法为增加 "),a("code",[e._v("-XX:+UseStringDeduplication")]),e._v("启动参数。")]),e._v(" "),a("h2",{attrs:{id:"实现机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现机制"}},[e._v("#")]),e._v(" 实现机制")]),e._v(" "),a("p",[e._v("java.lang.String字符串对象的数据保存在内部的byte[] value即一个名为value的byte数组中")]),e._v(" "),a("div",{staticClass:"language-java line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("final")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("class")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("String")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("private")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("final")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("byte")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("p",[e._v("在一次gc之后，回收的heap区域中的活对象(live objects)都会被访问一遍，对于每个string对象，\n我们都会查看是否能够进行deduplication。\n判断规则是根据对象的age，大于一定年龄才进行deduplication，因为如果string对象是一个临时对象，\n进行deduplication没有太大价值。")]),e._v(" "),a("p",[e._v("如果确认一个字符串对象可以进行deduplication，则会把对象引用插入到一个队列中。")]),e._v(" "),a("p",[e._v("会有一个deduplication线程来处理这个队列，从队列中取出字符串对象，然后判断尝试对字符串中的byte数组进行去重。")]),e._v(" "),a("p",[e._v("内部有一个hashtable来追踪string对象的byte数组。")]),e._v(" "),a("p",[e._v("在去重的时候，会到hashtable中查找是否有相同的byte数组，如果有，会把后面的字符串的byte数组换成已有的相同的byte数组并释放掉自己原有的byte数组\n引用好让这块内存能够通过GC释放。如果在hashtable中没有找到相同的byte数组，则会把byte数组写入到hashtable中，hashtable对于byte数组的引用是弱引用\n避免内存泄露。")]),e._v(" "),a("h3",{attrs:{id:"deduplicate对象的选择条件。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deduplicate对象的选择条件。"}},[e._v("#")]),e._v(" deduplicate对象的选择条件。")]),e._v(" "),a("p",[e._v("对于young gc和mixed gc，判断一个对象是否要进行deduplicate的条件是")]),e._v(" "),a("ol",[a("li",[e._v("开启了-XX:+UseStringDeduplication")]),e._v(" "),a("li",[e._v("对象类型是String类型，判断对象的klass和_string_klass_or_null相同，如果没有开启-XX:+UseStringDeduplication，_string_klass_or_null是null所以这样都不会进行deduplicate")]),e._v(" "),a("li",[e._v("从young gen复制过来的对象")]),e._v(" "),a("li",[e._v("如果是复制到young gen(survivor)，则对象年龄即age需要等于-XX:StringDeduplicationAgeThreshold=3的配置值，默认是3；如果是复制到old gen（晋升的情况），则age需要小于StringDeduplicationAgeThreshold")])]),e._v(" "),a("p",[e._v("最后的判断条件是什么目的呢？")]),e._v(" "),a("p",[e._v("如果对象晋升到old gen，则需要进行一次deduplicate，因为再不deduplicate就只能等待full gc时进行deduplicate了(mixed gc的时候即使选择了old gen的region也不会进行deduplicate)。\n判断age小于StringDeduplicationAgeThreshold是避免重复deduplicate，因为晋升到old gen的时候age不变，如果age已经大于等于StringDeduplicationAgeThreshold时了\n说明之前已经进行过deduplicate了。")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Candidate selection policy for young/mixed GC.\n// If to is young then age should be the new (survivor's) age.\n// if to is old then age should be the age of the copied from object.\nstatic bool is_candidate_from_evacuation(const Klass* klass,\n                                       G1HeapRegionAttr from,\n                                       G1HeapRegionAttr to,\n                                       uint age) {\nreturn StringDedup::is_enabled_string(klass) &amp;&amp;\n       from.is_young() &amp;&amp;\n       (to.is_young() ?\n        StringDedup::is_threshold_age(age) :\n        StringDedup::is_below_threshold_age(age));\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br")])]),a("p",[e._v("对于FullGC的情况，则判断开启了-XX:+UseStringDeduplication、对象是String类型并且在young gen中并且age小于StringDeduplicationAgeThreshold。")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("if (StringDedup::is_enabled() &amp;&amp;\n  java_lang_String::is_instance_inlined(obj) &amp;&amp;\n  G1StringDedup::is_candidate_from_mark(obj)) {\n  _string_dedup_requests.add(obj);\n}\nbool G1StringDedup::is_candidate_from_mark(oop java_string) {\n  // Candidate if string is being evacuated from young to old but has not\n  // reached the deduplication age threshold, i.e. has not previously been a\n  // candidate during its life in the young generation.\n  return G1CollectedHeap::heap()->heap_region_containing(java_string)->is_young() &amp;&amp;\n         StringDedup::is_below_threshold_age(java_string->age());\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br")])]),a("h3",{attrs:{id:"deduplication-queue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deduplication-queue"}},[e._v("#")]),e._v(" deduplication queue")]),e._v(" "),a("p",[e._v("deduplication queue是GC线程和Deduplication线程之间通信的通道，GC线程\n在gc时，把可以deduplicate的String对象，放到队列中，Deduplicate线程\n不断从队列中获取待deduplicate的对象。\n每个GC线程都有自己的Requests对象，来减少线程间的冲突。")]),e._v(" "),a("p",[e._v("入队相关代码")]),e._v(" "),a("p",[e._v("在G1ParScanThreadState::do_copy_to_survivor_space方法中")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// Check for deduplicating young Strings.\nif (G1StringDedup::is_candidate_from_evacuation(klass,\n                                                region_attr,\n                                                dest_attr,\n                                                age)) {\n  // Record old; request adds a new weak reference, which reference\n  // processing expects to refer to a from-space object.\n  _string_dedup_requests.add(old);\n}\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br")])]),a("h3",{attrs:{id:"deduplication-thread"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deduplication-thread"}},[e._v("#")]),e._v(" Deduplication Thread")]),e._v(" "),a("p",[e._v("deduplication线程是一个jvm内部的线程，和Java应用属于并发执行关系，\n通过jstack可以看到这个名为StringDedupProcessor的线程。")]),e._v(" "),a("p",[e._v("do_oop方法判断字符串是否为null、进行尝试去重、hashtable扩容、hashtable清理。")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("virtual void do_oop(oop* ref) {\n    if (_processor->yield_or_continue(_joiner, Stat::Phase::process)) {\n      oop java_string = NativeAccess&lt;ON_PHANTOM_OOP_REF>::oop_load(ref);\n      release_ref(ref);\n      // Dedup java_string, after checking for various reasons to skip it.\n      if (java_string == nullptr) {\n        // String became unreachable before we got a chance to process it.\n        _cur_stat.inc_skipped_dead();\n      } else if (java_lang_String::value(java_string) == nullptr) {\n        // Request during String construction, before its value array has\n        // been initialized.\n        _cur_stat.inc_skipped_incomplete();\n      } else {\n        Table::deduplicate(java_string);\n        if (Table::is_grow_needed()) {\n          _cur_stat.report_process_pause();\n          _processor->cleanup_table(_joiner, true /* grow_only */, false /* force */);\n          _cur_stat.report_process_resume();\n        }\n      }\n    }\n  }\n};\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br")])]),a("p",[e._v("去重的具体处理，在hashtable中查找和当前字符串的value(byte数组)内容相同的byte array，\n如果找到，并且不是同一个数组对象，则对当前的字符串替换value引用。\n如果没找到，则将当前的value插入到hashtable中。")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('void StringDedup::Table::deduplicate(oop java_string) {\n  assert(java_lang_String::is_instance(java_string), "precondition");\n  _cur_stat.inc_inspected();\n  if ((StringTable::shared_entry_count() > 0) &amp;&amp;\n      try_deduplicate_shared(java_string)) {\n    return;                     // Done if deduplicated against shared StringTable.\n  }\n  typeArrayOop value = java_lang_String::value(java_string);\n  uint hash_code = compute_hash(value);\n  TableValue tv = find(value, hash_code);\n  if (tv.is_empty()) {\n    // Not in table.  Create a new table entry.\n    install(value, hash_code);\n  } else {\n    _cur_stat.inc_known();\n    typeArrayOop found = cast_from_oop&lt;typeArrayOop>(tv.resolve());\n    assert(found != nullptr, "invariant");\n    // Deduplicate if value array differs from what\'s in the table.\n    if (found != value) {\n      if (deduplicate_if_permitted(java_string, found)) {\n        _cur_stat.inc_deduped(found->size() * HeapWordSize);\n      } else {\n        // If string marked deduplication_forbidden then we can\'t update its\n        // value.  Instead, replace the array in the table with the new one,\n        // as java_string is probably in the StringTable.  That makes it a\n        // good target for future deduplications as it is probably intended\n        // to live for some time.\n        tv.replace(value);\n        _cur_stat.inc_replaced();\n      }\n    }\n  }\n}\n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br"),a("span",{staticClass:"line-number"},[e._v("25")]),a("br"),a("span",{staticClass:"line-number"},[e._v("26")]),a("br"),a("span",{staticClass:"line-number"},[e._v("27")]),a("br"),a("span",{staticClass:"line-number"},[e._v("28")]),a("br"),a("span",{staticClass:"line-number"},[e._v("29")]),a("br"),a("span",{staticClass:"line-number"},[e._v("30")]),a("br"),a("span",{staticClass:"line-number"},[e._v("31")]),a("br"),a("span",{staticClass:"line-number"},[e._v("32")]),a("br"),a("span",{staticClass:"line-number"},[e._v("33")]),a("br")])]),a("h3",{attrs:{id:"deduplication-hashtable"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deduplication-hashtable"}},[e._v("#")]),e._v(" deduplication hashtable")]),e._v(" "),a("p",[e._v("deduplication hashtable需要记录所有请求去重的字符串的byte array数据，\n并且在没有引用之后清理。\nhashtable和Java里的HashMap类似，也是Bucket数组组成，每个Bucket是一个逻辑上的链表，\n实际上是用动态长度的数组来代替链表节省空间（next指针等）")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("class StringDedup::Table : AllStatic {\nprivate:\n  class Bucket;\n  class CleanupState;\n  class Resizer;\n  class Cleaner;\n  enum class DeadState;\n\n  // Values in the table are weak references to jbyte[] Java objects.  The\n  // String's coder isn't recorded, even though it affects how String access\n  // would interpret that array.  For the purposes of deduplication we don't\n  // care about that distinction; two Strings with equivalent arrays but\n  // different coders can be deduplicated to share a single array.  We also\n  // can't depend on the coder value being correct here, since GC requests\n  // can provide the deduplication thread with access to a String that is\n  // incompletely constructed; the value could be set before the coder.\n  using TableValue = WeakHandle;  // 弱引用\n\n  // Weak storage for the string data in the table.\n  static OopStorage* _table_storage;\n  static Bucket* _buckets;\n  static size_t _number_of_buckets;\n  static size_t _number_of_entries;\n  static size_t _grow_threshold;\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br")])]),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("class StringDedup::Table::Bucket {\n  GrowableArrayCHeap&lt;uint, mtStringDedup> _hashes;\n  GrowableArrayCHeap&lt;TableValue, mtStringDedup> _values;\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("p",[e._v("在hashtable中元素超过threshold时，也会像HashMap一样扩容，数量变少时（清理没有引用的数据），也会进行缩容（shrink)")]),e._v(" "),a("h3",{attrs:{id:"string-deduplication-log分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string-deduplication-log分析"}},[e._v("#")]),e._v(" string deduplication log分析")]),e._v(" "),a("p",[e._v("对于JDK17，通过增加-XX:stringdedup*=debug\n对于JDK11，通过增加-XX:gc+stringdedup=debug\n可以打开string deduplication的详细日志。")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[15.950s][info ][stringdedup             ] Concurrent String Deduplication 1032/41424.0B (new), 168/5208.0B (deduped), avg 12.5%, 17.502ms of 24.439ms\n\n1032/41424.0B (new)表示向hashtable中新增了1032个byte数组，总体大小41424.0B\n\n168/5208.0B (deduped)表示本次对168个字符串的byte数组进行了去重，总体大小5208.0B\n\navg 12.5%表示从应用启动到现在，去重的字符串的占比。\n\n17.502ms of 24.439ms 前面的17.502ms是_process_elapsed表示用于deduplication的时间，不包含\n后面的24.439ms表示的是concurrent deduplication整体处理的时间，除了进行deduplication外还有cleanup_table（清理没有强引用的weakreference引用的byte array)\n\n\n[15.950s][debug][stringdedup             ]   Last Process: 1/17.502ms, Idle: 1/2604.480ms, Blocked: 0/0.000ms\n[15.950s][debug][stringdedup             ]   Last Cleanup Table: 1/6.764ms\n[15.950s][debug][stringdedup             ]     Inspected:            1466\n[15.950s][debug][stringdedup             ]       Known:               434( 29.6%)\n[15.950s][debug][stringdedup             ]       Shared:                0(  0.0%)\n[15.950s][debug][stringdedup             ]       New:                1032( 70.4%) 41424.0B\n[15.950s][debug][stringdedup             ]       Replaced:             14(  1.4%)\n[15.950s][debug][stringdedup             ]       Deleted:            2218(214.9%)\n[15.950s][debug][stringdedup             ]     Deduplicated:          168( 11.5%)  5208.0B( 12.6%)\n[15.950s][debug][stringdedup             ]     Skipped: 4 (dead), 0 (incomplete), 0 (shared)\n[15.950s][debug][stringdedup             ]   Total Process: 8/139.331ms, Idle: 8/14716.313ms, Blocked: 0/0.000ms\n\nLast这部分表示最近一次string deduplication。\n\nInspected: 1466表示这次处理了1466个字符串去重请求\nKnown: 434( 29.6%) 表示其中434个字符串中hashtable中有重复的byte array，29.6%表示占本次处理的字符串的比例是29.6%\nShared: 上共享内存的统计，一般用的比较少。\nNew: 1032( 70.4%) 41424.0B 表示hashtable中新增加了1032个byte array，总内存大小41424.0B\nReplaced: 14(1.4%) 表示替换hashtable的数量，因为有的字符串不能替换value，则hashtable会替换value成新的value\nDeleted: 2218(214.9%)表示删除了2218个byte array，是删除的没有引用的数据。\nDeduplicated: 168( 11.5%)  5208.0B( 12.6%) Deduplicated表示给168字符串替换了value。Known和deduplicated的区别是Known中的有可能是相同的array数组对象，不用替换。\n\n[15.950s][debug][stringdedup             ]   Total Cleanup Table: 1/6.764ms\n[15.950s][debug][stringdedup             ]     Inspected:            9825\n[15.950s][debug][stringdedup             ]       Known:              2826( 28.8%)\n[15.950s][debug][stringdedup             ]       Shared:                0(  0.0%)\n[15.951s][debug][stringdedup             ]       New:                6999( 71.2%)   298.5K\n[15.951s][debug][stringdedup             ]       Replaced:             19(  0.3%)\n[15.951s][debug][stringdedup             ]       Deleted:            2218( 31.7%)\n[15.951s][debug][stringdedup             ]     Deduplicated:          976(  9.9%) 38088.0B( 12.5%)\n[15.951s][debug][stringdedup             ]     Skipped: 20 (dead), 0 (incomplete), 0 (shared)\n[15.951s][debug][stringdedup             ] Table: 4781 values in 503 buckets, 0 dead (2)\n\nTotal表示总的deduplication统计，和Last的统计含义类似，不再赘述。\nTable: 4781 values in 503 buckets表示一共4781个value在503个bucket中。\n\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br"),a("span",{staticClass:"line-number"},[e._v("25")]),a("br"),a("span",{staticClass:"line-number"},[e._v("26")]),a("br"),a("span",{staticClass:"line-number"},[e._v("27")]),a("br"),a("span",{staticClass:"line-number"},[e._v("28")]),a("br"),a("span",{staticClass:"line-number"},[e._v("29")]),a("br"),a("span",{staticClass:"line-number"},[e._v("30")]),a("br"),a("span",{staticClass:"line-number"},[e._v("31")]),a("br"),a("span",{staticClass:"line-number"},[e._v("32")]),a("br"),a("span",{staticClass:"line-number"},[e._v("33")]),a("br"),a("span",{staticClass:"line-number"},[e._v("34")]),a("br"),a("span",{staticClass:"line-number"},[e._v("35")]),a("br"),a("span",{staticClass:"line-number"},[e._v("36")]),a("br"),a("span",{staticClass:"line-number"},[e._v("37")]),a("br"),a("span",{staticClass:"line-number"},[e._v("38")]),a("br"),a("span",{staticClass:"line-number"},[e._v("39")]),a("br"),a("span",{staticClass:"line-number"},[e._v("40")]),a("br"),a("span",{staticClass:"line-number"},[e._v("41")]),a("br"),a("span",{staticClass:"line-number"},[e._v("42")]),a("br"),a("span",{staticClass:"line-number"},[e._v("43")]),a("br"),a("span",{staticClass:"line-number"},[e._v("44")]),a("br"),a("span",{staticClass:"line-number"},[e._v("45")]),a("br"),a("span",{staticClass:"line-number"},[e._v("46")]),a("br"),a("span",{staticClass:"line-number"},[e._v("47")]),a("br"),a("span",{staticClass:"line-number"},[e._v("48")]),a("br")])]),a("h2",{attrs:{id:"配置建议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置建议"}},[e._v("#")]),e._v(" 配置建议")]),e._v(" "),a("p",[e._v("如果你的业务场景中，会有比较多的重复的字符串对象常驻在内存中，比如有比较多的本地缓存，缓存中存储的数据有比较多的重复字符串，建议开启。通过一定的CPU开销换取更低的内存占用。")]),e._v(" "),a("p",[e._v("在实际使用中，我们发现开启UseStringDeduplication能够降低old gen的大小（有比较多本地缓存这类数据的情况下），但是\nUseStringDeduplication会带来一定程度的gc暂停时间变长。")]),e._v(" "),a("p",[e._v("如果觉得去重占用过多CPU，可以关闭（默认关闭）或调大"),a("code",[e._v("-XX:StringDeduplicationAgeThreshold=3")])]),e._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[e._v("#")]),e._v(" 参考")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://openjdk.org/jeps/192",target:"_blank",rel:"noopener noreferrer"}},[e._v("JEP 192: String Deduplication in G1"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=t.exports}}]);