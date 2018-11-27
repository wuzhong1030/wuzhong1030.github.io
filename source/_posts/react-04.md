---
title: react 学习笔记 (四)
date: 2018-11-12 11:22:38
tags: javascript, react
---

### 使用styled-components在React写CSS

React组件样式可以从多方面构建。styled-components库提供了一种更好的方式来书写React组件样式，

#### 安装
```bash
npm install styled-components --save
yarn add styled-components
```

#### 组件和容器
在styled-components中，把最简单的只包含样式的结构成为组件（component），把包含有复杂业务逻辑或者有生命周期函数（无样式）的称之为容器（container）。所以，组件和容器是分开的。
* component = how things look
* container = how things work

1. 没有使用styled-components
```js

```class Sidebar extends React.Component {
     render() {
       return (
         <div classNames="sidebar">
           {this.state.items.map(item => (
             <div className="sidebar__item">{item}</div>
           ))}
         </div>
       )
  }}
 ```

 2. 使用styled-components
 ```js
 class SidebarContainer extends React.Component {
  render() {
    return (
      <Sidebar>
        {this.state.items.map(item => (
          <SidebarItem>{item}</SidebarItem>
        ))}
      </Sidebar>
    )
  }}
 ```

 #### 组件样式继承
 通常在css中，通过传入多个类名，并且以逗号分隔来定义样式，这样可以实现样式复用。在styled-components中利用了js实现对样式的继承复用
 ```js
 const Button = styled.button` 
 color: palevioletred; 
 font-size: 1em; 
 margin: 1em; 
 padding: 0.25em 1em; 
 border: 2px solid palevioletred; 
 border-radius: 3px;
`
const TomatoButton = Button.extend`  
 color: tomato; 
 border-color: tomato;
`
 ```

 #### styled-components 和 className 混用
 ```js
 import styled from 'styled-components'
const Wrapper = styled.div`
    display: block;
    h4 {
        font-size: 14px;
        &:hover { 
           color: #fff;
        } 
     } 
    .detail {    color: #ccc;  }
`
 ```

 #### 设置全局样式
 ```js
 import { createGlobalStyle } from 'styled-components'
 const globalStyle = createGlobalStyle`
    body { 
        margin: 0; 
    }
 `
 ```

 #### CSS 动画支持
 styled-components 同样对 css 动画中的 @keyframe 做了很好的支持
 ```js
 import { keyframes } from 'styled-components'
const fadeIn = keyframes` 
    0% {    opacity: 0;  } 
    100% {    opacity: 1;  }
`
const FadeInButton = styled.button`
    animation: 1s ${fadeIn} ease-out;
`
 ```
 keyframes 方法会生成一个唯一的 key 作为 keyframes 的名称，保证它的作用域是在单个文件内，非全局的。
