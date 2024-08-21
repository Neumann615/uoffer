<script setup lang="ts">
import {NButton} from "naive-ui"

const activityCategoryList = [
  {
    label: "官方合作",
    value: 1
  },
  {
    label: "有录荣誉",
    value: 2
  },
  {
    label: "国际教育精英合作",
    value: 3
  }
]
const productServiceList = [
  {
    icon: "/img/about/module5-1.png",
    title: "留学申请业务",
    description: "有录网提供的留学申请范围包含英国、中国香港、中国澳门、加拿大、新加坡、爱尔兰、新西兰以及澳大利亚等区域，与全球诸多院校为合作关系。",
  },
  {
    icon: "/img/about/module5-2.png",
    title: "科研项目",
    description: "提供名校导师远程科研项目，项目采取小班线上教学制，顺利完成科研项目并完成答辩的同学均可获得项目导师撰写的推荐信，有效提升学术背景和证明海外研究性学习的科研适应能力。",
  },
  {
    icon: "/img/about/module5-3.png",
    title: "学术辅导业务",
    description: "提供全学科学霸师资一对一同步辅导，专业老师量身定制讲义，全场景课程辅导，后更有专属客户经理管家式的贴心服务保证辅导质量。",
  },
  {
    icon: "/img/about/module5-4.png",
    title: "名企实习",
    description: "有录网提供名企实习项目，国内外知名公司海量岗位选择，提升职业背景，助力留学申请。",
  },
]
const websiteAdvantages = [
  {
    icon: "/img/about/module6-1.png",
    title: "千所名校任选，获取结果更快"
  },
  {
    icon: "/img/about/module6-2.png",
    title: "申请流程全透明，一键查询申请进度"
  },
  {
    icon: "/img/about/module6-3.png",
    title: "中外文老师24小时轮替工作，速度快3倍"
  },
  {
    icon: "/img/about/module6-4.png",
    title: "专业客户经理1V1服务"
  },
  {
    icon: "/img/about/module6-5.png",
    title: "云数据整合379861份不同背景的成功案例，AI提取分析成功经验，提高录取率"
  },
]

const nowActivityCategory = ref(1)
const nowActivityPageNum = ref(1)
const activityData = ref({
  list: [],
  total: 0
})
const {data: newsData} = await useFetch('/api/cms/activity/list', {
  params: {
    page_size: 500,
    category: 4
  }
})

function getActivityData() {
  useFetch('/api/cms/activity/list', {
    params: {
      page_size: 6,
      category: nowActivityCategory.value,
      page_num: nowActivityPageNum.value
    }
  }).then(res => {
    activityData.value = res.data.value
  })
}

function prevPageActivity() {
  nowActivityPageNum.value -= 1
  getActivityData()
}

function nextPageActivity() {
  nowActivityPageNum.value += 1
  getActivityData()
}

watch(() => nowActivityCategory.value, () => {
  nowActivityPageNum.value = 1
  getActivityData()
}, {immediate: true})

</script>

