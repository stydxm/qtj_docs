# 基础语法
这部分已经有很多已有资料了，就不再重复整理重复写了，阅读已有资料即可  

## 安装Python
命令行输入

``` bash
sudo apt install -y python3 python3-pip python3-venv python3-opencv python-is-python3
```

如果问是否同意，输入y再按回车

命令解释：
- sudo代表用最高权限执行
- apt是debian系的包管理器，可以用命令安装或卸载软件
- install是apt的子命令，用于代表安装软件
- 后面的都是软件的包名，如果你还有需要安装的软件，可以用空格隔开然后放在后面

理论上说装好了的话，输入

``` bash
python --version
```

会显示`Python 3.10.12`

::: info 说明
最后几个数字不一样没关系，是3.1开头的就行
:::

## 使用Python
打开命令行，输入
``` bash
python3
```
就可以进入Python的交互模式

对于较长的python程序，每次都输入不现实，那么可以将它写入一个`.py`结尾的文件

比如，如果它叫`main.py`，那就可以写
``` bash
python3 main.py
```
::: tip 提示
如果你试了上一个命令，那先关掉窗口再打开，不然会得到预期之外的结果
:::

## 开始学习
这里推荐[Python的官方中文教程](https://docs.python.org/zh-cn/3/tutorial/introduction.html)，从`3. Python 速览`开始看到`6.2. 标准模块`，其中以下章节可以跳过不看

- 4.8.3
- 4.8.6-4.9
- 5.6-5.8

## 任务
这里内容较多，对应的任务是[任务2](../tasks/2)
