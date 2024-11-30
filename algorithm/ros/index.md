# ROS介绍
---
::: warning 警告
这里介绍的ROS是robot operating system，不是router os

router os是用于路由器的操作系统，两者除了名字像之外没有任何关系，找资料的时候不要搞错了
:::

## 什么是ROS
ROS虽然名字里带`operating system`，但它不是系统，是一些软件库和工具的集合

它是一种中间件，诞生的目的是解决机器人各个组件之间的通信问题

## 为什么要用ROS
拆解机器人的代码，可以分为感知、决策、控制三个部分

- **感知**：主要是各种传感器，比如激光雷达、相机这些，为决策提供数据支持

- **决策**：定位、路径规划、自主行为等算法，决定机器人下一步要去做什么

- **控制**：通过控制电机，操作机器人移动、机械臂运动等，执行决策结果

很显然，完成比较复杂的功能，就需要用很多组件进行组合

如果不依赖像ROS这样[^1]的软件，这些组件之间的通信问题是很复杂的，不同人写出来的接口也不会一样

这样巨大的单体应用缺乏可移植性，代码难以复用，也无法解耦

而且图像信息等数据量大的，还要考虑进程间通信的性能问题，代码编写时也更复杂

面对这样的情况，在2007年有人写出了ROS，由它来处理不同组件之间的通信，开发者只需要定义数据格式，然后关注各组件本身就可以了

[^1]: 这里说的是`像ROS`，那么其实能达到相同功能的软件并不只这一个，比如dora和yarp等。很显然别的生态都远不如ros，技术选型时完全不会考虑

## ROS2
ROS经过多年发展之后，代码越来越臃肿，当初架构的弊端也开始不断显现，于是开发者们完全重构了ROS，在2015年推出了ROS2

ROS2与ROS1的区别很大，找资料的时候请注意[^2]，**完全没有必要**去学1，学ROS2就行，ROS1已经快成为历史了

[^2]: 对于官方文档，在docs.ros.org的是ros2，在wiki.ros.org的是ros1

ROS的大版本号由两个单词组成，一般是一个形容词加动物名，但一般叫的时候只会写第一个单词，就是那个形容词，随着版本发布，还会有一张漫画风格的画作为logo，画中会有ros的吉祥物乌龟~~有点像忍者神龟？~~

目前最新的版本是jazzy(`Jazzy Jalisco`)，但最流行的是humble(`Humble Hawksbill`)，更早的foxy和dashing基本只有那时候的代码在用了

要注意noetic melodic kinetic等也有可能见到，但这些都是ros1的

目前ros的发行策略是每年发布一个大版本，隔一年的版本为LTS即长支持版本，会有五年的支持，非LTS则是到次年底

现在还在维护的是jazzy iron humble，其中jazzy和humble是LTS版本，我们推荐使用humble

|ROS2版本代号[^3]|发布时间|
|:-:|:-:|
|Jazzy Jalisco|2024.5.23|
|Iron Irwini|2023.5.23|
|Humble Hawksbill|2022.5.23|
|Galactic Geochelone|2021.5.23|
|Foxy Fitzroy|2020.6.5|
|Eloquent Elusor|2019.11.22|
|Dashing Diademata|2019.5.31|
|Crystal Clemmys|2018.12.14|
|Bouncy Bolson|2018.7.2|
|Ardent Apalone|2017.12.8|

[^3]: https://docs.ros.org/en/jazzy/Releases.html

ros1目前仅剩最后一个版本仍在维护，到2025年也将终止

|ROS1版本代号[^4]|发布时间|
|:-:|:-:|
|Noetic Ninjemys|2020.5.23|
|Melodic Morenia|2018.5.23|
|Lunar Loggerhead|2017.5.23|
|Kinetic Kame|2016.5.23|
|Jade Turtle|2015.5.23|
|Indigo Igloo|2014.7.22|
|Hydro Hermes|2013.9.4|
|Groovy Galapagos|2012.12.31|
|Fuerte Turtle|2012.4.23|
|Electric Emys|2011.8.30|
|Diamondback|2011.3.2|
|C Turtle|2010.8.2|
|Box Turtle|2010.3.2|

[^4]: https://wiki.ros.org/Distributions