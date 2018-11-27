---
title: webpack系列笔记(四)
date: 2018-07-22 16:25:22
tags: webpack
---

## Tree Shaking
分为两种，一个是JS Tree Shaking，一个是CSS Tree Shaking

### 使用场景

* 常规优化，减小代码体积，提高加载速度
* 引入第三方库的某一个功能

### 开启 JS Tree Shaking

在webpack3中，可以使用webpack自带的 new webpack.optimize.UglifyJsPlugin() 开启
在webpack4中，因为简化了配置，在production模式下自动开启tree shaking，在development模式下，可以通过 optimization.minimizer 配置

### 开启 CSS Tree Shaking

借助purify css，在webpack中安装purifycss-webpack插件
```js
let Purifycss = require('purifycss-webpack')
let glob = require('glob-all')
...
plugin: [
	new Purifycss({
		paths: glob.sync([
			path.join(__dirname, './index.html'),
			...
		])
	})
]
```