import {convertArraysToStringsInObject} from "./utils"


export default defineI18nConfig(() => ({
    legacy: false,
    locale: "cn",
    messages: {
        cn: convertArraysToStringsInObject({
            header: {
                title: "有录网",
                menu: [
                    {
                        label: "首页",
                        key: "/",
                    },
                    {
                        label: "学校申请",
                        key: "/course",
                    },
                    {
                        label: "排行榜",
                        key: "/ranking",
                    },
                    {
                        label: "留学攻略",
                        key: "/strategy-for-studying-abroad",
                    },
                    {
                        label: "我的申请",
                        key: "/application-status",
                    },
                    {
                        label: "投资者关系",
                        key: "/investor-relations",
                    },
                    {
                        label: "关于我们",
                        key: "/about",
                    },
                    {
                        label: "联系我们",
                        key: "/contact",
                    },
                ],
            },
            footer: {
                linkList: [
                    {
                        img: "/img/home/internet.png",
                        text: "www.uofferglobal.co.uk",
                        link: "https://www.uofferglobal.co.uk",
                    },
                    {
                        img: "/img/home/internet.png",
                        text: "www.uofferglobal.com",
                        link: "https://www.uofferglobal.com",
                    },
                    {
                        img: "/img/home/email.png",
                        text: "info@ukuoffer.co.uk",
                        link: "mailto:info@ukuoffer.co.uk",
                    },
                ],
                customerService: {
                    title: "客户服务",
                    dataList: [
                        {
                            text: "关于我们",
                            link: "/about",
                        },
                        {
                            text: "联系我们",
                            link: "/contact",
                        },
                        {
                            text: "常见问题",
                            link: "/faq",
                        },
                    ],
                },
                currencyAndLanguage: {
                    title: "货币和语言",
                    text: "💰中国人民币，中文",
                },
                courseClassification: {
                    title: "课程分类",
                    dataList: [
                        {
                            text: "大学预科",
                            level: 1,
                        },
                        {
                            text: "本科",
                            level: 2,
                        },
                        {
                            text: "硕士预科",
                            level: 3,
                        },
                        {
                            text: "硕士",
                            level: 4,
                        },
                    ],
                },
                qrCodeList: [
                    {
                        text: "官方指定专家",
                        img: "/img/home/footer-qr1.png",
                    },
                    {
                        text: "有录订阅号",
                        img: "/img/home/footer-qr2.png",
                    },
                    {
                        text: "有录服务号",
                        img: "/img/home/footer-qr3.png",
                    },
                ],
                baseInfo: {
                    title: "有录网",
                    img: "/img/home/ucas.jpg",
                    copyrightList: [
                        "Copyright © 2017 W L HILLSIDE INVESTMENT LIMITED All rights reserved",
                        "W L HILLSIDE INVESTMENT LIMITED registered in England Wales under the company registration number 10744397.",
                        "Registered office address: 31 Hurst Street, Birmingham B5 4BD",
                    ],
                    address:
                        " 远方有录教育咨询（北京）股份有限公司 ｜ 北京市朝阳区光华路5号世纪财富中心西塔9层910单元｜010-53689191",
                },
                article: [
                    {
                        text: "隐私政策",
                        link: "/privacy",
                    },
                    {
                        text: "服务条款",
                        link: "/terms",
                    },
                    {
                        text: "退款政策",
                        link: "/refund",
                    },
                    {
                        text: "交付政策",
                        link: "/deliver",
                    },
                ],
            },
            pageData: {
                home: {
                    module1: {
                        title: "同样的成绩 送你进更好的名校",
                        description:
                            "有录网，37万留学生及家长都在关注。为您提供英国、中国香港、中国澳门、新加坡、爱尔兰、新西兰以及澳大利亚的留学申请服务，作为全球学校和留学生联结的平台，有录网深知留学的不易与快乐。同样的成绩，送你进更好的名校，让留学专家为您提供独家服务。",
                        dataList: [
                            {
                                number: 537,
                                name: "合作大学",
                                description:
                                    "我们与537+世界名校深度合作，专享独家绿色申请通道，针对学生量身定制赴全球顶尖名校就读的一站式留学解决方案，让你圆梦顶尖名校。",
                            },
                            {
                                number: 27,
                                name: "留学当地办公点",
                                description:
                                    "在英国多所城市（如伯明翰、南安普顿、莱斯特、埃克塞特等）以及中国多所城市（如北京、上海、成都等）设立了27+留学当地门店/办公室，即使出国我们也能照顾得了你。",
                            },
                            {
                                number: 391,
                                name: "客户经理",
                                description:
                                    "全球391+客户经理7X24小时服务，跨国团队无时差密切合作，给您从院校规划到签证申请再到留学生活中无微不至的关怀与照顾。",
                            },
                        ],
                    },
                    module2: {
                        title: "资深文书团队",
                        description: "Native名校文书 帮你脱颖而出",
                        buttonText: "查看更多",
                    },
                    module3: {
                        title: "学生专访",
                        description: "你也能和他们一样 进入更好的名校",
                        cover: "/img/home/cover.png",
                        videoSource: "",
                    },
                    module4: {
                        title: "关于有录网",
                        description: "同样的成绩 送你进更好的名校",
                        subTitle: "关于有录网",
                        subDescription:
                            "有录网多年来一直秉承着“同样的成绩，送你进更好的名校”理念深耕留学，不仅旨在帮助学生顺利进入名校，更注重帮助大家获得一个更美好的留学生活和未来。",
                        cover: "/img/home/cover2.png",
                        videoSource: "",
                    },
                    module5: {
                        title: "资质",
                        description: "国内外权威官方认证 为你解除后顾之忧",
                        dataList: [
                            {
                                img: "/img/home/zz1.png",
                                text: "泰晤士高等教育奖",
                            },
                            {
                                img: "/img/home/zz2.png",
                                text: "英国英语协会官方认证",
                            },
                            {
                                img: "/img/home/zz3.png",
                                text: "英国口笔译协会认证",
                            },
                            {
                                img: "/img/home/zz4.png",
                                text: "英国剑桥教育集团官方认证",
                            },
                            {
                                img: "/img/home/zz5.png",
                                text: "中央广播电视总台国际在线“2023年度品牌知名度出国留学机构”",
                            },
                            {
                                img: "/img/home/zz6.png",
                                text: "UCAS(英国大学招生中心)注册中心",
                            },
                            {
                                img: "/img/home/zz7.png",
                                text: "北新板挂牌企业",
                            },
                            {
                                img: "/img/home/zz8.png",
                                text:
                                    "腾讯教育2021年度影响力留学服务品牌" +
                                    "\n" +
                                    "腾讯教育2022年度影响力国际教育品牌",
                            },
                            {
                                img: "/img/home/zz9.png",
                                text: "英中贸易协会成员",
                            },
                            {
                                img: "/img/home/zz10.png",
                                text: "搜狐2023年度影响力国际教育品牌",
                            },
                            {
                                img: "/img/home/zz11.png",
                                text: "2024Pie先锋奖",
                            },
                            {
                                img: "/img/home/zz12.png",
                                text: "英国信息专员办公室会员",
                            },
                        ],
                    },
                    module6: {
                        img: "/img/home/home_module7.jpg",
                    },
                },
                investorRelations: {
                    title: "联系投资者关系",
                    secretaryLabel: '董秘',
                    secretaryValue: '杨小姐',
                    emailLabel: '邮箱',
                    emailValue: 'xxxxxxxxx',
                    stockCodeLabel: '股票代码',
                    stockCodeValue: '200032',
                    video: 'https://cdn-dev.ukuoffer.com/adminUploads/homePage/video/1a31a89c6a520334fe98dcc854a629d7.mp4'
                },
                ranking: {
                    breadcrumbList: [
                        {
                            label: '首页',
                            path: '/'
                        },
                        {
                            label: '排行榜'
                        }
                    ],
                    universityLogo: "大学校徽",
                    universityName: "大学名称",
                },
                strategyForStudyingAbroad: {
                    breadcrumbList: [
                        {
                            label: '首页',
                            path: '/'
                        },
                        {
                            label: '留学攻略'
                        }
                    ],
                }
            },
        })
    },
}))
