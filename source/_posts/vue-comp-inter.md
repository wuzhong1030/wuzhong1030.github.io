---
title: vue组件通信的几种方式
date: 2019-03-18 22:00:32
tags: vue
---

## 写在前面
vue 的组件化应该是其最核心的思想了，无论是一个大的页面还是一个小的按钮，都可以被称之为组件。基于 Vue 的开发，就是在写一个个组件，无论是基础组件还是业务组件，最后都是要拼装在一起。按照组件的层级关系，可以把组件之间的关系归纳为：父子关系、隔代关系、兄弟关系，无关联关系。

## `$ref` 、`$parent` 、`$children`
基于当前上下文的，可以通过 `$ref` 、`$parent` 、`$children` 访问组件实例，可以直接调用组件的方法或访问数据。其中 `$parent` 可以访问当前组件的父组件，`$children` 可以访问当前组件的所有子组件。虽然 `$parent` 和 `$children` 都可以获取组件实例，但是它们无法在跨级或兄弟间通信，这是它们的缺点。

## `provide` 、`inject`
`provide / inject` 是 Vue 在 2.2.0 版本后新增的 API。
> 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

也就是在父组件中提供一个值，并且在需要使用的子孙组件中注入改值，即：
```js
// Parent.vue
export default {
    provide() {
        return {
            name: 'Stone'
        }
    }
}
// Child.vue
export default {
   inject: ['name'],
   mounted() {
       console.log(this.name)
   }
}
```
不仅仅是 `Child.vue` ，只要是 `Parent.vue` 的子组件，无论隔多少代，都可以通过这个的方式注入。 这种多级组件透传的方式可以保证单向数据流的清晰性，例如像用户信息这样的全局信息，就可以借助这两个 API 来完成，而没有引入第三方库 `vuex`。

### 替代 Vuex

`vuex` 是把数据集中管理，然后哪里需要就在哪里获取，按照这个思路，我们可以在根组件 `App.vue` 中注入全局信息，并且在页面的任何地方使用。
```js
// App.vue
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
export default {
    provide() {
        return {
            userInfo: this.user
        }
    },
    data() {
        return {
            user: {}
        }
    },
    methods: {
      getUserInfo () {
        $.ajax('/user/info', (data) => {
          this.user = data
        })
      }
    }
}
```
把整个 App.vue 的实例 `this` 对外提供, 这样其他页面就可以通过 `this.userInfo` 来获取用户信息。
```js
<template>
  <div>
    {{ userInfo }}
  </div>
</template>
<script>
  export default {
    inject: ['userInfo']
  }
</script>
```

## `$attrs` 、`$listeners`
> 这两个 API 是 Vue 2.4.0 新增的。`$attrs` ，继承所有的父组件属性；`$listeners` ，它是一个对象，里面包含了作用在这个组件上的所有监听器。

主要用途就是用在父组件传递数据给子组件或者孙组件。

```js
<!-- Parent.vue -->
<template>
  <div id="app">
    <child1 :p-child1="child1"
            :p-child2="child2"
            :p-child3="child3"
            v-on:test1="onTest1"
            v-on:test2="onTest2">
    </child1>
  </div>
</template>
<script>
import Child1 from "./Child1.vue";
export default {
  data() {
    return {
        child1: 'child1',
        child2: 'child2',
        child3: 'child3'
    };
  },
  components: { Child1 },
  methods: {
    onTest1() {
      console.log("test1 running...");
    },
    onTest2() {
      console.log("test2 running");
    }
  }
};
</script>
```

```js
<!-- Child1.vue -->
<template>
    <div class="child-1">
        <p>in child1:</p>
        <p>props: {{pChild1}}</p>
        <p>$attrs: {{$attrs}}</p>
        <hr>
        <!-- Child2 组件中能直接触发 test 的原因在于 Child1 组件调用 Child2 组件时 使用 v-on 绑定了 $listeners 属性 -->
        <!-- 通过 v-bind 绑定 $attrs 属性，Child2 组件可以直接获取到 Parent 组件中传递下来的 props（除 了Child1 组件中 props 声明的） -->
        <child2 v-bind="$attrs" v-on="$listeners"></child2>
    </div>
</template>
<script>
import Child2 from './Child2.vue';
export default {
    props: ['pChild1'],
    data() {
        return {};
    },
    inheritAttrs: false,
    components: { Child2 },
    mounted() {
        this.$emit('test1');
    }
};
</script>

```

