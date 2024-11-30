# 功能包与工作空间

## 介绍
不动就问，功能包是什么？

功能包可以理解为存放节点的地方，ROS2中功能包根据编译方式的不同分为三种类型。
- ament_python，适用于python程序
- cmake，适用于C++（我们一般不使用）
- ament_cmake，适用于C++程序,是cmake的增强版（最常用）

不动就问，工作空间是什么？
工作空间是包含若干个功能包的目录，一开始大家把工作空间理解成一个文件夹就行了,一般来说我们会将一个项目的所有功能包放在一个工作空间中。可以理解为一个项目的根目录。

## 创建工作空间
打开终端输入以下命令：

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
```
是不是觉得就像创建一个目录（其实就是创建一个目录）

## 创建功能包
创建功能包的命令如下：

```bash
ros2 pkg create <功能包名> --build-type < 构建类型 >  --dependencies < 依赖列表 >
```
### 例子
首先进入我们的刚刚创建的工作空间的src目录下

```bash
cd ~/ros2_ws/src
```

然后创建一个名为my_package功能包，使用ament_cmake编译方式，依赖rclcpp。

```bash
ros2 pkg create my_package --build-type ament_cmake --dependencies rclcpp

```
然后退回到工作空间目录下，通过vscode打开工作空间
输入以下命令

```bash
cd ..
code .
```

## 创建节点
以下是一个简单的C++节点示例，我们将其放在my_package功能包中，该节点的功能仅仅是在日志中输出"Hello, world!"。

### 创建包含节点代码的.cpp文件
在your_package_name/src下创建.cpp文件

：：：warning 警告
注意！要在功能包名下src文件夹创建.cpp文件，切忌在工作空间下src文件夹创建.cpp文件，不然编译的时候根本找不到对应文件。

：：：
示例代码如下 `cpp_node_test.cpp`：

```cpp
#include "rclcpp/rclcpp.hpp"
#include <iostream>
int main(int argc, char **argv)
{
    rclcpp::init(argc, argv);// 初始化ROS 2客户端库。
    auto node = std::make_shared<rclcpp::Node>("cpp_node");// 创建一个名为"cpp_node"的节点。
    RCLCPP_INFO(node->get_logger(), "Hello, world!");//在日志中打印"Hello, world!"。
    rclcpp::spin(node);// Run the node.
    rclcpp::shutdown();// Shutdown the ROS 2 client library.
    return 0;
}
```

：：：tips 提示
此时代码报错没关系，因为编辑器的扩展C/C++插件还没有定位到rclcpp库，所以找不到头文件。

我们需要在C/C++配置中添加rclcpp头文件路径。

```json {7}
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**",
                "/opt/ros/jazzy/include/**" // [!code focus]
            ],
            "defines": [],
            "compilerPath": "/usr/bin/gcc",
            "cStandard": "c17",
            "cppStandard": "gnu++17",
            "intelliSenseMode": "linux-gcc-x64"
        }
    ],
    "version": 4
}
```

：：：
### 在CMakeLists.txt中注册节点
一般来说节点是一个可执行文件，所以我们需要在CMakeLists.txt中注册节点。

打开功能包文件夹下的CMakeLists.txt文件，添加以下内容：

```cmake
add_executable(<节点名> src/<文件名>)# 添加可执行文件
ament_target_dependencies(<节点名> <依赖列表>)# 为可执行文件添加依赖
install(TARGETS
  <节点名>
  DESTINATION lib/${PROJECT_NAME}
)# 将可执行文件安装到lib/${PROJECT_NAME}目录下，以便后续使用。
```
示例代码如下：
```cmake {12-17}
cmake_minimum_required(VERSION 3.8)
project(my_package)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)

add_executable(cpp_node src/cpp_node_test.cpp)# 添加可执行文件
ament_target_dependencies(cpp_node rclcpp)# 添加依赖
install(TARGETS
  cpp_node
  DESTINATION lib/${PROJECT_NAME}
)# 将可执行文件安装到lib/${PROJECT_NAME}目录下，以便后续使用。// [!code focus]

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  # the following line skips the linter which checks for copyrights
  # comment the line when a copyright and license is added to all source files
  set(ament_cmake_copyright_FOUND TRUE)
  # the following line skips cpplint (only works in a git repo)
  # comment the line when this package is in a git repo and when
  # a copyright and license is added to all source files
  set(ament_cmake_cpplint_FOUND TRUE)
  ament_lint_auto_find_test_dependencies()
endif()

ament_package()

```
### 编译功能包
在工作空间目录下，输入以下命令编译功能包：

```bash
colcon build
```
如果编译成功，将会输出以下内容：

```bash
shidong@shidong-Dell-G15-5515:~/ros2_ws$ colcon build
Starting >>> my_package
Finished <<< my_package [4.31s]                     

Summary: 1 package finished [4.42s]
```

编译成功将会在工作空间目录下生成build和install文件夹，其中install文件夹中包含了编译好的功能包。

我们需要运行以下命令以便ROS2能够找到我们的功能包：

```bash
source install/setup.bash
```
这样我们的功能包就编译好了。


## 运行节点

在终端输入以下命令运行节点：

```bash
ros2 run <功能包名> <节点名>
```
示例代码如下：

```bash
ros2 run my_package cpp_node
```

我们可以看到终端输出了以下内容，这说明我们的节点运行成功了。
    
```bash
[INFO] [1732953227.141660720] [cpp_node]: Hello, world!
```

恭喜你，你已经成功创建了一个功能包和一个节点，下一步我们将学习如何创建话题（topic）。