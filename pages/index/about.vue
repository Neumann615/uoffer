<script setup lang="ts">
const { getI18nData } = useI18nData();
const router = useRouter();
const { data: aboutBanner } = await useFetch("/api/ads/web/banners", {
  params: {
    page_size: 10,
    page_num: 1,
    category: 6,
    position: 6,
  },
});
const { data: storeBanner } = await useFetch(
  "/api/cms_store_display/web/list",
  {
    params: {
      page_size: 100,
      page_num: 1,
    },
  }
);
const storeBannerIndex = ref(0);

function storeBannerIndexChange(v: number) {
  storeBannerIndex.value = v;
}

const activityCategoryList = [
  {
    label: "官方合作",
    value: 1,
  },
  {
    label: "有录荣誉",
    value: 2,
  },
  {
    label: "国际教育精英合作",
    value: 3,
  },
];
const productServiceList = [
  {
    icon: "/img/about/module5-1.png",
    title: "留学申请业务",
    description:
      "有录网提供的留学申请范围包含英国、中国香港、中国澳门、加拿大、新加坡、爱尔兰、新西兰以及澳大利亚等区域，与全球诸多院校为合作关系。",
  },
  {
    icon: "/img/about/module5-2.png",
    title: "科研项目",
    description:
      "提供名校导师远程科研项目，项目采取小班线上教学制，顺利完成科研项目并完成答辩的同学均可获得项目导师撰写的推荐信，有效提升学术背景和证明海外研究性学习的科研适应能力。",
  },
  {
    icon: "/img/about/module5-3.png",
    title: "学术辅导业务",
    description:
      "提供全学科学霸师资一对一同步辅导，专业老师量身定制讲义，全场景课程辅导，后更有专属客户经理管家式的贴心服务保证辅导质量。",
  },
  {
    icon: "/img/about/module5-4.png",
    title: "名企实习",
    description:
      "有录网提供名企实习项目，国内外知名公司海量岗位选择，提升职业背景，助力留学申请。",
  },
];
const websiteAdvantages = [
  {
    icon: "/img/about/module6-1.png",
    title: "千所名校任选，获取结果更快",
  },
  {
    icon: "/img/about/module6-2.png",
    title: "申请流程全透明，一键查询申请进度",
  },
  {
    icon: "/img/about/module6-3.png",
    title: "中外文老师24小时轮替工作，速度快3倍",
  },
  {
    icon: "/img/about/module6-4.png",
    title: "专业客户经理1V1服务",
  },
  {
    icon: "/img/about/module6-5.png",
    title:
      "云数据整合379861份不同背景的成功案例，AI提取分析成功经验，提高录取率",
  },
];
const nowActivityCategory = ref(1);
const nowActivityPageNum = ref(1);
const activityData = ref({
  list: [],
  total: 0,
});
const { data: newsData } = await useFetch("/api/cms/activity/list", {
  params: {
    page_size: 500,
    category: 4,
  },
});

function getActivityData() {
  useFetch("/api/cms/activity/list", {
    params: {
      page_size: 6,
      category: nowActivityCategory.value,
      page_num: nowActivityPageNum.value,
    },
  }).then((res) => {
    activityData.value = res.data.value;
  });
}

function prevPageActivity() {
  nowActivityPageNum.value -= 1;
  getActivityData();
}

function nextPageActivity() {
  nowActivityPageNum.value += 1;
  getActivityData();
}

function toStudyAbroadGuide() {
  window.open("https://ucarecdn.com/9added83-d239-45be-87a5-7ecdf0b007de/");
}

function toBrandActivityDetail(id: string | number) {
  router.push({
    path: "/brand-activity/" + id,
  });
}

watch(
  () => nowActivityCategory.value,
  () => {
    nowActivityPageNum.value = 1;
    getActivityData();
  },
  { immediate: true }
);
</script>

