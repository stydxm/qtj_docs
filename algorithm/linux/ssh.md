# 使用SSH连接
## 什么是SSH
SSH是一种网络传输协议，具有安全、可靠、简单易用等多种特性，它最常见的用途是用来远程连接

在绝大多数（甚至可以说我见过的所有）linux发行版，以及windows、bsd、macos等系统中都有预装ssh客户端

## 有何优势
对于笔记本台式机这些常见的电脑形态来说，使用很容易，并不需要远程连接

但对于服务器、开发板、车上的运算模块等，调试的时候插着键盘鼠标显示器这些东西是不方便的。而且为了性能考虑，有可能没有装桌面环境

::: info 信息
与windows不同，linux的图形界面不是系统的一部分，这种让它能像windows一样操作的软件叫**桌面环境**

你使用的ubuntu只是已经帮你装好了，如果没有装的话那开机之后就只有命令行，没有窗口、桌面、任务栏这些东西
:::

所以，如果不想[这样调试](https://www.bilibili.com/video/BV1F8411272e)，那就需要使用远程控制软件

由于网络环境复杂，开发板很有可能没有连接公网，常用的向日葵、todesk等软件无法使用。即使能用，兼容性和稳定性也远不如SSH

## 如何使用
::: tip 提示
不要求实操，用到的时候再练
:::

ssh的使用非常简单，只需要会一个命令：

```bash
ssh 用户名@ip地址
```

如果一切正常，接下来服务器会要求你输入密码

如果不能成功连接，提示actively refused等字样，说明服务器和ssh服务都在运行，最有可能的原因是服务器未开启root登陆，或密码错误次数过多服务器拒绝连接

如果提示中有timed out，则可能性较大的原因有：

- IP地址或端口错误，如打错了、在公网中使用了内网ip、NAT映射时更换了端口但没有连接时没有换等

- 

- ssh服务端未正常启动，如没有安装，或者被关了

客户端通常是预装的，但服务端不一定。在ubuntu下安装服务器的命令是：

```bash
sudo apt install openssh-server
```

## 生成密钥
直接输入ssh-keygen，程序会询问一系列问题，然后生成密钥。

``` bash
ssh-keygen
```

::: info 信息
密钥有多种算法，常见的几种（rsa，dsa，ecdsa, ed25519）都可以使用

我写的时候默认是rsa，或许随着版本更新，或者在别的发行版中使用（比如arch默认就是ed25519），会是别的算法，但在使用上都是一样的，把下文中写到的所有rsa都替换成生成的就可以了，或者用-t参数指定
:::

输入上面的命令以后，ssh-keygen会要求用户回答一些问题。

```
ssh-keygen
Generating public/private dsa key pair.
Enter file in which to save the key (/home/username/.ssh/id_rsa):  press ENTER
Enter passphrase (empty for no passphrase): ********
Enter same passphrase again: ********
Your identification has been saved in /home/username/.ssh/id_rsa.
Your public key has been saved in /home/username/.ssh/id_rsa.pub.
The key fingerprint is:
14:ba:06:98:a8:98:ad:27:b5:ce:55:85:ec:64:37:19 username@shell.isp.com
```

上面示例中，执行`ssh-keygen`命令以后，会出现第一个问题，询问密钥保存的文件名，默认是~/.ssh/id_rsa文件，这个是私钥的文件名，对应的公钥文件~/.ssh/id_rsa.pub是自动生成的。用户的密钥一般都放在主目录的.ssh目录里面。

::: tip 提示
对于非对称加密算法，有私钥和公钥的概念。通过私钥可以计算出公钥，而反向计算从理论上就是不可行的。这种特性可在对数据加解密的同时，避免密码泄露

更多内容，参考[这篇文章](https://zhuanlan.zhihu.com/p/436455172)
:::

接着，就会是第二个问题，询问是否要为私钥文件设定密码保护（passphrase）。这样即使别人拿到私钥，没有密码也用不了。

::: info 信息
这里建议直接按两次回车留空，因为一旦忘记，找回密码是不可能的
:::

最后，就会生成私钥和公钥，屏幕上还会给出公钥的指纹，以及当前的用户名和主机名作为注释，用来识别密钥的来源。

公钥文件和私钥文件都是文本文件，可以用文本编辑器看一下它们的内容。公钥文件的内容类似下面这样（公钥只有一行，因为它太长了，所以分成三行显示）

```
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAvpB4lUbAaEbh9u6HLig7amsfywD4fqSZq2ikACIUBn3GyRPfeF93l/
weQh702ofXbDydZAKMcDvBJqRhUotQUwqV6HJxqoqPDlPGUUyo8RDIkLUIPRyq
ypZxmK9aCXokFiHoGCXfQ9imUP/w/jfqb9ByDtG97tUJF6nFMP5WzhM= username@shell.isp.com
```

上面示例中，末尾的username@shell.isp.com是公钥的注释，用来识别不同的公钥，表示这是哪台主机（shell.isp.com）的哪个用户（username）的公钥，不是必需项。

## 发送密钥到服务器
用户在本地执行下面的命令，就可以把本地的公钥拷贝到服务器

```
ssh-copy-id -i rsa user@host
```

上面命令中，user是所要登录的账户名，host是服务器地址。执行完该命令，公钥就会拷贝到服务器

::: tip 提示
有些时候这个命令会由于各种原因失败，这时可以手动拷贝公钥到服务器

手动复制本地的`~/.ssh/id_rsa.pub`到服务器的`~/.ssh/authorized_keys`，注意末尾要有一个回车
:::

以后对这台服务器使用ssh时，就不需要再输入密码了

## SCP
scp是一个可以通过ssh传输文件的工具

::: warning 警告
不是那什么基金会！
:::

它的使用和cp几乎一样，区别是可以在文件前加上`用户名@服务器ip:`来代表服务器上的文件，既可以上传、下载，也可以直接在两台服务器间传输文件

示例

```bash
scp user@host:foo.txt bar.txt
```

## 其他ssh工具
端口转发、证书登陆等内容，如有需要自行学习：https://wangdoc.com/ssh/