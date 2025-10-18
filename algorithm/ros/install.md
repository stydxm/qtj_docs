# 安装ROS

## 安装
在ubuntu系统上ros的安装并不复杂，网上也有一些脚本，但不推荐，因为可能你会找到一些过时的资源

因此我直接把所有命令写好放在下面，全部复制执行即可

``` bash
# 添加公钥和软件源
sudo curl -sSL https://mirrors.ustc.edu.cn/rosdistro/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://mirrors.ustc.edu.cn/ros2/ubuntu $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 安装并启用
sudo apt update
sudo apt install -y ros-jszzy-desktop python3-rosdep ros-jazzy-rqt ros-jazzy-rviz2 python3-colcon-ros
echo 'source /opt/ros/jazzy/setup.bash' >> ~/.bashrc
source ~/.bashrc

# 手动rosdep换源
sudo mkdir -p /etc/ros/rosdep/sources.list.d/
sudo curl -o /etc/ros/rosdep/sources.list.d/20-default.list https://mirrors.ustc.edu.cn/rosdistro/rosdep/sources.list.d/20-default.list
sudo sed -i 's#raw.githubusercontent.com/ros/rosdistro/master#mirrors.ustc.edu.cn/rosdistro#g' /etc/ros/rosdep/sources.list.d/20-default.list

# 更换rosdep源
export ROSDISTRO_INDEX_URL=https://mirrors.ustc.edu.cn/rosdistro/index-v4.yaml
rosdep update

# 持久化rosdep环境变量
echo 'export ROSDISTRO_INDEX_URL=https://mirrors.ustc.edu.cn/rosdistro/index-v4.yaml' >> ~/.bashrc
```

这里会安装大概1.2k个包，可能会需要一点时间（网络畅通的情况下五到十分钟），请注意磁盘空间占用

## 测试
我们先来安装一个官方提供的小demo

``` bash
sudo apt update
sudo apt install ros-jazzy-turtlesim
```

安装完成后，再输入`ros2 pkg executables turtlesim`，命令窗口内应该会显示

``` bash
turtlesim draw_square
turtlesim mimic
turtlesim turtle_teleop_key
turtlesim turtlesim_node
```

如果一切正常，那我们开始可以先启动一个小乌龟的节点

``` bash
ros2 run turtlesim turtlesim_node
```

运行后，会看到一个窗口，里面有一个小乌龟，同时命令窗口内多了几条日志

再打开**另一个**命令窗口，输入

``` bash
ros2 run turtlesim turtle_teleop_key
```
尝试使用方向键来控制小乌龟的移动吧，还有一些键可以控制旋转、画笔等功能

## 任务
完成[任务14](../tasks/14)