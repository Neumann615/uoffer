<script setup lang="ts">
const chinaDepartmentList = [
  {
    title: "北京市",
    textList: ["朝阳区光华路5号", "世纪财富中心西塔9层910单元"],
    img: "/img/contact/china-1.png",
  },
  {
    title: "上海市",
    textList: ["浦东新区银城中路501号", "上海中心大厦29层"],
    img: "/img/contact/china-2.jpg",
  },
  {
    title: "中国香港",
    textList: ["香港旺角太子道西193号", "新世纪广场1座17楼"],
    img: "/img/contact/china-3.jpg",
  },
  {
    title: "广州市",
    textList: ["天河区体育东路140-148号", "南方证券大厦2803"],
    img: "/img/contact/china-4.jpeg",
  },
  {
    title: "成都市",
    textList: ["锦江区红星路三段1号", "国际金融中心一号办公楼25楼1"],
    img: "/img/contact/china-5.jpg",
  },
  {
    title: "湖北省武汉市",
    textList: ["洪山区珞喻路10号", "群光中心22楼2233"],
    img: "/img/contact/china-6.jpg",
  },
  {
    title: "杭州市",
    textList: ["杭州市拱墅区延安路468号", "外经贸广场B座8楼"],
    img: "/img/contact/china-7.jpg",
  },
  {
    title: "深圳市",
    textList: ["南山区蛇口太子路1号", "新时代广场3楼330-04室"],
    img: "/img/contact/china-8.png",
  },
];
const englandDepartmentList = [
  {
    title: "伯明翰 Birmingham",
    textList: ["86 Hurst Street", "Birmingham", "B5 4TD", "UK"],
    img: "/img/contact/england-1.png",
  },
  {
    title: "哈德斯菲尔德 Huddersfield",
    textList: ["33 Queensgate", "Huddersfield", "HD1 2RD", "UK"],
    img: "/img/contact/england-2.jpg",
  },
  {
    title: "莱斯特 Leicester",
    textList: ["56 London Road", "Leicester", "LE2 0QD", "UK"],
    img: "/img/contact/england-3.jpg",
  },
  {
    title: "考文垂 Coventry",
    textList: ["32 New Union Street", "Coventry", "CV1 2HN", "UK"],
    img: "/img/contact/england-4.jpg",
  },
  {
    title: "南安普敦 Southampton",
    textList: ["Unit 2", "144-149 High Street,", "Hampshire SO14 2BT", "UK"],
    img: "/img/contact/england-5.jpg",
  },
  {
    title: "埃克塞特 Exeter",
    textList: ["Unit 9", "The Depot", "EX1 2FW", "UK"],
    img: "/img/contact/england-6.jpg",
  },
  {
    title: "伦敦大学学院 UCL",
    textList: [
      "16 Upper Woburn Place",
      "London",
      "Greater London",
      "WC1H 0AF",
      "UK",
    ],
    img: "/img/contact/england-7.jpg",
  },
  {
    title: "伦敦国王学院 KCL",
    textList: [
      "LONDON",
      "STRAND Golden Cross House",
      "8 Duncannon Street",
      "London",
      "Greater London WC2N 4JF",
      "UK",
    ],
    img: "/img/contact/england-8.jpg",
  },
  {
    title: "伦敦艺术大学 UAL",
    textList: [
      "Vintage House, 36 - 37",
      "Albert Embankment",
      "London",
      "Greater London",
      "SE1 7TL",
      "UK",
    ],
    img: "/img/contact/england-9.jpg",
  },
  {
    title: "帝国理工学院 IC",
    textList: [
      "Building 3 Chiswick Park",
      "566 Chiswick High Street",
      "Greater London",
      "W4 5YA",
      "UK",
    ],
    img: "/img/contact/england-10.jpg",
  },
  {
    title: "剑桥 Cambridge",
    textList: [
      "Wellington House, East Road",
      "Cambridge",
      "Cambridgeshire",
      "CB1 1BH",
      "UK",
    ],
    img: "/img/contact/england-11.jpg",
  },
  {
    title: "牛津 Oxford",
    textList: [
      "John Eccles House",
      "Robert Robinson Avenue",
      "Oxford Science Park",
      "Oxford",
      "OX4 4GP",
      "UK",
    ],
    img: "/img/contact/england-12.jpg",
  },
  {
    title: "曼彻斯特 Manchester",
    textList: [
      "3 Hardman Street",
      "10th floor",
      "Spinningfields",
      "Manchester",
      "M3 3HF",
      "UK",
    ],
    img: "/img/contact/england-13.jpg",
  },
];

