# 容器 & 进程

## 概念
介绍容器之前，必须回顾ROS的节点间是什么关系
> 节点是ROS2对功能的划分，进程是操作系统运行程序的单位。一个进程可以运行一个节点，也可以同时运行多个节点。   
<!-- 参考前置课程 -->
一般来说我们希望一个节点实现一个功能，这样从功能的角度上实现了代码解耦，互相之间通常不会调用代码，方便独立开发、测试和替换   
<!-- + 问什么要有容器 -->
容器的一个优势在于，它让多个main()对应的节点们，方便的组合(请忽略launch，它不一样~)   

<!-- 组件容器的一个主要优势，是可以将多个*组件节点*加载到同一个进程中运行。它与 Launch 的作用不同：Launch 负责组织和启动程序，而组件容器负责承载组件节点。    -->

如果不用容器，想调整同一进程中的节点组合，就需要修改 main() 并重新编译，很不方便。

操作系统运行一个可执行程序时，会创建一个进程并从 main() 开始执行，而进程间通信通常需要更多的数据复制、序列化和调度开销。对于图像、点云等大数据，这些开销可能比较明显。[论坛参考](https://discourse.openrobotics.org/t/impact-of-ros-2-node-composition-in-robotic-systems-ra-l/31474/2)   

容器就是ROS2提供的通用解决方案。它作为整个进程唯一的主程序，负责加载和运行*被编译成组件*的节点
```bash
容器进程
  ├── 相机节点
  ├── 图像识别节点
  └── 目标跟踪节点
```
<!-- 代价是什么 -->
那这么好用的东西为啥放在后面讲？   
**单进程风险**：一个组件的故障(or 崩溃)可能让整个进程重启，有时得不偿失(比如串口比特错位，而你尝试古法重启解决，你想等整个视觉模块加载么)   
## 动手写一个小容器

下面还是用最熟悉的发布者和订阅者作为例子，不过这次不为它们编写`main()`，而是把它们编译成组件，再交给容器运行。

### 创建功能包
进入工作空间的`src`目录，创建一个名为`component_demo`的功能包

```bash
cd ~/ros2_ws/src
```

```bash
ros2 pkg create component_demo --build-type ament_cmake --dependencies rclcpp rclcpp_components std_msgs
mkdir component_demo/launch
```
文件结构如下：
```text
component_demo
── CMakeLists.txt
├── launch
│   └── component_demo.launch.py
├── package.xml
└── src
    ├── publisher_component.cpp
    └── subscriber_component.cpp
```
### 编写发布组件

```cpp [component_demo/src/publisher_component.cpp]
#include <chrono>
#include <cstddef>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "rclcpp_components/register_node_macro.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

namespace component_demo
{

class Publisher : public rclcpp::Node
{
public:
  // 组件的构造函数必须接收NodeOptions，容器会通过它传入节点配置
  explicit Publisher(const rclcpp::NodeOptions & options)
  : Node("component_publisher", options), count_(1)
  {
    publisher_ = this->create_publisher<std_msgs::msg::String>("component_chatter", 10);
    timer_ = this->create_wall_timer(1s, std::bind(&Publisher::timer_callback, this));
  }

private:
  void timer_callback()
  {
    std_msgs::msg::String message;
    message.data = "Hello from component: " + std::to_string(count_++);
    RCLCPP_INFO(this->get_logger(), "Publishing: '%s'", message.data.c_str());
    publisher_->publish(message);
  }

  size_t count_;
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
  rclcpp::TimerBase::SharedPtr timer_;
};

}  // namespace component_demo

// 组件没有main()，用这个宏把节点类注册为可加载的组件
RCLCPP_COMPONENTS_REGISTER_NODE(component_demo::Publisher)
```

### 编写订阅组件

```cpp [component_demo/src/subscriber_component.cpp]
#include <functional>
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "rclcpp_components/register_node_macro.hpp"
#include "std_msgs/msg/string.hpp"

namespace component_demo
{

class Subscriber : public rclcpp::Node
{
public:
  explicit Subscriber(const rclcpp::NodeOptions & options)
  : Node("component_subscriber", options)
  {
    subscription_ = this->create_subscription<std_msgs::msg::String>(
      "component_chatter", 10,
      std::bind(&Subscriber::topic_callback, this, std::placeholders::_1));
  }

private:
  void topic_callback(const std_msgs::msg::String::SharedPtr message) const
  {
    RCLCPP_INFO(this->get_logger(), "Received: '%s'", message->data.c_str());
  }

  rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;
};

}  // namespace component_demo

RCLCPP_COMPONENTS_REGISTER_NODE(component_demo::Subscriber)
```

和普通节点相比，这两个组件都没有`main()`。容器加载组件时会创建节点，所以构造函数还需要接收一个`rclcpp::NodeOptions`参数。

### 注册组件

修改功能包中的`CMakeLists.txt`

```cmake [component_demo/CMakeLists.txt]
cmake_minimum_required(VERSION 3.8)
project(component_demo)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_components REQUIRED)
find_package(std_msgs REQUIRED)

# 组件需要编译成共享库，而不是带main()的可执行程序
add_library(publisher_component SHARED src/publisher_component.cpp)
ament_target_dependencies(publisher_component rclcpp rclcpp_components std_msgs)
rclcpp_components_register_nodes(publisher_component "component_demo::Publisher")

add_library(subscriber_component SHARED src/subscriber_component.cpp)
ament_target_dependencies(subscriber_component rclcpp rclcpp_components std_msgs)
rclcpp_components_register_nodes(subscriber_component "component_demo::Subscriber")

install(TARGETS
  publisher_component
  subscriber_component
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION bin
)

install(DIRECTORY launch
  DESTINATION share/${PROJECT_NAME}
)

ament_package()
```

`RCLCPP_COMPONENTS_REGISTER_NODE`在C++代码中注册节点类，`rclcpp_components_register_nodes`在CMake中登记组件及其所在的共享库，两处都不能漏掉。

为了后面能用launch启动，还要在`package.xml`中加入运行依赖

```xml [component_demo/package.xml]
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>component_demo</name>
  <version>0.0.0</version>
  <description>ROS2 component demo</description>
  <maintainer email="example@example.com">example</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <depend>rclcpp</depend>
  <depend>rclcpp_components</depend>
  <depend>std_msgs</depend>
  <exec_depend>launch_ros</exec_depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```

### 编译功能包

回到工作空间目录编译，并刷新当前终端的环境

```bash
colcon build --packages-select component_demo
source install/setup.bash
```

可以用下面的命令检查组件是否注册成功

```bash
ros2 component types
```

输出中应该能找到

```text
component_demo
  component_demo::Publisher
  component_demo::Subscriber
```

### 启动容器并加载组件

先启动一个容器，并把它命名为`component_container`

```bash
ros2 run rclcpp_components component_container --ros-args -r __node:=component_container
```

再打开一个终端，加载发布和订阅组件

```bash
source install/setup.bash
ros2 component load /component_container component_demo component_demo::Publisher
ros2 component load /component_container component_demo component_demo::Subscriber
```

::: tip 提示
这里启动的两个节点都没有自己的`main()`，真正运行的可执行程序只有`component_container`。
:::

此时容器所在的终端应该会不断输出

```log
[INFO] [component_publisher]: Publishing: 'Hello from component: 1'
[INFO] [component_subscriber]: Received: 'Hello from component: 1'
[INFO] [component_publisher]: Publishing: 'Hello from component: 2'
[INFO] [component_subscriber]: Received: 'Hello from component: 2'
```

输入下面的命令，还可以查看容器中已经加载的组件

```bash
ros2 component list
```

### 使用launch加载

实际使用时，一般不会每次手动输入两条`ros2 component load`，可以通过launch文件同时创建容器并加载组件。

新建`component_demo/launch/component_demo.launch.py`

```python [component_demo/launch/component_demo.launch.py]
from launch import LaunchDescription
from launch_ros.actions import ComposableNodeContainer
from launch_ros.descriptions import ComposableNode


def generate_launch_description():
    container = ComposableNodeContainer(
        name="component_container",
        namespace="",
        package="rclcpp_components",
        executable="component_container",
        composable_node_descriptions=[
            ComposableNode(
                package="component_demo",
                plugin="component_demo::Publisher",
                name="component_publisher",
                extra_arguments=[{"use_intra_process_comms": True}],
            ),
            ComposableNode(
                package="component_demo",
                plugin="component_demo::Subscriber",
                name="component_subscriber",
                extra_arguments=[{"use_intra_process_comms": True}],
            ),
        ],
        output="screen",
    )

    return LaunchDescription([container])
```

文件结构如下：

```text
component_demo
├── CMakeLists.txt
├── launch
│   └── component_demo.launch.py
├── package.xml
└── src
    ├── publisher_component.cpp
    └── subscriber_component.cpp
```

重新编译并刷新环境后运行

```bash
colcon build --packages-select component_demo
source install/setup.bash
ros2 launch component_demo component_demo.launch.py
```

这里的launch只负责按照配置启动容器和加载组件，发布者和订阅者仍然运行在同一个容器进程中。`use_intra_process_comms`则会为它们启用进程内通信。
