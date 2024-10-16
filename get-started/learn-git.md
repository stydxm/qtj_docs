# 学习Git
## 为什么需要版本管理
如果把做项目想象成游戏，那对于非常大型的游戏来说，无法存档读档显然是个很离谱的事情 ~~（有些人用微信传代码和这一样离谱）~~ 

版本管理就起到了存档和读档的作用

做PPT写文档的时候，就有多人习惯用复制的方式来保存不同的版本（~~v11.45最终版打死也不改了(3)真的 - 副本.pptx~~），或许还会改名加上备份时间。这么做唯一的好处就是简单，但是容易犯错，一不小心会写错文件或者手滑覆盖掉文件。

写代码会出现改着改着把某个功能搞炸了的情况，这个时候就需要恢复到原来的状态

::: info 信息
下面都用玩游戏来打比方~~玩原神玩的~~
:::

## 什么是Git
Git 是一款分布式的代码版本控制工具，Linux 之父 Linus 嫌弃当时主流的中心式的版本控制工具太难用还要花钱，就自己开发出了 Git 用来维护 Linux 的版本。[^1]

[^1]: [Git](https://en.wikipedia.org/wiki/Git)

Git 的设计非常优雅，但初学者通常因为很难理解其内部逻辑因此会觉得非常难用。对 Git 不熟悉的初学者很容易出现因为误用命令将代码给控制版本控制没了的状况。我们应该不会有很复杂的需求，所以不要求所有人都会用命令行，下面会介绍更简单的软件

### 集中式？分布式？
你肯定用过类似腾讯文档/金山文档/石墨文档的这些在线协作工具。它们的特点就是所有终端都连接到服务器，更改实时同步，属于典型的集中式

分布式版本控制系统没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

大多数的网游可以认为是集中式的，你做的操作直接发送到了服务器，也可以被别人所看到。单机游戏就是分布式的，存档只在客户端保存，别人想要就只能从你电脑上复制一份

这样做的优势是很明显的，多人协作时不同的人可以同时修改不同的部分，在修改完成后再进行合并，可以做到互不影响，避免有人在给外墙贴瓷砖，有人刚好在拆脚手架的情况发生

::: tip 提示
贴瓷砖的人可以站在脚手架上贴，在贴完之后再把代码跟拆脚手架的人的代码合并
:::

## 为什么是Git
诚然Git学起来有一定难度，但因为它实在是太好用了，已经几乎成了**版本管理**的代名词。除了部分游戏项目还在用的SVN（subversion）[^2]，之外，我甚至没有听说过近年有人使用别的项目管理工具

[^2]: 大型游戏项目占空间极大，虽然Git有对应的模块LFS，但SVN的可以部分下载仓库的特性使其依然被大型游戏项目所使用

同时，主要功能为托管Git仓库的[GitHub](https://github.com)也成了开源项目的事实标准

## 理解基础概念
### 仓库(repository)
一个Git仓库就是一个项目，仓库与仓库之间没有关联[^3]

[^3]: 这里不考虑submodule和monorepo等情况，因为我们暂时不会用到

::: info 信息
你的一个可以存档的游戏
:::

### 用户(user)和组织(organization)[^4]
[^4]: 这个概念不是Git本身的，但在所有托管网站中都存在，因此也是必须了解的

这个概念用于区分仓库的所有权

仓库分为用户仓库和组织仓库，用户仓库是每个用户创建的，组织仓库是组织创建的。用户拥有自己所有仓库的权限，组织内的所有用户都有组织的仓库的权限

::: tip 提示
除了作业等内容，一般项目都请创建在组织下
:::

### 分支(branch)
前面提到了，对于同一个项目可以多个人同时开发互不干扰。实现的前提就是使用分支  

不同的分支之间是互相隔离的，对一个分支的操作不会影响别的分支

在需要的时候，比如几个功能开发完了，可以对分支进行合并操作，

::: tip 提示
我们的项目较简单，只需要一个分支即可

:::

一般会命名为master或者main

::: info 信息
仓库类比游戏，那么分支可以类比成游戏的一个档
:::

### 提交(commit)
::: tip 提示
这个名词其实翻译得不好，虽然约定俗成成为标准译名了，实际还是commit这个英文名用的更多
:::

commit是Git里最基本的单位，用的时候交互最多的还是commit

分支由commit组成，每个commit都属于一个分支

::: info 信息
可以理解为一个档里的存档点，每个存档点都在一个档里，回档能且只能回到存档点
:::

每个commit都附带一个commit message,相当于是对这个commit的注释，应当简单明了地写出这个commit中做了什么，如实现某功能，修复某bug等

## 使用Git
::: danger 警告
在绝大多数情况下，不允许进行强制推送，即`git push -f`

这可能导致提交被覆盖，即一些工作凭空消失了

如果遇到了无法解决的冲突，优先找学长帮忙
:::

我们实验室使用自建的Git服务器，具体请看[前面的章节](git)

因为命令行使用git有一定难度，所以这里介绍带有图形界面的git工具

::: tip 提示
对于算法的同学，还是更推荐学一下命令行，主要是`clone`  `pull`  `add`  `commit`  `push`等命令的使用，最好再学一下如何处理冲突

官方的[Pro Git](https://git-scm.com/book/zh/v2/)和[尚硅谷的Git教程](https://www.bilibili.com/video/BV1vy4y1s7k6/)都是很好的资料

不需要学太复杂的，会使用基本操作即可
:::

## 配置密钥
通过配置ssh密钥，可以避免每次都输入密码的麻烦

打开Gitea网页，点右上角头像，设置-SSH/GPG密钥-管理SSH密钥-增加密钥

![](/Screenshot_20240611_130846.png)

这里名称自己写，内容就是复制[这个步骤](/algorithm/linux/ssh.html#%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5)生成的密钥

## 使用VSCode提供的Git界面
参考[深北莫北极熊战队的基于VSCode的代码合作](https://gitee.com/SMBU-POLARBEAR/Technical_Knowledge_Base/blob/master/Git%E7%9A%84%E4%BD%BF%E7%94%A8.md#%E5%9F%BA%E4%BA%8Evscode%E7%9A%84%E4%BB%A3%E7%A0%81%E5%90%88%E4%BD%9C)

## .git目录
在创建Git仓库后，你可能发现目录下多了一个叫`.git`的文件夹

::: info 信息
这个文件夹在windows下默认是隐藏的，因此没有打开查看隐藏文件夹的选项是看不到的

而在Linux和MacOS下，对于隐藏文件/目录的定义就是以`.`开头，所以它也是隐藏的，这也是这个目录名字的来由

以后你可能还会遇到`.ssh`、`.bashrc`等等以`.`开头的文件或者目录
:::

这个文件夹里面有一些文件，用来存放git相关的东西，用来标记和储存git的各种状态

不要盲目去动里面的东西[^5]，如果你实在好奇，[这里有一篇文章](https://jvns.ca/blog/2024/01/26/inside-git/)介绍了里面都有什么

[^5]: 事实上，用了这么多年，我从来没有见过需要动这里东西的情况
