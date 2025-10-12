# 维护基础设施

此页面写给未来维护这个文档的学弟学妹们，如有问题还可以联系我

## 维护此文档
该文档基于 vitepress 构建，基于 github 和 cloudflare pages 部署

要维护此文档，请加入自托管 git 服务器上的`infra`组织，文档构建前的源文件位于`infra/qjt_docs`

请阅读[VitePress 文档](https://vitepress.dev/zh/)，学习[Markdown](/get-started/markdown)语法，编写内容后提交

如果不动导航栏、自定义内容等，只是改 md 的内容的话，直接编辑好提交到 git 服务器即可

::: tip 提示
左侧边栏配置文件位于`.vitepress/sidebar.ts`

顶部导航栏配置文件位于`.vitepress/config.mts`

确保可以读写[TypeScript](https://wangdoc.com/typescript/)后编辑，最好再有一些前端知识
:::

正常情况下，commit 会被立即同步到[github 仓库](https://github.com/stydxm/qtj_docs)，几分钟后由 cloudflare pages 构建并部署分发

::: info 信息
在[GitHub commits 里](https://github.com/stydxm/qtj_docs/commits/)可以看每个 commit 的构建状态，正常的是绿色的勾，仍在构建中的是黄色的圆，错误的是红色的叉

若本地可构建通过但在服务器上无法部署，请联系维护人查看构建日志
:::
