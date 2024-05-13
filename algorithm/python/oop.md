# 面向对象

::: info 说明

本章主要来自[2.5 Object-Oriented Programming](https://www.composingprograms.com/pages/25-object-oriented-programming.html)，译者[CIQi6](https://github.com/CIQi6)，内容有删减

面向对象是一个很重要的概念，同时在高中信息技术也不会教。务必认真学习，并在后面的开发中使用它提高代码的可维护性
:::

面向对象编程（OOP）是一种组织程序的方法，它将许多思想结合在一起。与其他可变数据结构一样，对象具有无法从全局环境直接访问的本地状态。Python 对象系统提供了方便的语法来促进使用这些技术来组织程序。这种语法的大部分在其他面向对象的编程语言之间共享。

## 对象和类

类就像一个模板，对象是按照模板（类）生成的实例。类定义指定在该类的对象之间共享的属性和方法。我们通过银行账户的例子来介绍类语句。

我们看到银行账户要具有 `balance` 的可变值。银行帐户对象应具有 `withdraw` 方法，用于更新帐户余额并返回请求的金额。一个银行账户应该能够返回其当前的 `balance` ，返回账户 `holder` 的名称，以及 `deposit` 的金额。

`Account` 类允许我们创建多个银行账户实例。创建新对象实例的操作称为实例化类。Python 中用于实例化类的语法与调用函数的语法相同。在这种情况下，我们用参数 `Kirk` 调用 `Account` ，即帐户持有人的姓名。

```python
>>> a = Account('Kirk')
```

对象的属性是与对象关联的名称 - 值对，可通过点表达式访问。对于特定对象，其有特定值的属性，（而不是类的所有对象）称为实例属性。每个 `Account` 都有自己的余额和账户持有人姓名，这是实例属性的示例。在更广泛的编程社区中，实例属性也可以称为字段、属性或实例变量。

```python
>>> a.holder
'Kirk'
>>> a.balance
0
```

对对象进行操作或执行特定于对象的计算的函数称为方法。例如， `deposit` 是我们 `Account` 对象 `a` 的方法。它需要一个参数，即要存入的金额，更改对象的 `balance` 属性，并返回结果余额。

```python
>>> a.deposit(15)
15
```

我们说方法是在特定对象上调用的。调用 `withdraw` 方法的结果是，要么批准提款并扣除金额，要么拒绝请求并返回错误消息。

```python
>>> a.withdraw(10)  # withdraw 方法返回扣除后的金额
5
>>> a.balance       # 金额属性发生改变
5
>>> a.withdraw(10)
'Insufficient funds'
```

如上所示，方法的行为可能取决于对象不断变化的属性，方法也可以改变对象的属性。具有相同参数的两次对 `withdraw` 的调用将返回不同的结果。

## 类的定义

`class` 语句可以创建自定义类，类体里面又包含多条子语句。类语句定义类名，类体包含一组语句来定义类的属性。

```python
class <name>:
    <suite>
```

`class` 语句中的 `<suite>` 包含 `def` 语句，`def` 语句为类的对象定义新方法。用于初始化对象的方法在 `Python` 中有一个特殊的名称 `__init__` (“init”的每一测都有两个下划线)，称为类的构造函数（constructor）。

```python
class Account:
    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder
```

`Account` 的 `__init__` 方法有两个形式参数。第一个 `self` 绑定到新创建的 `Account` 对象。第二个参数 `account_holder` 绑定到调用类进行实例化时传递给类的参数。

构造函数将实例属性名称 `balance` 绑定到 0。它还将属性名称 `holder` 绑定到名称 `account_holder` 的值。形式参数 `account_holder` 是 `__init__` 方法中的本地名称。另一方面，通过最终赋值语句绑定的名称 `holder` 仍然存在，因为它使用点表达式存储为 `self` 的属性。

定义 `Account` 类后，我们可以实例化它。

```python
a = Account('Kirk')
```

上面的语句调用 `Account` 类创建一个新对象，这个对象是 `Account` 的一个实例，然后使用两个参数调用构造函数 `__init__` : 新创建的对象和字符串“Kirk” 。我们使用参数名称 `self` 作为构造函数的第一个参数，它会自动绑定到正在实例化的对象。

现在，我们可以使用符号点来访问对象的 `balance` 和 `holder` 。

```python
>>> a.balance
0
>>> a.holder
'Kirk'
```

每一个账号都有自己的属性，它的值是独立的。

```python
>>> b = Account('Spock')
>>> b.balance = 200
>>> [acc.balance for acc in (a, b)]
[0, 200]
```

每一个实例对象都具有唯一的身份标识。使用 `is` 和 `is not` 运算符可以比较对象的标识。

```python
>>> a is a
True
>>> a is b
False
```

尽管是从相同的调用构造的，但绑定到 `a` 和 `b` 的对象并不相同。像前面的一样，使用赋值将对象绑定到新名称不会创建新对象。

```python
>>> c = a
>>> c is a
True
```

仅当使用调用表达式语法实例化类（如 `Account` ）时，才会创建具有用户定义类的新对象。

对象方法也由 `class` 语句内的 `def` 语句定义。下面的 `deposit` 和 `withdraw` 都定义为 `Account` 类对象上的方法。

```python
class Account:
    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder
    def deposit(self, amount):
        self.balance = self.balance + amount
        return self.balance
    def withdraw(self, amount):
        if amount > self.balance:
            return 'Insufficient funds'
        self.balance = self.balance - amount
        return self.balance
```

虽然方法定义在声明方式上与函数定义没有区别，但方法定义在执行时确实具有不同的效果。由 `class` 语句中的 `def` 语句创建的函数值绑定到声明的名称，作为属性在类中本地绑定。该值可以使用类实例中的点表达式的方法调用。

::: tip 提示
每个方法都和`__init__`一样，有一个特殊的`self`参数
:::

这些方法也要通过点表达式来调用

```python
>>> spock_account = Account('Spock')
>>> spock_account.deposit(100)
100
>>> spock_account.withdraw(90)
10
>>> spock_account.withdraw(90)
'Insufficient funds'
>>> spock_account.holder
'Spock'
```


## 消息传递和点表达式

### 点表达式
`spock_account.deposit` 称为点表达式。点表达式由表达式、点和名称组成：

```python
<expression>.<name>
```

`<expression>` 可以是任何有效的 Python 表达式，但 `<name>` 必须是简单名称（而不是计算结果为名称的表达式）。点表达式的计算结果为作为 `<expression>` 值的对象的 `<name>` 的属性值。

函数 `getattr` 也可以按名称返回对象的属性，它等效于点表示法。

```python
>>> getattr(spock_account, 'balance')
10
```

还可以使用 `hasattr`来测试对象是否具有指定的属性。

```python
>>> hasattr(spock_account, 'deposit')
True
```

### 方法和函数

对象的属性包括其所有实例属性，以及其类中定义的所有属性（包括方法）。方法是需要特殊处理的类的属性。

在对象上调用方法时，该对象将作为第一个参数隐式传递给该方法。也就是说，点左侧的 `<expression>` 值的对象将自动作为第一个参数传递给点表达式右侧命名的方法。

我们可以通过调用 `type` 来查看差异。作为类的属性，方法只是一个函数，但作为实例的属性，它是一个绑定方法：

```python
>>> type(Account.deposit)
<class 'Function'>
>>> type(spock_account.deposit)
<class 'method'>
```

这两个结果的区别仅在于第一个是参数为 `self` 和 `amount` 的标准双参数函数。第二种是单参数方法，调用方法时，名称 `self` 将自动绑定到名为 `spock_account` 的对象，而参数 `amount` 将绑定到传递给方法的参数。这两个值（无论是函数值还是绑定方法值）都与相同的 `deposit` 函数体相关联。

我们可以通过两种方式调用 `deposit` ：作为函数和作为绑定方法。在前一种情况下，我们必须显式地为 `self` 参数提供一个参数。在后一种情况下， `self` 参数会自动绑定。

```python
>>> Account.deposit(spock_account, 1001)	# 函数 deposit 接受两个参数
1011
>>> spock_account.deposit(1000) 			# 方法 deposit 接受一个参数
2011
```

## 类属性

某些属性值在给定类的所有对象之间共享。此类属性与类本身相关联，而不是与类的任何单个实例相关联。例如，假设银行以固定利率支付账户余额的利息。该利率可能会发生变化，但它是所有账户共享的单一价值。

类属性由 `class` 语句中的赋值语句创建，这个语句为 `Account` 创建名称为 `interest` 的类属性。

```python
>>> class Account:
        interest = 0.02            # 类属性
        def __init__(self, account_holder):
            self.balance = 0
            self.holder = account_holder
        # 在这里定义更多的方法
```

仍然可以从类的任何实例访问此属性。

```python
>>> spock_account = Account('Spock')
>>> kirk_account = Account('Kirk')
>>> spock_account.interest
0.02
>>> kirk_account.interest
0.02
```

但是，类属性的赋值会改变类的所有实例的属性值。

```python
>>> Account.interest = 0.04
>>> spock_account.interest
0.04
>>> kirk_account.interest
0.04
```

## 继承

在面向对象编程范式中，我们经常会发现不同类型之间存在关联。即使两个类具有相似的属性，它们也可能有不同之处。

例如，我们可能需要实现一个支票账户，与标准账户不同，支票账户每次取款需额外收取 1 美元手续费，并且利率较低。下面我们展示了期望的行为。

```python
>>> ch = CheckingAccount('Spock')
>>> ch.interest     # 支票账户利率较低
0.01
>>> ch.deposit(20)  # 存款是一样的
20
>>> ch.withdraw(5)  # 提款会减少余额并收取额外费用
14
```

`CheckingAccount` 是 `Account` 的特化。在 OOP 术语中，普通帐户将用作 `CheckingAccount` 的父类，而 `CheckingAccount` 将用作 `Account` 的子类。

子类继承其父类的属性，但可以重写某些属性，包括某些方法。对于继承，我们只指定子类和父类之间的区别。我们在子类中未指定的任何内容都会被自动假定为与父类的行为一样。

首先，我们给出 `Account` 类的完整实现。

```python
class Account:
    """一个余额非零的账户。"""
    interest = 0.02
    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder
    def deposit(self, amount):
        """存入账户 amount，并返回变化后的余额"""
        self.balance = self.balance + amount
        return self.balance
    def withdraw(self, amount):
        """从账号中取出 amount，并返回变化后的余额"""
        if amount > self.balance:
            return 'Insufficient funds'
        self.balance = self.balance - amount
        return self.balance
```

下面显示了 `CheckingAccount` 的完整实现。我们通过将计算结果为父类的表达式放在类名后面的括号中来指定继承。

```python
class CheckingAccount(Account):
        """从账号取钱会扣出手续费的账号"""
        withdraw_charge = 1
        interest = 0.01
        def withdraw(self, amount):
            return Account.withdraw(self, amount + self.withdraw_charge)

```

这里我们写了一个属性 `withdraw_charge`，给 `interest` 属性分配一个较低的值，还定义了一个新的 `withdraw` 方法来覆盖 `Account` 类中定义的行为。

::: tip 说明
在类中定义方法覆盖掉父类中同名方法的行为叫作重写
:::

所有其他行为都继承自父类 `Account` 。

```python
>>> checking = CheckingAccount('Sam')
>>> checking.deposit(10)
10
>>> checking.withdraw(5)
4
>>> checking.interest
0.01
```

表达式 `checking.deposit` 的计算结果是用于存款的绑定方法，该方法在 `Account` 类中定义。当 Python 解析点表达式中不是实例属性的名称时，它会在类中查找该名称。事实上，在类中“查找”名称的行为试图在原始对象的类的继承链中的每个父类中找到该名称。我们可以递归地定义此过程。

### 调用父类
重写的属性可以通过类对象来访问。例如，我们调用了 `CheckingAccount` 的方法 `withdraw`，而该方法是通过调用 `Account` 中的 `withdraw` 方法来实现的。

::: tip 提示
我们调用了 `self.withdraw_charge` 而不是等效的 `CheckingAccount.withdraw_charge`

这样做的好处是，从 `CheckingAccount` 继承的类可能会覆盖 `withdraw_charge`，这种情况下我们希望我们的实现的 `withdraw` 找到新值而不是旧值。
:::

## 对象的作用

Python 的对象系统旨在同时方便和灵活地实现数据抽象和消息传递。类、方法、继承和点表达式的特殊语法都使我们能够在程序中形式化对象的概念，从而提高我们组织大型程序的能力。换句话说，Python 的对象系统提供了一种方便而灵活的方法来创建和操作对象，便于更好地组织和管理复杂的程序。

面向对象编程非常适合用于模拟由独立但相互作用部分构成的系统。例如，不同用户在社交网络中进行交互，不同角色在游戏中进行交互，不同形状在物理模拟中进行交互。在表示这样的系统时，程序中的对象通常可以自然地映射到被建模系统中的对象，而类则代表它们的类型和关系。

另一方面，类可能不是实现某些抽象的最佳机制。函数式抽象更自然地表示输入和输出之间的关系。我们不应该觉得必须将程序中的每一点逻辑都塞进一个类中，尤其是在定义独立函数来操作数据更自然的情况下。函数还可以强制实现关注点的分离。换句话说，函数式编程提供了另一种有效地组织程序逻辑的方法，使得程序员能够更好地处理和维护程序。在某些情况下，使用函数式编程方法可能比使用面向对象编程更自然和有效。

根据具体问题，学会识别何时引入新类，而不是新函数，以简化或模块化程序，是软件工程中一项重要的设计技能，值得认真关注。

## 任务
完成[任务5-1](../tasks/5-1)和[任务5-2](../tasks/5-2)