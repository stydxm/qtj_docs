<script setup>
import DefaultTheme from 'vitepress/theme'
import BrowserAlert from './components/BrowserAlert.vue';

const { Layout } = DefaultTheme
</script>

<template>
  <BrowserAlert />
  <Layout />
</template>