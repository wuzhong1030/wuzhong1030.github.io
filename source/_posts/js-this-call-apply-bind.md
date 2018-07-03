---
title: 理解javascript中的this, call, apply, bind
date: 2018-07-03 15:56:49
tags: javascript
---

### 先来看下this

<!-- more -->

在 javascript 中，方法是怎么执行的

![enter image description here](http://payll5f18.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-07-03%20%E4%B8%8B%E5%8D%884.03.35.png)

方法执行需要有**直接调用者**，fn函数是在全局下定义的，调用的时候如果没有指定调用者，默认会是window，也就是说window.fn() === fn()，所以this指向的是window对象。
![enter image description here](http://payll5f18.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-07-03%20%E4%B8%8B%E5%8D%884.10.33.png)
这个例子说明，方法执行的**直接调用者**，是离这个被调用方法最近的那个对象，也就是分别是 obj 和 obj.sub，所以this的指向分别是 obj 和 obj.sub。


如果这样写
```javascript
var a = obj.sub.fn;
a(); //window-name
```
这个是因为 a() 还是等价于 window.a()，所以this的指向还是window。


### 使用call 和 apply 改变this
先来看看 call，谁调用谁

![enter image description here](http://payll5f18.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-07-03%20%E4%B8%8B%E5%8D%884.28.29.png)

说明，f1.call(f2)，被执行的还是f1。这样写的目的在于使 this 指向 f2

![enter image description here](http://payll5f18.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-07-03%20%E4%B8%8B%E5%8D%884.36.31.png)

obj1.fn.call(obj2, 10)，执行的是 obj1.fn() ，但是this的指向是obj2的this，所以 this.num = 15

> 总结，call 函数的作用是改变被执行方法的**直接调用者**，也就是 this，会重新指向新的调用者，也就是 call 函数的第一个参数。有两个特殊情况，当call 函数的第一个参数是null或者是undefined的时候，this会指向window

### call 和 apply 的区别

这两个方法类似，第一个参数都是一样的，不同点在于，call方法除了第一个参数，还可以接受其余一串的参数，也就是动态参数，而 apply 的第二个参数是一个数组，都是作为被执行方法的参数传入的


### bind

bind方法与call方法类似，只是在调用bind方法后，并不能立即执行，需要再调用一次才可以执行函数，是柯里化函数的语法糖