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
                { text: '一些学习建议', link: '/algorithm/advices' },
                { text: '关于编程语言', link: '/algorithm/language' }
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
                    text: "Python", link: '/algorithm/python/', collapsed: true, items: [
                        { text: '基础语法', link: '/algorithm/python/syntax' },
                        { text: '标准库', link: '/algorithm/python/standard-library' },
                        { text: '第三方库', link: '/algorithm/python/3rd-packages' },
                        { text: '面向对象', link: '/algorithm/python/oop' }
                    ]
                },
                {
                    text: "C++", link: '/algorithm/cpp/', collapsed: true, items: [
                        { text: '基础语法和面向对象', link: '/algorithm/cpp/syntax' },
                        { text: 'CMake和第三方库', link: '/algorithm/cpp/cmake' }
                    ]
                },
                { text: 'OpenCV与传统图像识别', link: '/algorithm/opencv/', collapsed: true },
                {
                    text: '人工智能', link: '/algorithm/ai/', collapsed: true, items: [
                        { text: '神经网络介绍', link: '/algorithm/ai/networks' },
                        { text: '数据集及其标注', link: '/algorithm/ai/dataset' },
                        { text: 'yolo与目标检测', link: '/algorithm/ai/yolo' },
                        { text: '基于自有数据集训练模型', link: '/algorithm/ai/train' }
                    ]
                },
                { text: 'ROS', link: '/algorithm/ros/' },
                {
                    text: 'Docker与容器化技术', link: '/algorithm/docker/', collapsed: true, items: [
                        { text: '安装和使用', link: '/algorithm/docker/usage' },
                        { text: '构建镜像', link: '/algorithm/docker/build_image' }
                    ]
                }
            ]
        },
        {
            text: '其他', items: [
                { text: '开源项目整理', link: '/algorithm/open-sources' },
                { text: '与其他岗位协作需要的知识', link: '/algorithm/others' }
            ]
        },
        {
            text: '课后任务', link: '/algorithm/tasks/', items: [
                { text: '关于课后任务', link: '/algorithm/tasks/' },
                { text: '任务1', link: '/algorithm/tasks/1' },
                { text: '任务2', link: '/algorithm/tasks/2' },
                { text: '任务3', link: '/algorithm/tasks/3' },
                { text: '任务4', link: '/algorithm/tasks/4' },
                { text: '任务5', link: '/algorithm/tasks/5', },
                { text: '任务6', link: '/algorithm/tasks/6' }
            ]
        },
    ],
    '/mechanics/': [
        {
            text: '机械保姆级入门教学之普通话讲解建模仿真（隔壁村猫子看完都会了） ',
            items: [
                { text: '（一）前言', link: '/mechanics/（一）前言' },
                { text: '（二）软件安装', link: '/mechanics/（二）软件安装' },
                { text: '（三）软件使用', link: '/mechanics/（三）软件使用' },
                { text: '（四）选材培训', link: '/mechanics/（四）选材培训' },
                { text: '（五）打印机教程', link: '/mechanics/（五）打印机教程' }
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