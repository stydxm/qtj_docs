# YOLO与目标检测
## 目标检测
很好理解，找出图片中特定目标的位置、大小和类型（可能有多种），这也是计算机视觉中的经典任务

## YOLO
YOLO是缩写，全称一个很有意思的名字，叫You Only Look Once

这个名字和它的模型结构其实也有关系，其实很形象，不是乱起的。它的理念就是只需要一次前向传播，与在这之前的实现都不同

YOLO是目标检测领域的SOTA模型，同时开发团队还为它开发了一些用于训练和推理的工具包，它因简单易用效果好，被非常广泛地运用~~与各种课设毕设~~

::: info 说明
SOTA是state of the art的缩写，即当前所有的模型中效果最好的
:::

后来在YOLO主干网络的基础上还拓展了一些模型，用于检测骨骼、分割、跟踪等任务

::: tip 提示
虽然是烂大街了，但它确实方便效果好，上限也不低，在实际生产环境下也是有不少应用的
:::

## Ultralytics
YOLO是一系列算法模型的名字，而Ultralytics是现在开发YOLO的团队的名字，他们把可以便捷调用yolo的库也命名为Ultralytics

YOLO的很多资料在Ultralytics公司的网站上，可以[点此打开](https://docs.ultralytics.com/)。后续请尽量参考此资料的**英文原版**，少看一些第三方的古董资料

::: warning 警告
不知道为啥，和很多开源项目不同，它的中文版文档非常离谱，完全就是机翻，会把`train`翻译成`火车`，把`val`翻译成`瓦尔`，`export`翻译成`出口`，千万不要看
::: details 提示
如果你执意要看，这里有一些我发现了的问题
|原文|错误翻译|正确翻译|
|:-:|:-:|:-:|
|train|火车|训练|
|val|瓦尔|验证|
|export|出口|导出|
|track|轨道|跟踪|
|segment|分段|分割|
|models|机型|模型|
|OBB|定向包围盒|旋转矩形|
|segment anything model|分段任何模式|SAM模型|
::::::

目前YOLO最新的是第十个版本即YOLOv10，最主流的是YOLOv8，ultralytics库支持的也是v8，目前9和10都还太新了

回顾历史的话，v3和v5都有不少的应用，它们虽然效果不如v8但推理性能高很多，常被用到树莓派等低算力设备上

## YOLO模型和库的使用
这里不详细教授了，参照文档自己配置好环境安装好所需的库，然后自己尝试一下

## 其他目标检测模型
还有一些目标检测网络，如faster RCNN、RetinaNet、SSD等，他们在效果、性能、易用性不像YOLO这样平衡，但也各自有一些特点，推荐去尝试对比一两个

## 任务
完成[任务12-1](../tasks/12)和[任务12-2](../tasks/12)