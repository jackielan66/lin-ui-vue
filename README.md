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


# git
像这样，你不断对文件进行修改，然后不断提交修改到版本库里，就好比玩RPG游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。有些时候，在打Boss之前，你会手动存盘，以便万一打Boss失败了，可以从最近的地方重新开始。Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

`git log --pretty=oneline`

## 回调版本
git 中 HEAD 表示当前版本 上个版本就是 HEAD^ 等
当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100

git reset --hard HEAD^
git log 
git reflog 查看记录所有命令记录

- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id
- 穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本 

## git 提交分两步
git add 把文件提交到暂时存区
git commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支