<script lang="ts" setup>
useSeoMeta({
  title: '我的神奇网站',
  ogTitle: '我的神奇网站',
  description: '这是我的神奇网站，让我告诉你关于它的一切。',
  ogDescription: '这是我的神奇网站，让我告诉你关于它的一切。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
const {getI18nData} = useI18nData()
const {data: homeBanner} = await useFetch("/api/cms/banner", {
  params: {
    page_num: 1,
    page_size: 100,
    position: 2,
  },
})
const {data: pageWorks} = await useFetch("/api/cms/pageWorker")
</script>

<template>
  <div class="home">
    <div class="home-banner">
      <ElCarousel autoplay height="33vw">
        <img
            v-for="(item, index) in homeBanner.list"
            :src="getI18nData(item, 'image_url')"
        />
      </ElCarousel>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">
          {{ $t("pageData.home.module1.title") }}
        </div>
        <div class="description">
          {{ $t("pageData.home.module1.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="flex justify-between w-50% margin-auto gap-12">
          <div
              class="bg-#f1efe7 pa-24 rounded-8 w-32%"
              v-for="(item, index) in decryptData(
              $t('pageData.home.module1.dataList')
            )"
          >
            <span class="text-26 font-550" style="color: #5e4d00">{{
                item.number
              }}</span>
            <span>+</span> <span class="text-14">{{ item.name }}</span>
            <div class="text-12 mt-8 line-height-loose color-#666">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">
          {{ $t("pageData.home.module2.title") }}
        </div>
        <div class="sub-title">
          {{ $t("pageData.home.module2.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="grid grid-cols-6 gap-20 w-85%">
          <div v-for="(item, index) in pageWorks.list" :key="item.id">
            <div class="cursor-pointer">
              <img :src="item.image"/>
            </div>
            <div class="color-#333 font-600  text-18 mt-12">
              {{ item.name }}
            </div>
            <div
                class="color-#787878 text-13 text-ellipsis whitespace-nowrap overflow-hidden mt-8"
            >
              {{ getI18nData(item, "intro") }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex pa-6 flex-justify-center">
        <ElButton>查看全部</ElButton>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">
          {{ $t("pageData.home.module3.title") }}
        </div>
        <div class="sub-title">
          {{ $t("pageData.home.module3.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="w-50% pos-relative">
          <img
              class="pos-absolute w-50px left-50% top-50% -translate-x-50% -translate-y-50% cursor-pointer"
              src="/img/home/play-video.png"
          />
          <img :src="$t('pageData.home.module3.cover')"/>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">{{ $t("pageData.home.module4.title") }}</div>
        <div class="sub-title">
          {{ $t("pageData.home.module4.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="flex w-60% flex-items-start">
          <div class="w-30% mr-10%">
            <div class="mb-48 font-600 text-28 line-height-24">
              {{ $t("pageData.home.module4.subTitle") }}
            </div>
            <div class="text-13 line-height-normal">
              {{ $t("pageData.home.module4.subDescription") }}
            </div>
          </div>
          <div class="w-60% pos-relative">
            <img
                class="pos-absolute w-50px left-50% top-50% -translate-x-50% -translate-y-50% cursor-pointer"
                src="/img/home/play-video.png"
            />
            <img :src="$t('pageData.home.module4.cover')"/>
          </div>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">{{ $t("pageData.home.module5.title") }}</div>
        <div class="sub-title">
          {{ $t("pageData.home.module5.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="grid grid-cols-4 gap-16 w-70%">
          <div
              v-for="(item, index) in decryptData(
              $t('pageData.home.module5.dataList')
            )"
          >
            <div class="cursor-pointer bg-#f1efe7">
              <img :src="item.img"/>
            </div>
            <div
                class="color-#666 font-600 line-height-normal text-14 text-center mt-12"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header"></div>
      <div class="home-module-main">
        <img class="w-70%" :src="$t('pageData.home.module6.img')"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #faf8ef;
  box-sizing: border-box;
  padding-bottom: 88px;
}

.home-banner {
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}

.home-module {
  &-header {
    width: 50%;
    margin: 0 auto;
    margin-top: 128px;
    margin-bottom: 42px;

    .title {
      text-align: center;
      font-weight: 600;
      font-size: 32px;
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
      word-wrap: break-word;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 2;
      text-align: center;
      color: #666;
      letter-spacing: 1px;
      margin-top: 4px;
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
