---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 钱塘蛟
  text: 技术文档
  tagline: 浙江理工大学robomaster战队
  image:
    src: ./logo.png
  actions:
    - theme: brand
      text: 开始➡️
      link: /get-started/
    - theme: alt
      text: 了解RoboMaster💻
      link: https://www.bilibili.com/video/BV14g4y1z7QC
    - theme: alt
      text: 常见问题❔
      link: /get-started/faq

features:
  - title: 算法组
    details: AI识别、环境感知、自主决策导航
  - title: 电控组
    details: 嵌入式算法编写和调试
  - title: 机械组
    details: 机器人机械结构设计及制造
  - title: 硬件组
    details: 电路板和线路的设计、制造和调试
---
<script setup>
  if (typeof window !== 'undefined') {
    window.location.href = '/get-started/faq/';
  }
</script>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #23AC3A 30%, #00B6E9);
}
</style>
