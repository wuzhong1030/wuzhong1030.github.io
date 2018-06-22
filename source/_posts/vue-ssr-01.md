---
title: vue-ssr（一）
date: 2018-06-22 14:47:36
tags: 服务端渲染， Vue
---

什么是SSR? Server Side Rendering，服务端渲染。

<!-- more -->

# 基本介绍

> vueJs 既可以将一个组件输出给浏览器，也可以通过服务端，把这个组件渲染为服务端的HTML字符串，然后直接发送给浏览器显示。也就是说，这种代码既可以在客户端运行，也可以在的服务端运行，被称为“同构”。

## 1.有什么好处
* 对SEO很友好，因为搜索引擎和爬虫工具可以直接查看完整渲染后的页面。
* 用户可以更快的看到完成的渲染页面，提高用户体验，因为渲染工作放在了服务端，浏览器只负责显示。

## 2.工作流程
![enter image description here](http://img.mukewang.com/5aeccf8c00011f9f17360984.png)

上面这张图片，用户访问页面，实际上有两种处理方式。
1. 纯前端的渲染方式。这个跟以前的模式一样，通过webpack起一个服务，然后访问webpack dev server。
2. 服务端渲染方式。既然是服务端渲染，那必然要有一个服务器，上面的webpack dev server不能满足我们的需求，因为服务端渲染是要有代码逻辑，需要自己去实现一个nodejs server，所以需要借助node实现一个带有服务端渲染能力的服务器。

上图的服务端渲染流程，就是自己实现一个渲染逻辑，然后打包到node端上运行，通过webpack server compiler生成一个server bundle，也就是服务端的app.js。当node server获取到app.js后，会执行vue-server-render这个插件，渲染出HTML代码，输出给浏览器。这个过程比浏览器端渲染页面要快很多，因为浏览器不需要通过js来渲染页面。

## 3.vue-server-render插件
渲染流程图如下：
![enter image description here](https://files.jb51.net/file_images/article/201801/201818165144933.jpg?20180816521)
可以看出，vue的ssr渲染分为三个模块，页面远吗（source），node server，浏览器（Brower）。
### app.js
app.js是入口文件，vue组件“同构”的核心，它的作用就是构建一个Vue实例，可以同时提供给客户端和服务端使用。上图也说明了有两个入口，分别是Server entry和Client entry。在SPA中，app.js会挂载实例到dom中；在SSR中，主要是供服务端渲染模块的回调，返回一个Promise对象，最终返回一个Vue对象。


