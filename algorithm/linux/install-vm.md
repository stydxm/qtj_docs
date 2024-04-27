::: tip 提示
这里只有大致的步骤描述，应该都能看懂，哪一步是在搞不明白可以看看[这篇文章](https://juejin.cn/post/7122273969520001061)，里面有每一步的截图（文章里是vmware16，现在已经更新到17了，操作应该是一模一样的）
:::

# 安装系统
前面我们说到过，Linux发行版最常见的有`Debian分支`、`Red Hat分支`和`Arch Linux分支`。其中Debian分支的Ubuntu是所有发行版中最流行最通用的，很多机器学习相关工具链支持最好的也是ubuntu,因此我们选择ubuntu作为开发和部署用的系统。   

![](/ubuntu.png)

这张图就是ubuntu的logo，~~不是下面这个~~

![](https://mirror.ghproxy.com/raw.githubusercontent.com/SAWARATSUKI/ServiceLogos/main/Ubuntu/Ubuntu.png)

不同于windows，ubuntu的版本命名规则非常简单，就是`年份.月份`，比如`22.04`就是2022年4月份发布的ubuntu版本，比如`23.10`就是2023年10月份发布的。

按现行的策略，两年发布一个`LTS`版，即长支持版本，一些较复杂的库通常只会提供lts的支持（虽然很可能别的版本也能跑）

::: info 说明
如果你了解这一部分内容，那就不用看了，自己配好opencv和pytorch就好了

别的系统通常也没问题，比如我自己用的是Arch，但如果你啥都不懂就别自己整花活（
:::

## 安装虚拟机软件
::: tip 提示
推荐的安装方法是虚拟机，如果你有空闲的电脑可以直接安装那更好，也可以自己去折腾WSL这些方案（同样的，啥都不懂就先按课程走）
:::

打开[这个网页](https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html)，往下滑，点`Workstation 17 Pro for Windows`然后点`DOWNLOAD NOW`

![](/Screenshot_20240423_182343.png)

下载完直接双击打开，一路下一步，最后一步点许可证，然后输入这个

**`JU090-6039P-08409-8J0QH-2YR7F`**

![](/boxcndgDKfTuio3nF0QboemIPHe.png)

## 下载系统镜像
浏览器直接打开[这个链接](http://mirrors.nju.edu.cn/ubuntu-releases/22.04.4/ubuntu-22.04.4-desktop-amd64.iso)，然后等下载完成就行

::: tip 提示
我们的NAS里也有，在视觉组的目录下，如果你在实验室，下载会快一点
:::

::: info 说明
本页写于2024.4.23，此时距24.04LTS发布还有两天

各类环境和库不可能几周内完成适配，因此还是推荐22.04

请后人维护文档时注意与时俱进，不要老用着EOL的古董！
:::

## 创建虚拟机
打开前面安装的VMware,点首页中间的`创建新的虚拟机`

点击：创建新的虚拟机 - 典型（推荐）- 下一步 - 安装程序 iso 选中你刚下的 iso

![](/boxcnGHnjgZvtcBrm0XXitFl4Jg.png)

启动后一路next就好

![](/boxcnLxZnyFN3ohE8zrTwNaCA8e.png)

这里的用户名一定要填纯英文和数字，不要有空格和别的任何符号，不然你可能遇到各种麻烦问题

密码也要记牢，后面会用

安装完成后，在桌面上右键，应该可以显示出这样的一个窗口

![](/boxcnG6z1VpAYUGMSkSwDBUxEvf.png)

后面我们提到的`在命令行中输入`就是指在这个窗口里，没说也是指在这里输入

::: tip 提示
命令行里输密码的时候不会有任何显示，不用怀疑有没有打进去，输完按回车就行
:::
