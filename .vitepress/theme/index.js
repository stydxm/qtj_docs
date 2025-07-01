import "@fontsource/jetbrains-mono"
import DefaultTheme from 'vitepress/theme-without-fonts'
import Qrcode from './components/Qrcode.vue'
import Bilibili from './components/Bilibili.vue'
import './custom-font.css'
import CustomLayout from './CustomLayout.vue'

export default {
    extends: DefaultTheme,
    Layout: CustomLayout,
    enhanceApp({ app }) {
        app.component('Qrcode', Qrcode);
        app.component('Bilibili', Bilibili);
    }
}