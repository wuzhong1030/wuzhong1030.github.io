---
title: image-lazyload
date: 2018-06-26 21:05:06
tags: lazyload, javascript
---
对于优秀的前端应用，尤其是移动端应用，当加载大量图片的时候，使用图片懒加载的手法尤为重要，这不仅可以节省流量，同时可以提高用户体验。总的来说，所谓图片懒加载，就是当用户进入页面，只显示这个视口的图片，用户滚动页面时，再加载下面的图片。
### 整体思路

* 给所有img标签设置一个data-src属性，该属性用来存放图片的真实src
* 然后当页面滚动的时候，找出当前视口的所有img标签，再判断img是否已经加载，如果没有加载，那么加载该img

```javascript
//监听滚动条
$(window).on('scroll',function () {//当页面滚动的时候绑定事件
    $('.container img').each(function () {//遍历所有的img标签
        if (checkShow($(this)) && !isLoaded($(this)) ){
            // 需要写一个checkShow函数来判断当前img是否已经出现在了视野中
            //还需要写一个isLoaded函数判断当前img是否已经被加载过了
            loadImg($(this));//符合上述条件之后，再写一个加载函数加载当前img
        }
    })
})
function checkShow($img) { // 传入一个img的jq对象

}
function isLoaded ($img) {

}
function loadImg ($img) {
    
}
```

#### 先实现 checkShow 方法
* 滚动条向下滑动，页面向上滚动，当img的下边沿出现在浏览器（视口）的底部时，该img完成出现在浏览器中，此时，img距离页面顶部的距离=滚动条滚动的距离+浏览器高度
* 页面继续向上滚动，当img出现在浏览器的上边沿，此时，滚动条滚动的距离=img距离页面顶部的距离

```javascript
function checkShow($img) { // 传入一个img的jq对象
    var scrollTop = $(window).scrollTop();  //即页面向上滚动的距离
    var windowHeight = $(window).height(); // 浏览器自身的高度
    var offsetTop = $img.offset().top;  //目标标签img相对于document顶部的位置

    if (offsetTop < (scrollTop + windowHeight) && offsetTop > scrollTop) { //在2个临界状态之间的就为出现在视野中的
        return true;
    }
    return false;
}
```

#### 判断目标标签是否已经被加载过
```javascript
function isLoaded ($img) {
  return $img.attr('data-src') === $img.attr('src'); //如果data-src和src相等那么就是已经加载过了
}
```

#### 加载目标标签
```javascript
function loadImg ($img) {
	$img.attr('src',$img.attr('data-src')); // 加载就是把自定义属性中存放的真实的src地址赋给src属性
}
```

以上是在页面滚动的情况下，才会触发方法，不够完善，所以应该在页面加载完成后，自动查找首屏下的img
```javascript
$('.container img').each(function () {
    if (checkShow($(this)) && !isLoaded($(this)) ){
        loadImg($(this));
    }
})
```

**最终代码**
```javascript
lazyRender();
$(window).on('scroll',function () {
    lazyRender();
})
function lazyRender () {
    $('.container img').each(function () {
        if (checkShow($(this)) && !isLoaded($(this)) ){
            loadImg($(this));
        }
    })
}
function checkShow($img) { // 传入一个img的jq对象
    var scrollTop = $(window).scrollTop();  //即页面向上滚动的距离
    var windowHeight = $(window).height(); // 浏览器自身的高度
    var offsetTop = $img.offset().top;  //目标标签img相对于document顶部的位置

    if (offsetTop < (scrollTop + windowHeight) && offsetTop > scrollTop) { //在2个临界状态之间的就为出现在视野中的
        return true;
    }
    return false;
}
function isLoaded ($img) {
    return $img.attr('data-src') === $img.attr('src'); //如果data-src和src相等那么就是已经加载过了
}
function loadImg ($img) {
    $img.attr('src',$img.attr('data-src')); // 加载就是把自定义属性中存放的真实的src地址赋给src属性
}
```

以上，scroll 事件会非常频繁的触发，需要优化，可以借助 函数节流 来实现，在滚动条滚动的过程中，每隔200ms执行一次checkShow。
