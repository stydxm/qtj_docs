# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

---

有序列表:
1. 有序列表1
2. 有序列表2
3. 有序列表3
```markdown
有序列表:
1. 有序列表1
2. 有序列表2
3. 有序列表3
```

---

无序列表:
- 无序列表1
- 无序列表2
- 无序列表3
```markdown
无序列表:
- 无序列表1
- 无序列表2
- 无序列表3
```

---

清单:
- [x] 已完成
- [ ] 未完成
``` markdown
清单:
- [x] 已完成
- [ ] 未完成
```

表格:
| 表头1 | 表头2 | 表头3 |
| :--- | :---: | ---: |
| 左对齐 | 居中对齐 | 右对齐 |
| 1 | 2 | 3 |
``` markdown

| 表头1 | 表头2 | 表头3 |
| :--- | :---: | ---: |
| 左对齐 | 居中对齐 | 右对齐 |
| 1 | 2 | 3 |
```

---

行内代码：`return 0;`
``` markdown
`return 0;`
```

代码块:
```cpp
#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!" << endl;
    return 0;
}
```
```markdown
```cpp
#include <iostream>
using namespace std;
int main() {
    cout << "Hello World!" << endl;
    return 0;
}
`` `
```
上面三个引号之间应该是没有空格的

---

> 引用: 这是一段引用
``` markdown
> 引用: 这是一段引用
```

**加粗**
``` markdown
**加粗**
```

*斜体*
``` markdown
*斜体*
```

~~删除线~~
``` markdown
~~删除线~~
```

---

[链接：以百度为例](https://www.baidu.com)
``` markdown
[链接：以百度为例](https://www.baidu.com)
```

文档内链接：[标题1](#一级标题)
``` markdown
文档内链接：[标题1](#一级标题)
```

---
这里的公式其实不是markdown的一部分，它是另一种叫[LaTeX](https://latex-project.org/)的语言

但因为绝大多数Markdown的编辑器解析器都能支持，而且用的也比较多，所以一起写在这里了

数学公式块:

$$
\begin{aligned}
\frac{1}{2} + \frac{1}{3} = \frac{5}{6}
\end{aligned}
$$
``` markdown
$$
\begin{aligned}
\frac{1}{2} + \frac{1}{3} = \frac{5}{6}
\end{aligned}
$$
```

行内公式: $a^2 + b^2 = c^2$
``` markdown
行内公式: $a^2 + b^2 = c^2$
```

---

脚注:
这是一个脚注[^1]
这还是一个脚注[^2]

[^1]: 脚注内容11111111
[^2]: 脚注内容2222222

``` markdown
这是一个脚注[^1]
这还是一个脚注[^2]

[^1]: 脚注内容11111111
[^2]: 脚注内容2222222
```

---

图片:
![百度的logo](https://www.baidu.com/img/bd_logo1.png)
``` markdown
![百度的logo](https://www.baidu.com/img/bd_logo1.png)
```

---
