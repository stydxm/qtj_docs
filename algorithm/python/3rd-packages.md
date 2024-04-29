# 第三方库
前面提到过，python有着丰富的生态，其中重要的组成部分就是python的第三方库

## PyPI
为了方便安装和使用包，python有一个官方的网站[PyPI](https://pypi.org/)，第三方库作者会把他们写的库上传到这个网站

### 如何在pypi上找文档？
打开网站，中间有个搜索框，通过搜索功能找到包，页面上就会显示它的自述文件

较复杂的库可能会写上文档的链接，功能简单的往往在这个页面上就把用法写清楚了

## venv
在某些情况下，包与包之间可能会互相干扰，而venv是一个可以隔离出一个虚拟环境的工具

我们先创建一个虚拟环境
``` bash
python3 -m venv ./venv
```
然后激活它
``` bash
source ./venv/bin/activate
```
此时你的命令行最前面应该会出现`(venv)`，这说明成功激活了虚拟环境
::: tip 提示
如果需要退出虚拟环境，可以输入
``` bash
deactivate
```
或者直接关了命令行重开（
:::

更多用法参考[官方文档](https://docs.python.org/zh-cn/3/library/venv.html)

## pip
pip是python官方的包管理工具，和python一起安装（就是说以前应该已经装好了的）

包管理器是是一种自动安装、配置、卸载和升级软件包的工具，前面用到过的`apt`就是用于debian系系统的包管理器，而`pip`则可以在所有系统上管理python包

::: info 信息
python的包管理工具还有PDM和Poetry，使用率都远不及pip
:::

和apt相同，我们先换个源

```bash
pip3 config set global.index-url https://mirror.nju.edu.cn/pypi/web/simple
```

因为虚拟环境是隔离的，所以虚拟环境外的包是用不了的，那我们先装个`opencv`吧

``` bash
pip3 install opencv-python
```

更多用法参考[官方文档](https://docs.python.org/zh-cn/3/library/venv.html)
