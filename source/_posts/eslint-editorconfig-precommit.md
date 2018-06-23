---
title: 使用 eslint+editorconfig+precommit规范代码
date: 2018-06-23 16:26:51
tags: eslint
---

使用ESlint，规范代码书写。

<!-- more -->

## ESlint

### 1.好处
* 给项目代码制定一个代码规范，统一风格
* 防止低级错误，比如代码格式带来的问题
* 团队协作更加友好，更容易读懂别人的代码

### 2.安装
这里使用eslint标准的规范 eslint-standard
```bash
npm install eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
```
### 3.配置规则
在项目的根目录新建一个文件 .eslintrc，并在里面配置规则如下：
```json
{
	"extends": "standard"
}
```
> 这里是继承标准的eslint规则  

**如果需要检验vue文件，还需要安装 eslint-plugin-html，这个是检验一个文件中的javascript代码**
```bash
npm install eslint-plugin-html -D
```
然后在 .eslintrc 文件中改动：
```json
{
	"extend": "standard",
	"plugins": [
		"html"
	]
}
```
### 4.配置检验脚本
在 package.json 中，配置 scripts 节点，如下：
```json
{
	...
	scripts: {
		"lint": "eslint --ext .js,.vue src",
		"lint-fix": "eslint --fix --ext .js,.vue src"
	}
	...
}
```
> --ext 是指定.js .vue结尾的文件，src 即 src目录下的文件。--fix 是让eslint自动修复代码

### 5.自动检验代码
需要安装：
```bash
npm install eslint-loader babel-eslint -D
```
然后修改.eslintrc，如下：
```json
{
	"extends": "standard",
	"plugins": [
		"html"
	],
	"parser": "babel-eslint"
}
```
> 这个是基于项目中使用webpack+babel的配置

在 webpack.config.base.js 中， 修改配置
```json
module: {
    rules: [
      {
        test: /\.(vue|js)/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }
    ]
  }
```
> enforce: 'pre'，预处理配置，比如vue文件需要vue-loader解析，这个时候会先使用 eslint-loader 检测，然后再交给 vue-loader 

## .editorconfig
> 每个操作系统，编辑器的默认配置都会有差异，这时候可以配置一个文件来统一。

### 1.安装 EditorConfig 插件
例如 Vscode，安装 EditorConfig for VS Code

### 2.配置文件
在项目的根目录新建 .editorconfig ，内容如下：
```json
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
ident_style = space
insert_final_newline = true #自动在最后一行插入一空行
trim_trailing_whitespace = true #去掉一行中最后一个空格
```

## precommit
> 如果项目中使用git管理代码，可以使用precommit，这样在commit之前会先检验一次代码，确保提交的代码正确性后，才会推到远程仓库。

### 如何使用
1. 先 git init
2. npm install husky -D
3. 修改 package.json
```json
scripts: {
	"lint-fix": "eslint --fix --ext .js,.vue src",
	"precommit": "npm run lint-fix"
}
```