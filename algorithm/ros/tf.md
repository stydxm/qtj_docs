# TF 树

## 用ROS不就是为了这种方便么
机器人学不是一朝一夕能练成的，但算法之路亦有捷径，好歹不用像电控一样手写状坐标变换代码(其实永远逃不过)，因为ROS2自带的TF2已经帮我们造好轮子了。  
关于坐标转换的功能大部分都能开箱即用   
* 维护坐标系关系
```text
map → odom → base_link → camera_link
```
* 保存带时间的变换
* 把数据从一个坐标系转换到另一个坐标系

也许你会对tf2所解决的问题感到疑惑，[fishros的介绍十分不错](https://fishros.com/d2lros2/#/humble/chapt7/get_started/1.TF2%E4%BB%8B%E7%BB%8D)   

## 基本规则   

### TF树规则

- 每个子坐标系只能有一个父坐标系   
- 一个父坐标系可以有多个子坐标系   
- 坐标系之间不能形成闭环   

### 父子坐标系

`header.frame_id`是父坐标系，`child_frame_id`是子坐标系，transform描述子坐标系相对于父坐标系的位置和姿态。TF树中的箭头仅表示父子关系，不表示只能沿箭头方向进行坐标转换。
一般图中的箭头用于明确表示父级到子级。

### 静态与动态TF

- 静态TF：安装关系不变，使用`StaticTransformBroadcaster`，发布到`/tf_static`。
- 动态TF：关系随时间改变，使用`TransformBroadcaster`，发布到`/tf`。

### Broadcaster、Listener和Buffer

Broadcaster → 发布变换
Listener → 接收变换
Buffer → 按时间缓存并查询变换

::: info 信息
坐标系的维护关系由tf2完成了，那它具体是什么标准？我们代码工程是建设在共识上的！！！ <big>__整个实验室都用 REP-103__</big>   
:::

![传世宝](/public/3D_corrdinate_systems.png)

::: warning
__谁没用就自己改__
:::

![bigcat_watchingYou](/public/youcatevensay.png)

当你意识到ROS存在这个机制后，随手用是非常自然的，那就先拿两个示例试试手吧   

## 代码(也可以只是命令)   

### 用命令发布一个静态TF

先试试不写代码的版本。假设相机固定在底盘前方`0.2m`、上方`0.1m`的位置，可以直接运行

```bash
ros2 run tf2_ros static_transform_publisher \
  --x 0.2 --y 0.0 --z 0.1 \
  --roll 0.0 --pitch 0.0 --yaw 0.0 \
  --frame-id base_link \
  --child-frame-id camera_link
```

这个命令会一直发布`base_link → camera_link`的静态TF。另开一个终端查看

```bash
ros2 run tf2_ros tf2_echo base_link camera_link
```

应该能看到

```txt
- Translation: [0.200, 0.000, 0.100]
- Rotation: in Quaternion (xyzw) [0.000, 0.000, 0.000, 1.000]
- Rotation: in RPY (radian) [0.000, -0.000, 0.000]
// ROS2使用 xyzw 存储四元数
```

这表示`camera_link`位于`base_link`前方`0.2m`、上方`0.1m`，因为没有旋转，所以四元数是`(0, 0, 0, 1)`。

### 写一个会移动的TF

下面写一个完整的功能包，让`base_link`相对`world`左右往复移动，再把相机固定到`base_link`上

```text
world → base_link → camera_link
       动态TF       静态TF
```

最后由监听节点查询`camera_link`在`world`中的位置。TF2会自动把中间两段变换组合起来，不需要我们自己做矩阵乘法。

#### 创建功能包

进入工作空间的`src`目录

```bash
cd ~/ros2_ws/src
ros2 pkg create tf_demo --build-type ament_cmake --dependencies rclcpp tf2 tf2_ros geometry_msgs
mkdir tf_demo/launch
```

完成后的文件结构如下

```text
tf_demo
├── CMakeLists.txt
├── launch
│   └── tf_demo.launch.py
├── package.xml
└── src
    ├── dynamic_broadcaster.cpp
    └── tf_listener.cpp
```

#### 编写动态TF发布节点

在`tf_demo/src`中创建`dynamic_broadcaster.cpp`和`tf_listener.cpp`(监听节点)

::: code-grop
```cpp [tf_demo/src/dynamic_broadcaster.cpp]
#include <chrono>
#include <cmath>
#include <functional>
#include <memory>

#include "geometry_msgs/msg/transform_stamped.hpp"
#include "rclcpp/rclcpp.hpp"
#include "tf2_ros/transform_broadcaster.hpp"

using namespace std::chrono_literals;

class DynamicBroadcaster : public rclcpp::Node
{
public:
  DynamicBroadcaster()
  : Node("dynamic_tf_broadcaster"), start_time_(this->now())
  {
    broadcaster_ = std::make_unique<tf2_ros::TransformBroadcaster>(*this);
    timer_ = this->create_wall_timer(
      50ms, std::bind(&DynamicBroadcaster::timer_callback, this));
  }

private:
  void timer_callback()
  {
    geometry_msgs::msg::TransformStamped transform;
    // 这里需要持续更新`header.stamp`。动态TF不仅记录两个坐标系的空间关系，还要说明这个关系是哪一时刻的。
    transform.header.stamp = this->now();
    transform.header.frame_id = "world";
    transform.child_frame_id = "base_link";

    // 时间每增加1秒，相位增加1弧度，底盘做圆周运动
    const double seconds = (this->now() - start_time_).seconds();
    transform.transform.translation.x = std::cos(seconds)*0.3;
    transform.transform.translation.y = std::sin(seconds)*0.3;
    transform.transform.translation.z = 0.3;

    // 这里只移动、不旋转，单位四元数表示旋转角度为0
    transform.transform.rotation.x = 0.0;
    transform.transform.rotation.y = 0.0;
    transform.transform.rotation.z = 0.0;
    transform.transform.rotation.w = 1.0;

    broadcaster_->sendTransform(transform);

    RCLCPP_INFO_THROTTLE(
      this->get_logger(), *this->get_clock(), 1000,
      "Publishing: base_link y = %.2f m",
      transform.transform.translation.y
    );
  }

  rclcpp::Time start_time_;
  rclcpp::TimerBase::SharedPtr timer_;
  std::unique_ptr<tf2_ros::TransformBroadcaster> broadcaster_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<DynamicBroadcaster>());
  rclcpp::shutdown();
  return 0;
}
```

```cpp [tf_demo/src/tf_listener.cpp]
#include <chrono>
#include <functional>
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "tf2/exceptions.hpp"
#include "tf2/time.hpp"
#include "tf2_ros/buffer.hpp"
#include "tf2_ros/transform_listener.hpp"

using namespace std::chrono_literals;

class TfListener : public rclcpp::Node
{
public:
  TfListener()
  : Node("tf_listener")
  {
    buffer_ = std::make_unique<tf2_ros::Buffer>(this->get_clock());
    listener_ = std::make_shared<tf2_ros::TransformListener>(*buffer_);
    timer_ = this->create_wall_timer(
      500ms, std::bind(&TfListener::timer_callback, this));
  }

private:
  void timer_callback()
  {
    try {
      // 参数依次是目标坐标系、源坐标系和查询时间
      // TimePointZero表示查询最新的可用变换
      const auto transform = buffer_->lookupTransform(
        "world", "camera_link", tf2::TimePointZero);

      RCLCPP_INFO(
        this->get_logger(),
        "camera_link in world: x=%.2f, y=%.2f, z=%.2f",
        transform.transform.translation.x,
        transform.transform.translation.y,
        transform.transform.translation.z);
    } catch (const tf2::TransformException & exception) {
      // 程序刚启动时TF可能还没到达，等待下一次定时器查询即可
      RCLCPP_WARN_THROTTLE(
        this->get_logger(), *this->get_clock(), 1000,
        "Waiting for TF: %s", exception.what());
    }
  }

  rclcpp::TimerBase::SharedPtr timer_;
  std::unique_ptr<tf2_ros::Buffer> buffer_;
  std::shared_ptr<tf2_ros::TransformListener> listener_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<TfListener>());
  rclcpp::shutdown();
  return 0;
}
```
:::

`lookupTransform("world", "camera_link", ...)`表示查询将`camera_link`中的数据转换到`world`所需要的变换，返回的平移也就是相机原点在`world`中的位置。

::: tip 提示
查询TF必须处理异常。程序刚启动、TF树没有连通或者查询时间超出Buffer的缓存范围时，`lookupTransform`都可能失败。
:::

#### 修改CMakeLists.txt

```cmake [tf_demo/CMakeLists.txt]
cmake_minimum_required(VERSION 3.8)
project(tf_demo)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(rclcpp REQUIRED)
find_package(tf2 REQUIRED)
find_package(tf2_ros REQUIRED)

add_executable(dynamic_broadcaster src/dynamic_broadcaster.cpp)
ament_target_dependencies(
  dynamic_broadcaster
  geometry_msgs
  rclcpp
  tf2_ros
)

add_executable(tf_listener src/tf_listener.cpp)
ament_target_dependencies(
  tf_listener
  rclcpp
  tf2
  tf2_ros
)

install(TARGETS
  dynamic_broadcaster
  tf_listener
  DESTINATION lib/${PROJECT_NAME}
)

install(DIRECTORY launch
  DESTINATION share/${PROJECT_NAME}
)

ament_package()
```

#### 修改package.xml

`ros2 pkg create`已经帮我们加入了大部分依赖，只需要再加入launch的运行依赖

```xml [tf_demo/package.xml]
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>tf_demo</name>
  <version>0.0.0</version>
  <description>Simple TF2 demo</description>
  <maintainer email="example@example.com">example</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <depend>geometry_msgs</depend>
  <depend>rclcpp</depend>
  <depend>tf2</depend>
  <depend>tf2_ros</depend>
  <exec_depend>launch</exec_depend>
  <exec_depend>launch_ros</exec_depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```

#### 编写launch文件

动态发布节点负责`world → base_link`，相机的静态TF直接复用刚才用过的`static_transform_publisher`，监听节点负责查询最后的结果

```python [tf_demo/launch/tf_demo.launch.py]
from launch import LaunchDescription
from launch_ros.actions import Node


def generate_launch_description():
    return LaunchDescription([
        Node(
            package="tf_demo",
            executable="dynamic_broadcaster",
            output="screen",
        ),
        Node(
            package="tf2_ros",
            executable="static_transform_publisher",
            name="camera_static_broadcaster",
            arguments=[
                "--x", "0.2", "--y", "0.0", "--z", "0.1",
                "--roll", "0.0", "--pitch", "0.0", "--yaw", "0.0",
                "--frame-id", "base_link",
                "--child-frame-id", "camera_link",
            ],
        ),
        Node(
            package="tf_demo",
            executable="tf_listener",
            output="screen",
        ),
    ])
```

#### 编译并运行

回到工作空间目录

```bash
cd ~/ros2_ws
colcon build --packages-select tf_demo
source ./install/setup.bash
ros2 launch tf_demo tf_demo.launch.py
```

如果一切正常，底盘的`y`坐标会在`-1m`到`1m`之间往复变化，相机则始终位于底盘前方`0.2m`、上方`0.1m`

```log
[dynamic_tf_broadcaster]: Publishing: base_link y = 0.84 m
[tf_listener]: camera_link in world: x=0.20, y=0.84, z=0.10
[tf_listener]: camera_link in world: x=0.20, y=1.00, z=0.10
[dynamic_tf_broadcaster]: Publishing: base_link y = 0.91 m
[tf_listener]: camera_link in world: x=0.20, y=0.91, z=0.10
```

还可以另开一个终端，直接查询这棵TF树中的任意两个坐标系

```bash
source ~/ros2_ws/install/setup.bash
ros2 run tf2_ros tf2_echo world camera_link
```


## RViz2
上述代码若在终端判断效果，抽象的坐标关系仅凭数字很难及时检查，所以还需要认识ROS2最常用的可视化工具之一——RViz2。

RViz2本身也是一个ROS2节点。添加不同的Display后，它会订阅对应的话题，并利用TF把收到的数据转换到指定的`Fixed Frame`中，再渲染到同一个三维场景里。

::: info 信息
RViz2默认只是观察工具，不会因为显示了机器人就自动控制机器人。交互和控制需要Interactive Marker、MoveIt等额外功能，这里先不展开。
:::

### 启动RViz2

保持前面的TF示例正在运行

```bash
ros2 launch tf_demo tf_demo.launch.py
```

另开一个已经加载ROS2环境的终端

```bash
source /opt/ros/jazzy/setup.bash
rviz2
```

如果使用的ROS2不是Jazzy，把路径中的版本名换成实际版本即可。

### 设置Fixed Frame

打开RViz2后，在左侧`Displays`面板中找到

```text
Global Options
└── Fixed Frame
```

将`Fixed Frame`设置为`world`。

`Fixed Frame`是整个三维场景的参考坐标系，RViz2会尝试把其他数据都转换到这里。它不一定必须是TF树的根节点，但通常应该选择`world`、`map`、`odom`等相对稳定的坐标系。

::: warning 注意
`Fixed Frame`必须真实存在，而且要与需要显示的数据处于同一棵TF树中。名字区分大小写，也不要随手添加或删除开头的`/`。
:::

### 显示TF树

点击`Displays`面板下方的`Add`，选择`TF`后点击`OK`。

此时应该能看到三个坐标系

```text
world
└── base_link
    └── camera_link
```

`base_link`和`camera_link`会一起画圆，而相机相对底盘的位置始终不变。这正是前面一条动态TF和一条静态TF组合后的结果。

展开左侧的`TF` Display，可以调整几个常用选项

- `Show Names`：显示坐标系名称
- `Show Axes`：显示每个坐标系的XYZ轴
- `Show Arrows`：显示父子坐标系之间的箭头(*Rviz2里默认是子坐标系原点指向父坐标系原点哦*)
- `Marker Scale`：调整坐标轴和文字大小
- `Frames`：单独隐藏或显示某个坐标系

默认的`Orbit`视角下，可以拖动鼠标旋转视角，使用滚轮缩放。画面太乱时，先隐藏暂时不关心的frame通常比反复调整视角更方便。

### 看懂状态提示

每个Display旁边都有状态，展开后可以看到具体信息

- `OK`：数据和TF都正常
- `Warning`：暂时没有数据，或者数据已经超时
- `Error`：话题、消息或坐标变换存在问题

程序刚启动时短暂出现Warning或Error很正常，因为RViz2可能比TF更早开始查询。持续报错才需要处理。

### 保存配置

调好Display、Fixed Frame和视角后，可以通过`File → Save Config As`保存为`.rviz`文件。以后直接加载

```bash
rviz2 -d path/to/tf_demo.rviz
```

配置文件只保存RViz2的显示设置，不会保存TF数据，也不会帮你启动发布TF的节点。

### 常见问题

#### Fixed Frame不存在

如果左侧显示类似错误

```text
Fixed Frame [world] does not exist
```

先检查示例是否还在运行，再确认名字是否完全一致

```bash
ros2 run tf2_ros tf2_echo world camera_link
```

如果这个命令也查不到，问题在TF发布或TF树，而不是RViz2。

#### 两个坐标系之间无法转换

常见错误是

```text
No transform from [camera_link] to [world]
```

一般有三种原因

- frame名字拼错，或者大小写不一致
- 中间某一段TF没有发布，整棵树断开了
- 一个子坐标系被错误地挂到了多个父坐标系下

可以生成TF树辅助检查

```bash
ros2 run tf2_tools view_frames
```

#### 终端能看到节点，RViz2却没有数据

检查RViz2和其他节点是否使用相同的ROS环境与`ROS_DOMAIN_ID`

```bash
echo $ROS_DOMAIN_ID
ros2 node list
```

如果在不同终端中设置了不同的`ROS_DOMAIN_ID`，它们相当于处在不同的ROS网络中，彼此无法发现。

#### 数据闪烁或不断提示时间错误

TF和传感器消息都带有时间戳。真机时间、仿真时间混用，或者发布了过期时间戳，都可能导致extrapolation一类错误。

调试时重点检查

- 所有相关节点是否统一使用`use_sim_time`
- 动态TF是否持续更新`header.stamp`
- 消息时间是否与当前ROS时钟一致

#### 远程连接时RViz2打不开

RViz2是图形程序，需要可用的桌面环境。SSH、容器或WSL(不要折腾就没事)中出现`could not connect to display`时，需要配置图形转发，或者直接在有桌面的电脑上运行RViz2。

如果能打开窗口但出现OpenGL渲染错误，可以临时尝试软件渲染

```bash
LIBGL_ALWAYS_SOFTWARE=1 rviz2
```

软件渲染性能较低，只适合用来判断问题是否来自显卡驱动。
