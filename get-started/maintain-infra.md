# 维护基础设施
## 维护此文档
该文档基于vitepress构建，基于github和cloudflare pages部署

要维护此文档，请加入自托管git服务器上的`infra`组织，文档构建前的源文件位于`infra/qjt_docs`

请阅读[VitePress文档](https://vitepress.dev/zh/)，学习[Markdown](https://soc.ustc.edu.cn/Digital/lab0/markdown/)语法，编写内容后提交

::: tip 提示
左侧边栏配置文件位于`.vitepress/sidebar.ts`

顶部导航栏配置文件位于`.vitepress/config.mts`

确保可以读写[TypeScript](https://wangdoc.com/typescript/)后编辑（用到的语法非常简单，基本可以等同json格式）
:::

正常情况下，commit会被立即同步到[github仓库](https://github.com/stydxm/qtj_docs)，几分钟后由cloudflare pages构建并部署分发

::: info 信息
若不正常，请联系维护人查看构建日志
:::
