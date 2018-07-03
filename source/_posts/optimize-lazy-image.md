---
title: 优化图片懒加载
date: 2018-06-27 15:18:28
tags: javascript
---

对于上篇博客，图片懒加载的实现的一些优化。

<!-- more -->

## 一些优化的点

### 滚动函数的节流
只要滚动条滚动，就会把页面上所有的图片都遍历一遍，这显然会消耗很多性能。所以，需要对滚动事件进行节流处理。这个滚动场景下，两次连续的滚动事件的调用，其时间间隔，必须大于设置的一个阈值。
```javascript
$(window).on('scroll',function () {
    throttle(lazyRender, 200);
})
function lazyRender() {
    $('.container img').each(function () {
        if (checkShow($(this)) && !isLoaded($(this)) ){
            loadImg($(this));
        }
    })
}
//节流
function throttle(fn, delay, atleast) {
   var timer = null;
   var previous = null;
   return function () {
       var now = +new Date();
       if ( !previous ) previous = now;
       if ( atleast && now - previous > atleast ) {
           fn();
           // 重置上一次开始时间为本次结束时间
           previous = now;
           clearTimeout(timer);
       } else {
           clearTimeout(timer);
           timer = setTimeout(function() {
               fn();
               previous = null;
           }, delay);
       }
   }
};
```

### 预加载
预加载就是预先加载视口上一屏和下一屏的图片，也就是说滚动条滚动的时候，会加载三屏的图片，这样页面滑动的时候，用户不会看到图片加载的过程，提高用户体验。
