---
title: keep-alive
date: 2018-09-25 14:54:17
tags: http
---

## HTTP 中的 keep-alive

<!-- more -->

### 什么是 keep-alive
> 在 HTTP 早期，每发送一个 http 请求都要打开一个 TPC 连接，完成之后便会立即断开这个连接。这个过程中的创建连接会消耗资源和时间，所以重用连接就非常有必要。在后来的 HTTP 1.0 中和 HTTP 1.1，引入了重用连接机制，即 keep-alive 模式，可以有效的减少TCP连接建立次数，在这个模式下，客户端到服务端的连接持久有效，当建立连接之后，如果后续还需要请求，keep-alive 就避免了重新建立连接。

> 在 HTTP 1.0 中，该模式是默认关闭的，需要在 http 请求头中增加 Connection: Keep-Alive，在 HTTP 1.1中，默认是开启的，如需关闭，设置 Connection: close。

### 带来的问题
* 长时间的TCP连接容易导致系统资源无效占用
> 设置 keepalive_timeout，在响应完一个请求之后，会等待一段时间，再关闭这个连接。

* 如何判断消息内容/长度的大小
在 keep-alive 模式下，响应完请求后不会立即关闭连接，所以无法知道客户端是否已经接受全部数据

> 使用消息首部字段Conent-Length，这个字段表示实体内容的长度，客户端可以根据这个字段，来判断接受的内容是否完整；如果响应头中没有Conent-Length，这种情况一般返回的是动态内容，因为服务端也不知道返回内容的具体大小，所以无法通过Conent-Length告知客户端，此时服务端会返回 Transfer-Encoding: chunked，在这个模式下，内容会被分段返回。

