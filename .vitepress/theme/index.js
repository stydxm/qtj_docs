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

const ua = window.navigator.userAgent.toLowerCase()

function detectBrowser() {
    if (ua.includes("micromessenger")) {
        return "微信"
    } else if (ua.includes(" qq") && !ua.includes("mqqbroser")) {
        return "QQ"
    }
    else {
        return
    }
}

function detectMobile() {
    return ua.includes("mobi") || ua.includes("android") || ua.includes("iphone")
}

const dir = window.location.href.toString().split(window.location.host)[1]
const browser = detectBrowser()
const mobile = detectMobile()
if (dir !== "/") {
    if (browser) alert(`请不要使用${browser}访问\n建议使用电脑端的chrome或firefox或edge`)
    else if (mobile) alert("建议使用电脑访问")
} else {
    alert(dir)
}