# Linux
## 什么是Linux
1991 年，Linus Torvalds对他使用的一个操作系统 MINIX 十分不满，因为当时 MINIX 不允许任何商业用途。

于是他在他的大学时期编写并发布了自己的操作系统 ~~（你看看人家）~~ ，也就是后来所谓的 “Linux 内核”，通常也被叫做`kernel`。

![tux](/tux.png)

这只企鹅就是linux的吉祥物tux

## 什么是Linux发行版
Linux 内核并不是一个完整的操作系统，因为它过于精简，单单从它的功能上来说就已经不符合通常的现代的操作系统的定义了。为了能让这个内核拥有更多功能、完善的用户界面和更佳的使用体验，许多自由软件社区的开发人员和一些计算机商业公司便开始把各种组件添加到这个内核之上，这才构建成了一个完整的 Linux 操作系统。

因为 Linux 内核是一个开源软件，所以通过这种方式组合出来的 Linux 操作系统会有许许多多的形式，不像 Windows 或者 macOS 这种受到公司统一规定的商业操作系统。正是因为开源社区的诸多成员以及许多商业公司的去中心化的贡献，让 Linux 充满了多样性。因为这种独特的属性，或许我们可以说 Linux 操作系统从来都不是指哪一种操作系统。取而代之地，为了指代某一个基于 Linux 内核构造出来的操作系统，我们通常都将其称之为“Linux 发行版”。  

一个典型的 Linux 发行版除了 Linux 内核以外，通常还会包括一系列 GNU 工具和库、一些附带的软件、说明文档、一个桌面系统、一个窗口管理器和一个桌面环境。不同的发行版之间除了 Linux 内核以外的其它部分都有可能不一样，因此有的时候我们对比某两种发行版的时候会觉得它们看起来像是完全不一样的操作系统，然而实质上它们却拥有着相同的核心，即 Linux 内核。

Linux发行版最常见的有`Debian分支`、`Red Hat分支`和`Arch Linux分支`。

一些常见的Linux发行版：

|发行版名称|分支|其他说明|
|:-:|:-:|:-:|
|AlmaLinux|Red Hat|CentOS停止维护后的替代品|
|Alpine Linux||非常轻量级，常用与边缘和容器|
|AOSC OS|Debian|对各种非主流架构有较好的支持|
|Arch Linux|Arch Linux|以简单、可定制化程度高而著称|
|CentOS|Red Hat|曾经非常流行，现已停止维护|
|Debian|Debian|Linux 世界中最庞大的分支|
|deepin|Debian|国产，附带了DDE桌面环境|
|EulerOS|Red Hat|华为自研服务器系统的成功实践|
|Fedora Linux|Red Hat|实际是RHEL基于它，但因知名度原因而如此分类|
|Gentoo Linux|||
|Kali Linux|Debian|被某些营销号吹捧，实际只是自带了一些安全相关工具|
|Linux Mint|Debian||
|Manjaro Linux|Arch Linux||
|OpenSUSE|||
|Red Hat Linux|Red Hat|它还有一个企业版，简称RHEL|
|Rocky Linux|Red Hat|CentOS停止维护后的替代品|
|Ubuntu|Debian|还有一些Kubuntu、Ubuntu MATE等只替换了桌面环境的版本|

Android 和 ChromeOS 等系统，因为也使用 Linux 的内核，从技术上说其实也属于 Linux 发行版，但由于生态非常割裂，一般提及“发行版”的时候不会考虑它

## 为什么要使用Linux
相当多的开发软件在 Linux 上有更好的兼容性，而到 windows 上你将会花费大量的时间配置各种环境变量还容易出错。

**尤其是我们需要大量使用机器学习相关工具，其中很多东西根本没有对windows的官方支持，即使你折腾半天跑起来了也会有很多问题**

并且目前，服务器上为了保证低损耗高效率，绝大多数都是 Linux 的系统，我们车上的算力也全部是 Linux 系统。~~你也不想车还在赛场上跑着就来个windows update吧~~  
简单来说就是，在绝大多数开发领域，你想舒服的配好环境，肯定要靠 Linux，因此学会 Linux 的操作是不可或缺的
