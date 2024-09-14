# 实现节点
## 语言
官方有两种语言的客户端实现，一个是C++（rclcpp），一个是Python（rclpy）

还有第三方的开发者维护了一些别的语言的，比如c、java、node、rust等

不建议使用别的这些语言，用C++和Python就行，别的可能会有各种怪问题，实际写的时候也是用这两种语言的

## 先用C++写一个
C++的客户端API，即rclcpp的文档，请参考[这里](https://docs.ros2.org/latest/api/rclcpp/)

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
Python的客户端API，即rclpy的文档，请参考[这里](https://docs.ros2.org/latest/api/rclpy/)

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

## C++面向对象实现
上面是最简单的实现，为了方便后续代码编写，我们先把它改成面向对象的

``` cpp
#include "rclcpp/rclcpp.hpp"

class ExampleNode : public rclcpp::Node
{
public:
    ExampleNode(std::string name) : Node(name)
    {
        RCLCPP_INFO(this->get_logger(), "%s launched", name.c_str());
    }

private:
};

int main(int argc, char **argv)
{
    rclcpp::init(argc, argv);
    auto node = std::make_shared<ExampleNode>("example_node");
    rclcpp::spin(node);
    rclcpp::shutdown();
    return 0;
}
```

## 用C++发布消息
::: info 信息
这里要注意，在CMakeLists中导入std_msgs
:::

小改一下前面写的对象，

``` cpp {10-11,15-21}
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

class TopicPublisher01 : public rclcpp::Node
{
public:
    TopicPublisher01(std::string name) : Node(name)
    {
        RCLCPP_INFO(this->get_logger(), "%s launched", name.c_str());
        command_publisher_ = this->create_publisher<std_msgs::msg::String>("command", 10);
        timer_ = this->create_wall_timer(std::chrono::milliseconds(500), std::bind(&TopicPublisher01::timer_callback, this));
    }

private:
    void timer_callback()
    {
        std_msgs::msg::String message;
        message.data = "Hello World!";
        RCLCPP_INFO(this->get_logger(), "Publishing: '%s'", message.data.c_str());
        command_publisher_->publish(message);
    }
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr command_publisher_;
};
```

## 用C++接收消息
``` cpp {14-18}
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

class TopicSubscribe01 : public rclcpp::Node
{
public:
    TopicSubscribe01(std::string name) : Node(name)
    {
        RCLCPP_INFO(this->get_logger(), "%s launched", name.c_str());
        command_subscribe_ = this->create_subscription<std_msgs::msg::String>("command", 10, std::bind(&TopicSubscribe01::command_callback, this, std::placeholders::_1));
    }

private:
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr command_subscribe_;
    void command_callback(const std_msgs::msg::String::SharedPtr msg)
    {
        RCLCPP_INFO(this->get_logger(), "Received: %s", msg->data.c_str());
    }
};
```

## Python面向对象实现
同样的，我们也把它改成面向对象的

``` python
import rclpy
from rclpy.node import Node

class ExampleNode(Node):
    def __init__(self,name):
        super().__init__(name)
        self.get_logger().info("%s节点已经启动" % name)

def main(args=None):
    rclpy.init(args=args)
    node = ExampleNode("example_node")
    rclpy.spin(node)
    rclpy.shutdown()
```


## 用Python发布消息
``` python
from std_msgs.msg import String

class NodePublisher02(Node):
    def __init__(self,name):
        super().__init__(name)
        self.get_logger().info("%s launched" % name)
        self.command_publisher_ = self.create_publisher(String,"command", 10) 
        self.timer = self.create_timer(0.5, self.timer_callback)
    
    def timer_callback(self):
        """
        定时器回调函数
        """
        msg = String()
        msg.data = 'backup'
        self.command_publisher_.publish(msg) 
        self.get_logger().info(f'Publishing: {msg.data}')
```

## 用Python接收消息
``` python
from std_msgs.msg import String


class NodeSubscribe02(Node):
    def __init__(self,name):
        super().__init__(name)
        self.get_logger().info("%s launched" % name)
        self.command_subscribe_ = self.create_subscription(String,"command",self.command_callback,10)

    def command_callback(self,msg):
        self.get_logger().info(f'Received: [{msg.data}]')
```
