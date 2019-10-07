---
title: http-protocol
date: 2019-10-06 22:04:49
tags: http, http2, https
---

### HTTP 协议原理
对于前端来说，了解 HTTP 相关知识是非常有必要的，可以帮助理解前端性能优化的方方面面。

#### HTTP 协议基础
##### 5层协议模型
![5层协议模型.png](http://note.youdao.com/yws/res/862/WEBRESOURCE99b4e437dd663e95797ad07d5af21013)
应用层（HTTP, FTP）
传输层（TCP, UDP）
网络层：为数据在节点之间传递创建逻辑链路
数据链路层：在通信的实体间建立数据链路链接
物理层：定义物理层如何传输数据

##### HTTP 的3次握手
在客户端和服务端之间的一次 HTTP 请求和响应，是先需要创建一个 TCP Connection的这样的通道，HTTP 不存在连接的概念，它只有请求和响应，是在 TCP Connection 基础上完成的。
![3次握手.png](http://note.youdao.com/yws/res/874/WEBRESOURCE643aa4d631f6b19c4bb63fc3a9676990)

#### URI, URL 和 URN
URI 包含 URL 和 URN, 含义是统一资源标志符，标志在互联网上的一个资源。

URL: 统一资源定位器，用于找到资源的位置，http://user:pass@host.com:80/patg?query=string#hash

URN: 永久统一资源定位符，在资源移动之后还可以被找到，目前还没有非常成熟的使用方案

##### HTTP 报文格式
![报文格式.png](http://note.youdao.com/yws/res/901/WEBRESOURCEcb88d2606675e933b73d3ec0b8e92c1c)
HTTP 方法，用来定义对资源的操作，常用的有 GET, POST 等

HTTP CODE，定义服务器对请求的处理结果，各个区间的 CODE 有各自的语义

#### HTTP 的各种特性

##### CORS 跨域请求的限制与解决

允许的方法：GET，HEAD, POST

允许的 Content-Type: text/plain, multipart/form-data,
application/x-www-form-urlencoded

其他限制：请求头的限制，XMLHttpRequestUpload 对象均没有注册任何事件监听器，请求中没有使用 Readabletream 对象

除了以上条件，浏览器都会进行预请求来获得服务器认可，此时 Request Method: OPTIONS。
通常的，设置返回头就可以解决：
```js
response.writeHead(200, {
    'Access-Control-Allow-Origin': '*'，
    'Access-Control-Allow-Headers': '...', // 跨域时允许的头
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE'， //跨域时允许的方法
    'Access-Control-Max-Age': '1000' //以这种方式跨域，允许的最大时间，1000s 之内不需要再发送预请求来验证
})
```
这是浏览器的对于跨域请求的限制，跨域请求的同时，也会限制其他一些条件，比如请求方法，Content-Type等。以此来保证服务端的安全。

##### 缓存 Cache-Control
* public: 客户端，代理服务器都可以进行缓存
* private: 只有发起请求的客户端可以缓存
* no-cache: 
* max-age=<seconds>: 缓存多少秒到期
* s-max-age=<seconds>: 只有在代理服务器才可以生效
* max-stale=<seconds>: 即便缓存过期，只要还在这个时间内，就会继续使用过期的缓存，不会去源服务器请求新的内容，只有在发起端才可以设置
* must-revalidate: 如果 max-age 过期了，必须向源服务器发起请求，验证缓存是否过期
* proxy-revalidate: 用于缓存服务器，如果过期，必须去源服务器进行有效性校验

##### 资源认证
![资源认证.png](http://note.youdao.com/yws/res/1006/WEBRESOURCE682a978b7f47c3dbfaa7cd74e681e394)
验证头：
* Last-Modified(上次修改时间)，配合 If-Modified-Since 或者 If-Unmodified-Since 使用
* Etag(数据签名)，配合 If-Match 或者 If-None-Match 使用，对比资源的签名判断是否使用本地缓存

##### Cookie
* Cookie, 在服务端返回数据的时候，通过 Set-Cookie 这个 header 设置到浏览器中，再下一次请求中，会带上这个 cookie。
    1. max-age 和 expires 设置过期时间
    2. Secure 只在 https 的时候发送
    3. 设置 HttpOnly 将限制浏览器无法通过 document.cookie 读写 cookie

##### Content-Security-Policy
作用：
* 限制资源获取
* 报告资源获取越权

限制方式：
* default-src 限制全局跟链接请求相关的
* 根据特定资源类型限制范围，比如 connect-src, img-src, manifest-src, font-src, media-src, style-src, script-src, iframe-src 等
```js
response.writeHead(200, {
    'Content-Security-Policy': 'default-src \'self\'; report-uri /report-api',
})
```
也可以在前端，通过 html meta 标签控制：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
```
> 不能设置 report-uri

