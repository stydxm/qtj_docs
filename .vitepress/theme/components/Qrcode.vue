<script setup>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { defineProps } from "vue"
const { content } = defineProps({
    content: {
        type: String,
        require: true
    }
})
</script>
<template>
    <vue-qrcode :value='`${content}`'></vue-qrcode>
</template>