(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{265:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("对于前端来说，了解 HTTP 相关知识是非常有必要的，可以帮助理解前端性能优化的方方面面。")]),t._v(" "),a("h2",{attrs:{id:"http-协议原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-协议原理"}},[t._v("#")]),t._v(" HTTP 协议原理")]),t._v(" "),a("h3",{attrs:{id:"http-协议基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-协议基础"}},[t._v("#")]),t._v(" HTTP 协议基础")]),t._v(" "),a("h4",{attrs:{id:"_5层协议模型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5层协议模型"}},[t._v("#")]),t._v(" 5层协议模型")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://note.youdao.com/yws/res/862/WEBRESOURCE99b4e437dd663e95797ad07d5af21013",alt:"5层协议模型.png"}}),t._v("\n应用层（HTTP, FTP）\n传输层（TCP, UDP）\n网络层：为数据在节点之间传递创建逻辑链路\n数据链路层：在通信的实体间建立数据链路链接\n物理层：定义物理层如何传输数据")]),t._v(" "),a("h4",{attrs:{id:"http-的3次握手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-的3次握手"}},[t._v("#")]),t._v(" HTTP 的3次握手")]),t._v(" "),a("p",[t._v("在客户端和服务端之间的一次 HTTP 请求和响应，是先需要创建一个 TCP Connection的这样的通道，HTTP 不存在连接的概念，它只有请求和响应，是在 TCP Connection 基础上完成的。\n"),a("img",{attrs:{src:"http://note.youdao.com/yws/res/874/WEBRESOURCE643aa4d631f6b19c4bb63fc3a9676990",alt:"3次握手.png"}})]),t._v(" "),a("h3",{attrs:{id:"uri-url-和-urn"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#uri-url-和-urn"}},[t._v("#")]),t._v(" URI, URL 和 URN")]),t._v(" "),a("p",[t._v("URI 包含 URL 和 URN, 含义是统一资源标志符，标志在互联网上的一个资源。")]),t._v(" "),a("p",[t._v("URL: 统一资源定位器，用于找到资源的位置，http://user:pass@host.com:80/patg?query=string#hash")]),t._v(" "),a("p",[t._v("URN: 永久统一资源定位符，在资源移动之后还可以被找到，目前还没有非常成熟的使用方案")]),t._v(" "),a("h4",{attrs:{id:"http-报文格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-报文格式"}},[t._v("#")]),t._v(" HTTP 报文格式")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://note.youdao.com/yws/res/901/WEBRESOURCEcb88d2606675e933b73d3ec0b8e92c1c",alt:"报文格式.png"}}),t._v("\nHTTP 方法，用来定义对资源的操作，常用的有 GET, POST 等")]),t._v(" "),a("p",[t._v("HTTP CODE，定义服务器对请求的处理结果，各个区间的 CODE 有各自的语义")]),t._v(" "),a("h3",{attrs:{id:"http-的各种特性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-的各种特性"}},[t._v("#")]),t._v(" HTTP 的各种特性")]),t._v(" "),a("h4",{attrs:{id:"cors-跨域请求的限制与解决"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors-跨域请求的限制与解决"}},[t._v("#")]),t._v(" CORS 跨域请求的限制与解决")]),t._v(" "),a("p",[t._v("允许的方法：GET，HEAD, POST")]),t._v(" "),a("p",[t._v("允许的 Content-Type: text/plain, multipart/form-data,\napplication/x-www-form-urlencoded")]),t._v(" "),a("p",[t._v("其他限制：请求头的限制，XMLHttpRequestUpload 对象均没有注册任何事件监听器，请求中没有使用 Readabletream 对象")]),t._v(" "),a("p",[t._v("除了以上条件，浏览器都会进行预请求来获得服务器认可，此时 Request Method: OPTIONS。\n通常的，设置返回头就可以解决：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeHead")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Access-Control-Allow-Origin'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),t._v("，\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Access-Control-Allow-Headers'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'...'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 跨域时允许的头")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Access-Control-Allow-Methods'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST, PUT, DELETE'")]),t._v("， "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//跨域时允许的方法")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Access-Control-Max-Age'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1000'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//以这种方式跨域，允许的最大时间，1000s 之内不需要再发送预请求来验证")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("这是浏览器的对于跨域请求的限制，跨域请求的同时，也会限制其他一些条件，比如请求方法，Content-Type等。以此来保证服务端的安全。")]),t._v(" "),a("h4",{attrs:{id:"缓存-cache-control"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存-cache-control"}},[t._v("#")]),t._v(" 缓存 Cache-Control")]),t._v(" "),a("ul",[a("li",[t._v("public: 客户端，代理服务器都可以进行缓存")]),t._v(" "),a("li",[t._v("private: 只有发起请求的客户端可以缓存")]),t._v(" "),a("li",[t._v("no-cache:")]),t._v(" "),a("li",[t._v("max-age=seconds: 缓存多少秒到期")]),t._v(" "),a("li",[t._v("s-max-age=seconds: 只有在代理服务器才可以生效")]),t._v(" "),a("li",[t._v("max-stale=seconds: 即便缓存过期，只要还在这个时间内，就会继续使用过期的缓存，不会去源服务器请求新的内容，只有在发起端才可以设置")]),t._v(" "),a("li",[t._v("must-revalidate: 如果 max-age 过期了，必须向源服务器发起请求，验证缓存是否过期")]),t._v(" "),a("li",[t._v("proxy-revalidate: 用于缓存服务器，如果过期，必须去源服务器进行有效性校验")])]),t._v(" "),a("h4",{attrs:{id:"资源认证"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资源认证"}},[t._v("#")]),t._v(" 资源认证")]),t._v(" "),a("p",[a("img",{attrs:{src:"http://note.youdao.com/yws/res/1006/WEBRESOURCE682a978b7f47c3dbfaa7cd74e681e394",alt:"资源认证.png"}}),t._v("\n验证头：")]),t._v(" "),a("ul",[a("li",[t._v("Last-Modified(上次修改时间)，配合 If-Modified-Since 或者 If-Unmodified-Since 使用")]),t._v(" "),a("li",[t._v("Etag(数据签名)，配合 If-Match 或者 If-None-Match 使用，对比资源的签名判断是否使用本地缓存")])]),t._v(" "),a("h4",{attrs:{id:"cookie"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[t._v("#")]),t._v(" Cookie")]),t._v(" "),a("ul",[a("li",[t._v("Cookie, 在服务端返回数据的时候，通过 Set-Cookie 这个 header 设置到浏览器中，再下一次请求中，会带上这个 cookie。\n"),a("ol",[a("li",[t._v("max-age 和 expires 设置过期时间")]),t._v(" "),a("li",[t._v("Secure 只在 https 的时候发送")]),t._v(" "),a("li",[t._v("设置 HttpOnly 将限制浏览器无法通过 document.cookie 读写 cookie")])])])]),t._v(" "),a("h4",{attrs:{id:"content-security-policy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#content-security-policy"}},[t._v("#")]),t._v(" Content-Security-Policy")]),t._v(" "),a("p",[t._v("作用：")]),t._v(" "),a("ul",[a("li",[t._v("限制资源获取")]),t._v(" "),a("li",[t._v("报告资源获取越权")])]),t._v(" "),a("p",[t._v("限制方式：")]),t._v(" "),a("ul",[a("li",[t._v("default-src 限制全局跟链接请求相关的")]),t._v(" "),a("li",[t._v("根据特定资源类型限制范围，比如 connect-src, img-src, manifest-src, font-src, media-src, style-src, script-src, iframe-src 等")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeHead")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Security-Policy'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'default-src \\'self\\'; report-uri /report-api'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("也可以在前端，通过 html meta 标签控制：")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("Content-Security-Policy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("default-src 'self'"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("blockquote",[a("p",[t._v("不能设置 report-uri")])])])}),[],!1,null,null,null);s.default=n.exports}}]);