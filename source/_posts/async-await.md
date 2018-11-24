---
title: async-await
date: 2018-06-21 20:28:13
tags: async, asait, promise
---
async 函数是 generator 函数的语法糖，是ES7的新特性，表示一个异步函数。async 函数内部的修饰符 await 表示把一个异步函数转成一个同步函数。

<!-- more -->

相比较于generator函数，async函数有以下几个改良：

 1. 更好的语义化。async表示一个异步函数，函数内部的await，表示等待一个异步返回的结果；
 2. 更广的适用性。yield后面只能跟Thunk函数或者Promise对象，而await后面不仅可以跟Promise对象，还可以接原始类型；
 3. 使用更方便。generator返回的是迭代器（Interator）,而async返回的是Promise对象，可以直接使用then方法进行调用。
 
#### 申明一个async函数
```js
async function asyncFn() {
    return `hello world`
}
asyncFn()
```
**返回的是一个Promise对象，状态是resolved**

#### 执行顺序
```js
async function asyncFn() {
    return `asyncFn`
}
asyncFn().then((result) => {
    console.log(result)
})
console.log('执行...')
// 执行...
// asyncFn
```
**这个是因为asyncFn被修饰成一个异步函数，会推入异步执行队列，不会影响后续函数的执行**
#### catch的用法
```js
async function asyncFn() {
    throw new Error(`a error`)
}
asyncFn().then(success => {
    console.log(success)
}).catch(error => {
    console.log(error)
})
//Error: a error
//    at asyncFn (<anonymous>:2:11)
//    at <anonymous>:4:1
```
**函数内部抛出一个异常，asyncFn接收后，判定Promise状态为reject，所以会进入到catch。**

> async接收到的值，只要不是错误，异常或者reject，都会判定为成功。而且async都要有return，把结果返回出去，如果没有return，则接收到的值是undefined。

## await

> await意为等待，这个关键字只能用在async修饰的函数中，任何的async函数都会返回Promise对象，即使是一个基本类型，都会被包装成一个Promise对象，并且这个promise解析的值是这个函数返回的值，而且async函数会等待其内部所有的await命令执行完，promise的状态才会发生改变，有点类似于promise.all()。
```js
async function awaitFn() {
    var a = await 1
    return a
}
awaitFn().then(success => console.log('成功', success))
            .catch(error => console.log('失败',error))
// 成功 1
```
**这个函数里，会等到 await 1 执行完，promise的状态才会发生改变**

```js
const timeoutFn = function(timeout) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, timeout)
    })
}
async function fn() {
    await timeoutFn(1000)
    await timeoutFn(2000)
    return 'finish'
}
fn().then(function(success) {
    console.log('success', success)
})
//三秒后会打印 success finish
```

> 正常情况下，await命令后面会跟一个Promise，如果不是Promise，会被包装成一个立即执行的resolve状态的promise。

**当async函数内部有多个await命令的时候，如果其中一个await出错，则会终止后面await的执行，遇到这种场景，可以使用try-catch来处理**
```js
let last;
async function errorFn() {
    try {
        await Promise.reject('error')
        last = await '不会执行'
    }catch(e) {
        console.log('get an error')
    }
}
errorFn().then(success => console.log('success', last))
    .catch(errro => console.log('error', last))
//  get an error
//  VM694:10 success undefined
```


