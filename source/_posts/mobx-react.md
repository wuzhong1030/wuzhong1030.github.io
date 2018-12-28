---
title: MobX--基于响应式的状态管理
date: 2018-12-28 11:21:06
tags: React, MobX
---

## 前言
MobX 是 Redux 之后的一个状态管理库，它相较于 redux 更轻量，整体是一个观察者模式的架构，存储 state 的 store 是被观察者，使用 store 的组件是观察者。MobX 可以有多个 store 对象，并且 store 使用的 state 是可以改变的。

## 概念简介
MobX 通过函数响应式编程的思想使得状态管理变得简单和易于扩展，其背后的哲学是：任何从应用程序的状态中获取/衍生的数据都应该可以自动被获取/衍生。和 Redux 一样，MobX 也是采用单向数据流：通过 action 改变应用的 state ，state 的改变会导致 view 的更新。

![单向数据流](https://user-gold-cdn.xitu.io/2018/12/27/167efef1f5b4cd83?w=1283&h=400&f=png&s=31300)

MobX 包含 4 个概念：state（状态）、computed value（计算值），reaction（响应），action（动作）。state 的更新过程是同步执行的，也就是说，action 更改 state 后，新的 state 可以立即被获取。而 computed value 采用的是延迟更新，只有当它被使用的时候才会重新计算值，当使用 computed value 的组件被卸载时，它也会被自动回收。

> MobX 中提到的 state 指的是可以观测的 state，因为对于不可观测的 state ，他们的修改并不会自动产生影响，对 MobX 的数据流来说是没有意义的。

MobX 中大量使用了 [ES.next](http://esnext.justjavac.com/) 的装饰器语法，这也是官方所推荐的，但装饰器语法目前还处于实验阶段，需要安装 [babel-plugin-transform-decorators-legacy](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy) 这个 babel 插件。

## 简单的 Todos 应用
通过 Todos 应用来简单介绍这 4 个概念。使用 class 定义一个可观测的 state Todo，代表一项任务：
```js
import { observable } from "mobx";
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```
这里使用的 @observable 就是装饰器语法，也可以使用 ES5 语法实现等价代码：
```js
import { extendObservable } from "mobx";
function Todo {
    this.id = Math.random();
    extendObservable(this, {
        title: "",
        finished: false
    });
}
```
经过 @observable 的修饰之后，Todo 的 title 和 finished 两个属性就变成可观测状态，他们的改变会自动被观察者获知。id 没有被 @observable 修饰，所以它只是一个普通属性。
基于可观测的 state 可以创建 computed value。例如，todos 中需要获取未完成任务的总数，使用 @computed 定义一个 unfinishedTodoCount，计算未完成任务的总数：
```js
import { observable, computed } from "mobx";
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```
TodoList的属性 todos 也是一个可观测的属性，数组里存放的是前面定义的 Todo 实例对象。当 todos 中的元素数量发生变化或者其中某个 todo 元素的 finished 属性变化，unfinishedTodoCount 都会自动更新（在使用的时候）。
除了 computed value 会响应 state 的变化，reaction 也会响应 state 的变化，不同的是，reaction 并不是创建一个新值，它是用来执行有副作用的逻辑，比如输出日志、发送请求等。mobx-react 提供了 @observer 装饰器和 observer 函数，可以将 React 组件封装成 reaction，自动根据 state 的变化更新 UI 组件。例如，创建 TodoListView 和 TodoView 两个组件代表应用的 UI：

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { oberver } from "mobx-react";
import { action } from "mobx";

@observer
class TodoListView extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.map(todo => {
            <TodoView todo={todo} key={todo.id} />;
          })}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView = oberver(({ todo }) => {
  const handleClick = action(() => todo.finished = !todo.finished)
  return (
    <li>
      <input type="checkbox" checked={todo.finished} onClick={handleClick}/>
      {todo.title}
    </li>
  );
});

const store = new TodoList();
ReactDOM.render(
  <TodoListView todoList={store} />, document.getElementById("root")
);
```

TodoListView 使用到了可观测的数据：todos 和 todo.finished（通过 unfinishedTodoCount 间接使用的），所以它们的改变会触发 TodoListView 的视图更新。
TodoView 中的 handleClick 是用来改变 todo.finished 的 action，也就是通过 mobX 更改应用的状态，一般习惯使用 mobX 提供的 action 包装应用中定义的 action，

参考

[MobX](https://cn.mobx.js.org/intro/concepts.html)

[React 进阶之路](https://book.douban.com/subject/30210697/)