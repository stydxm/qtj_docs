# 数据包

ROS实现的这套订阅`topic`传输数据机制，逻辑上非常适合记录数据，只需要加一个`subscriber 节点`订阅想要的信息，再写到磁盘上。同理，订阅者也不管信息来源，，只需要加一个`publisher 节点`读取磁盘上的信息，占用原本发布节点的名字，自然就复用了来之不易的采样数据。(你也不希望装甲板坏了后硬等硬件吧)   

ROS里自带的直接实现就是--rosbag2

因为发送代码比较重复，希望大家自己随便写写。  

一下是一些常用指令   
#### 话题操作
```bash
// 启动talker(发布者)
ros2 run demo_nodes_cpp talker

// bag 记录
ros2 bag record /topic-name              // 单个话题
ros2 bag record /topic-name1  /topic-name2 // 多个话题
ros2 bag record -a                       // 所有话题

// bag 播放
ros2 bag play xxx.db3     // 播放数据
ros2 topic echo /talker  // topic的指令来查看数据


// 其他选项
ros2 bag record -o file-name topic-name  //'-o' 自定义输出文件名
ros2 bag record -s 存储格式 topic-name    //'-s' 默认使用 sqlite3
```
记录开始时，`/path/to/`下自动生成`file-name.存储格式 和 meta.yaml`，然后持续写入   
观察meta.yaml结构会发现，它记录了一些持续更新的信息，比如`message_count:`。所以我们最好按下`Ctrl+C`来结束记录。   

::: info
`-s`能选择哪些格式取决于ros插件。
```bash
ros2 pkg list | grep rosbag2
```
:::

#### 查看 bag 信息
```bash
ros2 bag info /path/to/yourfile
```
> 上述命令就是在读取同目录下的meta.yaml(自动生成的bag元数据索引和描述信息)

```bash
//可以通过文件信息查看视频的相关信息，比如话题记录的时间，大小，类型，数量
ros2 bag info bag-file  
```
