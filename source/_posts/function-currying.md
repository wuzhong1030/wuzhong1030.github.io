---
title: 函数柯里化的实际应用
date: 2018-06-12 10:17:48
tags: javascript, currying
---

函数柯里化，是把接受多个参数的函数转换成接受原函数第一个参数的函数，并且接受原函数的其余参数和返回结果的一个新函数。简单的说就是函数部分求值，分步给函数传递参数，每次传递参数后，只取第一个参数求值，并且返回一个接受其余参数的新函数。

<!-- more -->

```js
var currying = function(fn) {
    var slice = Array.prototype.slice,
        __args = slice.call(arguments, 1);
    return function() {
        var __inargs = slice.call(arguments);
        return fn.apply(null, __args.concat(__inargs));
    }
}
```
这是函数柯里化的通用写法。
###应用场景

## 1. 延迟计算
```js
var currying = function(fn) {
    var args = [];
    return function result(...rest) {
        if (rest.length === 0) {
            return fn(...args);
        } else {
            args.push(...rest);
            return result;
        }
    }
}
var addFn = (...args) => args.reduce((a, b) => a + b);
var sum = currying(addFn);
sum(1,2,3)(4);
var res = sum(5);
res(); //15
```
**这里利用了闭包的功能保存了函数的执行状态**
## 2. 动态创建函数
 写一个兼容现代浏览器和IE浏览器的添加事件方法，通常会这样写：
```js
const addEvent = function(ele, type, fn, capture) {
    if(window.addEventListener) {
        ele.addEventListener(type, (e) => fn.call(ele, e), capture)
    } else if(window.attachEvent) {
        ele.attachEvent('on' + type, (e) => fn.call(ele, e))
    }
}
```
这个写法不够好，因为每次都会执行一次判断，而这个添加事件应该只需要判断一次即可。
用柯里化可以优化这段代码：
```js
const addEvent = function() {
    if(window.addEventListener) {
        return function(ele, type, fn, capture) {
            ele.addEventListener(type, (e) => fn.call(ele, e), capture)
        }
    } else if(window.attachEvent) {
        return function(ele, type, fn, capture) {
            elem.attachEvent('on' + type, (e) => fn.call(elem, e);
        }
    }
}
```
这里动态创建了一个新的函数，后面使用只需传入参数即可。
## 3. 参数复用
 当多次调用一个函数的时候，并且传递的参数大都相同，这个时候就可以应用柯里化函数。
例如：
```js
const obj = {name: 'test'};
const foo = function(prefix, suffix) {
    console.log(prefix + this.name + suffix);
}.bind(obj, 'currying-');
foo('-function'); // currying-test-function
```
bind方法的作用是，把第一个参数设置成函数执行的上下文环境，其余参数依次传入给调用的方法，函数自身不会执行，可以看成是一个延迟执行的函数。所以bind的实现应用到了柯里化思想。
手动实现一个bind方法：
```js
Function.prototype.bind = function(context, ...args) {
    return (...rest) => this.call(context, ...args, ...rest);
}
```
** 这里的this指向的是bind的调用对象，通过this.call把bind的第一个参数，即context设置成上下文。**


