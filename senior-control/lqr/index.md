---
author: Zou Ajie
lastEdit: 2024-7-7
brief: 平衡步兵技术文档
---
# ***BALANCED_ROBOT***

***参考文献***  

[倒立摆系统](https://ctms.engin.umich.edu/CTMS/index.php?example=InvertedPendulum&section=SystemModeling)  
[LQR及观测器简介](https://zhuanlan.zhihu.com/p/623843252)  
[平衡步兵](https://bbs.robomaster.com/forum.php?mod=viewthread&tid=22867)  
[首都师范共轴麦轮](https://bbs.robomaster.com/forum.php?mod=viewthread&tid=22944)  
[哈工程轮腿](https://zhuanlan.zhihu.com/p/563048952)  
[上交轮腿](https://bbs.robomaster.com/forum.php?mod=viewthread&tid=22756)  
[合工大轮腿仿真](https://www.bilibili.com/read/cv26677904)  

## 1.倒立摆系统

倒立摆是机器人学中一个非常重要的模型，火箭、导弹、独轮车、双足机器人、四足机器人、两轮自平衡机器人、轮腿机器人，基本都是倒立摆的变形。

![](image\Inverted_Pendulum_1.jpg)

本章提到的倒立摆系统为一阶倒立摆，不考虑阻尼，以下为本章用到的物理参数

| 参数符号  | 参数含义                          | 参数单位 |
| :------- | :-------------------------------  | :------ |
| $F$      | 施加在滑块上的作用力	             | $N$    |
| $x$      | 滑块的位移                         | $m$    |
| $x_m、y_m$| 摆杆质心的位移                    | $m$    |
| $l$      | 摆杆长度的一半                     | $m$    |
| $M$      | 滑块的质量                         | $kg$   |
| $m$      | 摆杆的质量                         | $kg$   |
| $\theta$ | 摆杆与竖直方向的夹角                | $rad$  |
| $I$      | 摆杆的转动惯量($I=\frac{1}{12}m(2l)^2=\frac{1}{3}ml^2$)| $kg\cdot m^2$ |

### 1.1拉格朗日动力学

所谓动力学不过是通过一种方法求出力与运动之间的关系，对于拉格朗日动力学来说，若要求系统中的力或者力矩就可以使用以下动力学方程：
$$
\text {拉格朗日方程}\quad \frac{d}{dt}(\dfrac{\partial T}{\partial \dot{q_\alpha}})-\dfrac{\partial T}{\partial q_\alpha}=Q_\alpha\tag{1.1.1}
$$
式中 $T$ 为系统的总动能，$q_\alpha$ 为广义坐标，$\dot{q_\alpha}$ 为广义速度，$Q_\alpha$ 为广义力
对于第 $\alpha$ 个关节在什么时候求力，什么时候求力矩，对应的拉格朗日方程又是什么呢？
- 若操作机的执行元件控制某个转动变量 $\theta$ 时，则执行元件的总力矩 $\tau_\theta$ 应为：
$$
\tau_\theta=\frac{d}{dt}(\dfrac{\partial T}{\partial \dot{\theta}})-\dfrac{\partial T}{\partial \theta}
$$
- 若操作机的执行元件控制某个移动变量 $r$ 时，则施加在运动方向 $r$ 上的力应为：
$$
F_r=\frac{d}{dt}(\dfrac{\partial T}{\partial \dot{r}})-\dfrac{\partial T}{\partial r}
$$

若某个关节不存在外加作用力，即力学系统所受的主动力全是保守力时，式 $(1.1.1)$ 的基本形式可改写为：
$$
\text {保守系统的拉格朗日方程}\quad \frac{d}{dt}(\dfrac{\partial L}{\partial \dot{q_\alpha}})-\dfrac{\partial L}{\partial q_\alpha}=0\tag{1.1.2}
$$

式中：
$$
\text {拉格朗日函数}\quad L=T-V\tag{1.1.3}
$$
$T$ 为系统的总动能，$V$ 为系统的总势能

[拉格朗日方程推导过程](https://zhuanlan.zhihu.com/p/156760739)  
[保守系统的拉格朗日方程推导过程](https://zhuanlan.zhihu.com/p/124245453)

### 1.2状态空间方程推导

设坐标原点为转轴，可得摆杆质心位移：
$$
\begin{split}
x_m&=x+l\sin\theta\\
y_m&=l\cos\theta
\end{split}\tag{1.2.1}
$$

则倒立摆摆杆质心速度：
$$
\begin{split}
\dot{x_m}&=\dot{x}+l\dot{\theta}\cos\theta\\
\dot{y_m}&=-l\dot{\theta}\sin\theta
\end{split}\tag{1.2.2}
$$

摆杆的平动动能可由式 $(1.2.2)$ 计算，对于整个系统而言，系统总动能为滑块的平动动能加摆杆的转动动能与平动动能，应为：
$$
T=\frac{1}{2}M\dot{x}^2+\frac{1}{2}I\dot{\theta}^2+\frac{1}{2}m(\dot{x_m}^2+\dot{y_m}^2)\tag{1.2.3}
$$

即：
$$
T=\frac{1}{2}(M+m)\dot{x}^2+\frac{2}{3}ml^2\dot{\theta}^2+ml\dot{x}\dot{\theta}\cos\theta\tag{1.2.4}
$$

系统总势能只受摆杆位置的影响，可得：
$$
V=mgl\cos\theta\tag{1.2.5}
$$

由式 $(1.1.3)$ ，则拉格朗日函数应为：
$$
L=\frac{1}{2}(M+m)\dot{x}^2+\frac{2}{3}ml^2\dot{\theta}^2+ml\dot{x}\dot{\theta}\cos\theta-mgl\cos\theta\tag{1.2.6}
$$

针对移动变量 $x$ 和转动变量 $\theta$ 可列写以下拉格朗日方程：
$$
\begin{cases}
\frac{d}{dt}(\dfrac{\partial T}{\partial \dot{x}})-\dfrac{\partial T}{\partial x}&=F \\\\
\frac{d}{dt}(\dfrac{\partial L}{\partial \dot{\theta}})-\dfrac{\partial L}{\partial \theta}&=0
\end{cases}
\tag{1.2.7} 
$$

求解拉格朗日方程可得：
$$
\begin{cases}
(M+m)\ddot{x}+ml\ddot{\theta}\cos\theta-ml\dot{\theta}^2\sin\theta&=&F \\
\frac{4}{3}ml^2\ddot{\theta}+ml\ddot{x}\cos\theta-mgl\sin\theta&=&0
\end{cases}
\tag{1.2.8}
$$

为了对系统进行线性分析和控制，需要对上述的非线性系统在在平衡点附近进行线性化。系统平衡点附近时，倒立摆的摆角 $\theta$ 很小，并且假设其角速度 $\dot{\theta}$ 也很小，则有：
$$
\begin{cases}
\cos\theta=1\\
\sin\theta=\theta\\
\sin(\theta)\dot{\theta}=0
\end{cases}
$$

从而得到一阶倒立摆系统在平衡点附近的线性化模型为：
$$
\begin{cases}
(M+m)\ddot{x}+ml\ddot{\theta}&=&F \\
\frac{4}{3}ml^2\ddot{\theta}+ml\ddot{x}-mgl\theta&=&0
\end{cases}
\tag{1.2.9}
$$


已知
$$
\begin{align*}
\text {状态变量}\quad X&=\begin{bmatrix}
    x & \theta & \dot{x} & \dot{\theta}
\end{bmatrix}^T \\
\text {输入量}\quad u&=F
\end{align*}
$$

根据方程组 $(1.2.9)$ 可得到倒立摆系统的状态空间方程如下：
$$
\begin{split}
\dot{X}=AX+Bu\\
y=CX+Du
\end{split}\tag{1.2.10}
$$

式中：
$$
\begin{align*}
\text {状态矩阵}\quad A&=\begin{bmatrix}
    0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 1 \\
    0 & \frac{-3mg}{4M+m} & 0 & 0 \\
    0 & \frac{3(M+m)g}{(4M+m)l} & 0 & 0
\end{bmatrix}
\tag{1.2.11} \\
\text {输入矩阵}\quad B&=\begin{bmatrix}
    0 & 0 & \frac{4}{4M+m} & \frac{-3}{(4M+m)l}
\end{bmatrix}^T\tag{1.2.12} \\
\text {输出矩阵}\quad C&=\begin{bmatrix} 1&0&0&0 \\ 0&1&0&0 \\ 0&0&1&0 \\ 0&0&0&1 \end{bmatrix}\tag{1.2.13} \\
\text {前馈矩阵}\quad D&=\begin{bmatrix}0&0&0&0\end{bmatrix}^T\tag{1.2.14}
\end{align*}
$$

### 1.3LQR控制器
对于 $LQR$ 控制器的设计，选取合适的加权矩阵 $Q、R$ 后，在 MATLAB 中调用 `lqr` 函数，即可得到系统 $LQR$ 算法的反馈增益矩阵 $K=lqr(A，B，Q，R)$ 并进行仿真。
权重矩阵 $Q、R$ 的各个参数相互耦合,不同的权重矩阵会得到不同控制效果。一般情况下， $Q、R$ 是根据经验主观决定,然后通过多次不同的试验获得。如果选取不当,则可能使求得反馈矩阵不能满足控制性能要求。选择权重矩阵 $Q、R$ 时,应该基于下述三方面原则:
1.  $Q$ 矩阵中对角线上的各元素值越大,其所对应的状态变量的响应速度越快,对系统的影响程度越大,而其他状态变量的响应速度就会变慢,对系统的影响也会削弱。
2. $R$ 矩阵不能太小,否则会导致控制量增大,而超出系统执行的能力。 $R$ 阵也不要太大,否则导致控制量太小,而影响控制性能。
3. 由于控制模型为线性化模型,所以 $Q、R$ 的选取应该使系统各状态工作线性范围之内。

$LQR$ 的 $Q、R$ 矩阵随便给一般都能正常运行，如果仿真后发现运动状态与预想相差有点大，很大概率是状态方程与建模的问题，检查正负号，有没有漏乘变量，还有建立力学方程的时候有没有考虑正负号是否与模型的正负号相对应

本章更关注机器人稳摆速度，所以 $Q$ 权阵与 $R$ 权阵分别取 $\begin{bmatrix} 100 & 100 & 10 & 10 \end{bmatrix}$ 与 $1$ 

``` matlab
clear;
clc;

%% 定义倒立摆物理性质
M = 2; % 滑块质量
m = 0.1; % 摆杆质量
l = 0.5; % 摆杆长度的一半
g = 9.81; % 重力加速度

%% 状态空间矩阵
A = [0 0 1 0;
        0 0 0 1;
        0 -3*m*g/(4*M+m) 0 0;
        0 3*(M+m)*g/((4*M+m)*l) 0 0];
B = [0;0;4/(4*M+m);-3/((4*M+m)*l)];

%% 求LQR增益矩阵
Q = diag([100 100 10 10]); % x q dx dq
R = 1; % fx
K = lqr(A,B,Q,R);
disp('K = ');
disp(K);
```

得到
$$
K = \begin{bmatrix}
    -10.0000 & -92.8749 & -12.5438 & -24.0854
\end{bmatrix}
$$
![](image\Inverted_Pendulum_2.jpg)
![](image\Inverted_Pendulum_3.jpg)


### 1.4牛顿力学法
机器人的动力学和运动学模型是实现机器人控制策略的基础。想要完成对自平衡机器人控制系统的设计，需要根据自平衡机器人的运动特点和结构特点进行分析，建立准确可靠的数学模型。机器人动力学建模有两种具有代表性的方法：牛顿力学法和拉格朗日函数法。
- 拉格朗日函数法依据 $Hamilton$ 原理，利用标量代替矢量，对总动量和总势能进行分析，建立动力学模型。这种方法运用能量方式建模，不需要对内向力进行分析。
- 牛顿力学法运用牛顿定律和动量矩定理对各部分刚体的受力情况进行隔离分析，然后建立相邻刚体间的内力项，最终得到系统的动力学模型。牛顿力学建模法可以表达出系统完整的受力关系，有明确的物理意义，该方法建立的模型易于被控对象控制策略的设计。

本章将采用牛顿力学法重新推导前文倒立摆系统的状态空间方程

分析滑块在水平方向上受力平衡，可得：
$$
M\ddot{x}+N=F\tag{1.4.1}
$$

分析摆杆在水平方向上受力平衡，可得：
$$
N=m\frac{d^2}{dt^2}(x+l\sin\theta)\tag{1.4.2}
$$

即：
$$
N=m\ddot{x}+ml\ddot{\theta}\cos\theta-ml\dot{\theta}^2\sin\theta\tag{1.4.3}
$$

$(1.4.2)、(1.4.3)$ 方程中的 $N$ 为滑块与摆杆水平方向间的相互作用力，联立 $(1.4.2)、(1.4.3)$ 两个方程消除 $N$ ，得到一阶倒立摆的第一个动力学模型方程：
$$
(M+m)\ddot{x}+ml\ddot{\theta}\cos\theta-ml\dot{\theta}^2\sin\theta=F\tag{1.4.4}
$$

分析摆杆在竖直方向上受力平衡，可得：
$$
P-mg=m\frac{d^2}{dt^2}(l\cos\theta)\tag{1.4.5}
$$

即：
$$
P=mg-ml\ddot{\theta}\sin\theta-ml\dot{\theta}^2\cos\theta\tag{1.4.6}
$$

分析摆杆绕其质心的力矩平衡，可得：
$$
I\ddot{\theta}=(P\sin\theta-N\cos\theta)l\tag{1.4.7}
$$

$(1.4.3)、(1.4.6)、(1.4.7)$ 方程中的 $N、P$ 为滑块与摆杆间水平、竖直方向间的相互作用力，联立 $(1.4.3)、(1.4.6)、(1.4.7)$ 三个方程消除 $N、P$ ，得到一阶倒立摆第二个动力学模型方程：
$$
\frac{4}{3}ml^2\ddot{\theta}+ml\ddot{x}\cos\theta-mgl\sin\theta=0\tag{1.4.8}
$$

倒立摆稳摆时的摆角 $\theta$ 很小，为使状态方程线性化，假设 $\theta$ 与 $\dot{\theta}$ 趋近于 $0$ ，则有：
$$
\begin{cases}
\cos\theta=1\\
\sin\theta=\theta\\
\sin\theta\dot{\theta}=0
\end{cases}
$$

可得局部线性化动态模型：
$$
\begin{cases}
(M+m)\ddot{x}+ml\ddot{\theta}&=&F \\
\frac{4}{3}ml^2\ddot{\theta}+ml\ddot{x}-mgl\theta&=&0
\end{cases}
\tag{1.4.9}
$$

式 $(1.4.9)$ 与  $(1.2.9)$ 相同，由此可见，由拉格朗日函数法和牛顿力学法建立的状态空间方程是一样的

## 2.两轮自平衡机器人系统

两轮自平衡机器人系统是一阶倒立摆系统的一种变形，即将滑块改为驱动轮 ，摆杆改为小板凳本体，作用在滑块上的驱动力 $F$ 改为驱动轮的输出力矩 $C$ ，以下为本章用到的物理参数

| 参数符号  | 参数含义                          | 参数单位 |
| :------- | :-------------------------------  | :------ |
| $T_L、T_R$| 左右驱动轮的输出转矩	             | $N\cdot M$ |
| $x_p、y_p$| 本体质心的位移                    | $m$    |
| $x_{rL}、x_{rR}$| 左右驱动轮的位移            | $m$    |
| $x$      | 两驱动轮轴中心的位移               | $m$    |
| $\psi$   | 本体的俯仰角 $Pitch$              | $rad$  |
| $\phi$   | 本体的偏航角 $Yaw$                | $rad$  |
| $\theta_{rL}、\theta_{rR}$ | 左右驱动轮的转角 | $rad$  |
| $M_p$    | 本体的质量                        | $kg$   |
| $M_r$    | 左右驱动轮的质量                   | $kg$   |
| $R$      | 左右驱动轮的半径                   | $m$    |
| $D$      | 左右驱动轮之间的距离               | $m$    |
| $L$      | 本体重心与驱动轮轮轴之间的距离      | $m$    |
| $J_r$    | 左右驱动轮的转动惯量($J_r=\frac{1}{2}M_rR^2$)                             | $kg\cdot m^2$ |
| $J_\psi$ | 本体绕 $y$ 轴的转动惯量($J_\psi=\frac{1}{12}M_p(2L)^2=\frac{1}{3}M_pL^2$) | $kg\cdot m^2$ |
| $J_\phi$ | 本体绕 $z$ 轴的转动惯量($J_\phi=\frac{1}{12}M_pD^2$)                      | $kg\cdot m^2$ |


由于机器人的控制是非线性的，难以精确地去建立其数学模型，所以为了建立可行性较高的系统模型，我们进行如下假设:
- 两轮自平衡机器人各部件均为刚体；
- 忽略两轮自平衡机器人受到的外界干扰力；
- 忽略两轮自平衡机器人本体和两驱动轮转轴之间的摩擦力；
- 两驱动轮与地面没有相对滑动

### 2.1拉格朗日函数法
两轮自平衡机器人位移和速度与左右驱动轮转角和角速度的转化关系如下：
$$
\begin{align*}
x_{rL}&=R\theta_{rL} \tag{2.1.1} \\
\dot{x}_{rL}&=R\dot{\theta}_{rL} \tag{2.1.2} \\
\ddot{x}_{rL}&=R\ddot{\theta}_{rL} \tag{2.1.3} \\
\end{align*}
$$

右轮同理，得：
$$
\begin{align*}
x=\frac{x_{rL}+x_{rR}}{2}&=\frac{R}{2}(\theta_{rL}+\theta_{rR}) \tag{2.1.4} \\
\dot{x}=\frac{\dot{x}_{rL}+\dot{x}_{rR}}{2}&=\frac{R}{2}(\dot{\theta}_{rL}+\dot{\theta}_{rR}) \tag{2.1.5} \\
\ddot{x}=\frac{\ddot{x}_{rL}+\ddot{x}_{rR}}{2}&=\frac{R}{2}(\ddot{\theta}_{rL}+\ddot{\theta}_{rR}) \tag{2.1.6} \\
\end{align*}
$$

两轮自平衡机器人偏航角和偏航角速度与左右驱动轮转角和角速度的转化关系如下：
$$
\begin{align*}
\phi=\frac{x_{rR}-x_{rL}}{D}&=\frac{R}{D}(\theta_{rR}-\theta_{rL}) \tag{2.1.7} \\
\dot{\phi}=\frac{\dot{x}_{rR}-\dot{x}_{rL}}{D}&=\frac{R}{D}(\dot{\theta}_{rR}-\dot{\theta}_{rL}) \tag{2.1.8} \\
\ddot{\phi}=\frac{\ddot{x}_{rR}-\ddot{x}_{rL}}{D}&=\frac{R}{D}(\ddot{\theta}_{rR}-\ddot{\theta}_{rL}) \tag{2.1.9} \\
\end{align*}
$$

此外，结构本体质心位移和速度与两轮轴中心的位移和速度的关系满足：
$$
\begin{align*}
x_p&=x+L\sin\psi \tag{2.1.10} \\
\dot{x}_p&=\dot{x}+\dot{\psi}L\cos\psi \tag{2.1.11} \\
y_p&=L\cos\psi \tag{2.1.12} \\
\dot{y}_p&=-\dot{\psi}L\sin\psi \tag{2.1.13} \\
\end{align*}
$$

左右驱动轮的平均动能：
$$
T_1=\frac{1}{2}M_{r}\dot{x}_{rL}^2+\frac{1}{2}M_{r}\dot{x}_{rR}^2=\frac{1}{2}M_{r}(\dot{x}_{rL}^2+\dot{x}_{rR}^2) \tag{2.1.14}
$$

左右驱动轮绕 $y$ 轴的转动动能：
$$
T_2=\frac{1}{2}J_{r}\dot{\theta}_{rL}^2+\frac{1}{2}J_{r}\dot{\theta}_{rR}^2=\frac{1}{2}J_{r}(\dot{\theta}_{rL}^2+\dot{\theta}_{rR}^2) \tag{2.1.15}
$$

本体质心的平动动能：
$$
T_3=\frac{1}{2}M_{p}(\dot{x}_{p}^2+\dot{y}_{p}^2)=\frac{1}{2}M_{p}[(\dot{x}+\dot{\psi}L\cos\psi)^2+(-\dot{\psi}L\sin\psi)^2] \tag{2.1.16}
$$

本体绕 $z$ 轴转动的动能：
$$
T_4=\frac{1}{2}J_{\psi}\dot{\psi}^2 \tag{2.1.17}
$$

本体绕 $y$ 轴转动的动能：
$$
T_5=\frac{1}{2}J_{\phi}\dot{\phi}^2 \tag{2.1.18}
$$

系统总动能：
$$
\begin{align*}
T&=T_1+T_2+T_3+T_4+T_5=\frac{1}{2}M_{r}(\dot{x}_{rL}^2+\dot{x}_{rR}^2)+\frac{1}{2}J_{r}(\dot{\theta}_{rL}^2+\dot{\theta}_{rR}^2) \\
&+\frac{1}{2}M_{p}[(\dot{x}+\dot{\psi}L\cos\psi)^2+(-\dot{\psi}L\sin\psi)^2]+\frac{1}{2}J_{\psi}\dot{\psi}^2+\frac{1}{2}J_{\phi}\dot{\phi}^2 \tag{2.1.19}
\end{align*}
$$

将式 $(2.1.1)$ ~ $(2.1.9)$ 代入式 $(2.1.19)$ 化简得：
$$
\begin{align*}
T&=\frac{1}{2}M_{r}R^2\dot{\theta}_{rL}^2+\frac{1}{2}M_{r}R^2\dot{\theta}_{rR}^2+\frac{1}{2}J_{r}\dot{\theta}_{rL}^2+\frac{1}{2}J_{r}\dot{\theta}_{rR}^2+\frac{1}{2}J_{\psi}\dot{\psi}^2+\frac{1}{2}J_{\phi}(\frac{R\dot{\theta}_{rR}-R\dot{\theta}_{rL}}{D})^2 \\
&+\frac{1}{2}M_{p}[(\frac{1}{2}R(\dot{\theta}_{rL}+\dot{\theta}_{rR})+\dot{\psi}L\cos\psi)^2+(-\dot{\psi}L\sin\psi)^2] 
\end{align*} \tag{2.1.20}
$$

欲使系统具有确定运动，则需保证确定系统位置的独立参数的个数等于系统的自由度数。两轮自平衡机器人在平面运动时具有三个自由度。所以选取左驱动轮转角 $\theta_{rL}$ 、右驱动轮转角 $\theta_{rR}$ 和本体倾角 $\psi$ 这三个相互独立的变量作为系统的运动状态变量来描述系统，将可以唯一确定系统的位置。

选用左右驱动轮的转角 $\theta_{rL}、\theta_{rR}$ 与本体的俯仰角 $\psi$ 作为系统的三个广义坐标，即：
$$
\begin{cases}
q_1=\theta_{rL}\\
q_2=\theta_{rR}\\
q_3=\psi
\end{cases}
$$

在此坐标系下，相应的广义力 $Q_1、Q_2、Q_3$ 分别为：电机对左驱动轮的作用转矩 $T_L$ ，电机对右驱动轮的作用转矩 $T_R$，本体重力与电机对本体的作用转矩 $M_pgL\sin\psi-T_L-T_R$，即：
$$
\begin{cases}
Q_1=T_L\\
Q_2=T_R\\
Q_3=M_pgL\sin\psi-T_L-T_R
\end{cases}
$$

由式 $(1.1.1)$ 可得拉格朗日方程表达式为：
$$
\begin{cases}
\frac{d}{dt}(\dfrac{\partial T}{\partial \dot{\theta}_{rL}})-\dfrac{\partial T}{\partial \theta_{rL}}&=T_L \\\\
\frac{d}{dt}(\dfrac{\partial T}{\partial \dot{\theta}_{rR}})-\dfrac{\partial T}{\partial \theta_{rR}}&=T_R \\\\
\frac{d}{dt}(\dfrac{\partial T}{\partial \dot{\psi}})-\dfrac{\partial T}{\partial \psi}&=M_pgL\sin\psi-T_L-T_R
\end{cases}
\tag{2.1.21} 
$$

该动力学模型具有复杂的非线性、多变性和强耦合性。为了进一步深入研究两轮自平衡机器人的特性，本章基于以下假设对两轮自平衡机器人的非线性动力学模型进行线性化：
- 当本体倾角 $\psi$ 在平衡点附件小范围变化时，假设：
$$
\begin{cases}
\cos\psi=1\\
\sin\psi=\psi\\
\dot{\psi}\sin\psi=0\\
\end{cases}
$$
- 本体绕垂直方向轴的转动惯量 $J_{\phi}$ 与 $\psi$ 有关。当俯仰角 $\psi$ 在两轮自平衡机器人平衡点附近小范围内变化时，为了简化计算，假设 $J_{\phi}$ 为常值；
- 假设两驱动轮尺寸一致，车轮始终保持与地面接触，忽略内部能量损耗

基于以上假设，取：
$$
\begin{align*}
\text {状态变量}\quad X&=\begin{bmatrix}
    x & \dot{x} & \psi & \dot{\psi} & \phi & \dot{\phi}
\end{bmatrix}^T \\
\text {输入量}\quad u&=\begin{bmatrix}
    T_L & T_R
\end{bmatrix}^T
\end{align*}
$$

解得该两轮自平衡机器人的动力学模型为：
$$
\begin{align*}
\ddot{\theta}_{rL}(\frac{1}{4}M_pR^2+M_rR^2+J_r+J_{\phi}\frac{R^2}{D^2})+\ddot{\theta}_{rR}(\frac{1}{4}M_pR^2-J_{\phi}\frac{R^2}{D^2})+\frac{1}{2}M_pLR\ddot{\psi}=T_L \tag{2.1.22} \\\\
\ddot{\theta}_{rR}(\frac{1}{4}M_pR^2+M_rR^2+J_r+J_{\phi}\frac{R^2}{D^2})+\ddot{\theta}_{rL}(\frac{1}{4}M_pR^2-J_{\phi}\frac{R^2}{D^2})+\frac{1}{2}M_pLR\ddot{\psi}=T_R \tag{2.1.23} \\\\
(M_pL^2+J_{\psi})\ddot{\psi}+\frac{1}{2}M_pLR(\ddot{\theta}_{rL}+\ddot{\theta}_{rR})=M_pgL\sin\psi-T_L-T_R \tag{2.1.24}
\end{align*}
$$

式 $(2.1.22)、(2.1.23)$ 相加，联立式 $(2.1.6)$ 消去 $\ddot{\theta}_{rL}、\ddot{\theta}_{rR}$ ，得：
$$
\begin{align*}
\ddot{x}(M_pR^2+2M_rR^2+2J_r)+M_pLR^2\ddot{\psi}=R(T_L+T_R) \tag{2.1.25} \\\\
(M_pL^2+J_{\psi})\ddot{\psi}+M_pL\ddot{x}=M_pgL\sin\psi-T_L-T_R
\tag{2.1.26}
\end{align*}
$$

式 $(2.1.25)、(2.1.26)$ 联立，分别消去 $\ddot{\psi}、\ddot{x}$ ，得：
$$
\ddot{x}=-\frac{M_pL^2g}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)}\psi \\
+\frac{J_{\psi}+M_pL^2+M_pLR}{[J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)]R}(T_L+T_R) \tag{2.1.27}
$$
$$
\ddot{\psi}=\frac{M_pLg(M_p+2M_r+2J_r/R^2)}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)}\psi \\
-\frac{M_pL/R+M_p+2M_r+2J_r/R^2}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)}(T_L+T_R) \tag{2.1.28}
$$

式 $(2.1.22)、(2.1.23)$ 相减，联立式 $(2.1.9)$ 消去 $\ddot{\theta}_{rL}、\ddot{\theta}_{rR}$ ，得：
$$
\ddot{\phi}=-\frac{D}{D^2(M_rR+J_r/R)+2J_{\phi}R}(T_L-T_R) \tag{2.1.29}
$$

联立约束式 $(2.1.1)$ ~ $(2.1.12)$ 与方程式 $(2.1.21)$ ，从而得到两轮自平衡机器人在平衡点附近的状态方程 $\dot{X}=AX+Bu$ 为：
$$
\begin{align*}
\begin{bmatrix}
    \dot{x} \\ \ddot{x} \\ \dot{\psi} \\ \ddot{\psi} \\ \dot{\phi} \\ \ddot{\phi}
\end{bmatrix}
=\begin{bmatrix}
    0 & 1 & 0 & 0 & 0 & 0 \\
    0 & 0 & A_{23} & 0 & 0 & 0 \\
    0 & 0 & 0 & 1 & 0 & 0 \\
    0 & 0 & A_{43} & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 1 \\
	0 & 0 & 0 & 0 & 0 & 0 \\
\end{bmatrix}
\begin{bmatrix}
    x \\ \dot{x} \\ \psi \\ \dot{\psi} \\ \phi \\ \dot{\phi}
\end{bmatrix}
+
\begin{bmatrix}
    0 & 0 \\ B_{21} & B_{22} \\ 0 & 0 \\ B_{41} & B_{42} \\ 0 & 0 \\ B_{61} & B_{62}
\end{bmatrix}
\begin{bmatrix} T_L \\ T_R \end{bmatrix}
\end{align*}\tag{2.1.30}
$$

其中：
$$
\begin{align*}
A_{23}&=-\frac{M_pL^2g}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)} \\
A_{43}&=\frac{M_pLg(M_p+2M_r+2J_r/R^2)}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)} \\
B_{21}&=B_{22}=\frac{J_{\psi}+M_pL^2+M_pLR}{[J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)]R} \\
B_{41}&=B_{42}=-\frac{M_pL/R+M_p+2M_r+2J_r/R^2}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)} \\
B_{61}&=-B_{62}=-\frac{D}{D^2(M_rR+J_r/R)+2J_{\phi}R} \\
\end{align*}
$$

