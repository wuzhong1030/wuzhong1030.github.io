---
title: Git Command
date: 2020-02-15 10:47:30
tags: git
---

#### Git 命令大全

##### git config
 ```shell
 # 查看配置信息
 # --local: 仓库级 | --global: 全局级 | --system:  系统级
 git config <--local | --global | --system--> -l

 # 查看当前生效的配置信息
 git config -l

 # 编辑当前配置信息
 git config <--local | --global | --system> -e

 # 添加配置项
 git config <--local | --global | --system> --add <name> <value>

 # 获取配置项
 git config <--local | --global | --system> --get <name>

 # 删除配置项
 git config <--local | --global | --system> --unset <name>

 # 设置提交记录中的用户信息
 git config --global user.name <用户名>
 git config --global user.email 邮箱想>

 # 设置git缓存区大小，如果提交的内容较大，会提交失败，单位是 B 
 git config --gloabl http.postBuffer <缓存大小>

 # 调用 git diff/git status 的时候，以高亮或彩色的方式显示改动状态
 git config --global color.ui true

 # 配置可以缓存密码，默认时间是15分钟
 git config --global credential.helper cache

 # 配置密码的缓存时间，单位是秒
 git config --global credential.helper 'cache --timeout=<缓存时间>'

 # 配置长期存储密码
 git config --gloabl credential.helper store
 ```

 ##### git clone
 ```shell
 # 默认在当前目录创建和版本库名相同的文件夹并下载该版本到该文件夹下
 git clone <远端仓库地址>

 # 指定本地仓库的目录
 git clone <远端仓库地址> <本地目录>

 # -b 指定clone的分支，默认是master
 git clone <远端仓库地址> -b <分支名> <本地目录>
 ```

 ##### git init
 ```shell
 # 初始化本地仓库，在当前目录下生成 .git 文件夹
 git init
 ```

  ##### git status
  ```shell
  # 查看本地仓库状态
  git status

  # 以简短模式查看本地仓库的状态，会显示两列，第一列是文件的状态，第二列是文件名
  # 文件状态： A: 新增，M: 修改，D: 删除，??: 未添加到git中
  git status -s
  ```

##### git remote
  ```shell
  # 列出已经存在的远程仓库
  git remote

  # 列出远程仓库的详细信息，在别名后面列出URL地址
  git remote -v
  git remote --verbose

  # 添加远程仓库
  git remote add <远程仓库的别名> <远程仓库的URL地址>

  # 修改远程仓库的别名
  git remote rename <远程仓库的别名> <新的别名>

  # 删除指定名称的远程仓库
  git remote remove <远程仓库的别名>

  # 修改远程仓库的URL地址
  git remote set-url <远程仓库的别名> <新的远程仓库URL地址>
```

##### git branch
```shell
 # 列出本地所有的分支 
git branch

 # 列出本地所有分支，并显示最后一次提交，当前所在分支以*标记
git branch -v

 # 列出本地和远端所有分支，并显示最后一次提交，当前所在分支以*标记
git branch -av

 # 修改分支名称，如果不指定原分支名称则默认修改当前所在分支
 git branch -m [<原分支名称>] <新分支名称>

 # 强制修改分支名称
 git branch -M [<原分支名称>] <新分支名称>

 # 删除本地分支
 git branch -d <分支名称>

 # 强制删除本地分支
 git branch -D <分支名称>
```

##### git checkout
```shell
# 切换到已经存在的指定分支
git checkout <分支名称>

# 创建并切换到指定的分支，保留所有提交记录
# 等同于 "git branch" 和 "git checkout" 两个命令合并
git checkout -b <分支名称>

# 创建并切换到指定分支，并删除所有提交记录
git checout --orphan <分支名称>

# 撤销本地的修改，新增的文件和已经添加到暂存区的文件不受影响
git checout <文件路径>
```

##### git cherry-pick
```shell
# 把已经提交的记录合并到当前分支
git cherry-pick <commit ID>
```

