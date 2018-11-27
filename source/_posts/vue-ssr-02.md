---
title: vue-ssr（二）
date: 2018-06-22 14:47:36
tags: 服务端渲染， Vue
---
简单的vue-ssr demo，vue + express

### 1.安装
新建一个空文件夹，通过npm（yarn）安装 vue-server-renderer 和 express，命令如下：
```bash
npm init
npm install vue vue-server-renderer express --save
```

### 2.新建项目
再新建两个文件，分别为index.html，index.js。
其中，index.html 是模板文件，Vue的事例最终会输出到这个文件中，index.js 是这个页面的页面文件。
**index.html**
```htmlbars
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
        {{{meta}}}
</head>
<body>
    <!--vue-ssr-outlet-->
</body>
</html>
```
**index.js**
```js
const Vue = require('vue')
const server = require('express')()
const fs = require('fs')

//读取模版
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.html', 'utf-8')
})  
// 此参数是vue 生成Dom之外位置的数据  如vue生成的dom一般位于body中的某个元素容器中，此数据可在header标签等位置渲染，是renderer.renderToString()的第二个参数，第一个参数是vue实例，第三个参数是一个回调函数。
const context = {
      title: 'What I Love',
      meta:` <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <meta name="description" content="vue-ssr">
                  <meta name="generator" content="GitBook 3.2.3">
      `
}

server.get('*', (req, res) => {
      //创建vue实例   主要用于替换index.html中body注释地方的内容，和index.html中 <!--vue-ssr-outlet-->的地方是对应的
    const app = new Vue({
        data: {
            url: req.url,
            data: ['菠萝', '萝卜', '香蕉', '苹果', '泥猴桃', '梨子'],
            title: '我喜欢的水果'
        },
        //template 中的文本最外层一定要有容器包裹， 和vue的组件中是一样的，只能有一个父级元素，万万不能忘了！
        template: `
            <div>
                <div>url : {{url}}</div>
                <p>{{title}}</p>
                <p v-for='item in data'>{{item}}</p>
            </div>
        `
    })

//将 Vue 实例渲染为字符串  (其他的API自己看用法是一样的)
    renderer.renderToString(app, context,  (err, html) => {
        if (err) {
            res.status(500).end('err:' + err) 
            return 
        }
    //将模版发送给浏览器
        res.end(html)
        console.log('success')
    })
})

server.listen(8080)
```
### 3.运行
```bash
node index.js
```