MATLAB脚本为：

``` matlab
clear;
clc;
%% 定义小车倒立摆物理性质
R = 0.07625; %车轮的半径
D = 0.31; %左轮、右轮两个轮子间的距离
l = 0.05; %摆杆质心到转轴距离
m = 0.741 * 2; %车轮的质量, 共轴麦轮为两个轮的质量
M = 4.886; %摆杆质量
I = (1/2)*m*R^2; %车轮的转动惯量
Jy = (1/3)*M*l^2; %机器人机体对 y 轴的运动时产生的转动惯量(俯仰方向)
Jz = (1/12)*M*D^2; %机器人机体对 z 轴的运动时产生的转动惯量(偏航方向)
g = 9.8; %重力加速度

%% 状态空间矩阵
Q_eq = Jy*M + (Jy+M*l^2) * (2*m+(2*I)/R^2);
% A为系统矩阵
A_23=-(M^2*l^2*g)/Q_eq;
A_43=M*l*g*(M+2*m+(2*I/R^2))/Q_eq;
A = [0 1 0 0 0 0;
        0 0 A_23 0 0 0;
        0 0 0 1 0 0;
        0 0 A_43 0 0 0;
        0 0 0 0 0 1;
        0 0 0 0 0 0;];
% B为输入矩阵
B_21=(Jy+M*l^2+M*l*R)/Q_eq/R;
B_22 = B_21;
B_41=-((M*l/R)+M+2*m+(2*I/R^2))/Q_eq;
B_42 = B_41;
B_61 = -D/(D^2*(M*R+I/R)+2*Jz*R);
B_62 = -B_61;
B = [0 0;
        B_21 B_22;
        0 0;
        B_41 B_42;
        0 0;
        B_61 B_62];
% C为输出矩阵
C = eye(6);
D = 0;
%% 求LQR增益矩阵
Q = diag([0.001 4 8 0.8 4 0.8]);
R = diag([1 1]);
K = lqr(A, B,Q,R);
disp('K = ');
disp(K);
```

