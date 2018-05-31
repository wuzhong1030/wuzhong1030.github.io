---
title: webpack系列笔记(一)
date: 2018-05-31 09:56:14
tags: webpack, javascript
---
四个核心概念

<!-- more -->
**1. 入口（entry）**
这个选项指的是webpack的入口文件，可以是单一的，也可以有多入口。

> 单一入口示例：
```javascript
//webpack.base.config.js
module.exports = {
entry: {
    app: './src/main.js'
  },
}
```
> 多入口示例，适用于多页面应用（MPA）
```javascript
//webpack.base.config.js
module.exports = {
entry: {
    page1: './src/page1.js',
    page2: './src/page2.js'
  },
}
```
 **2. 输出（output）**
在所有的资源（assets）处理完成后，需要告诉webpack将资源打包输出在哪里，这个选项就可以指定输出文件的名称以及目录位置，这里注意即便存在多个入口，也只能有一个output。
```javascript
//webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    path: '../dist',
    filename: 'bundle.js'
  }
};
```
上面这段代码是将bundle.js输出到../dist目录下
如果配置了多个入口(entry)，可以使用占位符来确定唯一文件名。
```javascript
//此配置可以会把app.js，index.js输出到../dist目录下
module.exports = {
  entry: {
    app: './src/app.js',
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // 使用占位符
  }
};
```
**3. 加载器（loader）**
这个是webpack的核心理念，所有的资源都是模块，webpack会把项目中的每一个文件（.css，.js，.html，.scss，.jpg等）通过loader来转换成模块，然后再添加到依赖表中。

> loader也是需要配置的，告诉webpack哪些文件是需要被转换的
```javascript
//此配置可以会把app.js，index.js输出到../dist目录下
module.exports = {
  module: {
    loaders: [
      {test: /\.less$/,loader: "style!css!less"}
    ]
  },
};
```
**4. 插件（plugins）**
插件功能是webpack的强大之处，它作用于webpack整个构建过程。与loader不同，loader是处理单个指定文件，而plugins是宏观的影响整个构建周期。
> 例如使用 模块热替换(Hot Module Replacement) 插件
这个插件很常用，可以在修改代码后，自动刷新并且实时预览

```javascript
module.exports = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ] 
}
```
