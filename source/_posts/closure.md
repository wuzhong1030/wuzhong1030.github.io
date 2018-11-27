---
title: 深入理解闭包
date: 2018-09-26 09:47:16
tags: javascript
---

再次学习闭包

## 闭包的含义
> 通俗的说，就是内部函数引用了外部函数的变量

```js
function f1 () {
    var a = 1
    function f2 () {
        console.log(a)
    }
    f2()
}
f1()
```
f2是一个引用了自由变量的函数，此时就形成一个闭包。如果没有引用外部变量，就不会形成闭包，比如：
```js
function f1 () {
    var a = 10
    function f2 () {
        console.log('f2 call')
    }
    f2()
}
f1()
```
上面这个例子就不是一个闭包函数。 
## 闭包的理解
闭包的最大特点就是引用的外部变量，可以理解成子函数引用了父函数的变量，也可以是“父的父”
```js
function f1 () {
    var a = 1
    function f2 () {
        var b = 2
        function f3 () {
            console.log(a)
        }
        f3()
    }
    f2()
}
f1()
```
这种情况也会形成闭包，f3就是一个闭包函数，可以看出闭包的本质其实就是作用域链，f3的[scope]域指向f2的词法环境，而f2的[scope]又指向f1的词法环境。
> 按照维基百科的解释，闭包是词法闭包的简称，是引用了自由变量的函数，这个被引用的自由变量和函数一同存在，即使离开了创造它的环境也不例外。

这段话可以用下面这个例子解释:
```js
function f1 () {
    var a = 1
    return function f2 () {
        console.log(a)
    }
}
var fn = f1()
fn()
```
f2函数被返回出去，变量a已经脱离的f1的词法环境，但是f2依然是一个闭包函数。 
## 闭包的好处
1. 减少全局变量污染
```js
function add () {
    var a = 0
    return function () {
        a++
        console.log(a)
    }
}
var fn = add()
fn() // 1
fn() // 2
```
使用闭包，就可以不需要把变量a放到全局

2. 减少传递给函数的参数
写一个函数，参数base作为基数，max是从1一次递加；比如base=2,max=4,则返回值为2+(1+2+3+4)
```js
function calFactory (base) {
    return function (max) {
        var total = 0
        for (var i = 1; i <= max; i++) {
            total += i
        }
        return total + base
    }
}
var adder = calFactory(2)
var result = adder(4) //12
```

3. 封装
## 闭包使用的注意点

* 闭包捕获的变量是引用，不是复制
* 父函数每调用一次，会产生不同的闭包
* 内存消耗