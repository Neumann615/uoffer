<script setup lang="ts">
const qrcodeList = [
  {
    img: "/img/contact/qrcode-1.png",
    title: "官方指定专家"
  },
  {
    img: "/img/contact/qrcode-2.png",
    title: "有录订阅号"
  },
  {
    img: "/img/contact/qrcode-3.png",
    title: "有录服务号"
  }
]
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
]
const englandDepartmentList = [
  {
    title: "伯明翰 Birmingham",
    textList: ["86 Hurst Street", "Birmingham", "B5 4TD", "UK"],
    img: "/img/contact/england-1.png",
  },
  {
    title: "哈德斯菲尔德 Huddersfield",
    textList: ["33 Queensgate",
      "Huddersfield",
      "HD1 2RD",
      "UK"],
    img: "/img/contact/england-2.jpg",
  },
  {
    title: "莱斯特 Leicester",
    textList: ["56 London Road",
      "Leicester",
      "LE2 0QD",
      "UK"],
    img: "/img/contact/england-3.jpg",
  },
  {
    title: "考文垂 Coventry",
    textList: ["32 New Union Street",
      "Coventry",
      "CV1 2HN",
      "UK"],
    img: "/img/contact/england-4.jpg",
  },
  {
    title: "南安普敦 Southampton",
    textList: ["Unit 2",
      "144-149 High Street,",
      "Hampshire SO14 2BT",
      "UK"],
    img: "/img/contact/england-5.jpg",
  },
  {
    title: "埃克塞特 Exeter",
    textList: ["Unit 9",
      "The Depot",
      "EX1 2FW",
      "UK"],
    img: "/img/contact/england-6.jpg",
  },
  {
    title: "伦敦大学学院 UCL",
    textList: ["16 Upper Woburn Place",
      "London",
      "Greater London",
      "WC1H 0AF",
      "UK"],
    img: "/img/contact/england-7.jpg",
  },
  {
    title: "伦敦国王学院 KCL",
    textList: ["LONDON",
      "STRAND Golden Cross House",
      "8 Duncannon Street",
      "London",
      "Greater London WC2N 4JF",
      "UK"],
    img: "/img/contact/england-8.jpg",
  },
  {
    title: "伦敦艺术大学 UAL",
    textList: ["Vintage House, 36 - 37",
      "Albert Embankment",
      "London",
      "Greater London",
      "SE1 7TL",
      "UK"],
    img: "/img/contact/england-9.jpg",
  },
  {
    title: "帝国理工学院 IC",
    textList: ["Building 3 Chiswick Park",
      "566 Chiswick High Street",
      "Greater London",
      "W4 5YA",
      "UK"],
    img: "/img/contact/england-10.jpg",
  },
  {
    title: "剑桥 Cambridge",
    textList: ["Wellington House, East Road",
      "Cambridge",
      "Cambridgeshire",
      "CB1 1BH",
      "UK"],
    img: "/img/contact/england-11.jpg",
  },
  {
    title: "牛津 Oxford",
    textList: ["John Eccles House",
      "Robert Robinson Avenue",
      "Oxford Science Park",
      "Oxford",
      "OX4 4GP",
      "UK"],
    img: "/img/contact/england-12.jpg",
  },
  {
    title: "曼彻斯特 Manchester",
    textList: ["3 Hardman Street",
      "10th floor",
      "Spinningfields",
      "Manchester",
      "M3 3HF",
      "UK"],
    img: "/img/contact/england-13.jpg",
  }
]
</script>

<template>
  <div class="max-w-850px ma line-height-normal pt-40px">
    <div class="pl-50px pr-50px text-14px line-height-loose">
      <div class="text-24px font-600">联系我们</div>
      <div>需要帮助？可查询我们的“常见问题”板块，如果你找不到你要查询的问题，请使用以下方式联系我们。</div>
      <div class="mb-8px">我们的客服团队将为您解答问题和提供建议:</div>
      <div class="flex" style="align-items: center">
        <img class="w-16px h-16px mr-9px" src="/img/contact/icon-phone.png"/>
        <span>联系电话: 010-53689191</span>
      </div>
      <div class="flex" style="align-items: center">
        <img class="w-16px h-16px mr-9px" src="/img/contact/icon-email.png"/>
        <span>总邮箱: contactus@uofferglobal.com</span>
      </div>
      <div class="pl-25px">
        客服/投诉邮箱: customer.service@uofferglobal.com
      </div>
      <div class="pl-25px">
        商务合作邮箱: partnership@uofferglobal.com
      </div>
      <div class="flex" style="align-items: center">
        <img class="w-16px h-16px mr-9px" src="/img/contact/icon-vx.png"/>
        <span>扫描微信二维码添加好友, 即可联系我们</span>
      </div>
      <div class="pl-25px">
        <div class="flex gap-24px mt-12px">
          <div v-for="(item,index) in qrcodeList">
            <img :src="item.img" class="w-130px h-130px"/>
            <div class="text-center color-#666">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-50px pl-50px pr-50px">
      <div class="text-24px font-600 mt-24px mb-24px">公司地址</div>
      <div class="text-20px font-600 mb-24px">中国总部地址:</div>
      <div class="flex justify-between mb-18px">
        <div>
          <div>{{ chinaDepartmentList[0].title }}</div>
          <div v-for="(item,index) in chinaDepartmentList[0].textList">
            {{ item }}
          </div>
        </div>
        <img class="w-348px" :src="chinaDepartmentList[0].img"/>
      </div>
      <div class="text-20px font-600 mb-24px">中国分部地址:</div>
      <div v-for="(item,index) in chinaDepartmentList.slice(1)" class="flex justify-between mb-18px">
        <div>
          <div>{{ item.title }}</div>
          <div v-for="(item1,index1) in item.textList">
            {{ item1 }}
          </div>
        </div>
        <img class="w-348px" :src="item.img"/>
      </div>
      <div class="text-20px font-600 mb-24px">英国总部地址:</div>
      <div class="flex justify-between mb-18px">
        <div>
          <div>{{ englandDepartmentList[0].title }}</div>
          <div v-for="(item,index) in englandDepartmentList[0].textList">
            {{ item }}
          </div>
        </div>
        <img class="w-348px" :src="englandDepartmentList[0].img"/>
      </div>
      <div class="text-20px font-600 mb-24px">英国分部地址:</div>
      <div v-for="(item,index) in englandDepartmentList.slice(1)" class="flex justify-between mb-18px">
        <div>
          <div>{{ item.title }}</div>
          <div v-for="(item1,index1) in item.textList">
            {{ item1 }}
          </div>
        </div>
        <img class="w-348px" :src="item.img"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>