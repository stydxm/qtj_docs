import "@fontsource/jetbrains-mono"
import DefaultTheme from 'vitepress/theme-without-fonts'
import Qrcode from './components/Qrcode.vue'
import Bilibili from './components/Bilibili.vue'
import './custom-font.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Qrcode', Qrcode);
        app.component('Bilibili', Bilibili);
    }
}