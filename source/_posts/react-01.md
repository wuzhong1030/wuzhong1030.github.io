---
title: react 学习笔记 (一)
date: 2018-11-08 15:24:17
tags: javascript, react
---

### 初识 React

<!-- more -->

#### 什么是React
React是Facebook开源的js库，用于灵活的构建用户界面，可以看出MVC中的V层

#### React三大特点
* 组件（类）
React一切都是基于组件的，这里涉及到如果创建组件，以及无状态组件，组件之间的通信，组件的渲染等

* JSX
用写HTML的方式来写JS，不仅可以使用HTML的标签，也可以写自定义标签，标签一定要闭合，否则无法通过编译。最外层的组件根元素只允许使用单一元素，因为会变编译成React.createElement()，这个函数的第一个参数只允许传入一个元素。

* 虚拟DOM
虚拟DOM是在真实DOM的基础上建立的一层抽象，我们对数据和状态的修改，会被自动且高效的同步到虚拟DOM中，这会带来非常可观的性能收益。因为会减少不必要的重排重绘以及读写DOM，对页面渲染性能有大幅提升。
在React中，React会在内存维护一个虚拟DOM树，其本质就是js对象，当数据发生变化时，React会自动更新虚拟DOM，然后拿新的虚拟DOM和旧的虚拟DOM进行比对，找到变更的部分，得到一个Patch，放进队列里面，最终批量更新这些Patch到真实DOM中。

#### 第一个组件
```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Hello extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: 'world'
        }
    }
    render() {
        return(
            <div>Hello { this.state.name }, { this.props.content }</div>
        )
    }
}
Hello.propTypes = {
    content: PropTypes.string
}
export default Hello
```
> UI = Component(props, state)

组件根据props和state两个参数，计算出对应的UI界面。
props，是对外提供的接口，可以简单的理解为props是构造函数的参数
state，控制组件的表现，用来存放组件的交互状态
* 不能直接修改state
* state的更新是异步的
调用setState，组件的state并不会马上改变，React会把要修改的状态放进一个队列，在正确的时机来执行修改，并且React会出于性能考虑，会把多次setState合并成一次修改。所以不能依赖当前的state，计算下个state。当真正执行状态修改时，依赖的this.state并不能保证是最新的state，因为React会把多次state的修改合并成一次，这时，this.state还是等于这几次修改发生前的state。另外需要注意的是，同样不能依赖当前的props计算下个state，因为props的更新也是异步的。比如
对于一个电商项目，在添加购物车场景下，调用this.setState({quantity: this.satet.quantity+1})，连续调用两次，在React合并多次修改为一次的情况下，相当于等价执行了如下代码：

```js
Object.assign(
  previousState,
  {quantity: this.state.quantity + 1},
  {quantity: this.state.quantity + 1}
)
```
```js
// 正确
this.setState((preState, props) => ({
  counter: preState.quantity + 1; 
}))
```
* State 的更新是一个浅合并（Shallow Merge）的过程
当调用setState修改组件状态时，只需要传入发生改变的状态变量，而不是组件完整的state，因为组件state的更新是一个浅合并（Shallow Merge）的过程，比如

```js
this.state = {
  title : 'React',
  content : 'React is an wonderful JS library!'
}
```
当只需要修改title的时候，只需要把修改后的title传给setState
```js
this.setState({
    title: 'ReactJS'
})
```


参考
- [深刻理解 React (一) ：JSX 和虚拟DOM](https://cloud.tencent.com/developer/article/1004403)