```js
<!-- Child2.vue -->
<template>
    <div class="child-2">
        <p>in child2:</p>
        <p>props: {{pChild2}}</p>
        <p>$attrs: {{$attrs}}</p>
        <hr>
    </div>
</template>
<script>
export default {
    props: ['pChild2'],
    data() {
        return {};
    },
    inheritAttrs: false,
    mounted() {
        this.$emit('test2');
    }
};
</script>
```

## `dispatch` 、 `broadcast`
这两个 API 是 Vue 1.0 版本的，`$dispatch` 用于向上级派发事件，`$broadcast` 用于向下级广播事件的，它们在 2.0 版本中已经被废弃了。

> 因为基于组件树结构的事件流方式有时让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱。

不过我们可以自行实现 dispatch 和 broadcast 方法，用于组件的跨层级通信。它们实现的关键在于如何正确找到所要通信的组件，也就是通过匹配组件的 `name` 选项向下或向上查找组件。

这两个方法都需要传递 3 个参数，第一个参数是要通信组件的 name 选项值，第二个是自定义事件名称，第三个是要给通信组件传递的值。在 dispatch 里，通过 while 循环不断向上查找父组件，直到查找到 componentName 与某个父级组件的 name 选项匹配时结束，此时改父组件就是要通信的组件。 broadcast 方法与 dispatch 类似，是通过 forEach 循环向下查找子组件。 最后封装一个 mixins 来便于复用。
```js
// emitter.js 
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```
通过 mixins 混入组件，实现组件间的通信。
```js
<!-- Parent.vue -->
<template>
  <button @click="handleClick">
    触发事件
    <Child></Child>
  </button>
</template>
<script>
import Emitter from "../assets/js/emitter.js";
import Child from "./Child.vue";
export default {
  name: "Parent",
  mixins: [Emitter],
  created() {
    this.$on("on-message", message => {
      console.log(message);
    });
  },
  components: {
    Child
  },
  methods: {
    handleClick() {
      this.broadcast("Child", "on-message", "Hello, I am Parent Component");
    }
  }
};
</script>
```
```js
<!-- Child.vue -->
<template>
  <div></div>
</template>
<script>
import Emitter from "../assets/js/emitter.js";
export default {
  name: "Child",
  mixins: [Emitter],
  mounted() {
    this.$on("on-message", message => {
      console.log(message);
      this.dispatch("Parent", "on-message", "Copy that, I am Child Component");
    });
  }
};
</script>
```
相比 Vue 1.0 版本内置的两个 API，自行实现的方法有以下不同：
* 需要额外传入组件的 name 作为第一个参数；
* 匹配到组件就会停止循环，不会冒泡；
* 传递的值只能是一个参数，如果需要传递多个参数，只能通过对象或数组的形式；

## 其他方法
在 vue 中组件的通信还有其他的手法，例如：
1. `props` 、`$emit` 
```js
<!-- Parent.vue -->
<template>
  <Child :info="info"
         @update="onUpdateName"></Child>
</template>
<script>
import Child from "./Child.vue";
export default {
  data() {
    return {
      info: {
        name: "stone"
      }
    };
  },
  components: {
    Child
  },
  methods: {
    onUpdateName(name) {
      this.info.name = name;
    }
  }
};
</script>
```
```js
<!-- Child.vue -->
<template>
  <div>
    <div>{{info.name}}</div>
    <button @click="handleUpdate">update</button>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleUpdate() {
      this.$emit("update", "new-name");
    }
  }
};
</script>
```
2. 父组件将自己的方法传递给子组件，子组件调用方法传数据给父组件
3. 使用event bus事件总线
4. `$attrs` 、`$listeners` 
> Vue 2.4 新增的 API。`$attrs` 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。`$listeners` 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。
5. Vuex 集中式状态管理

## 写在最后
不同的通信方法适用于不同的场景，既可以通过 Vue 内置的 API 来通信，也可以通过自定义事件的方式实现通信方法，当应用足够复杂情况下，就可以使用 Vuex 进行数据管理。
