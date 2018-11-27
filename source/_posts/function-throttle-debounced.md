---
title: 函数节流，函数去抖
date: 2018-06-04 11:18:54
tags: javascript, 函数节流, 函数去抖
---

> 介绍概念

函数节流（throttle）: 是阻止一个函数在短时间内调用多次，这个函数的作用是设置一个时间间隔，当上次函数触发后，必须经过设置的时间，才可以继续调用。
函数去抖（debounce）: 一个函数如果在规定的时间内没有执行，则执行回调方法。

> 使用场景

 - window对象的resize, scroll事件
 - mousemove事件
 - keydown事件

咋一看这两个概念很像，其实不然。但是这两个方法，都是用来提升前端性能，减轻浏览器压力。

> 分别用代码区分这两个概念

1. 函数节流 （throttle）
```javascript
var throttle = function(delay, cb) {
    var startTime = +new Date();
    return function() {
        var currentTime = +new Date();
        if (currentTime - startTime > delay) {
            cb && cb();
            startTime = currentTime
        }
    }
}
```

> 在window的scroll事件下，假设拖动滚动条就会打印1，如果不使用上面这个函数，只要一拖动滚动条就会打印很多1，这样性能很差，不是我们想要的。用上面这个函数，可以实现在拖动滚动条的过程中，在一定的时间间隔内打印1。这个就是函数节流，节省不必要的函数执行。

2.函数去抖
```javascript
var debounce = function(delay, cb) {
    var timer;
    return function() {
        if(timer) clearTimeout(timer);
        timer = setTimeout(function () {
        cb && cb();
        }, delay)
    }
}
```

> 当上面这个函数调用后，必须等待一个时间（delay），才可以执行这个函数。这个经常用于搜索查询场景下，当用户在输入的过程中，输入框的change事件，不必要用户每输入一个字符就去查询，这样也是消耗性能。比如上面那个滚动条的例子，在使用函数去抖后，只有在停止滚动后，等待delay时间，才会触发回调函数，如果在时间间隔内又继续滚动了，则会在下一次停止滚动后，再一次重新等待delay时间，然后执行回调函数。

总结一下，这两种函数本质上不一样，防抖动是把多次执行变成最后一次的执行函数，而函数节流是把多次执行变成每隔一段时间执行。


