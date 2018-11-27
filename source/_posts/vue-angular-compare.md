---
title: vue和angular数据绑定原理对比
date: 2018-06-28 21:50:14
tags: vuejs, angular
---
 
angular1.0 和 vue2.0

## angular
angularJs 实现的双向绑定是通过脏值检查，来比对数据是否有变更，并且只有在以下场景才会进入脏值检查：
* DOM事件，用户输入文本，点击按钮等（ng-click）
* XMLHttpRequest请求
* $timeout，$interval
* Location变更
* 强制$digest() 或 $apply()

## vue
vue采用数据劫持并结合发布者-订阅者模式的方式，通过Object.defineProperty()，实现对各个属性的劫持，给每个属性加上 getter() 和 setter() 方法，当数据变动的时候，发布消息给订阅者，触发相应的回调