<template>
  <div class="about">
    <div class="mt-80 mb-100">
      <ElCarousel autoplay height="420px">
        <ElCarouselItem v-for="item in aboutBanner.list">
          <img :src="getI18nData(item, 'image_url')" />
        </ElCarouselItem>
      </ElCarousel>
    </div>
    <div class="about-brand mb-60">
      <div class="header">
        <div class="title">品牌活动</div>
      </div>
      <div class="flex gap-12 mb-30">
        <div
          @click="nowActivityCategory = item.value"
          class="py-12 px-20 cursor-pointer b-rd-99"
          :class="
            nowActivityCategory === item.value
              ? 'bg-#1f1f1f color-#fff'
              : 'color-#4f4f4f'
          "
          v-for="(item, index) in activityCategoryList"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="content">
        <div class="main">
          <div class="list">
            <div
              class="list-item1"
              v-for="item in activityData.list"
              @click="toBrandActivityDetail(item.id)"
              :key="item.id"
            >
              <div class="cover"><img :src="item.media_url" /></div>
              <div class="article">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="pagination" v-show="activityData.total > 6">
            <ElButton
              @click="prevPageActivity"
              :disabled="nowActivityPageNum === 1"
            >
              上一页
            </ElButton>
            <ElButton
              @click="nextPageActivity"
              :disabled="nowActivityPageNum * 6 >= activityData.total"
            >
              下一页
            </ElButton>
          </div>
        </div>
        <div class="side">
          <div class="side-header">
            <div class="text-18">快速资讯</div>
          </div>
          <div class="side-wrap">
            <div
              class="side-wrap-item"
              v-for="item in newsData.list"
              @click="toBrandActivityDetail(item.id)"
              :key="item.id"
            >
              <div class="article">
                {{ item.title }}
              </div>
              <div class="cover">
                <img :src="item.media_url" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-80">
      <div class="title mb-40">门店展示</div>
      <ElCarousel
        type="card"
        :initial-index="storeBannerIndex"
        :autoplay="false"
        height="400px"
        indicator-position="none"
        @change="storeBannerIndexChange"
      >
        <ElCarouselItem v-for="(item, index) in storeBanner.list">
          <div class="w-full h-a">
            <div class="w-full" style="box-shadow: 0 0 25px 3px #d9d9d9">
              <img style="object-fit: cover" :src="item.media_url" />
            </div>
          </div>
        </ElCarouselItem>
      </ElCarousel>
      <div class="text-center mt-24">
        <div class="color-#333 font-bold mb-10 text-15">
          {{ storeBanner.list[storeBannerIndex].store_name }}
        </div>
        <div class="color-#666 text-13">
          {{ storeBanner.list[storeBannerIndex].store_address }}
        </div>
      </div>
    </div>
    <div class="mb-80">
      <div class="title mb-40">发展历程</div>
      <div class="text-center text-16px font-500 color-#333 line-height-24px">
        2019年，有录网UOFFER GLOBAL登录中国。
      </div>
      <img
        class="timeline-img"
        src="/img/about/module4.png"
      />
    </div>
    <div class="bg-#f9f9f9 ma h-auto mb-60px">
      <div class="pa-50px">
        <div class="title">产品与服务</div>
      </div>
      <div class="product-grid">
        <div
          class="product-card"
          v-for="(item, index) in productServiceList"
        >
          <div class="flex justify-center mt-40px">
            <img :src="item.icon" class="product-icon" />
          </div>
          <div class="mt-20px color-#1f1f1f text-18px font-600">
            {{ item.title }}
          </div>
          <div
            class="mt-40px ma product-desc"
          >
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-80px">
      <div class="title mb-40">网站优势</div>
      <div class="advantages-grid">
        <div
          v-for="(item, index) in websiteAdvantages"
          :key="index"
          class="adv-card"
        >
          <div class="flex justify-center">
            <img class="w-60px h-60px" :src="item.icon" />
          </div>
          <div class="mt-24px text-center color-#333 text-13 md:text-14">
            {{ item.title }}
          </div>
        </div>
        <div class="adv-card cursor-pointer" @click="toStudyAbroadGuide">
          <div class="flex justify-center">
            <img class="w-60px h-60px" src="/img/about/module6-6.png" />
          </div>
          <div
            class="mt-24px text-center color-#333 underline hover:color-#ff9f00 text-13 md:text-14"
          >
            留学向导指南
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.title {
  width: 100%;
  word-wrap: break-word;
  color: #1f1f1f;
  font-family: PingFangSC-Semibold;
  font-size: 22px;
  font-weight: 600;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
  }
}

