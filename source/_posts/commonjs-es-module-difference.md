---
title: CommonJS模块和ES模块的区别
date: 2018-11-15 21:39:26
tags: es, javascript
---

模块系统中，commonJS模块对比ES6模块

<!-- more -->

早前的JavaScript，并没有模块化的概念，社区涌现一批模块化的方案，其中就包括commonJs和ES6。
在没有模块化之前，都是通过script标签引入js，这是最原始的加载方式，所以它们通常都是暴露在全局环境下的，是同一个作用域window。这样做的缺点有：
* 全局作用域下容易造成变量冲突
* 开发者必须主动解决这些文件的依赖关系
* 在大型项目中，资源难以管理，造成开发效率底下


所以就出现的模块化。

#### CommonJS
##### 基本介绍
1. CommonJS 是一种思想，它是为 JS 的表现来制定规范。由于 JS 没有模块系统、标准库较少、缺乏包管理工具，因此 CommonJS 应运而生。
2. CommonJS 的目标是希望 JS 可以在任何地方运行，不只是浏览器中。只要我们的 JavaScript 是根据 CommonJS API 编写的，那么就可以在与 CommonJS 兼容的系统上运行。
3. 根据 CommonJS API 编写的 JavaScript 可以做下面这些事情:
* 编写服务端应用
* 编写命令工具
* 编写基于GUI的桌面应用
##### 模块规范
一个文件就是一个模块，拥有单独的作用域。普通方式定义的变量、函数、对象都属于该模块内。
* 通过 require 来加载模块
* 通过 exports 和 modul.exports 来暴露模块中的内容

> exports 和 module.exports 的区别

1. 最终导出的是module.exports
2. exports就是module.exports的一个引用, 帮助简化代码, 如module.exports.A = 1可以简写为exports.A = 1.

#### ES6
##### 基本介绍
EcmaScript6 标准增加了 JavaScript 语言层面的模块体系定义。ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

##### 模块规范
* 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
* export 命令用于规定模块的对外接口
* import 命令用于输入其他模块提供的功能

#### 区别
* CommonJS 输出是值的拷贝，即原来模块中的值改变不会影响已经加载的该值，ES6静态分析，动态引用，输出的是值的引用，值改变，引用也改变，即原来模块中的值改变则该加载的值也改变
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
* CommonJS 加载的是整个模块，即将所有的接口全部加载进来，ES6 可以单独加载其中的某个接口（方法）
* CommonJS this 指向当前模块，ES6 this 指向undefined
* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用


