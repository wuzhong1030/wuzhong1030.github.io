---
title: react 学习笔记 (三)
date: 2018-11-09 10:38:26
tags: react, javascript
---

### 深入理解 React Fiber

<!-- more -->

#### React Fiber 是什么
用官方的话说，React Fiber是一次对核心算法的重新实现，这是在React v16版本上添加的。Fiber的英文含义就是“纤维”，意思就是比线程（Thread）更细的线，也就是比线程控制的更精密的处理机制。我的理解就是Fiber是一种新的调度方式，更加灵活高效。

#### 解决什么问题
这个要归根于浏览器中的渲染引擎是单线程的，除了网络操作，几乎所有的操作都是在这个单线程中执行的，包括JS解析执行，解析渲染DOM Tree和CSS Tree。这就意味着，一段时间只能做一件事，比如解析执行JS，即使有其他任务，也要排队等待。
这样的机制，在React中就会带来问题，因为在现有的React中，组件的更新是同步执行的。当React要更新组件的时候，会执行一系列的生命周期函数，然后计算出Virtual DOM，对比，patch，这整个过程都是同步执行的，也就是在这一过程，浏览器只专注于这件事，无法响应用户的其他操作。
所以这就会带来一个问题，比如一个大型应用，有一个组件嵌套层级很深，当它在更新的过程中，用户在input框进行了输入操作，这时候浏览器无法响应用户的输入，就会出现卡顿甚至卡死现象，这样用户体验就会很差。因为更新过程是同步地一层组件套一层组件，逐渐深入的过程，在更新完所有组件之前不停止。

#### 如何解决
React v16引入React Fiber的方式来解决这个问题，具体是怎么解决的？
React Fiber会把更新过程碎片化，每执行完一段更新过程，就把控制权交还给React负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。

维护每一个分片的数据结构，就是Fiber。

在React Fiber中，一次更新过程会被分成多个片段执行，这就完全有可能在一个更新过程没有完全结束就被优先级更高的任务打断，React会执行优先级更高的任务，等到执行完成，更新过程需要重头再来。

React Fiber会把一个更新过程分成两个阶段
* 协调阶段 Reconciliation Phase
在这个阶段，React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的，在这个阶段会执行的生命周期：
    * componentWillMount
    * componentWillUpdate
    * shouldComponentUpdate
    * componentWillReceiveProps
* 渲染阶段 Commit Phase
这一阶段不会被打断，React会把DOM更新完成，在这一阶段执行的生命周期函数：
    * componentDidMount
    * componentDidUpdate
    * componentWillUnmount

因为第一阶段有可能会被打断导致更新重头执行，就这有可能导致了第一阶段的生命周期函数会在更新过程中反复执行多次
