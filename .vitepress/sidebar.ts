export const sidebar = {
    '/get-started/': [
        {
            text: '开始',
            items: [
                { text: '总览', link: '/get-started/' },
                { text: '如何学习', link: '/get-started/how-to-learn' },
                { text: '常见问题', link: '/get-started/faq' }
            ]
        },
        {
            text: '实验室网络资源',
            items: [
                { text: '网络', link: '/get-started/network' },
                { text: 'Git服务器', link: '/get-started/git' },
                { text: 'NAS', link: '/get-started/nas' }
            ]
        },
        {
            text: '各组通用内容',
            items: [
                { text: '相关QQ群', link: '/get-started/qq-group' },
                { text: '兵种介绍', link: '/get-started/robots' }
            ]
        }
    ],
    '/algorithm': [
        {
            text: '开始',
            items: [
                { text: '总览', link: '/algorithm/' },
                { text: '一些学习建议', link: '/algorithm/advices' }
            ]
        },
        {
            text: '课程内容',
            items: [
                {
                    text: 'Linux', link: '/algorithm/linux/', items: [
                        { text: '安装虚拟机', link: '/algorithm/linux/install-vm' },
                        { text: 'Linux基础', link: '/algorithm/linux/basics' },
                        { text: '安装环境', link: '/algorithm/linux/setup-environment' }
                    ]
                },
                {
                    text: '编程语言', link: '/algorithm/language',
                    // items: [
                    //     { text: "Python", link: '/algorithm/language/python' },
                    //     { text: "C++", link: '/algorithm/language/cpp' }]
                },
                { text: 'OpenCV', link: '/algorithm/opencv' },
            ]
        },
        {
            text: '课后任务',
            link: '/algorithm/tasks/',
            items: [
                {
                    text: '任务1', items: [
                        { text: '任务1-1', link: '/algorithm/tasks/1-1' },
                        { text: '任务1-2', link: '/algorithm/tasks/1-2' }
                    ]
                }
            ]
        },
    ],
    '/control/': [
        {
            text: '嵌入式保姆级入门教学之人话讲解C型板开发（隔壁村狗子看完都会了）',
            items: [
                { text: '（一）学习路线+课程概要+预备知识', link: '/control/（一）学习路线+课程概要+预备知识' },
                { text: '（二）软件安装+环境配置+新建工程一步到位', link: '/control/（二）软件安装+环境配置+新建工程一步到位' },
                { text: '（三）GPIO：学会点亮一个LED', link: '/control/（三）GPIO：学会点亮一个LED' },
                { text: '（四）EXTI：学会操控按钮', link: '/control/（四）EXTI：学会操控按钮' },
                { text: '（五）SysTic : HalDelay背后的原理', link: '/control/（五）SysTic HalDelay背后的原理' },
                { text: '（六）定时器及其中断：中断控制流水灯', link: '/control/（六）定时器及其中断：中断控制流水灯' },
            ]
        }
    ],
    '/mechanics/': [
        {
            text: '机械保姆级入门教学之普通话讲解建模仿真（隔壁村猫子看完都会了） ',
            items: [
                { text: '（一）前言', link: '/mechanics/（一）前言' },
                { text: '（二）软件安装', link: '/mechanics/（二）软件安装' },
                { text: '（三）软件使用', link: '/mechanics/（三）软件使用' },
                { text: '（四）选材培训', link: '/mechanics/（四）选材培训' }
            ]
        }
    ],
}