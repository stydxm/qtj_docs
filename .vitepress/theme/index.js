import DefaultTheme from 'vitepress/theme-without-fonts'
import "@fontsource/jetbrains-mono"
import './custom-font.css'
import Qrcode from './components/Qrcode.vue'

// export default DefaultTheme
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Qrcode', Qrcode);
    }
}