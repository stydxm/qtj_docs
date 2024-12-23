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

::: tip 提示
如果不想用python了，要执行其他命令，先输入`exit()`，这个函数表示结束当前程序，用在这里可以退出python
:::

对于较长的python程序，每次都输入不现实，那么可以将它写入一个`.py`结尾的文件

比如，如果它叫`main.py`，那就可以写
``` bash
python3 main.py
```

## 开始学习
这里推荐[Python的官方中文教程](https://docs.python.org/zh-cn/3/tutorial/introduction.html)，从`3. Python 速览`开始看到`6.2. 标准模块`，其中以下章节可以跳过不看

- 4.8.3
- 4.8.6-4.9
- 5.6-5.8

## 规范
每门语言都有自己的代码风格规范，python的规范就是[PEP8](https://peps.python.org/pep-0008/)

编写代码时应该尽量遵循规范（尤其是命名和代码复用），并使用代码格式化工具辅助

[这里](https://www.runoob.com/w3cnote/google-python-styleguide.html)是一份中文的翻译和整理

### 命名
- 文件名、变量和函数命名全小写，如果有多个单词，使用下划线连接，比如`example_variable`

- 常量全大写，用下划线连接，比如`EXAMPLE_CONSTANT`

- 类名使用大驼峰，比如`ExampleClass`

### 缩进
使用四个空格缩进

### 空格
- 运算符的两边要加空格，比如`a = b + c`

- 逗号后加空格，比如`func(a, b, c)`

### 其他
- 不要在行尾加分号，更不要用分号把两个语句放在同一行

- 每行不要超出80个字符

- 导入语句放在整个文件最前面

- 函数声明之间、类定义之间，以及与主程序之间，要空两行

## 任务
这里内容较多，对应的任务是[任务2](../tasks/2)
