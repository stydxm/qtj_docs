# URDF

[FishROS：URDF统一机器人描述格式](https://fishros.com/d2lros2/#/humble/chapt8/get_started/1.URDF%E7%BB%9F%E4%B8%80%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%BB%BA%E6%A8%A1%E8%AF%AD%E8%A8%80)

前面我们手写TF，描述了底盘和相机之间的关系

```text
base_link → camera_link
```

但机器人上可能有相机、雷达、轮子和机械臂，每个零件用代码写TF发布节点来检查干涉什么的太不优雅

URDF（Unified Robot Description Format，统一机器人描述格式）就是用来统一描述机器人结构的。它使用XML编写，可以告诉ROS2机器人由哪些部分组成、各部分如何连接以及模型长什么样

::: tip 提示
URDF只是机器人的描述文件，本身不会让机器人运动，也不是控制器或者仿真器，可以理解为机械制图在算法的重生
:::

XML的语法不复杂，这里不会专门介绍，不了解的话先看一下标签、属性和嵌套关系就够用了

## Link与Joint

URDF最重要的概念只有两个：`link`和`joint`

### Link

`link`可以理解为机器人中不会发生形变的一块刚体，同时也代表一个坐标系

例如底盘、相机和左右轮可以分别写成

```text
base_link
camera_link
left_wheel_link
right_wheel_link
```

这里的link不是网页中的超链接，~~也不是塞尔达的那位~~，它只是机器人模型中的一个部件(理想刚体)

### Joint

只有若干个link还不够，ROS2并不知道它们间的关系，`joint(理解为关节?)`就是用来连接两个link的

```text
父link → joint → 子link
```

![结构说明](/public/urdf_joint_link.png)

常见的joint有四种

|类型|用途|
|:-:|:-:|
|`fixed`|完全固定，例如安装在底盘上的相机|
|`revolute`|在一定角度内旋转，例如机械臂关节|
|`continuous`|可以不断旋转，例如轮子|
|`prismatic`|沿直线移动，例如伸缩机构|

关节还有旋转轴、运动范围和速度限制等属性，需要用到时再看[中文官方可移动模型教程](https://fishros.org/doc/ros2/humble/Tutorials/Intermediate/URDF/Building-a-Movable-Robot-Model-with-URDF.html)

::: info 信息
URDF与TF一样使用树形结构：一个子link只能有一个父link，也不能形成闭环
:::

## 一个URDF大概长什么样

下面还是描述前面用过的底盘和相机

```xml
<?xml version="1.0"?>
<robot name="example_robot">
  <link name="base_link"/>
  <link name="camera_link"/>

  <joint name="base_to_camera" type="fixed">
    <parent link="base_link"/>
    <child link="camera_link"/>
    <origin xyz="0.2 0 0.1" rpy="0 0 0"/>
  </joint>
</robot>
```

它描述的关系是

```text
base_link
└── camera_link
```

`parent`和`child`指定父子link，`origin`表示子link相对于父link的位置和姿态

- `xyz`依次表示x、y、z方向的位移，单位是米
- `rpy`依次表示roll、pitch、yaw，单位是弧度

所以这里的相机位于底盘前方`0.2m`、上方`0.1m`，并且没有旋转

## 除了骨架还能写什么

上面的URDF只有坐标关系，还没有给机器人画模型。一个link中还可以加入这些内容

|标签|用途|
|:-:|:-:|
|`visual`|机器人显示出来是什么样子|
|`geometry`|使用方块、圆柱、球体或者mesh作为形状|
|`material`|模型的颜色和材质|
|`collision`|碰撞检测时使用的形状|
|`inertial`|质量、重心和转动惯量|

如果只是想在RViz2中看到机器人，先学`visual`就够了，具体参见[中文官方可视模型教程](https://fishros.org/doc/ros2/humble/Tutorials/Intermediate/URDF/Building-a-Visual-Robot-Model-with-URDF-from-Scratch.html)

`collision`和`inertial`主要在物理仿真中使用，内容会复杂不少，需要时再看[中文官方碰撞与物理属性教程](https://fishros.org/doc/ros2/humble/Tutorials/Intermediate/URDF/Adding-Physical-and-Collision-Properties-to-a-URDF-Model.html)

::: warning 警告
模型能在RViz2里正常显示，不代表它可以直接用于仿真。好看的是visual，真正发生碰撞的是collision，决定它怎么被推着跑的是inertial
:::

## URDF是怎么运行起来的

URDF只是一个XML文件，真正把它接入ROS2的是`robot_state_publisher`

```text
URDF
  ↓
robot_description
  ↓
robot_state_publisher ← /joint_states
  ↓
TF
  ↓
RViz2
```

URDF通常会作为`robot_description`参数交给`robot_state_publisher`

- 对于固定关节，它可以直接根据URDF发布TF
- 对于可动关节，它还需要从`/joint_states`中知道关节当前的位置，再计算并发布TF

真实机器人一般由编码器和控制程序发布关节状态，学习和检查模型时则可以使用`joint_state_publisher_gui`拖动滑块

具体的运行过程参见[中文官方robot_state_publisher教程](https://fishros.org/doc/ros2/humble/Tutorials/Intermediate/URDF/Using-URDF-with-Robot-State-Publisher.html)

::: tip 提示
URDF一般描述`base_link`到相机、雷达、轮子等机器人内部坐标系的关系，`map → odom → base_link`通常由定位和里程计节点负责
:::

## 文件多了怎么办

机器人结构复杂后，纯URDF里会出现很多重复内容，比如左右轮通常只有名字和位置不一样

Xacro可以在XML中使用变量、表达式和宏，最后再生成普通URDF

```text
Xacro → URDF → robot_state_publisher
```

先学会写简单URDF，再用Xacro减少复制粘贴即可，具体语法参见[中文官方Xacro教程](https://fishros.org/doc/ros2/humble/Tutorials/Intermediate/URDF/Using-Xacro-to-Clean-Up-a-URDF-File.html)

## 创建机器人描述功能包

机器人模型一般会单独放在一个description功能包中

```bash
cd ~/ros2_ws/src
ros2 pkg create robot_description --build-type ament_cmake
```

常见的文件结构如下

```text
robot_description
├── CMakeLists.txt
├── launch
├── meshes
├── rviz
├── urdf
└── package.xml
```

- `urdf`：存放URDF和Xacro文件
- `meshes`：存放`.stl`、`.dae`等模型文件
- `launch`：启动状态发布器和RViz2
- `rviz`：保存RViz2配置

到这里先知道各文件应该放在哪里就行，下一步再动手写一个真正能显示的机器人模型

*我给一个ROS暑期VLA夏令营的神秘SDK打包物体*
![urdf_图片](/public/URDF_looksgood.png)

## 与机械相关的

[URDF是好东西，但是机械一定标质量哦](https://wiki.ros.org/sw_urdf_exporter)

一些CAD软件(SoildWorks有插件)可以通过插件导出URDF和mesh，确实能少写很多东西，但导出完成后仍然要检查坐标轴、质量、惯量和模型路径

上面的SolidWorks导出器资料比较老，使用前记得确认SolidWorks、插件和ROS2版本是否兼容，~~不要导出来能看就直接交给算法~~(其实目前我也就想到看看机械臂规划干涉什么的，主要了解概念，配合Gazebo有点美，相信你们做得到)