const companyDescList = [
  "我们公司自豪地拥有一支国际化的团队，其中大部分成员来自海外或毕业于海外知名院校。我们致力于构建一个多元文化的工作环境，以促进创新思维和全球视野。",
  "为了维护与海外大学的紧密合作关系，并确保我们的学生能够获得更好的录取机会，我们特别要求部分海外员工进行线下办公。这样的安排有助于我们更好地理解并满足国际教育市场的需求。",
  "对于其他员工，我们提供了灵活的工作模式，允许他们根据个人情况自由选择线下或远程办公。这种灵活的工作安排不仅提高了工作效率，也体现了我们对员工福祉的重视。",
  "我们理解客户可能需要面对面的咨询和交流。为此，我们提供了便捷的预约服务。如果您希望与我们的顾问老师进行面对面的会谈，请提前联系我们，我们将为您安排合适的时间和地点。",
  "我们承诺，无论您选择哪种沟通方式，都能享受到我们专业、高效的服务。感谢您对我们公司的信任与支持。",
];
</script>

<template>
  <div class="contact-page">
    <div class="line-height-loose">
      <div class="text-24px font-600">联系我们</div>
      <div>
        需要帮助？可查询我们的“常见问题”板块，如果你找不到你要查询的问题，请使用以下方式联系我们。
      </div>
      <div class="mb-8px">我们的客服团队将为您解答问题和提供建议:</div>
      <div class="flex" style="align-items: center">
        <img class="w-16px h-16px mr-9px" src="/img/contact/icon-phone.png" />
        <span>联系电话: 010-53689191</span>
      </div>
      <div class="flex" style="align-items: center">
        <img class="w-16px h-16px mr-9px" src="/img/contact/icon-email.png" />
        <span>总邮箱: contactus@uofferglobal.com</span>
      </div>
      <div class="pl-25px">
        客服/投诉邮箱: customer.service@uofferglobal.com
      </div>
      <div class="pl-25px">商务合作邮箱: partnership@uofferglobal.com</div>
      <div class="flex" style="align-items: center">
        <img class="w-16px h-16px mr-9px" src="/img/contact/icon-vx.png" />
        <span>扫描微信二维码添加好友, 即可联系我们</span>
      </div>
      <div class="pl-25px">
        <div class="flex gap-24px mt-12px">
          <div
            v-for="(item, index) in decryptData($t('sideToolbar.qrcode1List'))"
          >
            <img :src="item.img" class="w-130px h-130px" />
            <div class="text-center color-#666">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-50">
      <div class="text-24px font-600 mt-24px mb-24px">公司地址</div>
      <div class="text-20px font-600 mb-24px">中国总部地址:</div>
      <div class="flex justify-between mb-18px">
        <div>
          <div>{{ chinaDepartmentList[0].title }}</div>
          <div v-for="(item, index) in chinaDepartmentList[0].textList">
            {{ item }}
          </div>
        </div>
        <img class="contact-img" :src="chinaDepartmentList[0].img" />
      </div>
      <div class="text-20px font-600 mb-24px">中国分部地址:</div>
      <div
        v-for="(item, index) in chinaDepartmentList.slice(1)"
        class="flex justify-between mb-18px"
      >
        <div>
          <div>{{ item.title }}</div>
          <div v-for="(item1, index1) in item.textList">
            {{ item1 }}
          </div>
        </div>
        <img class="contact-img" :src="item.img" />
      </div>
      <div class="text-20px font-600 mb-24px">英国总部地址:</div>
      <div class="flex justify-between mb-18px">
        <div>
          <div>{{ englandDepartmentList[0].title }}</div>
          <div v-for="(item, index) in englandDepartmentList[0].textList">
            {{ item }}
          </div>
        </div>
        <img class="contact-img" :src="englandDepartmentList[0].img" />
      </div>
      <div class="text-20px font-600 mb-24px">英国分部地址:</div>
      <div
        v-for="(item, index) in englandDepartmentList.slice(1)"
        class="flex justify-between mb-18px"
      >
        <div>
          <div>{{ item.title }}</div>
          <div v-for="(item1, index1) in item.textList">
            {{ item1 }}
          </div>
        </div>
        <img class="contact-img" :src="item.img" />
      </div>
    </div>
    <div class="mt-40">
      <p
        class="color-#4a4a4a line-height-[1.5] mb-12 font-400"
        v-for="item in companyDescList"
      >
        {{ item }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
.contact-page {
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
  padding: 24px 16px 60px;
  color: #4a4a4a;

  @media (min-width: 768px) {
    padding: 40px 24px 80px;
    line-height: 1.8;
  }
}

.contact-img {
  width: 100%;
  max-width: 348px;
  height: auto;
  margin-top: 16px;

  @media (min-width: 768px) {
    width: 348px;
  }
}

// Department sections responsive
:deep(.flex.justify-between) {
  @media (max-width: 639px) {
    flex-direction: column;
  }
}
</style>