.about {
  width: auto;
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 12px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 24px;
  }

  :deep(.el-carousel__container) {
    height: 200px;

    @media (min-width: 768px) {
      height: 350px;
    }

    @media (min-width: 1024px) {
      height: 420px;
    }
  }

  &-brand {
    .header {
      align-items: center;
      display: flex;
      justify-content: center;
      margin-bottom: 32px;

      @media (min-width: 768px) {
        margin-bottom: 50px;
      }

      .title {
        font-size: 22px;
        font-weight: 600;
        line-height: 1;

        @media (min-width: 768px) {
          font-size: 32px;
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;

      @media (min-width: 1024px) {
        flex-direction: row;
      }

      .main {
        flex: 1;
        min-width: 0;

        .list {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;

          @media (min-width: 640px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          @media (min-width: 1024px) {
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          &-item1 {
            cursor: pointer;
            .cover {
              background: #fff;
              height: 160px;
              position: relative;
              width: 100%;
              border-radius: 4px;
              overflow: hidden;

              @media (min-width: 768px) {
                height: 200px;
              }

              img {
                object-fit: cover;
                width: 100%;
                height: 100%;
              }
            }

            .article {
              margin-top: 12px;
              color: #1f1f1f;
              display: -webkit-box;
              font-size: 14px;
              line-height: 22px;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              word-break: break-all;

              @media (min-width: 768px) {
                font-size: 16px;
                line-height: 24px;
              }
            }
            .article:hover {
              color: #ff9f00;
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
        padding: 0px 16px 12px 16px;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 0;
        margin-top: 24px;
        border-radius: 6px;
        overflow: hidden;
        max-height: 400px;

        @media (min-width: 1024px) {
          height: 602px;
          padding: 0px 30px 12px 30px;
          width: 356px;
          margin-left: 30px;
          margin-top: 0;
          max-height: none;
        }

        &-header {
          border-bottom: 1px solid #e2e1db;
          color: #1f1f1f;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 0;

          @media (min-width: 1024px) {
            font-size: 18px;
          }
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
            border-bottom: 1px solid #e2e1db;
            cursor: pointer;
            gap: 12px;

            @media (min-width: 1024px) {
              padding: 16px 0;
            }

            .article {
              flex: 1;
              min-width: 0;
              font-size: 13px;

              @media (min-width: 1024px) {
                width: 200px;
                font-size: 14px;
              }
            }

            .cover {
              background: #fff;
              height: 60px;
              position: relative;
              width: 60px;
              flex-shrink: 0;
              border-radius: 4px;
              overflow: hidden;

              @media (min-width: 1024px) {
                height: 72px;
                width: 72px;
              }

              img {
                height: 100%;
                object-fit: cover;
                width: 100%;
              }
            }
          }
          &-item:hover {
            color: #ff9f00;
          }
        }
      }
    }
  }
}

// Product & Services responsive grid
.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding: 0 16px 24px;
  box-sizing: border-box;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 24px 32px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 0 40px 40px;
  }
}

.product-card {
  background: #fff;
  border-radius: 12px;
  text-align: center;
  padding: 24px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
}

.product-icon {
  width: 36px;
  height: 36px;
}

.product-desc {
  max-width: 240px;
  color: #333;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 14px;
  }
}

// Website advantages responsive grid
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }
}

.adv-card {
  min-width: 0;
}

// Timeline image responsive
.timeline-img {
  width: 100%;
  max-width: 1400px;
  height: auto;
  margin: 10px auto 0;
  display: block;
}

// Store carousel responsive
:deep(.el-carousel__container) {
  @media (max-width: 767px) {
    height: 200px !important;
  }
}
</style>
