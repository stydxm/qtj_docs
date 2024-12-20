<script setup>
import VueQrcode from '@chenfengyuan/vue-qrcode'
const { content } = defineProps({
    content: {
        type: String,
        require: true
    },
    size: {
        type: Number
    }
})
</script>
<template>
    <vue-qrcode :value='`${content}`' v-if="typeof size === 'undefined'"></vue-qrcode>
    <vue-qrcode :value='`${content}`' :options="{ width: size }" v-else></vue-qrcode>
</template>