建模如下图
![](image\Balanced_Robot_1.jpg)
![](image\Balanced_Robot_2.jpg)

### 2.2牛顿力学法
为了便于两轮自平衡机器人系统牛顿力学法的分析，现在原基础上定义以下物理参数
| 参数符号  | 参数含义                          | 参数单位 |
| :------- | :-------------------------------  | :------ |
| $N_{fL}、N_{fR}$| 左右驱动轮受到地面的摩擦力   | $N$     |
| $N_L、N_R$ | 左右驱动轮受到车体作用力的水平分力 | $N$     |
| $P_L、P_R$ | 左右驱动轮受到车体作用力的竖直分力 | $N$     |

车轮的运动可分解为平动和转动，则由牛顿第二定律可得：
$$
M_r\ddot{x}_{rL}=N_{fL}-N_{L} \tag{2.2.1}
$$

由刚体定轴转动定律可得：
$$
J_r\ddot{\theta}_{rL}=T_{L}-N_{fL}R \tag{2.2.2}
$$

联立式 $(2.2.1)、(2.2.2)、(2.1.3)$ 消去 $N_{fL}$ ，得：
$$
\ddot{x}_{rL}=\frac{T_L-N_LR}{\frac{J_r}{R}+M_rR}\tag{2.2.3}
$$

