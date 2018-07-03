---
title: webpack系列笔记(三)
date: 2018-07-01 20:13:13
tags: webpack, javascript
---

webpack4 新特性

<!-- more -->

## 新特性
### 0配置
> entry，output增加了默认配置，即不设置的情况下，默认 entry 的入口文件在 ./src/index.js，output 默认输出 ./dist 目录下

### 增加mode选项
> 必填项，可以选择production或developmen。在production模式下，webpack会做一些默认的优化，比如代码压缩，同时会设置process.env.NODE_ENV=production；在development模式下，优化了增量构建，并且支持eval下的cssSourceMap，同样也会设置process.env.NODE_ENV=development

### sideEffects
> 在package.json中增加sideEffects的支持，如果模块的package.json设置false，那么打包的时候，不会打包重复导出的代码

### 删除的功能

* 移除了 module.loaders
* 移除了 loaderContext.options
* 移除了 Compilation.notCacheable
* 移除了 NoErrorsPlugin
* 移除了 Dependency.isEqualResource
* 移除了 NewWatchingPlugin
* 移除了 CommonsChunkPlugin
