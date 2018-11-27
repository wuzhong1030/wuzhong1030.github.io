---
title: Object的静态方法学习
date: 2018-11-14 13:56:23
tags: javascript
---

ES5, ES6, ES7的Object静态方法

* Object.keys(obj)
> 返回一个所有元素为字符串的数组，其元素来自于从给定的object上面**可直接枚举**的属性。这些属性的顺序与手动遍历该对象属性时的一致。
```js
let arr = [1,2,3]
console.log(Object.keys(arr)) // ["0", "1", "2"]

let obj = {a: 1, b: 2, c: 3}
console.log(Object.keys(obj)) // ["a", "b", "c"]
```

* Object.getOwnPropertyNames(obj)
> 返回一个数组，该数组对元素是 obj**自身拥有的枚举或不可枚举**属性名称字符串。 数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。
```js
var arr = ["a", "b", "c"]
console.log(Object.getOwnPropertyNames(arr)) // ["0", "1", "2", "length"]

var obj = { 0: "a", 1: "b", 2: "c"}
console.log(Object.getOwnPropertyNames(obj)) // ["0", "1", "2"]
```

* Object.values()
> 返回一个数组，其元素是在对象上找到的**可枚举属性值**。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
```js
var obj = { foo: 'bar', baz: 42 }
console.log(Object.values(obj)) // ["bar", 42]

var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo } } })
my_obj.foo = 'bar'
console.log(Object.values(my_obj)) // ["bar"]
```

* Object.entries(obj)
> 返回一个数组，其元素是与直接在object上找到的**可枚举属性键值**对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
```js
const obj = { foo: 'bar', baz: 42 }
console.log(Object.entries(obj)) // [["foo", "bar"], ["baz", 42]]

const anObj = { 100: 'a', 2: 'b', 7: 'c' }
console.log(Object.entries(anObj)) // [["2", "b"], ["7", "c"], ["100", "a"]]

const myObj = Object.create({}, {
    getFoo: {
        value() {
            return this.foo
        }
    }
})
myObj.foo = 'baz'
console.log(Object.entries(myObj)) // ["foo", "baz"]
console.log(Object.entries('foo')) // [["0", "f"], ["1", "o"], ["2", "o"]]
```

* Object.getOwnPropertyDescriptor
> 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```js
const o = {a: 1}
let d = Object.getOwnPropertyDescriptor(o, 'a')
console.log(JSON.stringify(d)) //{"value":1,"writable":true,"enumerable":true,"configurable":true}

let obj = {}
Object.defineProperty(obj, 'a', {
    enumerable: false,
    value: 22
})
console.log(JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'a'))) 
//{"value":22,"writable":false,"enumerable":false,"configurable":false}
```

* Object.freeze()
> 冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。
```js
let obj1 = {a: 22}
let obj2 = Object.freeze(obj1)
obj2.a = 333
console.log(obj2.a) // 22
```