---
title: stack
date: 2019-01-25 21:34:08
tags: 数组结构
---

## 前言
数组是 JS 中最常用的数据结构，它可以在任意位置添加或删除数据。栈是另外一种数据结构，类似于数组，但是在添加或删除数据时更加灵活。

## 栈数据结构
栈是一种 **后进先出（LIFO）** 的数据结构。新添加或待删除的元素都保存在栈的一端，叫 **栈顶** ，另一端就叫做 **栈底** 。在栈中，新元素都靠近栈顶，就元素都靠近栈底。

### 创建栈
可以用数组来模拟一个栈结构：
```js
function Stack() {
    let items = []
    // 栈的属性和方法
}
```
需要实现的方法：
* push(element): 添加一个元素到栈顶
* pop(): 移除栈顶的元素，并返回该元素
* peek(): 仅仅返回栈顶的元素
* clear(): 清空栈
* size(): 返回栈中的元素的个数
* isEmpty(): 判断栈是否为空

```js
// 向栈中添加元素
this.push = function (element) {
    items.push(element)
}
// 从栈中移除元素
this.pop = function () {
    return items.pop()
}
// 查看栈顶元素
this.peek = function () {
    return items[item.length - 1]
}
// 检查栈是否为空
this.isEmpty = function () {
    return !!item.length
}
// 清空栈中的元素
this.clear = function () {
    items = []
}
// 返回栈的大小
this.size = function () {
    return items.length
}
// 打印栈
this.print = function () {
    console.log(console.log(items.toString()))
}
```

### ES6 与 栈
ES6 的写法：
```js
class Stack {
    constructor() {
        this.items = []
    }
    push (element) {
        this.items.push(element)
    }
    // ... 其他方法
}
```
ES6 的类是基于原型的，虽然基于原型的类比基于函数的类更节省内存，但是却不能声明私有变量，所以变量 items 是公共的。这种情况下，可以直接通过修改 items 来修改栈中的数据，这是无法避免的。

#### 用 ES6 的限定作用域 Symbol 实现类
ES6 新增了 Symbol 基础类型，它是不可变的，也可以作用对象的属性。
```js
let _items = Symbol()
class Stack {
    constructor() {
        this[_items] = []
    }
    // ... 其他方法
}
```
上面这个例子创建了一个假的私有属性，不能完全规避上面提到的问题，因为 ES6 新增的 `Object.getOwnPropertySymbols` 方法能够取到类里面声明的所有 Symbols 属性，比如：
```js
let stack = new Stack()
stack.push(66)
stack.push(88)
let objectSymbols = Object.getOwnPropertySymbols(stack)
console.log(objectSymbols.length) // 1
console.log(objectSymbols[0]) // Symbol()
stack[objectSymbols[0]].push(1)
stack.print() // 66 88 1
```
> 通过访问 stack[objectSymbols[0]] 是可以访问 _items 的，并且可以对 _items 进行任意操作。

#### 用 ES6 的WeakMap 实现类
有一种数据类型可以确保属性是私有的，这就是 **WeakMap** 。WeakMap 可以存储键值对，其中键是对象，值可以是任意数据类型。
```js
const items = new WeakMap()
class Stack {
    constructor() {
        items.set(this, [])
    }
    push(element) {
        let s = items.get(this)
        s.push(element)
    }
    pop() {
        let s = items.get(this)
        return s.pop()
    }
    // ... 其他方法
}
```
现在，Stack 中的 items 是私有的了，但是 items 是在 Stack 类以外声明的，还是可以被改动，所以需要借助闭包来实现一层封装：
```js
let Stack = (function () {
    const items = new WeakMap()
    class Stack {
    constructor() {
        items.set(this, [])
    }
    // ... 其他方法
    return Stack
}
})()
```
 
 ### 用栈解决实际问题
 栈在 JS 中应用还是十分广泛的，比如 **调用栈** 。进制转换也是很常见的例子，可以用 栈 来处理，比如要把十进制转化成二进制，可以将该十进制数字和2整除，直到结果是 0 为止。
 ```js
 function divideBy2 (decNumber) {
     var remStack = new Stack(),
         rem,
         binaryString = ''
    
    while (decNumber > 0) {
        rem = Math.floor(decNumber % 2)
        remStack.push(rem)
        decNumber = Math.floor(decNumber / 2)
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString()
    }
    return binaryString
 }
 ```
 这个例子中，当结果满足和2做整除的条件是，会取得当前结果和2的余数，放到栈里，然后让结果继续和2做整除。
 
 #### 改进算法
 把上面的例子改成十进制转成任意进制的：
 ```js
 function baseConverter(decNumber, base) {
      var remStack = new Stack(),
         rem,
         binaryString = '',
         digits = '0123456789ABCDEF'
    
      while (decNumber > 0) {
         rem = Math.floor(decNumber % base)
         remStack.push(rem)
         decNumber = Math.floor(decNumber / base)
      }
      while (!remStack.isEmpty()) {
         binaryString += digits[remStack.pop()]
      }
    return binaryString
 }
 ```