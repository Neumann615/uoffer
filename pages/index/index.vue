<template>
  <div class="home">
    <div class="home-banner">
      <img src="/img/home/pic_person@2x.png"/>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">同样的成绩 送你进更好的名校</div>
        <div class="description">
          有录网，37万留学生及家长都在关注。为您提供英国、中国香港、中国澳门、新加坡、爱尔兰、新西兰以及澳大利亚的留学申请服务，作为全球学校和留学生联结的平台，有录网深知留学的不易与快乐。同样的成绩，送你进更好的名校，让留学专家为您提供独家服务。
        </div>
      </div>
      <div class="home-module-main">
        <div class="flex justify-between w-50% margin-auto gap-12">
          <div class="bg-#f1efe7 pa-6 rounded-xl" v-for="(item, index) in homeData.module1">
            <span class="text-8 font-550" style="color:#5e4d00">{{ item.number }}</span>
            <span>+</span> <span class="text-4">{{ item.key }}</span>
            <div class="text-3 line-height-loose color-#666">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">资深文书团队</div>
        <div class="sub-title">
          Native名校文书 帮你脱颖而出
        </div>
      </div>
      <div class="home-module-main">
        <div class="grid grid-cols-6 gap-4 w-85%">
          <div v-for="(item, index) in homeData.module2">
            <div class="cursor-pointer">
              <img :src="item.img">
            </div>
            <div class="color-#333 font-600 line-height-10 text-5">{{ item.name }}</div>
            <div class="color-#787878 text-3 text-ellipsis whitespace-nowrap overflow-hidden">{{
                item.description
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex pa-6 flex-justify-center">
        <NButton>查看全部</NButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {NButton} from "naive-ui"

const homeData = {
  'module1': [
    {
      number: 537,
      key: "合作大学",
      description: "我们与537+世界名校深度合作，专享独家绿色申请通道，针对学生量身定制赴全球顶尖名校就读的一站式留学解决方案，让你圆梦顶尖名校。"
    },
    {
      number: 27,
      key: "留学当地办公点",
      description: "在英国多所城市（如伯明翰、南安普顿、莱斯特、埃克塞特等）以及中国多所城市（如北京、上海、成都等）设立了27+留学当地门店/办公室，即使出国我们也能照顾得了你。"
    },
    {
      number: 391,
      key: "客户经理",
      description: "全球391+客户经理7X24小时服务，跨国团队无时差密切合作，给您从院校规划到签证申请再到留学生活中无微不至的关怀与照顾。"
    }
  ],
  "module2": [
    {
      name: "Simon K.",
      description: "剑桥大学教育学硕士，研究方向为艺术、创造力与教育",
      img: "/img/home/男1.jpg",
    }, {
      name: "Rebecca L.",
      description: "牛津大学应用语言学与第二语言习得硕士",
      img: "/img/home/女1.jpg",
    }, {
      name: "Raymond M.",
      description: "伦敦帝国理工学院数据科学硕士",
      img: "/img/home/男2.jpg",
    }, {
      name: "Robert S.",
      description: "伦敦政治经济学院社会政策系硕士",
      img: "/img/home/男3.jpg",
    }, {
      name: "Stuart D.",
      description: "伦敦大学学院空间分析与大数据挖掘硕士",
      img: "/img/home/男4.jpg",
    }, {
      name: "Alberta H.",
      description: "曼彻斯特大学知识产权法(LLM)硕士",
      img: "/img/home/男5.jpg",
    }, {
      name: "Dean S.",
      description: "新加坡国立大学电子工程硕士",
      img: "/img/home/男6.jpg",
    }, {
      name: "John P.",
      description: "南洋理工大学材料科学与工程硕士",
      img: "/img/home/男7.jpg",
    }, {
      name: "Mark L.",
      description: "香港大学社会科学硕士，研究方向为媒体、文化与创意城市",
      img: "/img/home/男8.jpg",
    }, {
      name: "Eileen W.",
      description: "香港中文大学文学硕士",
      img: "/img/home/女2.jpg",
    }, {
      name: "Samantha M.",
      description: "澳门科技大学刑事司法法学硕士",
      img: "/img/home/女3.jpg",
    }, {
      name: "Lucas W.",
      description: "悉尼大学国际关系硕士",
      img: "/img/home/男9.jpg",
    }, {
      name: "Jackson B.",
      description: "多伦多大学数字营销管理硕士",
      img: "/img/home/男10.jpg",
    }, {
      name: "Justin T.",
      description: "麦吉尔大学工商管理硕士",
      img: "/img/home/男11.jpg",
    }, {
      name: "Michael K.",
      description: "剑桥大学语言学博士",
      img: "/img/home/男12.jpg",
    }, {
      name: "Audrey G.",
      description: "爱丁堡大学创意产业博士",
      img: "/img/home/女4.jpg",
    }, {
      name: "Eva H.",
      description: "香港中文大学金融博士",
      img: "/img/home/女5.jpg",
    }, {
      name: "Adriana P.",
      description: "香港大学教育学博士",
      img: "/img/home/男13.jpg",
    }
  ]
}

</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #faf8ef;
  box-sizing: border-box;
  padding-bottom: 200px;
}

.home-banner {
  width: 100vw;

  img {
    width: 100%;
    height: 100%;
  }
}

.home-module {

  &-header {
    width: 50%;
    margin: 0 auto;
    margin-top: 36px;

    .title {
      text-align: center;
      font-weight: 600;
      font-size: 24px;
      white-space: pre-wrap;
    }

    .description {
      margin-top: 24px;
      word-wrap: break-word;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 2;
      text-align: justify;
      color: #666;
      letter-spacing: 1px;
    }

    .sub-title {
      margin-top: 24px;
      word-wrap: break-word;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 2;
      text-align: center;
      color: #666;
      letter-spacing: 1px;
    }
  }

  &-main {
    width: 100%;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

}
</style>