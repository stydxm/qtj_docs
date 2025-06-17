# 算法组总览
## 关于算法组
算法组在很多队伍内被称为视觉组，因为以前算法方面任务是装甲板和能量机关（大符）的识别和解算，几乎只涉及计算机视觉。然而，

- 从2023赛季开始，哨兵可以在整个场地内自由活动，因此视觉组增加了导航和自主决策的任务

- [南科大（哈工程）](https://www.bilibili.com/video/BV1QA4m1w7KN)[^1]等学校的队伍开始了强化学习控制算法的研究，以期替代传统基于正逆运动学解算的控制方法

[^1]: 该项目作者王洪玺，本科在哈工程打比赛，目前在南科读研

- [广工的无下位机方案](https://github.com/rm-controls)用上位机+ros替换了单片机，减少了算法组与电控组的技术栈差距，甚至直接把两个工种合二为一

以上几点的变化，使得我们的任务从单纯的计算机视觉拓展了建图定位导航、自主决策、控制算法等开发任务，触及到了更多领域的算法，因而视觉组逐渐变成了算法组，也有一些队伍会一分为二为视觉组和导航组

![](/Image_1713863204116.jpg)

[这里有一份学习路线的思维导图](https://www.processon.com/view/link/6236db1a5653bb071e70457b)可供参考，内容很多但不要被它吓住，实际不会用到这么多知识

## 计算机基础
::: warning 提示
零基础指的是没有计算机基础而不是不会用电脑，解压缩等基础操作请自行研究
:::

与其他组不同，算法组的工作更偏向计算机和软件工程方向，因此需要有计算机科学的基本知识，熟练使用Python和C++编程语言

这方面已经有相当多的优秀课程，而我选择简单叙述一下的原因是现有教材大多面向计算机科班，他们并不只关注这样一个小领域，而是将要进行四年甚至更长时间的学习，所以教材内容往往大而全。而对于我们的任务来说，操作系统、编译原理、计算机网络这些知识并不必须

这里虽然有一些资料可以提供，但是并不建议你去学习，它们内容较广较深，包含了一些不需要了解的知识

## 关于任务
在教程中，你还需要完成一些任务

关于这些任务，请看[这里](tasks/)

## 先学会两个名词
::: danger RTFM
Read the F**king Manual
:::

::: danger STFW
Search the F**king website
:::

![](/images.jpg)

有问题可以多问、及时问，但是希望你先做到以下几点：

- 尝试自己通过搜索引擎和官方文档解决问题

![](llm.jpg)

- <strong style="color: red">请直接、清晰、准确地描述你的问题</strong>，尽量简洁一些，不需要太多的礼貌用语，不要起手`救命啊`，更不要说一句`在吗` `能不能问个问题`就没有下文

- 如果有必要发图片，请善用截图工具，尽量不要用手机对这屏幕拍🗿🤳💻

- 如果有代码，不要直接把一大段日志文字发在微信或者qq里，可以截图或用[Pastebin](https://pastebin.com/)等在线剪贴板工具

<Bilibili bvid="BV1om4y1H71S"/>

## 参考文献
RoboMaster竞赛，尤其是视觉方面，有非常浓厚的开源分享、技术交流氛围。我本人也非常受益于这样的环境，因此在编写此教程时大量参考了其他队伍同学编写的资料，在此也对这些队伍表示感谢

以下是编写本教程的一些参考资料：  
[An introduction to computer vision and RoboMaster algorithm group](https://github.com/NeoZng/vision_tutorial)  
[北极熊RoboMaster](https://flowus.cn/lihanchen/share/d2e24166-8a8d-4262-a4b4-b4d25f52d890)  
[UC Berkeley CS61A](https://cs61a.org/)  
[Harvard CS50x](https://cs50.harvard.edu/x/)  
[CS自学指南](https://csdiy.wiki/)  
[HDU计算机科学讲义](https://hdu-cs.wiki/)  
[Linux 101](https://101.lug.ustc.edu.cn)  
[Python 文档](https://docs.python.org/zh-cn/3/)  
[Composing Programs](https://www.composingprograms.com/)  
[Standford CS 106L](https://web.stanford.edu/class/cs106l/)  
[cppreference.com](https://en.cppreference.com/w/)  
[Dive into Deep Learning](https://d2l.ai/)  
[AI By Doing](https://aibydoing.com)  
[CS50’s Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai)  
[华南虎视觉组主页](https://vision.scutbot.cn/)  
[动手学ROS2](https://fishros.com/d2lros2/)  