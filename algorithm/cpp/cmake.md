# CMake和第三方库
## 什么是CMake/为什么要用CMake [^1]

[^1]: 还有[xmake](https://xmake.io/), [build2](https://build2.org/), [Meson](https://mesonbuild.com/), [qmake](https://doc.qt.io/qt-6/qmake-manual.html)等等非常多的工具也可以完成这一点

CMake是一个编译工具，主要作用就是能够使用统一的语法，生成能够指导编译器完成编译工作的文件

举个例子，在linux下用g++编译软件，需要写`Makefile`，windows下的MSVC编译器有自己的.sln文件，在不同平台、不同版本，它们的格式和内容都会有差异

::: info 信息
编写C++需要一系列工具，其中一些工具的输出是另一些工具的输入，按顺序组成一条链，故称工具链

CMake和make都是工具链的一部分，也是最常用的方案
:::

而如果我们使用CMake，那只需要写一个`CMakeLists.txt`，由cmake去生成出编译器需要的文件

同时，cmake还可以简化编译的过程：

在编译包含大量源代码的程序时，编译的设置繁琐且容易出错。比如在用gcc编译调用了opencv的c++程序时，如果不使用别的工具，那实际运行的命令其实是这样的（这是直接复制的，若安装的时候加入更多模块那还会更长）：

``` bash
gcc -lstdc++ main.cpp -o main -I/usr/include/opencv4 -lopencv_gapi -lopencv_stitching -lopencv_alphamat -lopencv_aruco -lopencv_bgsegm -lopencv_bioinspired -lopencv_ccalib -lopencv_cvv -lopencv_dnn_objdetect -lopencv_dnn_superres -lopencv_dpm -lopencv_face -lopencv_freetype -lopencv_fuzzy -lopencv_hdf -lopencv_hfs -lopencv_img_hash -lopencv_intensity_transform -lopencv_line_descriptor -lopencv_mcc -lopencv_quality -lopencv_rapid -lopencv_reg -lopencv_rgbd -lopencv_saliency -lopencv_stereo -lopencv_structured_light -lopencv_phase_unwrapping -lopencv_superres -lopencv_optflow -lopencv_surface_matching -lopencv_tracking -lopencv_highgui -lopencv_datasets -lopencv_text -lopencv_plot -lopencv_videostab -lopencv_videoio -lopencv_viz -lopencv_wechat_qrcode -lopencv_xfeatures2d -lopencv_shape -lopencv_ml -lopencv_ximgproc -lopencv_video -lopencv_xobjdetect -lopencv_objdetect -lopencv_calib3d -lopencv_imgcodecs -lopencv_features2d -lopencv_dnn -lopencv_flann -lopencv_xphoto -lopencv_photo -lopencv_imgproc -lopencv_core
```
如果使用pkg-config这个工具，编译命令可以写成这样


``` bash
g++ -std=c++11 -g main.cpp -o main `pkg-config --cflags --libs opencv4`
```

而使用cmake后，无论再加多少个库，编译的命令都可以被简化成这样：

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

cmake本体安装也很简单，在终端里输入

``` bash
sudo apt install cmake
```

### 如何运行
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

### CMake的文件
在项目根目录创建一个叫`CMakeLists.txt`的文件，接下来所有你需要写的内容，默认都写在这个文件 里

::: tip 提示
项目达到一定规模时需要拆分成多个模块，此时可能会有多个`CMakeLists.txt`存在在不同目录下
:::

## 语法
### 输出
我们还是从最简单的开始，打印一个字符串，在cmake中函数是`message`

``` cmake
message("Hello World!")
```

### 变量
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

### 运算符与条件、循环语句
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
cmake_minimum_required(VERSION 3.16)
project(hello_world)
add_executable(hello hello.cpp)
```

这就是一个最简单的工程，cmake的函数名很直观，想必一眼就能看出作用，这里就不多作解释了

其中最低版本可以设的略高，因为一般安装的都比较新

### 加入头文件
删除前面写的两个文件，我们重新开始

首先，我们来写一个头文件和两个程序（注意文件名中的路径）

::: code-group
``` cpp [src/main.cpp]
#include "hello.hpp"

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

``` cmake {3-4}
cmake_minimum_required(VERSION 3.16)
project(simple_project)
include_directories(include)
add_executable(main src/main.cpp src/hello.cpp)
```

可以看到这里主要有两点变化

- 第三行多了一句`include_directories(include)`，这句的意思是告诉cmake，在编译时，把`include`目录下的头文件包含进来

- 最后一行的`add_executable`多了一个参数，这是因为代码包含在了两个文件中，都需要写进去

### 构建整个目录

掏出刚才那个cmake文件，最后这么一行

``` cmake {4}
cmake_minimum_required(VERSION 3.16)
project(simple_project)
include_directories(include)
add_executable(main src/main.cpp src/hello.cpp) // [!code focus]
```

对的，程序写在了`main.cpp`和`hello.cpp`这两个文件中，编译时要把这两个文件都包含进去，听起来是很合理

但是，如果项目越来越大，这一行要变长变长再变长，把文件名都写在这里吗？好像太麻烦了点

这时候我们可以使用`aux_source_directory`函数，找出目录下所有的代码文件

``` cmake {4}
cmake_minimum_required(VERSION 3.16)
project(simple_project)
include_directories(include)
aux_source_directory(src my_lib_dir)
add_executable(main ${my_lib_dir})
```

## 库
随着工程变大，代码量增长的同时往往功能也能分为几个明确的模块，这时候我们就要把程序分为若干个模块了

这里只有两个文件，我们就把hello.cpp看成是一个单独的模块

``` cmake {5-6}
cmake_minimum_required(VERSION 3.16)
project(simple_project)
include_directories(include)
add_executable(main src/main.cpp)
add_library(hello src/hello.cpp)
target_link_libraries(main hello)
```

### 静态库与动态库
运行上面的命令完成编译后，build目录中会多一个叫`libhello.a`的文件[^2]，这个文件就是我们写的hello.cpp编译后的结果，即静态库

[^2]: 这里.a是对于linux系统而言的，windows系统下是.lib，即library

库还有一种形式是动态库

``` cmake {5}
cmake_minimum_required(VERSION 3.16)
project(simple_project)
include_directories(include)
add_executable(main src/main.cpp)
add_library(hello SHARED src/hello.cpp)
target_link_libraries(main hello)
```

如果把cmake文件改成这样，编译出来的就是动态库了，而这时build目录里就会有`libhello.so`文件[^3]（原来.a结尾的文件不会被自动删除，但不会参与到实际构建过程中去），so是shared object的缩写

[^3]: 这里.so是对于linux系统而言的，windows系统下是.dll，即dynamic link library

它们的区别在于静态库会被嵌入到最终的构建产物，即那个叫main的二进制文件里，但动态库不会，因此运行时它必须和main都存在，否则无法运行

::: tip 提示
这里建议动手试试
:::

使用静态库时只需要一个二进制文件就能运行整个程序，而动态库则需要把所有的so文件都一起带上，而优点是编译时节省了把库嵌入的过程（这个过程我们称为链接）

对我们来说，其实区别不大，为了避免丢库造成的问题，还是建议写的所有都采用静态库，当然一些别人写的已有的库要根据实际情况看文档

### 第三方库
c++也有着比较丰富的生态（当然库的数量、安装方便程度都不如python， javascript， go等现代语言）

但不同的是，它没有像pypi npm这样的统一的托管平台，且安装方法可能会有差异，因此没有一种完全通用的方法

这里给出一些建议：

- 一定要优先去官网或者项目readme里找资料，遇到没有写的问题的时候再去搜索

- 有些库可能提供了apt包，直接安装一般不会有什么大问题

- `sudo make install`

使用库时要先找到库再把它链接到构建目标中。而使用第三方库时，如果库文件在系统中而非当前目录下，那么就要使用`find_library`代替`add_library`和`add_subdirectory`，链接用到的`target_link_libraries`不变

## 任务
完成[任务7](../tasks/7)