对左轮也同理：
$$
\ddot{x}_{rR}=\frac{T_R-N_RR}{\frac{J_r}{R}+M_rR}\tag{2.2.4}
$$

式 $(2.2.3)、(2.2.4)$ 相加联立式 $(2.1.6)$ 消去 $\ddot{x}_{rL}、\ddot{x}_{rR}$ ，得：
$$
(M_r+\frac{J_r}{R^2})\ddot{x}=\frac{T_L+T_R}{2R}-\frac{N_L+N_R}{2}\tag{2.2.5}
$$

对车体，水平方向上有：
$$
M_p\frac{d^2}{dt^2}(x+L\sin\psi)=N_L+N_R \tag{2.2.6}
$$

即：
$$
N_L+N_R=M_p\ddot{x}+M_pL\ddot{\psi}\cos\psi-M_pL\dot{\psi}^2\sin\psi\tag{2.2.7}
$$

竖直方向上有：
$$
M_p\frac{d^2}{dt^2}(L\cos\psi)=P_L+P_R-M_pg \tag{2.2.8}
$$

即：
$$
P_L+P_R=M_pg-M_pL\ddot{\psi}\sin\psi-M_pL\dot{\psi}^2\cos\psi\tag{2.2.9}
$$

对车体，由刚体定轴转动定律可得：
$$
J_{\psi}\ddot{\psi}=(P_L+P_R)L\sin\psi-(N_L+N_R)L\cos\psi-(T_L+T_R) \tag{2.2.10}
$$


