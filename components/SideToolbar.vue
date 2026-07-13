<script lang="ts" setup>
const { arrivedState } = useScroll(window, { behavior: "smooth" });

function backToTop() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <div class="side-container hidden md:block">
    <el-popover
      placement="left"
      :offset="0"
      :show-arrow="false"
      width="auto"
      popper-style="background-color:#ffe256;padding-bottom:4px;"
    >
      <template #reference>
        <div class="mb-24 cursor-pointer pos-relative">
          <div
            class="absolute w-16 h-16 b-rd-full bg-#ed4a69 top-[-6px] right-[14px]"
          ></div>
          <img class="w-50 ma mb-4" src="/img/common/qrcode1-text.png" />
          <div class="color-#fff">{{ $t("sideToolbar.qrcode1Text") }}</div>
        </div>
      </template>
      <div class="flex gap-12">
        <div v-for="item in decryptData($t('sideToolbar.qrcode1List'))">
          <img class="w-110" :src="item.img" />
          <div class="text-center mt-4 text-12">{{ item.title }}</div>
        </div>
      </div>
    </el-popover>

    <el-popover
      placement="left"
      :offset="0"
      :show-arrow="false"
      width="auto"
      popper-style="background-color:#ffe256;padding-bottom:4px;min-width:100px;"
    >
      <template #reference>
        <div
          class="cursor-pointer relative"
          :class="!arrivedState.top ? 'mb-24' : ''"
        >
          <div
            class="absolute w-16 h-16 b-rd-full bg-#ed4a69 top-[-6px] right-[14px]"
          ></div>
          <img class="w-50 ma mb-4" src="/img/common/qrcode2-text.png" />
          <div class="color-#fff">{{ $t("sideToolbar.qrcode2Text") }}</div>
        </div>
      </template>
      <div class="flex gap-12">
        <div v-for="item in decryptData($t('sideToolbar.qrcode2List'))">
          <img class="w-110 ma" :src="item.img" />
          <div class="text-center mt-4 text-12">{{ item.title }}</div>
        </div>
      </div>
    </el-popover>

    <Transition>
      <div
        class="cursor-pointer"
        v-show="!arrivedState.top"
        @click.stop="backToTop"
      >
        <img class="w-36 ma mb-12" src="/img/common/back-to-top.png" />
        <div class="color-#fff text-16">
          {{ $t("sideToolbar.backToTopText") }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="less" scoped>
.side-container {
  background: #4a4a4a;
  border-radius: 8px 0 0 8px;
  width: 100px;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: height 0.2s ease-in-out;
  z-index: 101;
  padding: 16px 0px;
  text-align: center;
}
</style>
