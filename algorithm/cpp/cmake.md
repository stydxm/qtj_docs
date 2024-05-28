# CMake和第三方库
## 什么是CMake/为什么要用CMake
CMake是一个编译工具，主要作用就是能够使用统一的语法，生成能够指导编译器完成编译工作的文件

举个例子，在linux下用g++编译软件，需要写`Makefile`，windows下的MSVC编译器有自己的.sln文件，在不同平台、不同版本，它们的格式和内容都会有差异

而如果我们使用CMake，那只需要写一个`CMakeLists.txt`，由cmake去生成出编译器需要的文件

同时，cmake还可以简化编译的过程

在前面配置环境的时候你可能已经注意到了，编译的设置繁琐且容易出错。在用gcc编译调用了opencv的c++程序时其实我们已经用过一个`pkg-config`这个工具了，如果不使用别的工具，那实际运行的命令其实是这样的（我直接复制的，若安装的时候加入更多模块那还会更长）：

``` bash
gcc -lstdc++ main.cpp -o main -I/usr/include/opencv4 -lopencv_gapi -lopencv_stitching -lopencv_alphamat -lopencv_aruco -lopencv_bgsegm -lopencv_bioinspired -lopencv_ccalib -lopencv_cvv -lopencv_dnn_objdetect -lopencv_dnn_superres -lopencv_dpm -lopencv_face -lopencv_freetype -lopencv_fuzzy -lopencv_hdf -lopencv_hfs -lopencv_img_hash -lopencv_intensity_transform -lopencv_line_descriptor -lopencv_mcc -lopencv_quality -lopencv_rapid -lopencv_reg -lopencv_rgbd -lopencv_saliency -lopencv_stereo -lopencv_structured_light -lopencv_phase_unwrapping -lopencv_superres -lopencv_optflow -lopencv_surface_matching -lopencv_tracking -lopencv_highgui -lopencv_datasets -lopencv_text -lopencv_plot -lopencv_videostab -lopencv_videoio -lopencv_viz -lopencv_wechat_qrcode -lopencv_xfeatures2d -lopencv_shape -lopencv_ml -lopencv_ximgproc -lopencv_video -lopencv_xobjdetect -lopencv_objdetect -lopencv_calib3d -lopencv_imgcodecs -lopencv_features2d -lopencv_dnn -lopencv_flann -lopencv_xphoto -lopencv_photo -lopencv_imgproc -lopencv_core
```

而使用cmake后，可以简化成这样：

``` bash
cmake .
make
```

而这只是编译一个文件，实际写工程时会有更多的文件互相调用，gcc编译命令会更长，而cmake依然可以用两句完成

## 安装
建议安装一个vscode插件，就叫`cmake`

::: tip 提示
注意`CMake`和`CMake Tools`是不一样的
:::

cmake本体在前面的步骤里应该已经安装过了，如果你在运行cmake命令时仍有找不到命令的报错，那么就在终端里输入

``` bash
sudo apt install cmake
```

## 如何运行
在前面已经提到过了，cmake的运行非常简单，只需要一行命令

但是它在运行时会生成很多文件，导致目录看起来很乱，所以我们一般都会先新建一个叫build的目录（名字是约定俗成的），让cmake把生成的文件放在里面

``` bash
cmake -B build
```

::: tip 提示
这样完成了cmake运行，但没有进行编译

实际编写程序时还要编译，输入

``` bash
make -C build
```
:::

## CMake的文件
在项目根目录创建一个叫`CMakeLists.txt`的文件，接下来所有你需要写的内容，默认都写在这个文件 里

::: tip 提示
项目达到一定规模时需要拆分成多个模块，此时可能会有多个`CMakeLists.txt`存在在不同目录下
:::

## 输出
我们还是从最简单的开始，打印一个字符串，在cmake中函数是`message`

``` cmake
message("Hello World!")
```

## 变量
cmake中定义变量的语法是`set(<变量名> <变量值>)`，例如：
``` cmake
set(example_var "hello world")
```
这就代表把变量`example_var`的值设为`"hello world"`

使用变量的语法是`${<变量名>}`，例如：
``` cmake
message("${example_var}")
```
此时就会输出`hello world`

## 运算符与条件、循环语句
和C++一样，cmake也有运算符、条件、循环语句，但对于我们的用例不一定会用到，所以请自行了解

要注意一点，大多数语言中一个函数的多个参数用逗号分割，cmake中是空格

## 最简单的cmake工程
我们先来写一个最简单的cmake工程，用它来编译Hello World程序

先准备好一个叫`hello.cpp`的c++程序

``` cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}
```

然后是cmake

``` cmake
check_minimum_required(VERSION 3.16)
project(hello_world)
add_executable(hello hello.cpp)
```

这就是一个最简单的工程，cmake的函数名很直观，想必一眼就能看出作用，这里就不多作解释了

其中最低版本可以设的略高，因为一般安装的都比较新

## 加入头文件
删除前面写的两个文件，我们重新开始

首先，我们来写一个头文件和两个程序（注意文件名中的路径）

::: code-group
``` cpp [src/main.cpp]
#include "hello.h"

int main() {
    hello();
    return 0;
}
```

``` cpp [src/hello.cpp]
#include <iostream>
using namespace std;

void hello() {
    cout << "Hello World!" << endl;
}
```

``` cpp [include/hello.hpp]
void hello();
```
:::

然后写cmake

``` cmake
check_minimum_required(VERSION 3.16)
project(simple_project)
include_directories(include)
add_executable(main src/main.cpp src/hello.cpp)
```

可以看到这里主要有两点变化

- 第三行多了一句`include_directories(include)`，这句的意思是告诉cmake，在编译时，把`include`目录下的头文件包含进来

- 最后一行的`add_executable`多了一个参数，这是因为代码包含在了两个文件中，都需要写进去

## 第三方库
c++也有着比较丰富的生态（当然库的数量、安装方便程度都不如python javascript go等现代语言）

但不同的是，它没有像pypi npm这样的统一的托管平台，且安装方法可能会有差异，因此没有一种完全通用的方法

这里给出一些建议：

- 一定要优先去官网或者项目readme里找资料，遇到没有写的问题的时候再去直接搜索

- 有些库可能提供了apt包，直接安装一般不会有什么大问题

- 把库文件放到该放的地方，例如`/usr/include`等