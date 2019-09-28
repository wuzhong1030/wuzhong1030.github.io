---
title: redux-middleware
date: 2019-09-27 19:51:43
tags: redux
---

### Redux 中间件

Redux 本身就提供了数据管理等功能，还提供了利用中间件来扩展 Redux 功能，例如 redux-thunk, redux-saga, redux-promise, redux-logger等，以满足用户开发需求。Redux middleware 提供了接管 action 的机会，可以根据不同类型的 action 做不同的处理，它的最大特点就是可以把多个 middleware 串联使用。

#### Redux middleware
middleware 其本质就是一个嵌套函数，形如：
```js
export default store => next => action => {
    return next(action);
}
```
一共嵌套的三层函数，分别传递了 store, next, action, 并在最后返回了 next(action)。这其实是函数柯里化的应用，把三层函数单独来运行，通过上层函数返回需要单独运行的函数。每一层的函数意义如下：
1. 最外面的函数的参数为 store, 这个函数的作用仅仅是为了给每个中间件可以使用 store.getState 和 store.dispatch 这两个方法；
2. 中间的这层函数，next 本质是 dispatch。它接受 dispatch 函数作为参数，返回一个更高级的 dispatch 函数；
3. 最里面的函数接受 action 作为参数，它最终会取代 dispatch 函数。

#### 中间件的执行
中间件的使用是从 applyMiddleware 开始的，applyMiddleware 的部分源码：
```js
import compose from './compose'

export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, initialState, enhancer) => {
        var store = createStore(reducer, initialState, enhancer)
        var dispatch = store.dispatch
        var chain = []
        
        var middlewareAPI = {
            getState: store.getState,
            dispatch: action => dispatch(action)
        }
        chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            disaptch
        }
    }
}
```
1. 首先会执行最外层的函数：
> chain = middlewares.map(middleware => middleware(middlewareAPI))

遍历每个中间件，执行最外层的函数，也就是传递 store 的那层函数，这里传入的 store 是 middlewareAPI；
2. 中间件的第二层函数执行：
> dispatch = compose(...chain)(store.dispatch)

compose 函数的作用是将嵌套的函数写成有逗号隔开的结构，chain 中的每一项都是中间件的第二层函数。
store.dispatch 是整个嵌套函数的入口，将被中间件层层加工，变成更高级的 dispatch。加工后的 dispatch ，使用它重写 store 自带的 dispatch:
```js
return {
    ...store,
    dispatch
}
```

3. 第三层函数不在 applyMiddleware 中执行，当用户使用新的 dispatch 方法发起 action 时，第三层函数才被执行。