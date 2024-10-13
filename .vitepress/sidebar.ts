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
            text: '实验室资源', items: [
                { text: '培训视频', link: '/get-started/record' },
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
                { text: 'Markdown语法', link: '/get-started/markdown' },
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
                        { text: '基础概念', link: '/algorithm/linux/' },
                        { text: '安装虚拟机', link: '/algorithm/linux/install-vm' },
                        { text: '系统配置', link: '/algorithm/linux/setup-environment' },
                        { text: 'Linux基础', link: '/algorithm/linux/basics' },
                        { text: '使用SSH连接', link: '/algorithm/linux/ssh' }
                    ]
                },
                {
                    text: "Python", link: '/algorithm/python/', collapsed: true, items: [
                        { text: '关于Python', link: '/algorithm/python/' },
                        { text: '基础语法', link: '/algorithm/python/syntax' },
                        { text: '面向对象', link: '/algorithm/python/oop' },
                        { text: '标准库', link: '/algorithm/python/standard-library' },
                        { text: '第三方库', link: '/algorithm/python/3rd-packages' }
                    ]
                },
                {
                    text: "C++", link: '/algorithm/cpp/', collapsed: true, items: [
                        { text: '关于C++', link: '/algorithm/cpp/' },
                        { text: '基础语法和面向对象', link: '/algorithm/cpp/syntax' },
                        { text: 'CMake和第三方库', link: '/algorithm/cpp/cmake' }
                    ]
                },
                {
                    text: 'CV与OpenCV', link: '/algorithm/opencv/', collapsed: true, items: [
                        { text: '计算机视觉', link: '/algorithm/opencv/' },
                        { text: '相机标定', link: '/algorithm/opencv/camera-calibration' },
                        { text: '常用函数', link: '/algorithm/opencv/usual-functions' },
                        { text: '形态学方法', link: '/algorithm/opencv/morphology' }
                    ]
                },
                {
                    text: '人工智能', link: '/algorithm/ai/', collapsed: true, items: [
                        { text: '基础概念', link: '/algorithm/ai/' },
                        { text: '机器学习', link: '/algorithm/ai/machine-learning' },
                        { text: '神经网络', link: '/algorithm/ai/neural-network' },
                        { text: '数据集及标注', link: '/algorithm/ai/dataset' },
                        { text: 'yolo与目标检测', link: '/algorithm/ai/yolo' },
                        { text: '训练模型', link: '/algorithm/ai/train' }
                    ]
                },
                {
                    text: 'ROS', link: '/algorithm/ros/', collapsed: true, items: [
                        { text: '关于ROS', link: '/algorithm/ros/' },
                        { text: '安装', link: '/algorithm/ros/install' },
                        { text: '基础概念', link: '/algorithm/ros/basics' },
                        { text: '实现节点', link: '/algorithm/ros/simple-node' }
                    ]
                },
                {
                    text: 'Docker与容器化技术', link: '/algorithm/docker/', collapsed: true, items: [
                        { text: '基础概念', link: '/algorithm/docker/' },
                        { text: '安装和使用', link: '/algorithm/docker/usage' },
                        { text: '构建镜像', link: '/algorithm/docker/build' }
                    ]
                }
            ]
        },
        {
            text: '其他', items: [
                { text: 'RM优质开源项目', link: '/algorithm/open-sources' },
                { text: '优秀学习资料', link: '/algorithm/resources' },
                { text: '与其他工种协作', link: '/algorithm/others' }
            ]
        },
        {
            text: '课后任务', link: '/algorithm/tasks/', items: [
                { text: '课后任务说明', link: '/algorithm/tasks/' },
                { text: '任务1', link: '/algorithm/tasks/1' },
                {
                    text: '任务2-5(Python)', link: '/algorithm/tasks/2', collapsed: true, items: [
                        { text: '任务2', link: '/algorithm/tasks/2' },
                        { text: '任务3', link: '/algorithm/tasks/3' },
                        { text: '任务4', link: '/algorithm/tasks/4' },
                        { text: '任务5', link: '/algorithm/tasks/5' }]
                }, {
                    text: '任务6-7(C++)', link: '/algorithm/tasks/6', collapsed: true, items: [
                        { text: '任务6', link: '/algorithm/tasks/6' },
                        { text: '任务7', link: '/algorithm/tasks/7' },]
                }, {
                    text: '任务8-9(CV)', link: '/algorithm/tasks/8', collapsed: true, items: [
                        { text: '任务8', link: '/algorithm/tasks/8' },
                        { text: '任务9', link: '/algorithm/tasks/9' },]
                }, { text: '提交复杂任务', link: '/algorithm/tasks/submit-complex' },
                {
                    text: '任务10-13(AI)', link: '/algorithm/tasks/10', collapsed: true, items: [
                        { text: '任务10', link: '/algorithm/tasks/10' },
                        { text: '任务11', link: '/algorithm/tasks/11' },
                        { text: '任务12', link: '/algorithm/tasks/12' },
                        { text: '任务13', link: '/algorithm/tasks/13' },]
                },
                {
                    text: '任务14(ros)', link: '/algorithm/tasks/14', collapsed: true, items: [
                        { text: '任务14', link: '/algorithm/tasks/14' },]
                },
            ]
        },
    ],
    '/senior-control/': [
        {
            items: [
                { text: 'Git', link: '/senior-control/git/' },
                { text: 'LQR', link: '/senior-control/lqr/' },
            ]
        }
    ],
    '/mechanics/': [
        {
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
    ]
}