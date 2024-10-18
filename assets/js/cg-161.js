(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{592:function(n,e,s){"use strict";s.r(e);var t=s(34),a=Object(t.a)({},(function(){var n=this,e=n.$createElement,s=n._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h1",{attrs:{id:"g1-adaptive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#g1-adaptive"}},[n._v("#")]),n._v(" G1 Adaptive")]),n._v(" "),s("p",[n._v("G1自适应调整。")]),n._v(" "),s("h2",{attrs:{id:"年轻代大小调整"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#年轻代大小调整"}},[n._v("#")]),n._v(" 年轻代大小调整")]),n._v(" "),s("p",[n._v("调整的策略")]),n._v(" "),s("p",[n._v("每次GC完成后，调用G1Policy::update_young_list_target_length调整年轻代的大小。")]),n._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("bool\nG1CollectedHeap::do_collection_pause_at_safepoint(double target_pause_time_ms) {\n    g1_policy()->record_collection_pause_end(pause_time_ms, total_cards_scanned, heap_used_bytes_before_gc)\n}\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br")])]),s("p",[n._v("参数传入的是_analytics->predict_rs_lengths，即G1通过历史数据预估出来的remembered_set的长度。remembered set的数量会影响\ngc耗时（对remembered set的card扫描标记活对象）。")]),n._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("uint G1Policy::update_young_list_max_and_target_length() {\n  return update_young_list_max_and_target_length(_analytics->predict_rs_lengths());\n}\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br")])]),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('G1Policy::YoungTargetLengths G1Policy::young_list_target_lengths(size_t rs_lengths) const {\n  YoungTargetLengths result;\n\n  // 计算绝对的和期望的min bounds\n  // Calculate the absolute and desired min bounds first.\n\n  // This is how many young regions we already have (currently: the survivors).\n  // base_min_length是我们当前有的年轻代region数量（因为gc完成后eden已经清空，所以这里只用survivor）\n  const uint base_min_length = _g1h->survivor_regions_count();\n  \n  // calculate_young_list_desired_min_length计算年轻代长度的最小期望大小\n  uint desired_min_length = calculate_young_list_desired_min_length(base_min_length);\n  // This is the absolute minimum young length. Ensure that we\n  // will at least have one eden region available for allocation.\n  uint absolute_min_length = base_min_length + MAX2(_g1h->eden_regions_count(), (uint)1);\n  // If we shrank the young list target it should not shrink below the current size.\n  desired_min_length = MAX2(desired_min_length, absolute_min_length);\n  // Calculate the absolute and desired max bounds.\n\n  uint desired_max_length = calculate_young_list_desired_max_length();\n\n  uint young_list_target_length = 0;\n  if (adaptive_young_list_length()) {\n    if (collector_state()->in_young_only_phase()) {\n      young_list_target_length =\n                        calculate_young_list_target_length(rs_lengths,\n                                                           base_min_length,\n                                                           desired_min_length,\n                                                           desired_max_length);\n    } else {\n      // Don\'t calculate anything and let the code below bound it to\n      // the desired_min_length, i.e., do the next GC as soon as\n      // possible to maximize how many old regions we can add to it.\n    }\n  } else {\n    // The user asked for a fixed young gen so we\'ll fix the young gen\n    // whether the next GC is young or mixed.\n    young_list_target_length = _young_list_fixed_length;\n  }\n\n  result.second = young_list_target_length;\n\n  // We will try our best not to "eat" into the reserve.\n  uint absolute_max_length = 0;\n  if (_free_regions_at_end_of_collection > _reserve_regions) {\n    absolute_max_length = _free_regions_at_end_of_collection - _reserve_regions;\n  }\n  if (desired_max_length > absolute_max_length) {\n    desired_max_length = absolute_max_length;\n  }\n\n  // Make sure we don\'t go over the desired max length, nor under the\n  // desired min length. In case they clash, desired_min_length wins\n  // which is why that test is second.\n  if (young_list_target_length > desired_max_length) {\n    young_list_target_length = desired_max_length;\n  }\n  if (young_list_target_length &lt; desired_min_length) {\n    young_list_target_length = desired_min_length;\n  }\n\n  assert(young_list_target_length > base_min_length,\n         "we should be able to allocate at least one eden region");\n  assert(young_list_target_length >= absolute_min_length, "post-condition");\n\n  result.first = young_list_target_length;\n  return result;\n}\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br"),s("span",{staticClass:"line-number"},[n._v("19")]),s("br"),s("span",{staticClass:"line-number"},[n._v("20")]),s("br"),s("span",{staticClass:"line-number"},[n._v("21")]),s("br"),s("span",{staticClass:"line-number"},[n._v("22")]),s("br"),s("span",{staticClass:"line-number"},[n._v("23")]),s("br"),s("span",{staticClass:"line-number"},[n._v("24")]),s("br"),s("span",{staticClass:"line-number"},[n._v("25")]),s("br"),s("span",{staticClass:"line-number"},[n._v("26")]),s("br"),s("span",{staticClass:"line-number"},[n._v("27")]),s("br"),s("span",{staticClass:"line-number"},[n._v("28")]),s("br"),s("span",{staticClass:"line-number"},[n._v("29")]),s("br"),s("span",{staticClass:"line-number"},[n._v("30")]),s("br"),s("span",{staticClass:"line-number"},[n._v("31")]),s("br"),s("span",{staticClass:"line-number"},[n._v("32")]),s("br"),s("span",{staticClass:"line-number"},[n._v("33")]),s("br"),s("span",{staticClass:"line-number"},[n._v("34")]),s("br"),s("span",{staticClass:"line-number"},[n._v("35")]),s("br"),s("span",{staticClass:"line-number"},[n._v("36")]),s("br"),s("span",{staticClass:"line-number"},[n._v("37")]),s("br"),s("span",{staticClass:"line-number"},[n._v("38")]),s("br"),s("span",{staticClass:"line-number"},[n._v("39")]),s("br"),s("span",{staticClass:"line-number"},[n._v("40")]),s("br"),s("span",{staticClass:"line-number"},[n._v("41")]),s("br"),s("span",{staticClass:"line-number"},[n._v("42")]),s("br"),s("span",{staticClass:"line-number"},[n._v("43")]),s("br"),s("span",{staticClass:"line-number"},[n._v("44")]),s("br"),s("span",{staticClass:"line-number"},[n._v("45")]),s("br"),s("span",{staticClass:"line-number"},[n._v("46")]),s("br"),s("span",{staticClass:"line-number"},[n._v("47")]),s("br"),s("span",{staticClass:"line-number"},[n._v("48")]),s("br"),s("span",{staticClass:"line-number"},[n._v("49")]),s("br"),s("span",{staticClass:"line-number"},[n._v("50")]),s("br"),s("span",{staticClass:"line-number"},[n._v("51")]),s("br"),s("span",{staticClass:"line-number"},[n._v("52")]),s("br"),s("span",{staticClass:"line-number"},[n._v("53")]),s("br"),s("span",{staticClass:"line-number"},[n._v("54")]),s("br"),s("span",{staticClass:"line-number"},[n._v("55")]),s("br"),s("span",{staticClass:"line-number"},[n._v("56")]),s("br"),s("span",{staticClass:"line-number"},[n._v("57")]),s("br"),s("span",{staticClass:"line-number"},[n._v("58")]),s("br"),s("span",{staticClass:"line-number"},[n._v("59")]),s("br"),s("span",{staticClass:"line-number"},[n._v("60")]),s("br"),s("span",{staticClass:"line-number"},[n._v("61")]),s("br"),s("span",{staticClass:"line-number"},[n._v("62")]),s("br"),s("span",{staticClass:"line-number"},[n._v("63")]),s("br"),s("span",{staticClass:"line-number"},[n._v("64")]),s("br"),s("span",{staticClass:"line-number"},[n._v("65")]),s("br"),s("span",{staticClass:"line-number"},[n._v("66")]),s("br"),s("span",{staticClass:"line-number"},[n._v("67")]),s("br"),s("span",{staticClass:"line-number"},[n._v("68")]),s("br")])]),s("p",[n._v("calculate_young_list_desired_min_length计算年轻代长度的最小期望大小。\n如果开启了Adaptive，通过 _mmu_tracker->when_max_gc_sec预估最大暂停时间。\n通过_analytics->predict_alloc_rate_ms()\n预估内存申请速度/ms。\n两个相乘（ceil向上取整）再加上base_min_length计算出年轻代目标的最小长度。最后还要和用户配置的G1NewSizePercent等参数得到的min_desired_young_length做一个\nmax比较，避免小于最小值。")]),n._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("uint G1Policy::calculate_young_list_desired_min_length(uint base_min_length) const {\n  uint desired_min_length = 0;\n  if (adaptive_young_list_length()) {\n    if (_analytics->num_alloc_rate_ms() > 3) {\n      // now_sec是启动之后的事件，单位秒\n      double now_sec = os::elapsedTime();\n      // \n      double when_ms = _mmu_tracker->when_max_gc_sec(now_sec) * 1000.0;\n      double alloc_rate_ms = _analytics->predict_alloc_rate_ms();\n      desired_min_length = (uint) ceil(alloc_rate_ms * when_ms);\n    } else {\n      // otherwise we don't have enough info to make the prediction\n    }\n  }\n  desired_min_length += base_min_length;\n  // make sure we don't go below any user-defined minimum bound\n  return MAX2(_young_gen_sizer.min_desired_young_length(), desired_min_length);\n}\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br")])]),s("p",[n._v("调整的历史数据")]),n._v(" "),s("h2",{attrs:{id:"更多参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更多参考"}},[n._v("#")]),n._v(" 更多参考")]),n._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://www.jianshu.com/p/33b26a8e80ae",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://www.jianshu.com/p/33b26a8e80ae"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=a.exports}}]);