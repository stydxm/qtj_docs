---
author: Zou Ajie
lastEdit: 2024-9-16
brief: 电控进阶软件使用文档
---
# ***Develop_Tools***
本文档部分内容参考  
[深北莫北极熊战队的基于VSCode的代码合作](https://gitee.com/SMBU-POLARBEAR/Technical_Knowledge_Base/blob/master/Git%E7%9A%84%E4%BD%BF%E7%94%A8.md#%E5%9F%BA%E4%BA%8Evscode%E7%9A%84%E4%BB%A3%E7%A0%81%E5%90%88%E4%BD%9C)  
[中国科大RoboWalker电控培训](https://rec.ustc.edu.cn/share/c8b3bbc0-32bc-11ee-98d2-2330cf7972b8)  

## 1 简介(为什么使用当前的开发流程)
**Keil的优点：**
1. Keil 提供了一个全面的集成开发环境，包括编辑器、编译器、调试器和仿真器，无需过多配置，下载对应芯片包即可开发 STM32 与 TI 等常用的单片机芯片，十分适合新手，因此 Keil 使用人数极多，大部分电控组成员将会参与如电赛之类的其他学科竞赛，使用 Keil 将可以和队友进行协同开发(不至于队友都打不开你的代码)
2. 丰富的调试功能：Keil 具有强大的调试功能，可以进行单步调试、断点调试、变量监视等，更底层一些可以监控各寄存器的变化，还有软件逻辑分析仪等其他各种各样的 Debug 工具(虽然不常用)
3. Keil 有一个庞大的生态系统，包括广泛的开发者社区、技术支持，买来一个模块绝大多情况下提供的STM32的资料都是基于 Keil 开发的

**Keil的缺点：**
1. 没有更进一步的 Debug 功能，PID、功率、轮速变化等变量的数值曲线无法直观地显示并被记录，这类型的参数调试较困难
2. 代码编写环境较差，无法进行可靠的团队协作，在此之前战队一直使用基于微信的代码管理方法，代码的最新版经常仅存在于一个人的电脑上，这个人不在场或不在线就无法获取最新的代码进行调试

为了弥补以上缺点，我们将引入LinkScope、VScode、Git(基于VScode插件)，于是目前钱塘蛟战队电控的开发流程为: 
1. 使用 CubeMX 对芯片外设与 FreeRTOS 任务进行配置，并生成可执行的 Keil 文件
2. 使用 Keil 对编辑好的代码文件进行编译与烧录，同时极大部分的调试也将在 Keil 内完成
3. 对于难以调试的一些参数，如 PID、功率限制、打滑检测，可以使用 LinkScope 查看对应变量的波形
4. 在 VScode 中使用部分插件辅助我们的代码编辑，对于各兵种完善好的功能，使用 Git 提交代码: 若要开始对某兵种的代码开发，也可以使用 Git 拉取对应兵种的代码

## 2 LinkScope
下载链接及基础操作如下:   
[GitHub仓库](https://github.com/Skythinker616/LinkScope)  
[Gitee仓库](https://gitee.com/skythinker/link-scope)

**一个疑难杂症**
在使用C板进行 LinkScope 调试时偶尔会出现以下情况: 

这时先打开 Keil，进入 Debug 再退出 Debug，然后再连 LinkScope，若还不行就拔插后再进行如上操作

## 3 基于 VScode 的 Git 基础操作教学
关于 Git，建议先看一遍牢潘写的[学习Git](/get-started/git.html)

为了减少命令行操作，提高直观性，下面将介绍如何借助 VScode 的 Git 插件新建一个符合本战队电控组规范的远程仓库，并进行代码管理，可自行了解相关插件操作对应的命令行代码，和其他 Git 的进阶操作

### 3.1 创建一个符合规范的远程仓库
下面将教大家如何将自己的代码上传至远程仓库

#### 3.1.1 插件下载
- 若只是为了便于Git开发，下载`Git Graph`即可

![Git Graph](./img/Git_Graph.jpg)

- 以下插件仅个人推荐

将项目文件打开的快捷方式暂存到 VScode 的项目管理器中，每次编辑某个项目的代码时可以直接在VScode中打开该文件
![Project Manager](./img/Project_Manager.jpg)

使用关键字在代码中高亮部分内容，并显示在侧边栏中，有待完善的功能与BUG可以用这个高亮，帮助团队找到要修改的地方
![Todo Tree](./img/Todo_Tree.jpg)

#### 3.1.2 创建一个啥也没有的仓库
本文以Gitee为例，请先自行注册Gitee账号，按如下操作创建一个仓库

![Gitee1](./img/Gitee1.jpg)
![Gitee2](./img/Gitee2.jpg)
创建完成后会自动跳转到仓库地址，此时仓库是空的，并可以看到有一些提示
![Gitee3](./img/Gitee3.jpg)

#### 3.1.3 新建 c_cpp_properties.json 文件
为了让文件架构更加清楚，便于编辑所有文件而非仅 .c/.h 文件，我们将不使用 VScode 中 Keil 的相关插件，而是通过创建 `c_cpp_properties.json` 将有关的文件路径与宏定义包含进去，这样在使用 VScode 编辑代码时不会报一大堆错(这样做仅仅是将VScode作为代码编辑器，无法实现编译、下载、调试等功能)

使用 VScode 打开整个 Keil 文件夹，我们可以通过快捷键`Ctrl+Shift+P`打开命令面板，接着输入关键词`C/C++编辑配置`，之后会弹出`C/C++编辑配置(JSON)`和`C/C++编辑配置(UI)`两种选项，如下图所示
![Git1](./img/Git1.jpg)
![Git2](./img/Git2.jpg)
可以看到`main.c`报了一大堆错

(1) `C/C++编辑配置(JSON)`是c_cpp_properties.json文件形式的设置，单击该选项就会在.vscode文件夹下生成一个c_cpp_properties.json配置文件; 

(2) `C/C++编辑配置(UI)`可以通过一个可视化界面来手动设置，当我们单击 C/C++编辑配置(UI) 选项时，就会自动在.vscode文件夹下生成一个c_cpp_properties.json配置文件。

我们直接配置，选择`C/C++编辑配置(JSON)`选项，可以看到`c_cpp_properties.json`配置文件的默认配置如下: 
![Git3](./img/Git3.jpg)
文件中的参数介绍如下：
- “name”：名称，操作系统根据这个名称识别对应的属性配置，windows系统：Win32；Linux系统：Linux；macOS系统：Mac
- “includePath”：头文件路径，以便IntelliSense(智能感知)引擎的搜索
- "${workspaceFolder}/**"：当前项目所在根目录并递归搜索子目录，也就是当前工作区文件夹的路径(例如：D:\code)，而且还会递归查找其所有的子目录
- “defines”：IntelliSense(智能感知)引擎在分析文件时要使用的预处理器定义列表
- “cStandard”：用于IntelliSense(智能感知)引擎的c标准(版本)
- “cppStandard”：用于IntelliSense(智能感知)引擎的c++标准(版本)
- “intelliSenseMode”：IntelliSense(智能感知)的模式
- “compilerPath”：根据该路径查询编译器(gcc.exe、g++.exe)，以便启用更加准确的IntelliSense(智能感知)。这里并不是调用编译器，真正启用编译器编译的是在tasks.json文件里

主要需要修改 “includePath” 与“defines”，只要照抄 Keil 的配置即可，修改默认配置如下图
![Git4](./img/Git4.jpg)
![Git5](./img/Git5.jpg)
![Git6](./img/Git6.png)

此时再使用 VScode 作为代码编辑工具就不会报错了

#### 3.1.4 新建.git文件
打开 VScode 侧边栏的`源代码管理`，点击`初始化仓库`
![Git7](./img/Git7.jpg)
该操作会初始化生成Git仓库，生成一个`.git`的文件夹，用于存放Git的相关配置信息

#### 3.1.5 配置用户名与邮箱
用户名与邮箱需要与Gitee一致，在电脑上提交代码用的就是这个信息，点击左下角的`Git Graph`，并打开终端
![Git8](./img/Git8.jpg)
配置用户名，`<your_name>`是你的自定义用户名

    git config --global user.name "<your_name>"

配置邮箱，`<your_email>`是你的邮箱

    git config --global user.email "<your_email>"

显示配置信息是否正确，检查一下

    git config --list

![Git9](./img/Git9.jpg)
也可以通过`Git Graph`插件修改用户名与邮箱
![Git10](./img/Git10.jpg)
#### 3.1.6 本地仓库操作
将远程仓库链接到本地，仅仅是链接，不做任何下载上传操作，`<your_repository_url>`是远程仓库的链接

    git remote add origin <your_repository_url>

使能大小写敏感选项，防止路径文件出现差错

    git config core.ignorecase false

![Git11](./img/Git11.jpg)
一般会有一些编译的中间文件，如下图
![Git12](./img/Git12.jpg)

而这部分是不需要做代码版本管理的，我们可以在在文件夹内新建`.gitignore`文件去忽略这部分文件(不能忽略太多东西，至少保证第一次拉取的时候能正常使用):

    # Keil工程忽略项
    /**/MDK-ARM/*
    # 不忽略Keil工程配置文件
    !/**/MDK-ARM/*.uvoptx
    !/**/MDK-ARM/*.uvprojx
    !/**/MDK-ARM/startup_*.s

    # VScode编辑器忽略项
    /**/.vscode/*
    # 不忽略VScode工程配置文件
    !/**/.vscode/c_cpp_properties.json

如下图所示，可以看到添加 `.gitignore` 后，部分文件高亮消失并变灰
![Git13](./img/Git13.jpg)

Git 只能忽略尚未提交到仓库的未被追踪的文件，如果你过去已经提交了一个文件，但希望忽略该文件，该如何做?

告诉 Git 不要追踪`<your_file>`文件，把它从索引中删除:

    git rm --cached <your_file>

告诉 Git 不要追踪`<your_folder>`文件夹，把它从索引中删除:

    git rm -r --cached <your_folder>

接下来，将 `.gitignore` 以及其他文件添加到暂存区: 
![Git14](./img/Git14.jpg)
最后，编辑此次修改的描述并提交所有暂存区的文件: 
![Git15](./img/Git15.jpg)

做好以上工作可以发现原本的`提交`按钮变成了`发布Branch`，即发布分支，而非我们预期的`推送`，如下图
![Git16](./img/Git16.jpg)
这是由于我们本地 VScode 的 Git 插件默认主分支的名称是 main ，但远程仓库的默认主分支名称为 master ，导致本地仓库与远程仓库的分支之间名称不同，进而代码推送将会出现问题，因此需要修改本地分支名为 master
![Git17](./img/Git17.jpg)
修改后再进行推送，即可推送成功
![Git18](./img/Git18.jpg)
![Git19](./img/Git19.jpg)

**至此，一个符合钱塘蛟战队电控组规范的远程仓库就创建好了**

### 3.2 代码版本管理操作
    ！！最好完成一个功能就提交一次记录，并附上规范易懂的提交消息！！
    ！！提交和推送不一样，一定要测试成功再推送！！
#### 3.2.1 查看修改记录
当修改部分代码后，可以查看修改记录
![Git20](./img/Git20.jpg)
![Git21](./img/Git21.jpg)

#### 3.2.2 代码提交
当你修改了代码的一部分内容，需要将编写的代码加入暂存区(add)
![Git22](./img/Git22.jpg)
然后将暂存区的代码添加到本地仓库，并添加自己对该修改的注释，比如新增某某功能，或修复某某bug(commit)
![Git23](./img/Git23.jpg)
可以通过Git Graph 查看过往的修改记录
![Git24](./img/Git24.jpg)
![Git25](./img/Git25.jpg)

#### 3.2.3 代码推送
当你完成了一个功能，并测试通过，即可进行推送代码，推送代码前记得同步远程的最新代码仓库，即再次从远程仓库的分支拉取(pull)，然后向远程仓库的分支推送(push)，`同步更改`等同于以上两个操作
![Git26](./img/Git26.jpg)
![Git27](./img/Git27.jpg)
![Git28](./img/Git28.jpg)

#### 3.2.3 代码克隆
使用以下代码可以直接将远程仓库克隆到本地，`<your_repository_url>`是远程仓库的链接

    git clone <your_repository_url>