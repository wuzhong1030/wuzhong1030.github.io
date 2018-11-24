---
title: 全面解读this
date: 2018-11-24 09:38:57
tags: JavaScript
---

> 每个函数的this是在调用时被绑定的，完全取决于函数的调用位置，也就是函数的调用方法

函数的调用位置是跟调用栈息息相关的，我们关心的调用位置就是在当前执行的函数中的前一个 <font color=#c7254e>调用中</font>

### 绑定规则
在函数的执行过程中决定this的绑定对象，一共有四条绑定规则。

#### 默认绑定
首先是最常用的函数调用类型：独立函数调用

```js
function foo () {
    console.log(this.a)
}
var a = 2
foo() // 2
```
申明在全局作用域中的变量 <font color=#c7254e>（var a = 2）</font> ,就是全局对象中的一个同名属性，本质上是同一个东西。而这个 <font color=#c7254e>this.a</font> 被解析成了全局变量 <font color=#c7254e>a</font> ，说明这个 <font color=#c7254e>this</font> 指向的是全局变量。通过函数调用位置也可以证实这一点：因为函数 <font color=#c7254e>foo</font> 是在全局上下文中调用的，它的调用对象默认就是全局对象，所以这里的 <font color=#c7254e>this</font> 使用的是**默认绑定**。

> 如果是严格模式下，则不能将全局对象用于默认绑定，因为this会绑定到undefined:

```js
function foo () {
    'use strice';
    console.log(this.a)
}
var a = 2
foo() // TypeError: this is undefined
```

#### 隐式绑定
另一条规则是调用的位置是否有上下文对象，或者说是否被某个对象拥有或者包含

```js
function foo () {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo
}
obj.foo() // 2
```

首先需要注意的是 <font color=#c7254e>foo</font> 的声明方式，以及之后被当做引用属性添加到 <font color=#c7254e>obj</font> 对象中。调用位置会使用 <font color=#c7254e>obj</font> 上下文来引用函数，因此可以说函数被调用时，<font color=#c7254e>obj</font> 对象`拥有`或`包含`这个foo。

##### 隐式丢失
这个隐式丢失问题就是被隐式绑定this的函数会丢失绑定对象，会应用默认绑定模式。

```js
function foo () {
    console.log(this)
}
var obj = {
    a: 2,
    foo: foo
}
var bar = obj.foo
var a = 'oops, global'
bar() // oops, global
```

虽然 <font color=#c7254e>bar</font> 是 <font color=#c7254e>obj.foo</font>  的一个引用，但实际上，它引用的是 <font color=#c7254e>foo</font> 函数本身，所以 <font color=#c7254e>bar</font> 的调用对象是全局对象，因此使用了默认绑定。

#### 显式绑定
显式绑定就是通过 <font color=#c7254e>call(...)</font>和<font color=#c7254e>apply(...)</font> 来显式的确定函数 <font color=#c7254e>this</font> 的绑定对象。

```js
function foo () {
    console.log(this.a)
}
var obj = {
    a: 2
}
foo.call(obj) // 2
```
通过 <font color=#c7254e>foo.call</font> ，我们可以在调用 <font color=#c7254e>foo</font> 时强制把它的 <font color=#c7254e>this</font> 绑定到obj上。
> 如果你传入了一个原始值（字符串类型，、布尔类型或者数字类型）来当做 <font color=#c7254e>this</font> 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(...)， new Boolean(...)， new Number(...)）。这通常被称为`装箱`。

#### new绑定

```js
function foo (a) {
    this.a = a
}
var bat = new foo(2)
console.log(bar.a) // 2
```
使用 <font color=#c7254e>new</font> 来调用 <font color=#c7254e>foo(...)</font> 时，我们会构造一个新对象并把它绑定到 <font color=#c7254e>foo(...)</font> 调用中的 <font color=#c7254e>this</font> 上。
使用 <font color=#c7254e>new</font> 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：
* 创建一个全新的对象
* 这个新对象会被执行 [[Prototype]] 连接
* 这个新对象会绑定到函数调用的 <font color=#c7254e>this</font>
* 如果函数没有返回其他对象，那么 <font color=#c7254e>new</font> 表达式中的函数调用会自动返回这个新对象