##### git add
```shell
# 把指定的文件添加到暂存区中
git add <文件路径>

# 添加所有修改、已删除的文件到暂存区中，省略<文件路径>则默认当前目录
git add -u [<文件路径>]
git add --update [<文件路径>]

# 添加所有修改、已删除、新增的文件到暂存区中，省略<文件路径>则默认当前目录
git add -A [<文件路径>]
git add -all [<文件路径>]

# 查看所有修改、已删除但没有提交的文件，进入一个子命令系统
git add -i [<文件路径>]
git add -interactive [<文件路径>]
```

##### git commit 
```shell
# 把暂存区中的文件提交到本地仓库，调用文本编辑器输入该次到提交描述信息
git commit 

# 把暂存区中到文件提交到本地仓库并添加描述信息
git commit -m "<本次提交的描述信息>"

# 把所有修改、已删除到文件提交到本地仓库中
# 不包括未被版本库跟踪的文件，等同于先调用了"git add -u"
git commit -am "<本地提交的描述信息>"

# 修改最近一次提交的描述信息
git commit --amend
```

##### git fetch
```shell
# 将远端仓库的所有分支的最新版本全部取回到本地
git fetch <远端仓库的别名>

# 将远端仓库到指定分支的最新版本取回本地
git fetch <远端主机名> <分支名> 
```

##### git merge
```shell
# 把指定分支合并到当前所在到分支下
git merge <分支名称>
```

##### git diff
```shell
# 比较当前文件和暂存区中文件到差异，显示没有暂存的更改
git diff

# 比较暂存区中的文件和上次提交时的差异
git diff --cached
git diff --staged

# 比较当前工作区和上次提交的差异
git diff HEAD

# 查看从指定版本之后的改动内容
git diff <commit ID>

# 比较两个分支之间的差异
git diff <分支名称> <分支名称>

# 比较两个分支的log差异
git diff <分支名称>...<分支名称>
```

##### git pull
```shell
# 从远端仓库获取最新版本，相当于"git fetch"和"git merge"的合并
git pull
```

##### git push
```shell
# 把本地仓库的分支推送到远端仓库的指定分支
git push <远端仓库的别名> <本地分支名>:<远端分支名>

# 删除指定的远端仓库的分支
git push <远端仓库的别名> --delete <远端分支名>
git push <远端仓库的别名> :<远端分支名>
```

##### git log
```shell
# 打印所有提交记录
git log

# 打印从第一次提交到指定的提交记录
git log <commit ID>

# 打印指定数量的最新提交记录
git log -<指定的数量>

# 打印提交记录的概要记录
git log --oneline
```

##### git reset
```shell
# 重置暂存区，但文件不受影响，相当于 "git add" 命令的相反操作，把在暂存区的文件撤回到工作区
# 没有指定commit ID，则默认当前HEAD
git reset [<文件路径>]
git reset --mixed [<文件路径>]

# 将HEAD的指向改变，撤销到指定的提交记录，文件未修改
git reset <commit ID>
git reset --mixed <commit ID>

# 将 HEAD 的指向改变，保存暂存区和工作区的修改
git reset --soft <commit ID>

# 将 HEAD 的指向改变，不保存暂存区和工作区的修改
git reset --hard <commit ID>
```

##### git revert
```shell
#  生成一次新的提交来撤销撤销某次提交
git revert <commit ID>
```

##### git tag
```shell
# 打印所有标签
git tag

# 添加轻量标签，指向提交对象的引用，可以指定之前的提交记录
git tag <标签名称> [<commid ID>]

# 添加带有描述信息的附注标签，可以指定之前的提交记录
git tag  -a <标签名称> -m <标签描述信息> [<commit ID>]

# 切换到指定的标签
git checkout <标签名称>

# 查看标签的信息
git show <标签名称>

# 删除指定的标签
git tag -d <标签名称>

# 将指定的标签提交到远程仓库
git push <远程仓库的别名> <标签名称>

# 将本地所有的标签全部提交到远程仓库
git push <远程仓库的别名> --tags
```

##### git mv
```shell
# 重命名指定的文件或文件夹
git mv <源文件/源文件夹> <目标文件/文件夹>
```

##### git rm
```shell
# 移除跟踪指定的文件，并从本地仓库的文件夹中删除
git rm <文件路径>

# 移除跟踪指定的文件夹，并从本地仓库的文件夹中删除
git rm -r <文件夹路径>

# 移除跟踪指定的文件，并在本地仓库保留该文件
git rm --cached <文件夹路径>
```