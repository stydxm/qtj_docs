# 计算机视觉
从这里开始，我们完成了基础内容的学习，可以利用前面的内容做一些实际任务了

计算机视觉是让机器拥有视觉同时让机器能够理解所看到的东西并对其进行一定的分析和处理的研究领域。目前主要分为 **图像识别、图像分割、图像生成、目标检测、目标追踪、视频处理** 等，因为有着共通的根基和大量知识交叠，其实很难将他们分得太开。此部分就主要介绍最基本的概念

::: danger 说明
从这里开始，或许会有尝试了很久都无法理解、不能解决的情况

那么，或许是你不适合软件开发这个领域吧
:::

## 图像
### 像素
像素是构成图像的基本单元，像素通过行列组合成矩阵就形成了图像。在计算机中一般都以矩阵的形式存储图像。若仔细观察你的手机或电脑屏幕，应该能看到微小的由红绿蓝三色组成的发光单元。当像素密度足够高，人眼就会认为一张图片是连续的了。在图像处理的过程中，我们常把图像视作一个二元函数（如果是灰度图的话），在两个坐标轴上，亮度随坐标而变化。如果图片是彩图，就需要下面介绍的颜色空间

需要注意的是与中学学的平面坐标系不同，计算机中一般会把坐标原点放在左上角，xy轴正方向依旧是向右、向下的

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.clientX
  y.value = event.clientY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

例如，你现在鼠标的坐标就是x={{ x }}, y={{ y }}，移动你的鼠标时试一试吧

### 像素深度
自然届中的颜色固然是连续的，但是在计算机中存储的数据是离散的。存储一个像素所使用的位(bit)数叫做像素深度，可以看作图像在某一点取值的值域。常听说的8位宽颜色就是用8位数据表示一种颜色，存储一个像素使用的位数越多，其能保存的信息就越丰富，主要表现在能显示的色彩的数量和对比度上。

### 通道数和颜色空间
当一张图像只有一个通道的时候，他只能表示一个维度的信息，比如这张灰度图，在唯一的一个亮度（灰度）通道中保存。

![](/herogray.jpg)

当一张图片想要以彩图的形式保存，它至少需要三个通道，即Red Green Blue（RGB），每个通道都保存着0～255的值，对应不同的颜色分量。仔细观察下图就会发现，原图中呈现蓝色的部分在蓝色通道中比其他通道要更亮，比如机器人后轮下方的一片蓝光，在红色通道中就几乎没有分量存在。

![](/rgbsplit.png)

除了RGB空间，还有其他不同的颜色空间如HSV、YUYV、LAB等，他们都是把图片投影到不同的空间中

### 图像的压缩编码方式
为了达到减少空间占用的目的，我们会通过某种算法将图像进行压缩。存储图片时格式一般有bmp, jpg, png, tif, gif等。不同格式图片的解码速度和占用空间大小不同，有时候甚至是算法时间占用中的关键一环。

### 视频

视频就是连续的图像集合，从另一个角度来看，可以把时间当作除x、y外的另一个坐标轴，看作是一个三维的函数。如果选取一个确定时间，则视频退化为图片。最简单的视频保存格式和图像的压缩编码相同，而高级一些的压缩算法会根据两帧或多帧内容的相关性，找到关键帧和相似相同部分，进一步压缩空间。

## 典型的任务
### 图像识别
给定一张图片，通过算法确定这张图像的分类，又叫图像分类。比如提供一张含有猫的图片给计算机，计算机应当认出：这张图里有一只猫咪。图像识别的输出是**整张图片的标记**，是图片（若把一张宽高分别为w、h的图片看成一个长度为w\*h的向量，则图像识别是找到一个从w\*h的空间到图像分类标记的映射（函数）。

![](/imageclassification.png)

与图像识别相近的任务还有单帧场景理解、描述生成等，这些任务的输入仍然是一幅图片，而输出是若干个描述图像内容的句子或单词，也可以是图像中物体之间的关系。

### 图像生成
这部分的内容比较复杂，现在一般是通过神经网络训练一个生成模型，它可以根据你给予的标签（如猫咪），根据学习的数据生成一张对应的图片。VAE、flow model、自回归模型和GAN是生成模型领域的始祖。

这方面想必大家最近已经听得不少了，但与我们基本无关，不做过多介绍

### 目标检测
这是比赛中最常用的算法

目标检测和图像识别在一些方面有些类似，图像识别主要是对图像进行分类，让计算机判断这张图“有什么”或者”是什么“，而目标检测不仅要判断图片中是否有对应的物体，还要输出关于这些物体”在哪儿“的信息。和目标检测相似的“目标定位”的任务则是对图像中的**一个特定物体**进行定位，而目标检测算法中，图像内含有的对象种类和数量都是**未知的**。*目标检测的输出是目标物体的位置和类别。*

