# nas
为便于文件共享， 我们搭建了一套NAS，目前使用8+8TB软RAID1方案

::: warning 警告
在实验室里务必使用内网连接！！！不然传文件极其痛苦
:::

## 内网连接
如果你在实验室里，那么请你根据上一章内容连接实验室网络，然后按以下步骤操作
::: tip 提示
仅windows教程，macos应该大差不差，至于linux……你都用linux了肯定会连
:::
- 在任意文件夹点击左侧`网络`，如果提示网络共享未开启，自行搜索打开方式
- 理论应该可以看见一个叫`MEMOSPACE`的设备，点进去即可
![](/mmexport1713798840420.png)
- 如果扫描不到，在上方地址栏手动输入`\\192.168.1.4`，注意斜杠方向
- 如果提示要输入用户名密码，用户名写`nobody`，密码留空

## 公网连接
::: warning 注意
仅供不在实验室时使用，在实验室内请直接使用内网连接，否则所有人挤小水管，会很慢很慢……
:::
- 打开[http://lab.015609.best:40001/](http://lab.015609.best:40001/)，理论上浏览器应该会自动跳转到登陆界面
![](/Screenshot_20240422_230652.png)
- 点击白框右下角的钉钉logo，授权并登陆
- 登陆完成后应该会跳转到这样的一个界面，点击左栏的主页
![](/Screenshot_20240422_230828.png)
- 这时候你应该可以看见文件夹了
::: tip 提示
因为跨域问题，部分文件预览有问题，下载再看即可
:::
