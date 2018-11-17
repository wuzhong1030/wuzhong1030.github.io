---
title: 浅谈箭头函数
date: 2018-11-17 10:19:02
tags: es6, javascript
---

箭头函数（Arrow Functions）是ES6的引入的，它的语法比函数表达式更加简单，并且没有自己的this, arguments, super以及new.target。箭头函数更适用于那些本来就需要使用匿名函数的地方，并且箭头函数不能被作为构造器函数使用。

<!-- more -->

### 箭头函数语法
#### 基础语法
```js
(参数1, 参数2, ..., 参数N) => { 函数声明 }
(参数1, 参数2, ..., 参数N) => 表达式（单一形式）
//相当于(参数1, 参数2, ..., 参数N) => return 表达式

// 当参数只有一个的时候，可以不写括号
参数 => 表达式

// 但是如果没有参数，一定要加上括号
() => 表达式
```

#### 高级语法
```js
// 加括号的函数体返回对象字面表达式
参数 => ({ bar: 'foo' })
// 相当于 参数 => return { bar: 'foo' }

// 支持剩余参数和默认参数
(参数1, 参数2, ...rest) => { 函数声明 }
(参数1, 参数2 = '默认参数2', 参数3 = '默认参数3') => { 函数声明 }

// 支持参数解构
let f = ([a, b] = [1, 2], {c} = { c: 3 }) => a + b + c
f() // 6
```

### 特征
> 一般引入箭头函数是为了更简单的编码以及不绑定this

#### 更简单的编码
```js
let fruits = ['apple', 'orange', 'banner', 'grape']
// 普通写法
let wordLength = fruits.map(function (word) {
    return word.length
})
// 箭头函数写法
let wordLength = fruits.map(word => word.length)
```

#### 不绑定this
在箭头函数出现之前，每个函数都有自己的this指向。
当这个函数被作为构造函数使用的时候，这个this作为它自己的构造实例，在严格模式下函数调用中的this为undefined，如果该函数被作为”对象方法“调用则为基础对象。
```js
function Person () {
    // Person作为构造函数，`this`作为它自己的实例
    this.age = 0

    setInterval(function growUp () {
        // 在非严格模式下，`this`作为全局对象
        // 这个`this`与在Person构造函数中定义的`this`不同
        this.age++
    })
}
let person = new Person()

// 上述的问题可以通过保存this变量或者直接使用箭头函数可以解决
function Person () {
    this.age = 0
    const self = this
    setInterval(function () {
        self.age++
    })
}
// 箭头函数方法
function Person () {
    this.age = 0
    setInterval(() => {
        this.age++
    })
}
```

#### 通过 call 或 apply 调用
由于箭头函数没有自己的this指向，通过call或者apply调用一个箭头函数的时候，只能传递参数（不能绑定this），传入的第一个参数会被忽略，这个现象也适用于bind。
```js
var obj = {
    num: 1,
    add: function (n) {
        var f = v => v + this.num
        return f(n)
    },
    add2: (n) => {
        return n + (this.num || 0)
    }
}
var _o = {num: 66}
console.log(obj.add(4))
console.log(obj.add2(4))
console.log(obj.add2.call(_o, 4))
console.log(obj.add.call(_o, 4))
console.log(obj.add2.bind(_o)(4))
console.log(obj.add.bind(_o)(4))
```

#### 不绑定arguments
箭头函数没有自己的arguments对象，arguments只是引用了封闭作用域内的arguments
```js
function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n
  return f();
}
foo(1); // 2
```
可以使用ES6的展开运算符解决这个问题
```js
function foo() { 
  var f = (...args) => args[0]; 
  return f(2); 
}
foo(1); 
// 2
```

#### 其余特征
* 箭头函数不能用作构造器，和 new一起用会抛出错误。
* 箭头函数没有prototype属性。
*  yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。


参考
- [箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)