联立式 $(2.2.5)、(2.2.7)$ ，得：
$$
(M_p+2M_r+\frac{2J_r}{R^2})\ddot{x}=\frac{T_L+T_R}{R}-M_pL\ddot{\psi}\cos\psi+M_pL\dot{\psi}^2\sin\psi \tag{2.2.11}
$$

联立式 $(2.2.7)、(2.2.9)、(2.2.10)$ ，得：
$$
\ddot{\psi}=\frac{M_pgL\sin\psi}{J_r+M_pL^2}-\frac{M_pL\cos\psi}{J_r+M_pL^2}\ddot{x}-\frac{T_L+T_R}{J_r+M_pL^2} \tag{2.2.12}
$$

当本体倾角 $\psi$ 在平衡点附件小范围变化时，假设：
$$
\begin{cases}
\cos\psi=1\\
\sin\psi=\psi\\
\dot{\psi}\sin\psi=0\\
\end{cases}
$$

代入式 $(2.2.11)、(2.2.12)$ ，得：
$$
\ddot{x}=\frac{T_L+T_R}{(M_p+2M_r+\frac{2J_r}{R^2})R}-\frac{M_pL}{M_p+2M_r+\frac{2J_r}{R^2}}\ddot{\psi} \tag{2.2.13}
$$
$$
\ddot{\psi}=\frac{M_pgL}{J_r+M_pL^2}\psi-\frac{M_pL}{J_r+M_pL^2}\ddot{x}-\frac{T_L+T_R}{J_r+M_pL^2} \tag{2.2.14}
$$

联立式 $(2.2.13)、(2.2.14)$ ，分别消去 $\ddot{\psi}、\ddot{x}$ ，得：
$$
\ddot{x}=-\frac{M_pL^2g}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)}\psi \\
+\frac{J_{\psi}+M_pL^2+M_pLR}{[J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)]R}(T_L+T_R) \tag{2.2.15}
$$
$$
\ddot{\psi}=\frac{M_pLg(M_p+2M_r+2J_r/R^2)}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)}\psi \\
-\frac{M_pL/R+M_p+2M_r+2J_r/R^2}{J_{\psi}M_p+(J_{\psi}+M_pL^2)(2M_r+2J_r/R^2)}(T_L+T_R) \tag{2.2.16}
$$

转向运动是由于左右两车轮从水平方向上施加给车体的反作用力的大小 $N_L、N_R$ 不相等引起的，则由刚体定轴转动定律可得
$$
J_{\phi}\ddot{\phi}=\frac{D}{2}(N_R-N_L) \tag{2.2.17}
$$

