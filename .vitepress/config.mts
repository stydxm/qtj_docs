import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'
import {withMermaid} from 'vitepress-plugin-mermaid'
import { icons } from './icons'
import { sidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "浙理钱塘蛟",
  description: "浙江理工大学robomaster战队",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始', link: '/get-started/' },
      { text: '算法组', link: '/algorithm/' },
      { text: '电控组', link: '/control/' },
      { text: '机械组', link: '/mechanics/' }
    ],

    sidebar: sidebar,
    socialLinks: [
      { icon: { svg: icons['bilibili'] }, link: 'https://space.bilibili.com/1085023682' },
    ]
  },
  markdown: {
    config: md => {
      md.use(footnote)
    },
    math: true
  }
})

