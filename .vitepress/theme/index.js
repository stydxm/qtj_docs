import "@fontsource/jetbrains-mono"
import DefaultTheme from 'vitepress/theme-without-fonts'
import Qrcode from './components/Qrcode.vue'
import './custom-font.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Qrcode', Qrcode);
    }
}