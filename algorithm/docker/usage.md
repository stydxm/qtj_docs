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
sudo docker run --rm hello-world
```

下面应该会`Hello from Docker!`开头的一长串的输出，那么说明一切正常

这里可能会遇到网络问题，这是由于大陆到Docker Hub[^1]的网络经常会出现连不上的情况，

[^1]: 储存docker镜像的服务器被称为Docker Registry，docker官方的registry地址被内置在docker软件中，它叫Docker Hub，也是最大的registry。如果没有额外说明，拉取镜像默认就是从这里

## 进入容器
``` bash
sudo docker run -it --rm --name ubuntu-container ubuntu:22.04 bash
```

输入这个命令后，你会发现好像进入了另一个ubuntu系统，所有的软件、文件和权限都和宿主机中的不同

这时终端已经进入了一个ubuntu环境的容器中，正如前面所说，它就像一个单独的系统，只是与宿主机共用内核

命令解释：

- `run`表示启动新容器

- `-it`表示交互模式，即像正常系统的终端一样，读取输入并打印输出

- `--name ubuntu-container`表示将容器命名为`ubuntu-container`。这里如果不写的话，docker会自动给它起一个名字，输入`sudo docker contianer ls`可以查看所有容器的信息

- `--rm`表示在退出后自动删除容器

- `ubuntu:22.04`指的是镜像，冒号前是镜像名，冒号后是版本号[^2]，你也可以尝试把它改成其他版本试一试。如果这里只写`ubuntu`则会默认

[^2]: 实际在docker的概念中，它叫Tag，翻译成中文应该是标签，这里写成版本号便于理解

- `bash`是要在容器中执行的命令，这里的bash是shell

和宿主机的终端一样，输入`exit`可以退出

::: tip 提示
如果想释放终端而不退出，可以按`Ctrl+P+Q`，再回来时输入`sudo docker exec -it ubuntu-container bash`
:::
