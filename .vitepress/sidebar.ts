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
                { text: '各兵种介绍', link: '/get-started/robots' }
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
            text: '开始',
            items: [
                { text: '总览', link: '/control/' },
            ]
        }
    ],
    '/mechanics/': [
        {
            text: '开始',
            items: [
                { text: '总览', link: '/mechanics/' },
            ]
        }
    ],
}