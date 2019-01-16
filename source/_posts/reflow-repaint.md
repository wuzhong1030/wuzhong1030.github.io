---
title: 你应该要知道的重绘与重排
date: 2018-12-09 09:30:22
tags: css, html
---

## 前言

现代web框架大多都是数据驱动类的，比如 react, vue，所以开发者不需要直接接触 DOM，修改 data 便可以驱动界面更新。但是作为前端工程师，了解浏览器的重绘与重排还是很有必要的，可以帮助我们写出更好性能的 web 应用。

## 浏览器的渲染

* CSS Tree: 浏览器将 CSS 解析成 CSSOM 的树形结构
* DOM Tree：浏览器将 HTML 解析成树形的数据结构
* Render Tree：将 DOM 与 CSSOM 合并成一个渲染树

有了渲染树（Render Tree）,浏览器就知道网页中有哪些节点，以及各个节点与 CSS 的关系，从而知道每个节点的位置和几何属性，然后绘制页面。

## 重绘与重排
当 DOM 的变化影响了元素的几何属性（比如 width 和 height ）,就会导致浏览器重新计算元素的几何属性，同样受到该元素影响的其他元素也会发生重新计算。此时，浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程被称为重排(也叫“回流”)（reflow），完成重排之后，浏览器会重新绘制受影响的部分到页面上，这个过程就是重绘（repaint）。

所以重排一定会引起重绘，而重绘不一定会引起重排，比如一个元素的改变并没有影响布局的改变（background-color的改变），在这种情况下，只会发生一个重绘（不需要重排）。

### 引起重排的因素
可以总结出，当元素的几何属性或页面布局发生改变就会引起重排，比如：
* 对可见 DOM 元素的操作（添加，删除或顺序变化）
* 元素位置发生改变
* 元素的几何属性发生改变（比如：外边距、内边距、边框宽度以及内容改变引起的宽高的改变）
* 页面首次渲染
* 伪类样式激活（hover等）
* 浏览器视口尺寸发生改变（滚动或缩放）

## 如何优化
重绘与重排都是代价昂贵的操作（因为每次重排都会产生计算消耗），它们会导致 web 应用的 UI 反应迟钝，所以开发者在编写应用程序的时候应当尽量减少这类过程的发生。

### 渲染树队列
因为过多的重绘与重排可能会导致应用的卡顿，所以浏览器会对这个有一个优化的过程。大多数浏览器会通过队列化来批量执行（比如把脚本对 DOM 的修改放入一个队列，在队列所有操作都结束后再进行一次绘制）。但是开发者有时可能不知不觉的强制刷新渲染队列来立即进行重排重绘，比如获取页面布局信息会导致渲染队列的强制刷新，以下属性或方法会立即触发页面绘制：
* offsetTop、offsetLeft、offsetWidth、offsetHeight
* scrollTop、scrollLeft、scrollWidth、scrollHeight
* clientTop、clientLeft、clientWidth、clientHeight
* getComputedStyle()

以上属性和方法都是要浏览器返回最新的布局信息，所以浏览器会立刻执行渲染队列中的“待处理变化”, 并触发重排重绘然后返回最新的值。所以在修改样式的过程中，应该尽量避免使用以上属性和方法。

### 减少重绘与重排
为了减少重绘重排的发生次数，开发者应该合并多次对 DOM 的修改和对样式的修改，然后一次性处理。

#### 合并样式操作
比如：
```js
var el = document.querySelector('div');
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
el.style.padding = '5px';
```
可以合并成：
```js
var el = document.querySelector('div');
el.style.cssText = 'border-left: 1px; border-right: 1px; padding: 5px;'
```

#### 批量修改DOM
使元素脱离文档流，再对其进行操作，然后再把元素带回文档中，这种办法可以有效减少重绘重排的次数。有三种基本办法可以使元素脱离文档流：

##### 隐藏元素，应用修改，重新显示
```js
var ul = document.querySelector('ul');
ul.style.display = 'none';
// code... 对ul进行DOM操作
ul.style.display = 'block';
```

##### 使用文档片段（document fragment），构建一个空白文档进行 DOM 操作，然后再放回原文档中
```js
var fragment = document.createDocumentFragment();
// code... 对fragment进行DOM操作
var ul = document.querySelector('ul');
ul.appendChild(fragment)
```

##### 拷贝要修改的元素到一个脱离文档流的节点中，修改副本，然后再替换原始元素
```js
var ul = document.querySelector('ul');
var cloneUl = ul.cloneNode(true);
// code... 对clone节点进行DOM操作
ul.parentNode.replaceChild(cloneUl, ul)
```

### 缓存布局信息
前面已经知道，获取页面布局信息，会导致浏览器强制刷新渲染队列。所以减少这些操作是非常有必要的，开发者可以将第一次获取到的页面信息缓存到局部变量中，然后再操作局部变量，比如下面的伪代码示例：
```js
// 低效的
element.style.left = 1 + element.offsetLeft + 'px';
element.style.top = 1 + element.offsetTop + 'px';
if (element.offsetTop > 500) {
    stopAnimation();
}
// 高效的
var offsetLeft = element.offsetLeft;
var offsetTop = element.offsetTop;
offsetLeft++;
offsetTop++;
element.style.left = offsetLeft + 'px';
element.style.top = offsetTop + 'px';
if (offsetTop > 500) {
    stopAnimation();
}
```

## 总结
为了减少重绘重排带来的性能消耗，可以通过以下几点改善 web 应用：
1. 批量修改 DOM 和样式
2. “离线”操作 DOM 树，脱离文档流
3. 缓存到局部变量，减少页面布局信息的访问次数
