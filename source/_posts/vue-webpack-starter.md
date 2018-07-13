---
title: 基于webpack从零搭建vue项目
date: 2018-07-13 09:01:47
tags: vue, webpack
---

结合webpack，从零搭建一个极简的vue项目

<!-- more -->

环境：
* webpack: 4.16.0
* webpack-cli: 3.0.8
* node: v10.4.1

## 1.初始化项目
```bash
npm init -y
```

## 2. 安装依赖
```bash
npm i webpack webpack-cli vue vue-loader vue-template-compiler css-loader style-loader -D
```
> 从webpack V4开始，webpack和webpack-cli分成两个模块，要独立安装

## 3. webpack.config.js
在项目根目录新建 webpack.config.js
```javascript
var path = require('path')
module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src', 'app.js')
	},
	output: {
		filename: '[name].[hash:5].js'
	}
}
```
## 4. 安装插件
```bash
npm i html-webpack-plugin clean-webpack-plugin - D
```

## 5.修改webpack.config.js
```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'app.js')
    },
    output: {
        filename: '[name].[hash:5].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(gif|png|jeg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new  htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.tpl.html'
        }),
        new cleanWebpackPlugin('dist')
    ]
}
```

## 6.新建模板文件，修改package.json
在根目录新建 index.tpl.html，然后在package.json增加一个脚本命令
```javascript
"build": "webpack --config webpack.config.js --mode development"
```
 
## 7.编码
在根目录新建src文件夹
src
	-app.js
	-index.vue

```javascript
//app.js
import Vue from 'vue'
import App from './index.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)
```

```javascript
//index.vue
<template>
  <div class="page">
      hello vue
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
```

