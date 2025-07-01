<script setup>
import { useRoute} from "vitepress"

const ua = window.navigator.userAgent.toLowerCase()

function detectBrowser() {
    if (ua.includes("micromessenger")) {
        return "微信"
    } else if (ua.includes(" qq") && !ua.includes("mqqbroser")) {
        return "QQ"
    }
    else {
        return "114514"
    }
}

function detectMobile() {
    return ua.includes("mobi") || ua.includes("android") || ua.includes("iphone")
}

const dir=useRoute().path
const browser = detectBrowser()
const mobile = detectMobile()
// if (dir !== "/") {
    if (browser) 
        /*while (1) */alert(`请不要使用${browser}访问\n建议使用电脑端的 Chrome 或 Firefox 或 Edge`)
    // else if (mobile) alert("建议使用电脑访问")
// }
</script>