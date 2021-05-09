# l-ui

## 组件（下划线代表完成）
- ~~Toast~~ 
- ~~~Dialog~~~
- swipe
- appnotification
- icon

## todo
安卓桥接web
vue trasition-group
pull-down 指令
轮动图无缝滚动
intersectionobserver 应用场景

## 实现vue-router的步骤
1. 初始化参数
2. 监听onhashchange 变化
3. 页面变化

## 成为大师


# git
像这样，你不断对文件进行修改，然后不断提交修改到版本库里，就好比玩RPG游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。有些时候，在打Boss之前，你会手动存盘，以便万一打Boss失败了，可以从最近的地方重新开始。Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

`git log --pretty=oneline`
` git log --graph --pretty=oneline --abbrev-commit` 可以看到分支合并图

# 回调版本
git 中 HEAD 表示当前版本 上个版本就是 HEAD^ 等
当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100

git reset --hard HEAD^
git log 
git reflog 查看记录所有命令记录

- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id
- 穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本 

# git 提交分两步
git add 把文件提交到暂时存区
git commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支

# 提交后，用git diff HEAD -- readme.txt命令可以查看工作区和版本库里面最新版本的区别

# 又到了小结时间。

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

# 远程库 git remote
查看远程库信息 git remote -v 
添加 git remote add origin <URL>
删除 git remote rm origin
第一次关联远程分支 git push -u origin master
以后就使用 git push origin master

# 分支关联
HEAD 指向的当前分支

创建分支   git checkout -b dev
`git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：`
```
git branch dev
git checkout dev
```
查1当前分支 git branch 然后，用命令查看当前分支：

小结
Git鼓励大量使用分支：

查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>或者git switch <name>

创建+切换分支：git checkout -b <name>或者git switch -c <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>

Git无法执行“快速合并”，是合并的两个分支都有新的提交 Fast forward模式

处理冲突的时候
Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：

