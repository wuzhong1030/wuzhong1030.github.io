---
title: 你应该要知道的JS中的this
date: 2018-12-13 14:00:28
tags: javascript
---

## 前言
this 是 JavaScript 中不可不谈的一个知识点，它非常重要但又不容易理解。因为 JavaScript 中的 this 不同于其他语言。不同场景下的 this 指向不同（当函数被调用执行时会生成变量对象，确定 this 的指向，因此当前函数的 this 是在函数被调用执行的时候才确定的，所以导致 this 的指向灵活不确定），而且，在严格模式和非严格模式下，this 也会有不同的解读。

## 为什么要有 this
先想想如果 JavaScript 中没有 this 会怎么样？比如下面这段代码：
```js
function identity(context) {
    return context.name.toUpperCase();
}
function speak(context) {
    var greeting = 'Hello, I am ' + identity(context)
    console.log(greeting)
}
var you = {
    name: 'Reader'
}
var me = {
    name: 'Stone'
}
identity(you); // READER
speak(me); // Hello, I am Stone
```
我们给这 identity 和 speak 两个函数显示的传入了一个上下文对象，这似乎看不出什么，但是一旦你的应用变得越来越复杂，这种显示传递上下文就会让代码越来越混乱，代码结构越来越模糊。而使用 this 就可以避免这样，因为 this 提供了一种更优雅的方式来隐式传递对象引用，可以把 API 设计得更加简洁易用。

## this 的绑定规则

### 全局对象中的 this
全局对象的变量对象是一个比较特殊的存在，在全局对象中，this 指向它本身，比如：
```js
// this 绑定到全局对象
this.a1 = 10;

// 通过声明绑定到变量对象，全局环境中，变量对象就是它本身
var a2 = 20;

// 会隐式绑定到全局对象
a3 = 30;

console.log(a1); // 10
console.log(a2); // 20
console.log(a3); // 30
```

### 函数中的 this
在一个函数的执行上下文中，this 由该函数的调用者提供，由函数的调用方式来决定 this 的指向。下面这个例子：
```js
function fn() {
    console.log(this)
}
fn(); // Window {...}
```
默认全局对象就是调用者,等价于 `window.fn()`（只讨论浏览器中全局对象）。但是在非严格模式中，this 是指向 undefined 的，比如：
```js
'use strict';
function fn() {
    console.log(this);
}
fn(); // undefined
window.fn(); // Window {...}
```
这就说明了，如果不指定函数调用者，在严格模式下回默认绑定到全局对象，在非严格模式下默认指向 undefined 。

函数是独立调用，还是被某个对象所调用，是很容易分辨的，比如：
```js
'use strict';
var a = 20;
function fn() {
    var a = 1;
    var obj = {
        a: 10,
        c: this.a + 20
    }
    return obj.c
}
console.log(window.fn()); // 40
console.log(fn()); // TypeError
```
对象字面量的形式不会产生自己的作用域，所以 obj 中的 `this.a` 并不是指向 obj ，而是与函数内部的 this 一样。因此，当 `window.fn()` 调用时，fn 内部的 this 指向 window 对象，此时 `this.a` 访问全局对象中的 a ；由于是在严格模式中，在没有指明调用者的时候，fn 内部默认指向 undefined，所以在单独调用的时候会报错。

### call/apply/bind 显示绑定 this
JavaScript 中提供了一个方式可以让我们手动指定函数内部的 this 指向，也就是前面提到的隐式传递对象，它们就是call/apply/bind。这三个方法是 Function 的原型方法，所有函数都可以调用这三个方法。看下面这个例子：
```js
var a = 20;
var obj = {
    a: 40
}
function fn() {
    console.log(this.a);
}
fn(); // 20
fn.call(obj); // 40
fn.apply(obj); // 40
```
当函数调用 apply/bind 时，表示执行该函数，并且这个函数内部的 this 指向 apply/bind 的第一个参数。

二者的区别：
* call 的第一个参数是函数内部 this 的指向，后续的参数则是函数执行时所需要的参数，一个一个传递
* apply 的第一个参数与 call 相同，而执行函数的参数，则以数组的形式传入

bind 方法也能指定函数的 this ，但是它不同于call/apply。bind 方法会返回一个新函数，这个函数与原函数有相同的函数体，但是函数内部的 this 被绑定成 bind 方法的第一个参数，后续参数也是一个一个传入，并且不会自动执行新函数。

### 构造函数中的 this
可以把构造函数看成是普通函数，其中的 this 指向是创建的对象实例，之所以称之为构造函数，是因为我们会借助 new 操作符来调用函数。在用 new 创建对象时，this 指向发生改变是在第二步：

1. 创建一个对象实例
2. 将构造函数中的 this 指向这个对象
3. 执行构造函数中的代码
4. 返回这个新创建的对象

```js
function Foo() {
    this.a = 20
}
var foo = new Foo()
console.log(foo.a) // 20
```

### 箭头函数中的 this
箭头函数内部是不会绑定 this 的，它会捕获外层作用域中的 this，作为自己的 this 值。比如：
```js
function Person() {
  this.age = 20;
  (() => {
    this.age++
  })()
}
var p = new Person()
console.log(p.age)
```

### DOM事件中的 this
当函数被当做监听事件处理函数时， 其 this 指向触发该事件的元素 （针对于addEventListener事件）。比如：
```html
<div class="box">
    click
</div>
```
```js
document.querySelector('.box').addEventListener('click', function(e) {
  console.log(this) // 这个this指向div.box元素
}, false)
```

## 总结
this 的使用场景丰富多样，可以用来实现继承，实现函数柯里化等，作为开发者应该清楚各种使用方式以及其内部原理。

