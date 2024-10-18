(window.webpackJsonp=window.webpackJsonp||[]).push([[325],{757:function(s,a,t){"use strict";t.r(a);var n=t(34),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"beanfactorypostprocessor"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#beanfactorypostprocessor"}},[s._v("#")]),s._v(" BeanFactoryPostProcessor")]),s._v(" "),t("p",[s._v("BeanFactoryPostProcessor类是spring提供的可以对application context中的bean definition进行自定义修改的的后处理接口。\nBeanFactoryPostProcessor只能修改BeanDefinition即Bean的定义，如果要修改bean实例，需要使用BeanPostProcessor。\n相当于自定义一些Bean的定义，比如@Configuration、MyBatis的Mapper Bean都是使用BeanFactoryPostProcessor以及子接口BeanDefinitionRegistryPostProcessor实现的。")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@FunctionalInterface")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BeanFactoryPostProcessor")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n\t * Modify the application context's internal bean factory after its standard\n\t * initialization. All bean definitions will have been loaded, but no beans\n\t * will have been instantiated yet. This allows for overriding or adding\n\t * properties even to eager-initializing beans.\n\t * @param beanFactory the bean factory used by the application context\n\t * @throws org.springframework.beans.BeansException in case of errors\n\t */")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("postProcessBeanFactory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ConfigurableListableBeanFactory")]),s._v(" beanFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("throws")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BeansException")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("p",[s._v("BeanDefinitionRegistryPostProcessor提供的postProcessBeanDefinitionRegistry方法可以在BeanFactoryPostProcessor的postProcessBeanFactory执行之前\n注册bean definition。")]),s._v(" "),t("p",[s._v("BeanFactoryPostProcessor和BeanDefinitionRegistryPostProcessor的调用时机，是在AbstractApplicationContext的refresh方法中，\n在DispatcherServlet init的时候，就会创建ApplicationContext并调用refresh方法。\nrefresh方法中invokeBeanFactoryPostProcessors(beanFactory)是调用application context中注册的BeanFactoryPostProcessor。（前面的postProcessBeanFactory\n是给AbstractApplicationContext子类留下的扩展方法，比如ServletWebServerApplicationContext会增加一些BeanPostProcessor。）")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("refresh")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("throws")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BeansException")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IllegalStateException")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("synchronized")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("startupShutdownMonitor"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Prepare this context for refreshing.")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("prepareRefresh")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Tell the subclass to refresh the internal bean factory.")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ConfigurableListableBeanFactory")]),s._v(" beanFactory "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("obtainFreshBeanFactory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Prepare the bean factory for use in this context.")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("prepareBeanFactory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("beanFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Allows post-processing of the bean factory in context subclasses.")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("postProcessBeanFactory")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("beanFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Invoke factory processors registered as beans in the context.")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("invokeBeanFactoryPostProcessors")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("beanFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br")])]),t("p",[s._v("invokeBeanFactoryPostProcessors中，会先调用BeanFactoryPostProcessor的postProcessBeanDefinitionRegistry再调用postProcessBeanFactory。")]),s._v(" "),t("h2",{attrs:{id:"常见实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见实现"}},[s._v("#")]),s._v(" 常见实现")]),s._v(" "),t("h3",{attrs:{id:"configurationclasspostprocessor"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#configurationclasspostprocessor"}},[s._v("#")]),s._v(" ConfigurationClassPostProcessor")]),s._v(" "),t("p",[s._v("ConfigurationClassPostProcessor用来实现@Configuration注解的功能。\n通过@Configuration注解，可以通过代码声明bean定义。")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Configuration")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("AppConfig")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n   "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Bean")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MyBean")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("myBean")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n       "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// instantiate, configure and return bean ...")]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[s._v("ConfigurationClassPostProcessor实现了BeanDefinitionRegistryPostProcessor接口，\n通过ConfigurationClassParser类解析@Configuration注解标识的类中的@ComponentScan、@Bean方法定义、@Import(ImportBeanDefinitionRegistrar)等注解，向\n通过ConfigurationClassParser解析完成后，ConfigurationClassPostProcessor就会在postProcessBeanDefinitionRegistry的时候将\n解析出来的BeanDefinition注册到BeanFactory中。")]),s._v(" "),t("h3",{attrs:{id:"mapperscannerconfigurer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mapperscannerconfigurer"}},[s._v("#")]),s._v(" MapperScannerConfigurer")]),s._v(" "),t("p",[s._v("MapperScannerConfigurer是spring-mybatis中将Mapper接口注册为spring中的bean的BeanDefinitionRegistryPostProcessor\n使用方式是定义一个MapperScannerConfigurer的bean。")]),s._v(" "),t("div",{staticClass:"language-xml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-xml"}},[t("code",[s._v(" "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("bean")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("org.mybatis.spring.mapper.MapperScannerConfigurer"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n     "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("property")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("basePackage"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("value")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("org.mybatis.spring.sample.mapper"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n     "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!-- optional unless there are multiple session factories defined --\x3e")]),s._v("\n     "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("property")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("sqlSessionFactoryBeanName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("value")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("sqlSessionFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("bean")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("MapperScannerConfigurer会在postProcessBeanDefinitionRegistry的时候创建一个ClassPathMapperScanner（继承自spring内部的ClassPathBeanDefinitionScanner)\n这个Scanner可以设置bean的配置比如有什么注解或继承什么接口的是MyBatis的Mapper类，通过Scanner扫描出来BeanDefinition后, 会设置一些FactoryBean、sqlSessionTemplateBeanName等\n帮助创建MapperFactoryBean的属性，然后通过BeanFactory注册BeanDefinition。")]),s._v(" "),t("p",[s._v("另外注意spring mybatis也提供了通过在Configuration类上增加@MapperScan或@MapperScans来扫描bean的功能，功能上和MapperScannerConfigurer一致但是使用更简单。\n@MapperScan是通过MapperScannerRegistrar也就是通过上面提到的ConfigurationClassPostProcessor机制来实现的。")]),s._v(" "),t("h3",{attrs:{id:"propertyplaceholderconfigurer-propertyoverrideconfigurer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#propertyplaceholderconfigurer-propertyoverrideconfigurer"}},[s._v("#")]),s._v(" PropertyPlaceholderConfigurer&PropertyOverrideConfigurer")]),s._v(" "),t("p",[s._v("PropertyPlaceholderConfigurer、PropertyOverrideConfigurer能够替换bean定义中的${}占位符，替换为环境变量、properties文件中的值，比如替换数据库的配置等等")])])}),[],!1,null,null,null);a.default=e.exports}}]);