# 【硬件】硬件保姆级教学（隔壁村熊二看完都会了）
## （一）前言
欢迎大家来加入硬件组，硬件组主要负责机器人所需的电路模块制作，满足机器人研发的需求，提高机器人性能。

介绍完硬件组，就该谈谈硬件组的学习路径了。要学会电路板制作和单片机代码编写等。接下来给大家介绍一下培训方案，在学习过程中，有问题先尝试自行解决，再去找学长！！！电路图和电路板画完了之后发给学长看看，再进行下一步！！！

## （二）培训方案
### 1.认识机器人所需的各种模块
https://www.bilibili.com/video/BV1rC4y1d7vb


### 2.学习单片机部分
#### （1）学习C语言
下面两个教程二选一，一定要动手敲代码，学到指针就勉强够用了

https://www.bilibili.com/video/BV1dr4y1n7vA （比较经典）

https://www.bilibili.com/video/BV12v411a74s （比较有意思）

#### （2）先斥“巨资”买点东西
STM32F103C8T6最小系统板：
https://m.tb.cn/h.gl2XRUBWXlhSjfT?tk=Mg8F3eoF5pM

stlink v2：
https://m.tb.cn/h.gO1Dl8KyFcdqrf8?tk=5XAc3eovuFD

USB转TTL， CH340模块， USB转串口：
https://m.tb.cn/h.gO1wahBhWLfnPsB?tk=RiH53eouifs

#### （3）基础入门视频

https://www.bilibili.com/video/BV1m7411H7oT （P1-P9）

#### （4）可以参照大疆教程学习一下robomaster的C板（开发板可以来实验室借，也有学长自制的）

资料链接：
https://pan.baidu.com/s/1JvrMd4vQGSzX-LfxVK23AQ?pwd=nzud


### 3.学习硬件知识
https://www.bilibili.com/video/BV1G14y1v7be （P1-P4）

### 4.学习电路板制作
#### （1）下载嘉立创EDA专业版和下单助手
https://pan.baidu.com/s/1XmRXjiWezN_zlTliF3Y6bA?pwd=48s3

#### （2）跟着视频绘制GD32E230核心板原理图和PCB
https://www.bilibili.com/video/BV1sv4y1T7UB

（资料：https://pan.baidu.com/s/1Eh6LZlSU3xKVjQ72uHTg6w?pwd=nsif ）

#### （3）下单电路板（白嫖）
https://www.bilibili.com/video/BV1Ka4y1F7ZK
（提示：快递建议选免费的顺丰，提交完订单后，0块钱也要去支付一下）

#### （4）自行焊接调试，并烧录程序验证
焊接教程：
https://www.bilibili.com/video/BV1xV411r7YY

（会有统一的线下培训）
（资料包里面的hex文件就是烧录文件，不会的话找学长帮忙）

#### （5）照着原理图，再画一块STM32F103的核心板
（资料：https://pan.baidu.com/s/1n11QEFGmcelsGO_1tlgSmg?pwd=cdtr ，原理图在资料包的2.PDFSchDoc目录下，建议加一个6脚的TYPE-C供电，最好再加一个TVS）

（实在不熟练，可以看看对应的教学视频：https://www.bilibili.com/video/BV1GR4y1m7RR ）

#### （6）焊接后，烧入程序验证，效果参照视频
https://www.bilibili.com/video/BV1p741147xW?p=3

#### （7）自行设计制做电源板

要求：使用TPS5430芯片，实现24V转12V，5V，-5V，3.3V，接口使用公母XT60，XT30和排针

#### （8）绘制四层板和高速线走线
https://www.bilibili.com/video/BV1nj411v7Lu

芯片建议购买VL813，便宜，而且和VL812封装什么的一模一样，但是还是要注意很有可能买到假芯片，参考工程文件：
https://pan.baidu.com/s/11BclIdWCZy47IBXv-1bJOA?pwd=9gn9

#### （9）制作功率计
主控选择STM32G431，DCDC降压、电压电流检测建议和队里的超电一样

#### （10）学习更多的电路知识
https://github.com/DonotFreeze/RoboMater-Hardware-Group-Learning-Path?tab=readme-ov-file （学习第三章硬件知识）

#### （11）SMT下单教程
https://pan.baidu.com/s/14igsrnHJBQWPlRYUrWfOjw?pwd=qva7