式 $(2.2.3)、(2.2.4)$ 相减联立式 $(2.1.9)$ 消去 $\ddot{x}_{rL}、\ddot{x}_{rR}$ ，得：
$$
-(M_rR+\frac{J_r}{R})D\ddot{\phi}=(T_L-T_R)-R(N_L-N_R) \tag{2.2.18}
$$

式 $(2.2.17)、(2.2.18)$ 联立，得：
$$
\ddot{\phi}=-\frac{D}{D^2(M_rR+J_r/R)+2J_{\phi}R}(T_L-T_R) \tag{2.2.19}
$$


## 3.观测器
### 3.1简介
### 3.2卡尔曼滤波器


## 4.轮腿式平衡机器人系统
### 4.1平衡与纵向运动控制
#### 4.1.1模型定义
![](image\Wheel_Balanced_Robot1.png)
| 参数符号  | 参数含义                          | 参数单位 |
| :------- | :------------------------------- | :------ |
| $\theta$ | 摆杆与竖直方向夹角	                | $rad$    |
| $\varphi$| 机体与水平夹角                     | $rad$    |
| $\alpha$ | 摆杆与机体相对角度$(\alpha=\varphi+\theta)$ | $rad$    |
| $x$      | 驱动轮位移                        | $m$    |
| $T$      | 驱动轮输出力矩                    | $N\cdot m$   |
| $T_p$    | 髋关节输出力矩                    | $N\cdot m$  |
| $N$      | 驱动轮对摆杆力的水平分量           | $N$ |
| $P$      | 驱动轮对摆杆力的竖直分量	        | $N$    |
| $N_f$    | 地面对驱动轮摩擦力                | $N$    |
| $N_M$    | 摆杆对机体力水平方向分量           | $N$    |
| $P_M$    | 摆杆对机体力竖直方向分量           | $N$    |
| $F$      | 摆杆推力                         | $N$   |
| $R$      | 驱动轮半径                       | $m$    |
| $L$      | 摆杆重心到驱动轮轴距离            | $m$   |
| $L_M$    | 摆杆重心到机体转轴距离            | $m$  |
| $l$      | 机体重心到其转轴距离	          | $m$    |
| $m_w$    | 驱动轮转子质量                   | $kg$   |
| $m_p$    | 摆杆质量                        | $kg$    |
| $M$      | 机体质量                        | $kg$   |
| $I_w$    | 驱动轮转子转动惯量$(I_w=\frac{1}{2}m_wR^2)$  | $kg\cdot m^2$ |
| $I_p$    | 摆杆绕质心转动惯量$(I_p=\frac{1}{12}m_pL^2)$ | $kg\cdot m^2$ |
| $I_M$    | 机体绕质心转动惯量$(I_M=\frac{1}{12}Ml^2)$   | $kg\cdot m^2$ |

#### 4.1.2经典力学分析
车轮的运动可分解为平动和转动，则由牛顿第二定律可得：
$$
m_w\ddot{x}=N_f-N \tag{4.1.1}
$$

由刚体定轴转动定律可得：
$$
I_w\frac{\ddot{x}}{R}=T-N_fR \tag{4.1.2}
$$

联立式 $(4.1.1)、(4.1.2)$ 消去 $N_f$ ，得：
$$
\ddot{x}=\frac{T-NR}{\frac{I_w}{R}+m_wR} \tag{4.1.3}
$$

***对摆杆***，水平方向上有：
$$
N-N_M=m_p\frac{d^2}{dt^2}(x+L\sin\theta) \tag{4.1.4}
$$

竖直方向上有：
$$
P-P_M-m_pg=m_p\frac{d^2}{dt^2}(L\cos\theta)\tag{4.1.5}
$$

由刚体定轴转动定律可得：
$$
I_p\ddot{\theta}=(PL+P_{M}L_{M})\sin\theta-(NL+N_{M}L_{M})\cos\theta-T+T_p \tag{4.1.6}
$$

***对机体***，水平方向上有：
$$
N_M=M\frac{d^2}{dt^2}(x+(L+L_M)\sin\theta-l\sin\varphi) \tag{4.1.7}
$$

竖直方向上有：
$$
P_M-Mg=M\frac{d^2}{dt^2}((L+L_M)\cos\theta+l\cos\varphi) \tag{4.1.8}
$$

由刚体定轴转动定律可得：
$$
I_m\ddot{\varphi}=T_p+N_Ml\cos\varphi+P_Ml\sin\varphi \tag{4.1.9}
$$

#### 4.1.3状态空间方程及LQR控制器

定义：
$$
\begin{align*}
\text {状态向量}\quad X&=\begin{bmatrix}
    \theta & \dot{\theta} & x & \dot{x} & \varphi & \dot{\varphi}
\end{bmatrix}^T \\
\text {控制向量}\quad u&=\begin{bmatrix}
    T & T_p
\end{bmatrix}^T \\
\text {系统非线性模型}\quad \dot{X}&=f(X,u)
\end{align*}
$$

利用MATLAB符号运算工具，根据式 $(4.1.4)、(4.1.5)、(4.1.7)、(4.1.8)$ 消去中间变量 $P、N、P_M、N_M$，并利用函数`solve`对式 $(4.1.3)、(4.1.6)、(4.1.9)$ 进行求解以得到系统非线性模型符号表达式。根据式状态向量 $X$ 与控制向量 $u$ ，求非线性模型平衡点处雅可比矩阵对其线性化，即：

