# 数据包

ROS实现的这套订阅`topic`传输数据机制，逻辑上非常适合记录数据，只需要加一个`subscriber 节点`订阅想要的信息，再写到磁盘上。同理，订阅者也不管信息来源，，只需要加一个`publisher 节点`读取磁盘上的信息，共用其他节点约定的名字，自然就复用了来之不易的采样数据。(你也不希望装甲板坏了后硬等硬件吧)   

ROS里自带的直接实现就是--rosbag2

因为代码比较重复，希望大家自己随便写写。  

一下是一些常用指令，以`demo_nodes_cpp talker`为例
#### 话题操作
```bash
// 启动talker(发布者)
ros2 run demo_nodes_cpp talker # `taker`节点 发布 话题`/chatter`

// bag 记录
ros2 bag record --topics /topic-name      # 单个话题
ros2 bag record --topics /topic1 /topic2  # 多个话题

ros2 bag record --all-topics              # 所有话题
#  如果在jazzy写 -a ，还会记录服务事件(简易自己 ros2 bag record --help) 

/*
jazzy默认大致生成：

  chatter_bag/
  ├── chatter_bag_0.mcap
  └── metadata.yaml
*/


// bag 播放
ros2 bag play chatter_bag # 播放数据
ros2 topic echo /chatter  # topic的指令来查看数据


// 其他选项
ros2 bag record -o folder-name --topics topic-name  #'-o' 自定义输出文件夹
ros2 bag record -s 存储格式 --topics topic-name      #'-s' jazzy默认使用 .mcap, hubmle则是 .db3
```
记录开始时，`/path/to/folder`下自动生成`file-name.存储格式 和 metadata.yaml`，然后持续写入   
观察metadata.yaml结构会发现，它记录了一些持续更新的信息，比如`message_count:`。所以我们最好按下`Ctrl+C`来结束记录，坏事时请移步自学`ros2 bag reindex`。   

::: info
`-s`能选择哪些格式取决于ros插件。
```bash
ros2 pkg list | grep rosbag2  # 包查看
os2 bag list storage          # 具体支持格式查看
```
:::

#### 查看 bag 信息
```bash
ros2 bag info /path/to/yourfile
```
> 上述命令会读取同目录下的metadata.yaml(自动生成的bag元数据索引和描述信息)

