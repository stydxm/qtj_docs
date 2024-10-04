# 安装和使用
## 安装
::: warning 警告
不要直接运行`sudo apt install docker`，因为系统软件源中的docker是一个现在改名叫`wmdocker`的系统托盘程序

它只是较早占用了这个名字，和我们要用的完全不是同一个东西
:::

和前面一样，我们还是使用国内镜像站来加速安装

``` bash
echo '{ "registry-mirrors": [ "https://dockerproxy.net" ] }' | sudo tee /etc/docker/daemon.json
export DOWNLOAD_URL="https://mirror.sjtu.edu.cn/docker-ce"
curl -fsSL https://raw.githubusercontent.com/docker/docker-install/master/install.sh | sudo -E sh
```

## 测试
如果上面的安装没有报错，可以尝试输入一下

``` bash
docker run --rm hello-world
```

下面应该会`Hello from Docker!`开头的一长串的输出，那么说明一切正常

这里可能会遇到网络问题，这是由于大陆到Docker Hub[^1]的网络经常会出现连不上的情况，

[^1]: 储存docker镜像的服务器被称为Docker Registry，docker公司官方的registry地址被内置在docker软件中，它叫Docker Hub。一般默认镜像储存在这里