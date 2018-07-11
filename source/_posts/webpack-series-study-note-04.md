---
title: webpack系列笔记(四)
date: 2018-07-11 13:30:59
tags:
---

webpack 开发搭建环境

<!-- more -->

## 方法

 1. webpack watch mode
 2. webpack-dev-server
 3. express + webpack-hot-middle
 

第一种方式并不会产生一个web服务器，只是会实时监听文件的修改，并打包，还是需要我们去手动搭建一个服务器；在命令行输入 webpack -watch 或者 webpack -w(简写)即可启动

第二种方式提供的功能有：
 - live reloading
 - 路径重定向
 - 支持https
 - 可以在浏览器中显示编译的错误
 - 支持接口代理
 - 模块热更新（不会刷新浏览器，只替换代码更新的部分）

第三种方式更加灵活，可以使用不同的中间件来提升开发效率，也可以结合实际业务场景对dev-middle进行编码处理，搭建更加符合业务的开发环境，其实第二种方式底层也是依赖express+dev-middle这种方式。