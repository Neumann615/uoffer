<script setup lang="ts">
import { decryptData, useRouter } from "#imports"
import { NButton } from "naive-ui"
const { locale, setLocale, t } = useI18n()
const menuList = decryptData(t("header.menu"))
const router = useRouter()
const route = useRoute()
const activeKey = ref(route.path)
const containerRef = ref(null)
const height = ref(103)

watch(
  () => activeKey.value,
  () => {
    console.log(route)
    router.push({
      path: activeKey.value,
    })
  },
  { immediate: false }
)

onMounted(() => {
  console.log(containerRef)
  if (containerRef.value) {
    height.value = containerRef.value.offsetHeight
  }
})
</script>

<template>
  <div :style="{ height: height + 'px' }">
    <div ref="containerRef" class="pos-fixed w-full bg-white z-999">
      <div class="flex w-full flex-justify-between flex-items-center pl-2 pr-2">
        <div>
          <NButton size="small" @click="setLocale('cn')">中文</NButton>
          <NButton size="small" @click="setLocale('en')">英文</NButton>
          {{ locale }}
        </div>
        <div class="font-600 text-7 tracking-widest">
          {{ $t("header.title") }}
        </div>
        <div></div>
      </div>
      <div class="header-menu">
        <div
          class="header-menu-item"
          :class="{ 'is-selected': item.key === activeKey }"
          v-for="(item, index) in menuList"
          @click="activeKey = item.key"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-menu {
  align-items: center;
  background: #f8f8f8;
  border-bottom: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
  display: flex;
  justify-content: center;
  gap: 12px;
  &-item {
    padding: 0px 18px;
    color: rgb(51, 51, 51);
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
  }
  &-item:hover {
    color: #000;
    font-weight: 600;
  }

  .is-selected {
    border-bottom: 2px solid #ffe256;
  }
}
</style>