``` matlab
function K = get_k_length(leg_length)
    %theta : 摆杆与竖直方向夹角            R   ：驱动轮半径
    %x     : 驱动轮位移                   L   : 摆杆重心到驱动轮轴距离
    %phi   : 机体与水平夹角               LM  : 摆杆重心到其转轴距离
    %T     ：驱动轮输出力矩               l   : 机体重心到其转轴距离
    %Tp    : 髋关节输出力矩               mw  : 驱动轮转子质量
    %N     ：驱动轮对摆杆力的水平分量      mp  : 摆杆质量
    %P     ：驱动轮对摆杆力的竖直分量      M   : 机体质量
    %Nm    ：摆杆对机体力水平方向分量      Iw  : 驱动轮转子转动惯量
    %Pm    ：摆杆对机体力竖直方向分量      Ip  : 摆杆绕质心转动惯量
    %Nf    : 地面对驱动轮摩擦力           Im  : 机体绕质心转动惯量

    syms x(t) T R Iw mw M L LM theta(t) l phi(t) mp g Tp Ip IM
    syms f1 f2 f3 d_theta d_x d_phi theta0 x0 phi0 
    %% 定义数值变量
    R1=0.0603;              %驱动轮半径
    L1=leg_length/2;        %摆杆重心到驱动轮轴距离
    LM1=leg_length/2;       %摆杆重心到其转轴距离
    l1=0.011;               %机体质心距离转轴距离
    mw1=0.6;                %驱动轮质量
    mp1=0.045;              %杆质量
    M1=1.44;                %机体质量
    Iw1=0.5*mw1*R1^2;       %驱动轮转动惯量
    Ip1=mp1*((L1+LM1)^2+0.048^2)/12.0; %摆杆转动惯量
    IM1=M1*(0.135^2+0.066^2)/12.0;     %机体绕质心转动惯量
    %% 定义运动方程
    NM = M*diff(x + (L + LM )*sin(theta)-l*sin(phi),t,2);
    N = NM + mp*diff(x + L*sin(theta),t,2);
    PM = M*g + M*diff((L+LM)*cos(theta)+l*cos(phi),t,2);
    P = PM +mp*g+mp*diff(L*cos(theta),t,2);
    eqn1 = diff(x,t,2) == (T-N*R)/(Iw/R + mw*R);
    eqn2 = Ip*diff(theta,t,2) == (P*L + PM*LM)*sin(theta)-(N*L+NM*LM)*cos(theta)-T+Tp;
    eqn3 = IM*diff(phi,t,2) == Tp +NM*l*cos(phi)+PM*l*sin(phi);
    % 通过替换变量简化运动方程，主要是将方程中对时间t求导的符号变量替换为其他辅助变量
    eqn10 = subs(eqn1,[diff(theta,t,2),diff(x,t,2),diff(phi,t,2),diff(theta,t),diff(x,t),diff(phi,t),theta,x,phi],[f1,f2,f3,d_theta,d_x,d_phi,theta0,x0,phi0]);
    eqn20 = subs(eqn2,[diff(theta,t,2),diff(x,t,2),diff(phi,t,2),diff(theta,t),diff(x,t),diff(phi,t),theta,x,phi],[f1,f2,f3,d_theta,d_x,d_phi,theta0,x0,phi0]);
    eqn30 = subs(eqn3,[diff(theta,t,2),diff(x,t,2),diff(phi,t,2),diff(theta,t),diff(x,t),diff(phi,t),theta,x,phi],[f1,f2,f3,d_theta,d_x,d_phi,theta0,x0,phi0]);
    %% 求状态空间矩阵
    % 求解由eqn10、eqn20和eqn30方程组成的三元一次代数方程组，并将解赋值给符号变量f1、f2和f3
    [f1,f2,f3] = solve(eqn10,eqn20,eqn30,f1,f2,f3);
    % 求解状态方程，并在系统的平衡点处线性化系统
    A=subs(jacobian([d_theta,f1,d_x,f2,d_phi,f3],[theta0,d_theta,x0,d_x,phi0,d_phi]),[theta0,d_theta,d_x,phi0,d_phi,T,Tp],[0,0,0,0,0,0,0]);
    % 将符号变量替换为数值变量，求解状态方程数值解
    AA=subs(A,[R,L,LM,l,mw,mp,M,Iw,Ip,IM,g],[R1,L1,LM1,l1,mw1,mp1,M1,Iw1,Ip1,IM1,9.8]);
    AA=double(AA);
    % 求解状态方程，并在系统的平衡点处线性化系统
    B=subs(jacobian([d_theta,f1,d_x,f2,d_phi,f3],[T,Tp]),[theta0,d_theta,d_x,phi0,d_phi,T,Tp],[0,0,0,0,0,0,0]);
    % 将符号变量替换为数值变量，求解状态方程数值解
    BB=subs(B,[R,L,LM,l,mw,mp,M,Iw,Ip,IM,g],[R1,L1,LM1,l1,mw1,mp1,M1,Iw1,Ip1,IM1,9.8]);
    BB=double(BB);
    %% 求LQR增益矩阵
    Q=diag([1 0.07 10 5 300 0.6]);
    R=[20 0;0,1]; %T Tp
    K=lqr(AA,BB,Q,R);
end
```

$$
\dot{X}=\begin{bmatrix}
    0 & 1 & 0 & 0 & 0 & 0 \\
    A_{21} & 0 & 0 & 0 & A_{25} & 0 \\
    0 & 0 & 0 & 1 & 0 & 0 \\
    A_{41} & 0 & 0 & 0 & A_{45} & 0 \\
    0 & 0 & 0 & 0 & 0 & 1 \\
    A_{61} & 0 & 0 & 0 & A_{65} & 0 \\
\end{bmatrix}X+
\begin{bmatrix}
    0 & 0 \\ B_{21} & B_{22} \\ 0 & 0 \\ B_{41} & B_{42} \\ 0 & 0 \\ B_{61} & B_{62}
\end{bmatrix}u \tag{4.1.10}
$$

由于表达式较为复杂所占篇幅较大，此处用符号代替。
![](image\Wheel_Balanced_Robot2.jpg)
![](image\Wheel_Balanced_Robot3.jpg)

### 4.2五连杆运动学解算与VMC
#### 4.2.1正运动学解算
![](image\Five_Link.png)
五连杆机构参数定义如图所示，其中 $A、E$ 由电机驱动，其角度 $\phi_1、\phi_4$ 可通过电机编码器测得。控制任务中主要关注五连杆机构末端 $C$ 点的位置，通常可用直角坐标 $(x_C,y_C)$ 或极坐标 $(L_0,\phi_0)$ 表示。

定义 $A$ 点为坐标原点，通过五连杆左右两部分列写 $C$ 点坐标，可得到以下等式：
$$
\begin{cases}
x_B+l_2\cos\phi_2=x_D+l_3\cos\phi_3\\
y_B+l_2\sin\phi_2=y_D+l_3\sin\phi_3 \tag{4.2.1}
\end{cases}
$$

对其移项，并在等式两边进行平方，有：
$$
\begin{cases}
(x_B-x_D)^2+2(x_B-x_D)l_2\cos\phi_2+(l_2\cos\phi_2)^2=(l_3\cos\phi_3)^2\\
(y_B-y_D)^2+2(y_B-y_D)l_2\sin\phi_2+(l_2\sin\phi_2)^2=(l_3\sin\phi_3)^2
\end{cases} \tag{4.2.2}
$$

两式相加可得：
$$
2(y_B-y_D)l_2\sin\phi_2+2(x_B-x_D)l_2\cos\phi_2=l_3^2-l_2^2-(x_D-x_B)^2-(y_D-y_B)^2 \tag{4.2.3}
$$

将原式变形为：
$$
\frac{1+\cos\phi_2}{2}(\frac{2A_0\cos\phi_2}{1+\cos\phi_2}+\frac{2B_0\sin\phi_2}{1+\cos\phi_2}-\frac{2C_0}{1+\cos\phi_2})=0  \tag{4.2.4}
$$

已知：
$$
\begin{cases}
\tan\frac{\theta}{2}=\frac{\sin\theta}{1+\cos\theta} \\
cos\theta=\cos^2\frac{\theta}{2}-\sin^2\frac{\theta}{2}=2\cos^2\frac{\theta}{2}-1\\
\sin^2\frac{\theta}{2}+\cos^2\frac{\theta}{2}=1
\end{cases}
$$

使用二倍角公式对原式进行展开并化简得到一个关于 $\tan\frac{\phi_2}{2}$ 的一元二次方程：
$$
-(A_0+C_0)\tan^2\frac{\phi_2}{2}+2B_0\tan\frac{\phi_2}{2}+(A_0-C_0)=0 \tag{4.2.5}
$$

其解为：
$$
\phi_2=2\arctan(\frac{B_0+\sqrt{A_0^2+B_0^2-C_0^2}}{A_0+C_0}) \tag{4.2.6}
$$

其中：
$$
\begin{align*}
A_0&=2l_2(x_D-x_B) \\
B_0&=2l_2(y_D-y_B) \\
C_0&=l_2^2+l_{BD}^2-l_3^2 \\
l_{BD}&=\sqrt{(x_D-x_B)^2+(y_D-y_B)^2} \\
\end{align*}
$$

得到角度 $\phi_2$ 后即可解算出 $C$ 点的直角坐标：
$$
\begin{cases}
x_C=l_1\cos\phi_1+l_2\cos\phi_2\\
y_C=l_1\sin\phi_1+l_2\sin\phi_2
\end{cases} \tag{4.2.7}
$$

极坐标为：
$$
\begin{cases}
L_0=\sqrt{(x_C-l_5/2)^2+y_C^2} \\
\phi_0=\arctan\frac{y_C}{x_C-l_5/2}
\end{cases} \tag{4.2.8}
$$

