---
title: react 学习笔记 (二)
date: 2018-11-08 16:51:08
tags: javascript, react
---

### React生命周期

<!-- more -->

React中生命周期是相对于组件来说的，一个组件从被创建到被卸载这一过程，称为生命周期。其中每一个节点，都有及其重要的作用。

### 初次渲染

1. constructor，指定this，初始化state，绑定函数
2. componentWillMount()
在组件挂载之前调用，并且永远都只执行一次，所以如果在这里定义了setState方法之后，页面永远都只会在加载前更新一次。
3. render()
必须要有这个函数，因为该方法不会继承父类，需要自己实现，且必须返回一个JSX元素
4. componentDidMount()
在第一次渲染后调用，此时组件已经渲染出dom结构，可以通过this.getDOMNode()来进行访问。 

### 二次渲染
1. componentWillReceiveProps(nextProps)
props是父组件传递给子组件的。当子组件接受到nextProps时，不管这个props与原来的是否相同都会执行该方法。

2. shouldComponentUpdate(nextProps, nextState)
shouldComponentUpdate方法接收一个新的props和state，函数返回一个bool类型数据决定是否更新组件。如果返回false，则不进行更新。如果返回true，则进入下一环节。通常情况下为了优化，我们需要对新的props以及state和原来的数据作对比，如果发生变化。

3. componentWillUpdate(nextProps, nextState)
当组件决定继续更新时，会进入componentWillUpdate方法

4. 然后会执行render()

5. 执行完render函数之后执行componentDidUpdata
除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate

当组件需要被卸载的时候，调用 componentWillUnmount 方法，一般在componentDidMount里面注册的事件需要在这里删除。
