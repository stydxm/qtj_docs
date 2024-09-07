# 实现节点
## 语言
官方有两种语言的客户端实现，一个是C++（rclcpp），一个是Python（rclpy）

还有第三方的开发者维护了一些别的语言的，比如c、java、node、rust等

不建议使用别的这些语言，用C++和Python就行，别的可能会有各种怪问题，实际写的时候也是用这两种语言的

## 先用C++写一个
::: code-group
``` cpp [first-node.cpp] {4-5}
#include "rclcpp/rclcpp.hpp"

int main(int argc, char *argv[]) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<rclcpp::Node>("first_node"));
    return 0;
}
```
``` cmake [CMakeLists.txt] {3,5}
cmake_minimum_required(VERSION 3.22)
project(first_node)
find_package(rclcpp REQUIRED)
add_executable(first_node first_node.cpp)
target_link_libraries(first_node rclcpp::rclcpp)
```
:::

这里编辑器或者IDE应该会因为缺头文件而报错，可以不管，直接用命令行编译，或者把`/opt/ros/humble/include/rclcpp/`和`/opt/ros/humble/lib/`目录加到编辑器设置查找头文件的目录里

## 再用Python写一个
``` python {3-4}
import rclpy
from rclpy.node import Node
rclpy.init()
rclpy.spin(Node("second_node"))
```

同样的，编辑器大概率也找不到库，在意的话加`/opt/ros/humble/lib/python3.10/site-packages`和`/opt/ros/humble/local/lib/python3.10/dist-packages`目录

## 运行节点
把这两个节点**分别**、**同时**运行起来，然后再另开一个终端

输入`ros2 node list`，应该能看到这样的两行输出

```
/first_node
/second_node
```

那么现在你就有了两个节点，一个叫做`first_node`，另一个叫`second_node`