#### 4.2.2VMC雅可比矩阵
$VMC(virtual\;model\;control)$ 是一种直觉控制方式，其关键是在每个需要控制的自由度上构造恰当的虚拟构件以产生合适的虚拟力。虚拟力不是实际执行机构的作用力或力矩，而是通过执行机构的作用经过机构转换而成。对于一些控制问题，我们可能需要将工作空间 $(Task\;Space)$ 的力或力矩映射成关节空间 $(Joint\;Space)$ 的关节力矩。在该五连杆问题中，我们需要获得五连杆机构末端沿腿的推力 $F$ 与沿中心轴的力矩 $T_p$ （分别对应极坐标 $L_0，\phi_0$ ）与 $A、E$ 点 两驱动电机力矩 $T_1、T_2$ 的映射关系。

定义：
$$
{\pmb x}=\begin{bmatrix}
    L_0 \\
    \phi_0
\end{bmatrix}，
{\pmb q}=\begin{bmatrix}
    \phi_1 \\
    \phi_4
\end{bmatrix}
$$

对正运动学模型 ${\pmb x}=f({\pmb q})$ 求全微分得：
$$
\begin{cases}
\delta{L_0}=\dfrac{\partial f_1}{\partial \phi_1}\delta{\phi_1}+\dfrac{\partial f_1}{\partial \phi_4}\delta{\phi_4} \\
\delta{\phi_0}=\dfrac{\partial f_2}{\partial \phi_1}\delta{\phi_1}+\dfrac{\partial f_2}{\partial \phi_4}\delta{\phi_4}
\end{cases} \tag{4.2.9}
$$

即：
$$
\dot{\pmb x}=\begin{bmatrix}
    \dfrac{\partial f_1}{\partial \phi_1} & \dfrac{\partial f_1}{\partial \phi_4} \\
    \dfrac{\partial f_2}{\partial \phi_1} & \dfrac{\partial f_2}{\partial \phi_4} \\
\end{bmatrix}\dot{\pmb q} \tag{4.2.10}
$$

雅可比矩阵 ${\pmb J}$ 可以看成关节速度向末端速度的线性映射。注意：${\pmb J}$ 是关于 ${\pmb q}$ 的函数，因此，机器人在不同位形下，得到的雅可比矩阵也是不一样的。如果机械臂的关节数为 $n$，那么雅可比矩阵 ${\pmb J}$ 为 $n$ 列，即雅可比矩阵的列数等于关节数。雅可比矩阵的第 $i$ 列表示第 $i$ 个关节速度对末端速度的影响。定义雅可比矩阵 ${\pmb J}$ 为：
$$
{\pmb J}=\begin{bmatrix}
    \dfrac{\partial f_1}{\partial \phi_1} & \dfrac{\partial f_1}{\partial \phi_4} \\
    \dfrac{\partial f_2}{\partial \phi_1} & \dfrac{\partial f_2}{\partial \phi_4} \\
\end{bmatrix}
$$

有：
$$
\dot{\pmb x}={\pmb J}\dot{\pmb q} \tag{4.2.11}
$$

即通过雅可比矩阵 $\pmb J$ 将关节速度 $\dot{\pmb q}$ 映射为五连杆姿态变化率 $\dot{\pmb x}$ 。

定义：
$$
{\pmb T}=\begin{bmatrix}
    T_1 \\
    T_2
\end{bmatrix}，
{\pmb F}=\begin{bmatrix}
    F \\
    T_p
\end{bmatrix}
$$

根据虚功原理，有：
$$
{\pmb T}^T\dot{\pmb q}+(-{\pmb F})^T\dot{\pmb x}=0 \tag{4.2.12}
$$

将式 $(4.1.11)$ 代入式 $(4.1.12)$ ，有：
$$
{\pmb T}={\pmb J}^T{\pmb F} \tag{4.2.13}
$$

综上通过正运动学模型雅可比矩阵即可解算出关节电机输出力矩。
但对上文推导出的正运动学模型直接求取雅可比矩阵 $\pmb J$ 并不是好办法，因为模型表达式中包含大量平方与三角函数及其嵌套运算，直接调用符号运算工具的求雅可比矩阵函数会得到极其复杂的结果，无法转移到嵌入式平台进行计算，故需要通过其他方法来计算。
根据式 $(4.2.11)$ 可知，雅可比矩阵 $\pmb J$ 实际描述的是两坐标微分的线性映射关系，因此我们可以通过计算速度映射关系来得到雅可比矩阵。
对式 $(4.2.7)$ 求导可得：
$$
\begin{cases}
\dot{x}_C=-l_1\dot{\phi}_1\sin\phi_1-l_2\dot{\phi}_2\sin\phi_2\\
\dot{y}_C=l_1\dot{\phi}_1\cos\phi_1+l_2\dot{\phi}_2\cos\phi_2
\end{cases} \tag{4.2.14}
$$

其中 $\dot{\phi_1}$ 可由电机编码器测得，对式 $(4.2.1)$ 求导可计算 $\dot{\phi_2}$ ：
$$
\begin{cases}
\dot{x}_B-l_2\dot{\phi}_2\sin\phi_2=\dot{x}_D-l_3\dot{\phi}_3\sin\phi_3\\
\dot{y}_B+l_2\dot{\phi}_2\cos\phi_2=\dot{y}_D+l_3\dot{\phi}_3\cos\phi_3
\end{cases} \tag{4.2.15}
$$

消去 $\dot{\phi_3}$ 求得 $\dot{\phi_2}$ ：
$$
\dot{\phi}_2=\frac{(\dot{x}_D-\dot{x}_B)\cos\phi_3+(\dot{y}_D-\dot{y}_B)\sin\phi_3}{l_2\sin(\phi_3-\phi_2)} \tag{4.2.16}
$$

其中：
$$
\begin{cases}
\dot{x}_B=-l_2\dot{\phi}_1\sin\phi_1\\
\dot{y}_B=l_2\dot{\phi}_1\cos\phi_1\\
\dot{x}_D=-l_4\dot{\phi}_4\sin\phi_4\\
\dot{y}_D=l_4\dot{\phi}_4\cos\phi_4
\end{cases}
$$

将 $\dot{\phi_2}$ 代入 $(4.2.14)$ 可得：
$$
\begin{cases}
\dot{x}_C=-l_1\dot{\phi}_1\sin\phi_1-l_2(\frac{(\dot{x}_D-\dot{x}_B)\cos\phi_3+(\dot{y}_D-\dot{y}_B)\sin\phi_3}{l_2\sin(\phi_3-\phi_2)})\sin\phi_2 \\
\dot{y}_C=l_1\dot{\phi}_1\cos\phi_1+l_2(\frac{(\dot{x}_D-\dot{x}_B)\cos\phi_3+(\dot{y}_D-\dot{y}_B)\sin\phi_3}{l_2\sin(\phi_3-\phi_2)})\cos\phi_2
\end{cases} \tag{4.2.17}
$$

利用 MATLAB 进行符号运算，得：

### 4.3观测器设计

## 5.说明

- 本文所有的公式推导与建模都基于[右手系](https://baike.baidu.com/item/%E5%8F%B3%E6%89%8B%E7%B3%BB/9751780)，本文 $x$ 轴为机体前进正方向， $z$ 轴竖直向上
- 本文的姿态角均以右手系各轴的逆时针方向为正方向， $Yaw$ 对应 $z$ 轴，$Pitch$ 对应 $y$ 轴，$Roll$ 对应 $x$ 轴，以 $Yaw$ 为例，绕 $z$ 轴逆时针旋转， $Yaw$ 值增加
