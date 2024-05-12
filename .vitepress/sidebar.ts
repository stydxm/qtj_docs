export const sidebar = {
    '/get-started/': [
        {
            text: '开始', items: [
                { text: '总览', link: '/get-started/' },
                { text: '如何学习', link: '/get-started/how-to-learn' },
                { text: '常见问题', link: '/get-started/faq' }
            ]
        },
        {
            text: '实验室网络资源', items: [
                { text: '网络', link: '/get-started/network' },
                { text: 'Git服务器', link: '/get-started/git' },
                { text: 'NAS', link: '/get-started/nas' }
            ]
        },
        {
            text: '各组通用内容', items: [
                { text: '相关QQ群', link: '/get-started/qq-group' },
                { text: '兵种介绍', link: '/get-started/robots' },
                { text: '学习Git', link: '/get-started/learn-git' },
                { text: '维护基础设施', link: '/get-started/maintain-infra' }
            ]
        }
    ],
    '/algorithm': [
        {
            text: '开始', items: [
                { text: '总览', link: '/algorithm/' },
                { text: '一些学习建议', link: '/algorithm/advices' }
            ]
        },
        {
            text: '课程内容', items: [
                {
                    text: 'Linux', link: '/algorithm/linux/', collapsed: true, items: [
                        { text: '安装虚拟机', link: '/algorithm/linux/install-vm' },
                        { text: 'Linux基础', link: '/algorithm/linux/basics' },
                        { text: '安装环境', link: '/algorithm/linux/setup-environment' },
                        { text: '使用SSH连接', link: '/algorithm/linux/ssh' }
                    ]
                },
                {
                    text: '编程语言', link: '/algorithm/language', items: [
                        {
                            text: "Python", collapsed: true, link: '/algorithm/python/', items: [
                                { text: '基础语法', link: '/algorithm/python/syntax' },
                                { text: '标准库', link: '/algorithm/python/standard-library' },
                                { text: '第三方库', link: '/algorithm/python/3rd-packages' }
                            ]
                        },
                        {
                            text: "C++", collapsed: true, link: '/algorithm/cpp/', items: [
                                { text: '基础语法和面向对象', link: '/algorithm/cpp/syntax' },
                                { text: '第三方库', link: '/algorithm/cpp/3rd-packages' }
                            ]
                        }]
                },

                { text: 'OpenCV', link: '/algorithm/opencv' },
            ]
        },
        {
            text: '课后任务', link: '/algorithm/tasks/', items: [
                { text: '关于课后任务', link: '/algorithm/tasks/' },
                {
                    text: '任务1', link: '/algorithm/tasks/1-1', collapsed: true, items: [
                        { text: '任务1-1（Linux下的Hello World）', link: '/algorithm/tasks/1-1' },
                        { text: '任务1-2（配置开发环境）', link: '/algorithm/tasks/1-2' }
                    ]
                },
                {
                    text: '任务2', link: '/algorithm/tasks/2-1', collapsed: true, items: [
                        { text: '任务2-1（原样输出）', link: '/algorithm/tasks/2-1' },
                        { text: '任务2-2（找出所有的水仙花数）', link: '/algorithm/tasks/2-2' },
                        { text: '任务2-3（分解质因数）', link: '/algorithm/tasks/2-3' }
                    ]
                },
                {
                    text: '任务3', link: '/algorithm/tasks/3-1', collapsed: true, items: [
                        { text: '任务3-1（导入）', link: '/algorithm/tasks/3-1' },
                        { text: '任务3-2（使用标准库）', link: '/algorithm/tasks/3-2' }
                    ]
                },
                {
                    text: '任务4', link: '/algorithm/tasks/4-1', collapsed: true, items: [
                        { text: '任务4-1（下载图片）', link: '/algorithm/tasks/4-1' },
                        { text: '任务4-2（格式转换）', link: '/algorithm/tasks/4-2' }
                    ]
                },
                {
                    text: '任务6', link: '/algorithm/tasks/4-1', collapsed: true, items: [
                        { text: '任务6-1（struct）', link: '/algorithm/tasks/6-1' },
                        { text: '任务6-2（格式转换）', link: '/algorithm/tasks/6-2' }
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
    '/hardware/': [
        {
            text: '硬件保姆级入门教学之普通话讲解电路板制作（隔壁村熊二看完都会了）',
            items: [
                { text: '（一）前言', link: '/hardware/' },
                { text: '（二）培训方案', link: '/hardware/（二）培训方案' }
            ]
        }
    ]
}