# 系统配置
::: tip 提示
很多在windows下需要配置很久的软件，在linux下往往只需要几行命令就可以实现，方便很多，还会自动处理依赖，这也是用linux的一个重要原因
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
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list.d/ubuntu.sources
sudo apt update
sudo apt upgrade -y
```
```
# 命令解释：sudo代表用最高权限执行，后面的是sed替换这个命令的内容，你大概不用故不介绍
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
sudo apt install -y git curl wget vim tmux screen zip unzip gcc g++ make cmake build-essential pkg-config gnupg2 gpg apt-transport-https
```

## Python环境
命令行输入

``` bash
sudo apt -y install python3 python3-pip python3-venv python3-opencv python-is-python3
```

安装完成后输入

``` bash
python --version
```

如果显示`Python 3.12.3`，那说明已经正常安装里

::: info 说明
后面的不一样没关系，3.1开头的就行
:::

## VSCode安装和配置
::: tip 提示
这里推荐用vscode，它对于python和c++都提供了很好的支持。如果你习惯jetbrains的软件，那么pycharm和clion也是很好的选择
:::


``` bash
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" |sudo tee /etc/apt/sources.list.d/vscode.list > /dev/null
rm -f packages.microsoft.gpg
sudo apt update
sudo apt install code
sudo update-alternatives --set editor /usr/bin/code
```

这里命令较多，大多不常用，故不作解释。主要干的事是添加了微软的软件源并从中安装vscode，然后再把它设为默认编辑器

![](/vscode.jpg)

如果一切正常的话，点击最左下角的按钮，你应该能在应用列表里找到一个蓝色logo（上面这张图）的软件，点击打开它，再点左边栏有四个小方块的那个按钮，切换到拓展标签页

![](/home-screenshot-linux-lg.png)

找到并安装以下几个插件，然后关闭vscode并重启：

```
Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
Python Extension Pack
C/C++ Extension Pack
```

::: tip 提示
打前面几个字母后可以等一会儿，要装的包应该在搜索结果很靠前的位置
:::

## 任务
完成[任务1-2](../tasks/1)
