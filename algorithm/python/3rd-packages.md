# 第三方库
前面提到过，python有着丰富的生态，其中重要的组成部分就是python的第三方库

## PyPI
为了方便安装和使用包，python有一个官方的网站[PyPI](https://pypi.org/)，第三方库作者会把他们写的库上传到这个网站

### 如何在pypi上找文档？
打开网站，中间有个搜索框，通过搜索功能找到包，页面上就会显示它的自述文件

较复杂的库可能会写上文档的链接，功能简单的往往在这个页面上就把用法写清楚了

## venv
在某些情况下，不同的包之间可能会互相干扰，或者不同项目需要同一个包的不同版本。而venv是一个可以隔离出一个虚拟环境的工具

虚拟环境相当于是使用相同的python，但虚拟环境中所有的包和设置都是独立的。在同一台电脑上开发不同项目时，可以为每个项目单独创建一个虚拟环境，避免他们需要的环境互相影响

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

包管理器是一类自动安装、配置、卸载和升级软件包的工具，前面用到过的`apt`就是用于debian系统的包管理器，而`pip`则可以在所有系统上管理python包

::: info 信息
python的包管理工具还有PDM和Poetry，使用率都远不及pip
:::

和apt相同，我们先换个源

```bash
pip3 config set global.index-url https://mirror.nju.edu.cn/pypi/web/simple
```

### 安装新的包
使用pip安装包的命令是`pip install 包名`，卸载是`pip uninstall 包名`

如果要指定安装版本（通常不需要），那么输入`pip install 包名==版本号`

::: tip 提示
更多用法参考[官方文档](https://docs.python.org/zh-cn/3/library/venv.html)
:::

因为虚拟环境是隔离的，所以虚拟环境外的包是用不了的

### 尝试一下
我们先装个`opencv`吧

``` bash
pip3 install opencv-python
```

新建一个python程序尝试一下

``` python
import numpy as np
import cv2

image = np.full((540, 960, 3), (0, 0, 255), dtype=np.uint8)
cv2.imshow("Image", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

::: info 信息
从这里就可以看出来，包名和在代码里import的名字有可能不同

那么如何知道使用方法呢？看文档，查资料
:::

## 任务
完成[任务4](../tasks/4)
