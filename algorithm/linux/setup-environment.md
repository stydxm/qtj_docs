# 系统配置
::: tip 提示
很多在windows下需要配置很久的软件，在linux下往往只需要几行命令就可以实现，方便很多哦
:::

::: warning 注意
先不要按csdn奇怪的教程去装别的环境，尤其是c和c++相关的，不然装别的东西的时候会遇到更令人迷惑的情况
:::

## 换源
<!--::: info 说明
这一步可以跳过，建议你先试试下面的内容，如果发现速度特别慢再来做这一步
:::-->

在下载软件的过程中，因为源文件在国外服务器上，速度很可能非常慢，所以可以通过这一步告诉系统从国内服务器上下载文件，加速安装过程

首先打开命令行

::: tip 提示
已经打开了就不用关了重新开了，直接在同一个窗口里写就是了，下面所有步骤同理
:::

然后输入

``` bash
sudo sed -i 's/cn.archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
sudo apt update
sudo apt upgrade -y
```
```
# 命令解释：sudo代表用最高权限执行，后面的是sed替换这个命令的内容，不常用故不介绍
```

如果提示你输入密码，输入你之前设的就好了，输入的过程中不显示是正常情况，输完按回车就行，如果提示“请重试”就是输错了，再输一遍

::: tip 提示
一个字符都不能少不能漏，建议直接在虚拟机里打开这个网页，然后复制粘贴
:::

::: tip 提示
linux下的复制粘贴不是`ctrl+c`和`ctrl+v`，请使用`ctrl+shift+c`和`ctrl+shift+v`，`ctrl+c`是强制停止的意思

或者右键点复制和粘贴
:::

## 安装一些常用包
``` bash
sudo apt install -y git curl wget vim tmux screen zip unzip gcc g++ make cmake build-essential pkg-config 
```

<!--## Python环境
命令行输入

``` bash
sudo apt install python3 python3-pip python3-venv python3-opencv python-is-python3
```
```
# 命令解释：
# sudo代表用最高权限执行
# apt是debian系的包管理器，可以用命令安装或卸载软件
# install是apt的子命令，用于代表安装软件
# 后面的都是软件的包名，如果你还有需要安装的软件，可以用空格隔开然后放在后面
```

如果问是否同意，输入y再按回车

理论上说装好了的话，输入

``` bash
python --version
```

会显示`Python 3.10.12`

::: info 说明
最后几个数字不一样没关系，3开头的就行
:::-->

## VSCode安装和配置
::: tip 提示
这里推荐用vscode，它对于python和c++都提供了很好的支持。如果你习惯jetbrains的软件，那么pycharm和clion也是很好的选择
:::

![](https://mirror.ghproxy.com/raw.githubusercontent.com/Aikoyori/ProgrammingVTuberLogos/main/VSCode/VSCode-Thick.png)

``` bash
sudo apt install wget gpg
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" |sudo tee /etc/apt/sources.list.d/vscode.list > /dev/null
rm -f packages.microsoft.gpg
sudo apt install apt-transport-https
sudo apt update
sudo apt install code
sudo update-alternatives --set editor /usr/bin/code
```

这里命令较多，大多不常用，故不作解释。主要干的事是添加了微软的软件源并从中安装vscode，然后再把它设为默认编辑器

![](/vscode.jpg)

如果一切正常的话，点击最左下角的按钮，你应该能在应用列表里找到一个蓝色logo的软件，点击打开它，再点左边栏有四个小方块的那个按钮，切换到拓展标签页

![](/home-screenshot-linux-lg.png)

找到并安装以下几个插件，然后关闭vscode并重启：

```
Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
Python Extension Pack
C/C++ Extension Pack
```

::: tip 提示
打前面几个词再等会儿，要装的包应该在搜索结果很靠前的位置
:::

<!--## C++环境和opencv
`gcc`编译器和`cmake`这些应该会随系统安装，我们只需要手动装`opencv`并配置

::: danger 警告
从这里开始，所有的操作都需要在 **同一个目录中** 进行，即之前在vscode里写了那三个json文件的目录的父目录

关于如何进入目录，查看前面的章节
:::

<strong style="color: red">（看完下面的再去配！！！）</strong> 按照[这篇文章](https://www.cnblogs.com/booturbo/p/17399215.html)的步骤配置，这里不赘述。其中VScode的安装部分在上面以及完成了  <strong style="color: red">（看完下面的再去配！！！）</strong>

::: tip 提示
跳过文中的`7. 通过 cmake和gcc 来构建C/C++程序调用OpenCV`，从6直接到`8. 使用VS Code 配置C/C++项目环境来调用OpenCV`
:::

::: warning 注意
1（3）安装各种依赖库这一节里面有一行命令`sudo apt-get install python-dev python-numpy`

这个是有问题的，应该改成`sudo apt-get install python3-dev python3-numpy`
:::

::: info 信息
配置的时候可能会出现找不到`launch.json`和`c_cpp_properties.json`的情况，生成方式：

### lauch.json
在你刚才写cpp文件的那个页面，右上角有一个齿轮形状的按钮，点一下

### c_cpp_properties.json
同时按`ctrl+shift+p`，搜索找到`C/C++: 编辑配置(JSON)`，如果没切中文的话就是`C/C++: Edit Configurations(JSON)`
:::

::: tip 提示
编程中会用到的引号其实有三种，双引号` " `单引号` ' `和反引号``` ` ```，英文模式下按键盘1左边，tab上面的那个键就可以打出来

除了反引号之外，某些图片中的下划线也有可能会打错，看图时需要注意
:::

::: tip 提示
``` bash
git clone https://github.com/opencv/opencv.git
```
这一步可能会非常慢，建议换成
``` bash
git clone https://gitcode.com/opencv/opencv.git
```
:::

::: tip 提示
里面的图片自己随便找一张就行，但注意文件名，可以改图片里的文件名，也可以选择改代码里的
:::

::: tip 提示
不要按原教程写.cc，而是写.cpp，以后也一样
:::-->

## 任务
完成[任务1-2](../tasks/1)
