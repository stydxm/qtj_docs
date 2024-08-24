import footnote from 'markdown-it-footnote'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { icons } from './icons'
import { sidebar } from './sidebar'
import taskCheckbox from 'markdown-it-task-checkbox'
// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "浙理钱塘蛟",
  description: "浙江理工大学robomaster战队",
  head: [
    ['meta', { property: 'og:type', href: 'website' }],
    ['meta', { property: 'og:title', href: '浙理钱塘蛟' }],
    ['meta', { property: 'og:description', href: '浙江理工大学 Robomaster 战队' }],
    ['meta', { property: 'og:img', href: 'https://docs.015609.best/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始', link: '/get-started/' },
      { text: '算法组', link: '/algorithm/' },
      { text: '电控组', link: 'https://nine-hunter-507.notion.site/STM32F4-ca420374c7b84e53b4dd2efc7f8bf295' },
      { text: '机械组', link: '/mechanics/（一）前言' },
      { text: '硬件组', link: '/hardware/' }
    ],
    outline: {
      label: "本页目录"
    },
    sidebar: sidebar,
    socialLinks: [
      { icon: { svg: icons['bilibili'] }, link: 'https://space.bilibili.com/1085023682' },
    ],
    notFound: {
      title: "找不到页面",
      quote: "检查你的链接，这里什么都没有捏",
      linkText: "返回首页"
    }
  },
  markdown: {
    config: md => {
      md.use(footnote)
      md.use(taskCheckbox)
    },
    math: true
  }
})

