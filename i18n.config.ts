import { convertArraysToStringsInObject } from "./utils"

let CnTextMap = convertArraysToStringsInObject({
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
        label: "QS排行榜",
        key: "/ranking",
      },
      {
        label: "留学攻略",
        key: "/strategy-for-studying-abroad",
      },
      {
        label: "我的申请",
        key: "/my/application-status",
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
    contactUs: [
      {
        label: "总邮箱",
        value: "contactus@uofferglobal.com",
      },
      {
        label: "客服/投诉",
        value: "customer.service@uofferglobal.com",
      },
      {
        label: "商务合作",
        value: "partnership@uofferglobal.com",
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
  sideToolbar: {
    qrcode1Text: '扫码咨询',
    qrcode1List: [
      {
        img: "/img/common/qrcode-1.png",
        title: "官方指定专家",
      },
      {
        img: "/img/common/qrcode-2.png",
        title: "有录订阅号",
      },
      {
        img: "/img/common/qrcode-3.png",
        title: "有录服务号",
      },
    ],
    qrcode2Text: '扫码下载',
    qrcode2List: [
      {
        img: "/img/common/qrcode-download.png",
        title: "扫码下载APP",
      },
    ],
    backToTopText: '顶部'
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
      secretaryLabel: "董秘",
      secretaryValue: "杨小姐",
      emailLabel: "邮箱",
      emailValue: "xxxxxxxxx",
      stockCodeLabel: "股票代码",
      stockCodeValue: "200032",
      video:
        "https://cdn-dev.ukuoffer.com/adminUploads/homePage/video/1a31a89c6a520334fe98dcc854a629d7.mp4",
    },
    ranking: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "排行榜",
        },
      ],
      universityLogo: "大学校徽",
      universityName: "大学名称",
    },
    course: {
      title: "课程列表",
      filter: {
        title: "过滤",
        levels: "课程类型",
        categories: "专业分类",
        locations: "位置",
        universities: "大学名称",
        starSchoolMonths: "入学时间",
        fees: "平均学费(每年)",
        other: "其他",
        ucasFeeStatus: "通过UCAS申请",
        ucasFeeDescription:
          "英国本科课程需通过UCAS申请，每人每年UCAS申请名额不得超过5个，部分UOFFER GLOBAL合作院校本科课程可以不通过UCAS申请。",
        paidStatus: "不需支付大学/UCAS申请费",
      },
      searchPlaceholder: "请输入课程名搜索",
      sortFieldList: [
        {
          label: "热门",
          value: 1,
        },
        {
          label: "QS大学排名",
          value: 2,
        },
        {
          label: "学费",
          value: 3,
        },
        {
          label: "单价从低到高",
          value: 4,
        },
        {
          label: "单价从高到低",
          value: 5,
        },
      ],
      tableHeader: {
        university: "大学",
        course: "课程",
        courseType: "课程类型",
        tuition: "学费",
        unitPrice: "单价",
      },
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "课程列表",
          path: "/course",
        },
      ],
    },
    courseDetail: {
      breadcrumbList: [
        {
          label: '首页',
          path: '/'
        },
        {
          label: "课程列表",
          path: "/course",
        }
      ],
      back: '返回',
      qsRanking: 'QS世界大学排名:',
      applicationServiceFee: '申请服务费',
      startEnterSchoolYear: '期待入学年份',
      startEnterSchoolMonth: '期待入学月份',

      addToBag: '加入书包',
      tip: '部分本科课程需通过UCAS申请，每人每年UCAS申请名额不得超过5个，详情请点击“我要咨询”联系您的客户经理。',
      module1: '/img/course-detail/module1.jpg',
      module2: {
        title: '申请文件',
        list: [
          {
            title: '护照信息页',
            desc: '',
            icon: '/img/course-detail/module2-1.png',
            bgImg: '/img/course-detail/module2-1-bg.png'
          },
          {
            title: '所有英国签证和BRP卡(如有)',
            desc: '',
            icon: '/img/course-detail/module2-2.png',
            bgImg: '/img/course-detail/module2-2-bg.png'
          },
          {
            title: '学历证书',
            desc: '毕业证书，学位证书，中英文对照的在读证明。',
            icon: '/img/course-detail/module2-3.png',
            bgImg: '/img/course-detail/module2-3-bg.png'
          },
          {
            title: '语言成绩',
            desc: '主要指雅思成绩单。',
            icon: '/img/course-detail/module2-4.png',
            bgImg: '/img/course-detail/module2-4-bg.png'
          },
          {
            title: '成绩单',
            desc: '申请时需提交前置所有成绩单，当前课程完成后补交最终完整成绩单。',
            icon: '/img/course-detail/module2-5.png',
            bgImg: '/img/course-detail/module2-5-bg.png'
          },
          {
            title: '个人陈述（PS）',
            desc: '申请人对自己情况的整体概述。',
            icon: '/img/course-detail/module2-6.png',
            bgImg: '/img/course-detail/module2-6-bg.png'
          },
          {
            title: '两封推荐信',
            desc: '学术推荐信为最佳，如有工作经验可提供工作或实习推荐信。',
            icon: '/img/course-detail/module2-7.png',
            bgImg: '/img/course-detail/module2-7-bg.png'
          },
          {
            title: '资格和获奖证书',
            desc: '申请人获得的较高水平的资质或奖励证明。',
            icon: '/img/course-detail/module2-8.png',
            bgImg: '/img/course-detail/module2-8-bg.png'
          },
          {
            title: '工作或实习证明',
            desc: '已经工作或参加过实习的申请人需要提供工作或实习证明。',
            icon: '/img/course-detail/module2-9.png',
            bgImg: '/img/course-detail/module2-9-bg.png'
          },
        ],
        tips: [
          '所有的申请材料都需要原件彩色扫描件。',
          '所有文件需为英文或中英文对照模式。',
          '以上材料并不是全部必须提供，具体以客户经理要求为准。'
        ]
      },
      module3: {
        title1: '服务项目',
        title2: '服务流程',
        bgImg: '/img/course-detail/module3.jpg'
      },
      module4: {
        title1: '服务简介',
        title2: '费用说明',
        subTitle2: '本商品采用线上一次性付款方式。',
        bgImg: '/img/course-detail/module4.jpg',
        tips: [
          {
            key: '申请服务费',
            value: '申请服务费是UOFFER GLOBAL有录网收取的申请服务费用，此费用适用于所有非合作院校，该费用入学后不予退还。'
          },
          {
            key: '大学申请费',
            value: '大学申请费是学校／UCAS收取的第三方费用，由有录网UOFFER GLOBAL代收后直接支付给学校。所有费用信息学校官网可查。'
          }
        ]
      }
    },
    university: {
      title: '大学列表',
      filter: {
        title: '筛选',
        locations: '位置',
        IELTS: '雅思最低要求',
        qsRanking: 'QS世界大学排名'
      },
      searchPlaceholder: '搜索',
      sortFieldList: [
        {
          label: "热门",
          value: 1,
        },
        {
          label: "QS大学排名",
          value: 2,
        }
      ],
      tableHeader: {
        schoolBadge: "大学校徽",
        university: "大学",
        qsRanking: "QS世界大学排名",
        satisfactionRate: "学生满意度",
      },
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "大学列表",
          path: "/university",
        },
      ],
    },
    universityDetail: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "大学列表",
          path: "/university",
        }
      ],
      tableHeader: {
        course: "课程",
        courseType: "课程类型",
        unitPrice: "单价",
      },
    },
    strategyForStudyingAbroad: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "留学攻略",
        },
      ],
    },
    showStrategy: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "留学攻略",
          path: "/strategy-for-studying-abroad",
        },
        {
          label: "文章详情",
        },
      ],
    },
    brandActivity: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "关于我们",
          path: "/about",
        },
        {
          label: "品牌活动详情",
        },
      ],
    },
    paperWorker: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "文书团队",
        },
      ],
    },
    bag: {
      breadcrumbList: [
        {
          label: "首页",
          path: "/",
        },
        {
          label: "我的书包",
        },
      ],
    },
    auth: {},
    my: {
      applicationStatus: {},
      applicationForm: {},
      applicationDocument: {},
      discountCoupons: {},
      orderList: {},
      consultant: {},
      showAccount: {}
    }
  },
  other: {
    seekingAdvice: {
      btnText: '我要咨询',
      dialogTitle: '扫一扫咨询客户经理',
      dialogSubTitle: '扫码咨询官方专家'
    },
  }
})

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "cn",
  messages: {
    cn: CnTextMap,
    en: CnTextMap,
  },
}))
