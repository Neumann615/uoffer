<template>
  <div class="home">
    <div class="home-banner">
      <img :src="decryptData($t('pageData.home.module1'))[0].img"/>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">{{ $t("pageData.home.module2.title") }}</div>
        <div class="description">
          {{ $t("pageData.home.module2.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="flex justify-between w-50% margin-auto gap-12">
          <div
              class="bg-#f1efe7 pa-6 rounded-xl"
              v-for="(item, index) in decryptData(
              $t('pageData.home.module2.dataList')
            )"
          >
            <span class="text-8 font-550" style="color: #5e4d00">{{
                item.number
              }}</span>
            <span>+</span> <span class="text-4">{{ item.name }}</span>
            <div class="text-3 line-height-loose color-#666">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">{{ $t("pageData.home.module3.title") }}</div>
        <div class="sub-title">
          {{ $t("pageData.home.module3.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="grid grid-cols-6 gap-4 w-85%">
          <div
              v-for="(item, index) in decryptData(
              $t('pageData.home.module3.dataList')
            )"
          >
            <div class="cursor-pointer">
              <img :src="item.img"/>
            </div>
            <div class="color-#333 font-600 line-height-10 text-5">
              {{ item.name }}
            </div>
            <div
                class="color-#787878 text-3 text-ellipsis whitespace-nowrap overflow-hidden"
            >
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex pa-6 flex-justify-center">
        <NButton>查看全部</NButton>
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
        <div class="w-50% pos-relative">
          <img
              class="pos-absolute left-50% top-50% -translate-x-50% -translate-y-50% cursor-pointer"
              src="/img/home/play-video.png"
          />
          <img :src="$t('pageData.home.module4.cover')"/>
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
        <div class="flex w-60%">
          <div class="w-30% mr-10%">
            <div class="mb-4 font-600 text-6 line-height-24">
              {{ $t("pageData.home.module5.subTitle") }}
            </div>
            <div class="text-3">
              {{ $t("pageData.home.module5.subDescription") }}
            </div>
          </div>
          <div class="w-60% pos-relative">
            <img
                class="pos-absolute left-50% top-50% -translate-x-50% -translate-y-50% cursor-pointer"
                src="/img/home/play-video.png"
            />
            <img :src="$t('pageData.home.module5.cover')"/>
          </div>
        </div>
      </div>
    </div>
    <div class="home-module">
      <div class="home-module-header">
        <div class="title">{{ $t("pageData.home.module6.title") }}</div>
        <div class="sub-title">
          {{ $t("pageData.home.module6.description") }}
        </div>
      </div>
      <div class="home-module-main">
        <div class="grid grid-cols-4 gap-6 w-70%">
          <div
              v-for="(item, index) in decryptData(
              $t('pageData.home.module6.dataList')
            )"
          >
            <div class="cursor-pointer bg-#f1efe7">
              <img :src="item.img"/>
            </div>
            <div
                class="color-#666 font-600 line-height-5 text-3.8 text-center mt-3"
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
        <img class="w-70%" :src="$t('pageData.home.module7.img')">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {decryptData} from "#imports"
import {NButton} from "naive-ui"
</script>

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
    margin-bottom: 28px;

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
