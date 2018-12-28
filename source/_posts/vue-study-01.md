---
title: Vue编译过程
date: 2018-11-13 14:16:03
tags: vue, javascript
---

### vue的编译过程

#### 编译
vue的模板编译（compile）是在$mount中进行的，过程可以分为三个阶段，parse， optimize， generate， 最终会得到render function。
1. parse

这是解析template阶段，使用正则表达式，通过对标签吗开头、标签名结尾、属性字段、文本内容等进行匹配截取，这是一个递归的过程。最后会形成AST。
```js
// parse 里定义的一些正则
export const onRE = /^@|^v-on:/ //匹配 v-on
export const dirRE = /^v-|^@|^:/ //匹配 v-on 和 v-bind
export const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/ //匹配 v-for 属性
export const forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/ //匹配 v-for 的多种形式
```
2. optimize

对 parse 生成的 AST 进行静态内容的优化，标记 static 静态节点，静态内容是指**和数据没有关系，不需要每次都刷新的内容**，到后面的update更新界面的时候，会有一个patch过程，这个时候就会跳过静态节点，从而减少了比较的过程，提高了性能。optimize 的过程分为两步：
* 标记所有的静态节点和非静态节点
* 标记静态根节点

3. generate

这个过程会把AST转化成render function 字符串，和 staticRenderFns 字符串，这个函数是用来单独生成静态节点的VNode。



