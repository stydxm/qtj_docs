# 基础概念

可以说node和topic是ros中最重要的两个概念，ros的功能也主要由它们实现

## 节点(node)
节点是非常独立的模块，通常每个节点实现一个功能，它们互相依赖但又是解耦的

## 节点相关命令
|命令|用途|
|:-:|:-:|
|`ros2 node list`|列出所有节点|
|`ros2 node info 节点名`|查看节点信息|

::: tip 提示
这里还少了一个重要的`ros2 run`，后面再介绍
:::

## 话题(topic)
节点间是独立的，但毫无疑问它们功能的实现又是需要互相通信的，话题就是它们通信的方式

节点与话题的联系，有两种情况

- 节点将数据发送到话题中，我们称为发布，即publisher

- 节点从话题中接收数据，我们称为订阅，即subscriber

::: tip 提示
一个节点可以同时成为一个话题的发布者和订阅者
:::

节点与话题之间没有强对应的关系，每个节点订阅若干个话题，每个话题被若干个节点订阅

::: info 信息
若干，可能没有，可能是1个，也可能更多
:::

对于一个节点，每一个订阅了该话题的节点都可以向这个节点发送消息

消息成功发送后，所有订阅了它的节点都会收到这条消息，就可以从中获取数据了

对于每个话题，它都有一个固定的数据格式，收发都需要遵循这个格式，这个格式叫“消息接口”

## 话题相关命令
|命令|用途|
|:-:|:-:|
|`ros2 topic list`|列出所有话题<br />加上`-t`参数还可以查看消息接口|
|`ros2 topic info 话题名`|查看话题信息|
|`ros2 topic echo 话题名`|输出话题数据<br />没有数据则一直等待|
|`ros2 topic hz 话题名`|查看话题收到消息的频率|
|`ros2 topic pub 话题名 接口名 数据`|向话题发送数据<br />只在调试时使用，具体参见文档|
|`ros2 interface show 接口名`|查看接口具体的数据格式|

## 服务(service)
服务与话题相似，也是节点之间用来沟通的方式，但它不如节点常用

服务和话题一样，也需要预先定义好它的数据格式，并遵照这个格式收发数据

与话题不同的是，服务必须有且仅有一个服务端，属于某个节点，还有若干个客户端

::: info 信息
客户端数量可以是0，服务端和客户端也可以属于同一个节点，但我不明白这样做的意义是什么？
:::

话题是由节点主动发送数据，而服务是需要客户端主动请求服务端，再由服务端返回一些数据

## 服务相关命令
|命令|用途|
|:-:|:-:|
|`ros2 service list`|列出所有服务<br />加上`-t`参数还可以查看消息接口|
|`ros2 service type 服务名`|查看服务的类型|
|`ros2 service find 接口名`|查看使用某接口的服务|
|`ros2 service call 服务名 接口名 数据`|调用服务    <br />只在调试时使用，具体参见文档|
|`ros2 interface show 接口名`|查看接口具体的数据格式|

## 可视化
再打开安装ros时用来测试的那两个小乌龟节点，然后新开一个终端，再输入

``` bash
rqt_graph
```

此时应该会弹出一个窗口，里面展示了两个节点和几个话题的关系