![](/objdetect.jpg)

上图展示的是多目标检测算法的检测结果，基于神经网络的目标检测算法能将**一套框架**运用到**所有**目标对象的检测问题上，在训练过程中习得待检测对象的特征。而基于灯条匹配、扇叶识别的算法则是专门针对装甲板识别和能量机关识别的，相当于我们手动设计需要检测对象的特征。他们各有优劣，我们会在人工智能部分中进行更详细的介绍。

时下效果好、速度快的目标检测算法几乎都是基于神经网络构建的，常见的有R-CNN系列、YOLO、SSD等。可以参阅这个系列的文章来进一步了解目标检测：[目标检测入门](https://zhuanlan.zhihu.com/p/34142321)。

### 图像分割
根据图像的特征把图片分为几个有确定性质的区域，并寻找我们感兴趣的区域。图像分割算法可以目标检测的基础上进一步解析图像，*其输出可以是对每个像素的像素级别的描述*，如下图中灰粉色的区域就代表“运动员”。常见的算法有阈值分割、边缘分割、聚类、基于神经网络的语义分割等。想要了解更多可以参考[图像分割传统方法整理](https://zhuanlan.zhihu.com/p/30732385)。同样，最新的效果最好速度最快的算法也是基于神经网络的。这类算法目前在雷达站、自动步兵上可能会使用到。
  
![](/sam.jpg)
  
### 目标跟踪
视觉目标（单目标）跟踪任务就是在给定某视频序列初始帧的目标大小与位置的情况下，预测后续帧中该目标的大小与位置。有同学可能会疑问，明明目标检测算法能对每一帧图像进行处理确定出目标的位置，为什么还需要目标跟踪？这是因为目标检测算法需要对整张图片进行处理，其消耗的运算资源很大，而目标跟踪不仅运算量以数量级的优势比前者小，还有简单准确，适用面广，抗噪性好的特点。因此在检测出目标之后，可以使用目标跟踪算法来进行后续的处理，同样能识别到装甲板等物体。在 *5.3* 中我们会更具体地介绍这个算法。

### 视频理解
在以上的几个任务中，大多以单张图片作为任务对象，视频处理则是将一段时间内的所有帧都作为任务输入。一个RM赛场的例子就是，我们可以保存在一秒钟内相机拍摄的所有图片，将它们**堆叠成一个张量**，送入卷积神经网络的输入层（卷核的维度也要进行相应的改变）。此时，我们便不单单可以处理定格在图像中的信息了，还能够对包含时间的数据如**机器人处于小陀螺运动**这个状态进行检测，以启用反小陀螺算法。利用了历史数据的图像处理算法都可以看作是视频处理算法。

::: tip 提示
这里只介绍了一些和与比赛相关度较高的内容，实际场景中还有大量不同的计算机视觉任务，感兴趣的同学可以多阅读论文了解时下热门的研究方向（比如最近3DGS挺火的，也是很有意思的）
:::

## OpenCV
OpenCV 是一个软件工具包，用于处理实时图像和视频，并提供分析和机器学习功能。使用这些标准化的软件包可以极大提高我们的开发效率，并且这些工具包对一些算法运行速度有特别的优化，能够使得这些算法在拥有GPU或支持多线程的电脑上得到加速。掌握OpenCV中的基本数据类型和常用函数是视觉组迈出开发的第一步，同时也能学习大量的相关知识。

[这是OpenCV的官网](https://opencv.org/)，可以在这里查阅说明文档和例程。

### 安装
> opencv可以在c++ python js等很多语言中调用，以后我们的任务默认不限制语言，达成目标即可

安装也非常方便，用apt直接就能装好

``` bash
sudo apt update
sudo apt install libopencv-dev libopencv-contrib-dev python3-opencv
```

### 基本数据类型
- Mat：矩阵类型，能够保存图像。
- Point：一个像素点，或者任何类型的“点”。
- Scalar：一个四维点类，是许多函数的参数，常用于描述颜色。
- Size：同样是一对数据构成的组，一般表示一块区域或图像的宽高，有些时候可以和point互换。
- Rect：rectangle，矩形类，拥有Point和Size成员，用于表示一块矩形的区域。
- RotatedRect：同上，不过有额外的成员angle用于表示角度。注意这个类的角度系统有些独特，可参考：[OpenCV中旋转矩形的角度](https://blog.csdn.net/heroacool/article/details/105410202)。

::: info 信息
更多内容后续介绍，具体的类、方法等可在文档中查阅
:::

## 任务
完成[任务8-1](../tasks/8)