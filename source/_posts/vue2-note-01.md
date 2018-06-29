---
title: vue 系列笔记(一)
date: 2018-06-29 13:31:17
tags: vue
---

new Vue发生了什么

<!-- more -->

从github上拉取vue的源码，打开 <font color="#dd0000">src/core/instance/index.js </font> 可以看到Vue是一个Function，而在javascript里面，new关键字是实例化一个对象，所以这里的Vue实际上是一个类，这里用ES5的语法模拟了一个Vue类。之所以不用ES6的class关键字来定义，是因为用ES5更容易书写代码，可以方便的倒入其他模块，这样代码更清晰。
```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```
然后看到 this._init(options) 这个方法，这个方法挂在Vue的实例上，在 <font color="#dd0000">src/core/instance/init.js</font> 里可以看到。

```javascript
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```
vue 采用了flow来进行静态类型检查，因为js是弱类型语言，这就导致了很容易写出非常隐蔽的问题代码，但是在编译器甚至是运行期都不会报错，但是有时可能会发生很奇怪的bug。

这个_init方法主要做了几件事：
* 合并options
* 初始化生命周期
* 初始化事件中心
* 初始化渲染
* 初始化 data，props，methods等

在 _init 方法的最后，检测options上如果有el属性，就在el上用 vm.$mount 方法挂在vue实例，然后把模板渲染成最终的DOM。

vue的初始化代码写的很清楚，它把不同的功能逻辑拆分成独立的函数，独立执行，互相不受干扰，这种思想很值得借鉴学习。