<template>
  <div class="about">
    <div class="about-header">
      <div class="header-inner">
        <div class="title">关于我们</div>
        <div class="desc">
          有录网，37万留学生及家长都在关注。为您提供英国、中国香港、中国澳门、新加坡、爱尔兰、新西兰以及澳大利亚的留学申请服务，作为全球学校和留学生联结的平台，有录网深知留学的不易与快乐。有录网是一家全球化的留学服务网站，其主要业务为留学申请，除此之外，在学术辅导、科研项目、文书撰写、住宿申请、签证指导、学位认证和名企实习这些领域都能够为需要的学生提供帮助，致力于为每一位学生拼搏一个更美好的留学生活和未来。
        </div>
      </div>
    </div>
    <div class="about-brand">
      <div class="header">
        <div class="title">品牌活动</div>
      </div>
      <div class="tags">
        <NButton strong type="primary" secondary
                 @click="nowActivityCategory=item.value"
                 v-for="(item,index) in activityCategoryList">
          {{ item.label }}
        </NButton>
      </div>
      <div class="content">
        <div class="main">
          <div class="list">
            <div class="list-item1" v-for="(item,index) in activityData.list" :key="item.id">
              <div class="cover"><img :src="item.media_url"></div>
              <div class="article">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="pagination" v-show="activityData.total > 6">
            <NButton @click="prevPageActivity" :disabled="nowActivityPageNum===1">
              上一页
            </NButton>
            <NButton @click="nextPageActivity" :disabled="nowActivityPageNum*6>=activityData.total">
              下一页
            </NButton>
          </div>
        </div>
        <div class="side">
          <div class="side-header">
            <div class="title">快速资讯</div>
          </div>
          <div class="side-wrap">
            <div class="side-wrap-item" v-for="(item,index) in newsData.list" :key="item.id">
              <div class="article">
                {{ item.title }}
              </div>
              <div class="cover">
                <img :src="item.media_url">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-module mb-60px">
      <div class="about-module-title mb-40px">网站简介</div>
      <div class="w-1400px ma flex bg-#f9f9f9">
        <div class="w-520px h-340px" :style="{
          backgroundImage: `url(/img/about/module3.png)`
        }">
        </div>
        <div class="flex flex-col mt-70px mr-0 mb-0 ml-120px w-583px">
          <span class="w-583px break-words color-#333 text-14px font-400 line-height-24px text-align-justify">有录网，依托过往申请案例的云数据库，将案例信息标准化处理，根据申请课程类型和申请人背景，将案例分类详情展示，案例页面设“一键多申”功能，学生可以一键申请该成功案例里相关课程。</span>
          <span class="w-583px break-words color-#333 text-14px font-400 line-height-24px text-align-justify mt-20px">有录网给用户配备专用申请账户，可实时查询每个申请状态信息，从申请递交、获得Conditional Offer、换取/获得Unconditional Offer 到 换取/获得CAS皆精准到秒。整个申请流程可查。学生可以及时询问申请进度，申请状态一旦有任何变更，有录网人工智能系统会及时发送申请状态变更提醒邮件给学生，以便学生及时获知信息，采取行动。</span>
        </div>
      </div>
    </div>
    <div class="about-module mb-80px">
      <div class="about-module-title mb-40px">发展历程</div>
      <div class="text-center text-16px font-500 color-#333 line-height-24px">
        2019年，有录网UOFFER GLOBAL登录中国。
      </div>
      <img class="w-1400px height-340px m-a mt-10px" src="/img/about/module4.png"/>
    </div>
    <div class="about-module w-1400px bg-#f9f9f9 ma h-auto mb-60px">
      <div class="pa-50px">
        <div class="about-module-title">产品与服务</div>
      </div>
      <div class="flex justify-between pl-40px pr-40px pb-40px box-border">
        <div class="w-300px h-300px text-center bg-#fff rd-xl" v-for="(item,index) in productServiceList">
          <div class="flex justify-center mt-40px">
            <img :src="item.icon" class="w-36px h-36px"/>
          </div>
          <div class="mt-20px color-#1f1f1f text-18px font-600">
            {{ item.title }}
          </div>
          <div class="mt-40px ma w-240px color-#333 text-14px font-400 text-center line-height-normal">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="about-module mb-60px">
      <div class="about-module-title mb-40px">网站优势</div>
      <div class="w-1400px ma flex justify-between">
        <div v-for="(item,index) in websiteAdvantages" :key="index" class="w-200px">
          <div class="flex justify-center">
            <img class="w-60px h-60px" :src="item.icon"/>
          </div>
          <div class="mt-24px text-center color-#333">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.about {
  &-header {
    margin-top: 80px;

    .header-inner {
      background-image: url(/img/about/header.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 420px;
      margin: 0 auto;
      padding-top: 110px;
      position: relative;
      width: 1400px;

      .title {
        color: #fff;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
        margin-left: 140px;
      }

      .desc {
        color: #fff;
        font-size: 14px;
        line-height: 24px;
        margin-left: 140px;
        margin-top: 40px;
        width: 656px;
      }
    }
  }

  &-brand {
    margin: 80px auto 80px;
    width: 1400px;

    .header {
      align-items: center;
      display: flex;
      justify-content: center;
      margin-bottom: 50px;

      .title {
        font-size: 32px;
        font-weight: 600;
        line-height: 1;
      }
    }

    .tags {
      align-items: center;
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
    }

    .content {
      display: flex;

      .main {
        flex: 1;
        width: 1px;

        .list {
          width: 100%;
          display: grid;
          grid-template-rows: repeat(2, 1fr); /* 定义2行，每行占用1/2的空间 */
          grid-template-columns: repeat(3, 1fr); /* 定义3列，每列占用相等的空间 */
          gap: 24px;

          &-item1 {
            .cover {
              background: #fff;
              height: 200px;
              position: relative;
              width: 100%;
              border-radius: 6px;
              overflow: hidden;

              img {
                -o-object-fit: cover;
                object-fit: cover;
                width: 100%;
                height: 100%;
              }
            }

            .article {
              margin-top: 12px;
              color: #1f1f1f;
              display: -webkit-box;
              font-size: 16px;
              font-weight: 500;
              line-height: 24px;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              word-break: break-all;
            }
          }
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
        }
      }

      .side {
        background-color: #f3f1ee;
        height: 602px;
        padding: 0px 30px 12px 30px;
        width: 356px;
        display: flex;
        flex-direction: column;
        margin-left: 24px;
        border-radius: 6px;
        overflow: hidden;

        &-header {
          border-bottom: 1px solid #e2e1db;
          color: #1f1f1f;
          font-size: 18px;
          font-weight: 500;
          padding: 12px 0;
        }

        &-wrap {
          flex: 1;
          height: 1px;
          overflow-y: auto;
          scrollbar-width: none;

          &-item {
            display: flex;
            box-sizing: border-box;
            padding: 12px 0;
            justify-content: space-between;

            .article {
              width: 200px;
            }

            .cover {
              background: #fff;
              height: 72px;
              position: relative;
              width: 72px;
              border-radius: 4px;
              overflow: hidden;

              img {
                height: 100%;
                object-fit: cover;
                width: 100%;
              }
            }
          }
        }
      }
    }
  }

  &-module {
    &-title {
      width: 100%;
      word-wrap: break-word;
      color: #1f1f1f;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      white-space: nowrap;
    }
  }
}

</style>