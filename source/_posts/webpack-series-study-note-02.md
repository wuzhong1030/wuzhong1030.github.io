---
title: webpack系列笔记(二)
date: 2018-6-01 14:04:08
tags: webpack, javascript
---
webpack的强大之处就在于loader，想要深刻认识loader，就自己写一个loader吧~

<!-- more -->

>我们在开发项目的时候，经常会写less, sass, ejs...这些，而浏览器并不认识这些文件，这时候就用到了webpack中的loader，它可以把这些文件编译成浏览器所能识别的css, js, html。

在写一个loader之前，先研究了下一个常用的loader———css-loader和style-loader是如何作用的。

```javascript
module.export = {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
}
```

上面这段代码使用了css-loader和style-loader。 test选项是一个正则,匹配后缀为.css的文件。use选项是使用的加载器,并且从右到左依次处理文件。当webpack遇到.css的文件后,会先使用css-loader解析这个文件,遇到@import或url(...)这样的语句的时候就把相应的样式文件引入进来；然后使用style-loader把解析完成的css代码放到style标签里。

> 如果一个源文件需要经过多次转换，就需要多个loader，因为一个loader只能做一件事情。使用多个loader的时候，第一个loader会拿到源文件的内容，处理后再传给下一个loader，这个就是loader的链式执行。

### 深入理解loader

因为webpack是运行再nodeJS环境中，所以一个loader其实就是一个nodeJs小模块，这个模块会导出一个函数，例如：
```javascript
module.exports = function (source) {
    //source是拿到源文件的内容
    //... 在这里编写处理源文件的逻辑
    return soure;
} 
```

> 以上是最简单的loader，没有做任何处理，直接返回源文件的内容。

因为是nodeJs环境，在这里还可以借用第三方库编写loader，例如：
```javascript
module.exports = function (source) {
    var sass = require("node-sass");
    return sass(source)
}
```
不仅如此，还可以调用webpack提供的API，例如：
```javascript
const loderUtil = require("loader-utils");
module.exports = function (source) {
    const options = loaderUtils.getOptions(this);
    //...处理逻辑
    return source;
}
```

> 这里的options通过在这里传入：
```javascript
module.export = {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            options: { //传入参数
                minimize:true, 
            }
        }
    ]
}
```

### 动手写

> 需求：编写一个loader，就是转换JavaScript中的注释语法，把形如
```javascript
// @require './assets/style/index.css'
```
转换成
```javascript
require('./assets/style/index.css');
```
这种是通过注释的方式懒加载css。完整代码如下：
```javascript
module.exports = function (source) {
    return function () {
        return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2);');
    }
}
```
附 使用方法
在 node_modules 文件下新建一个名为comment-require-loader，然后新建一个index.js，内容如下：
```javascript
...
rules: [
    {
        test: /\.js$/,
        loader: ['comment-require-loader']
    }
]
...
```



