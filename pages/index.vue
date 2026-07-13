<script setup lang="ts">
import CommonDialog from "~/components/CommonDialog.vue";
import { useCommonStore } from "~/store/common";

useSeoMeta({
  title:
    "有录网UOFFER GLOBAL提供留学一站式服务，帮学生和学校实现零节点连接。上名校，找有录。",
});
const commonStore = useCommonStore();
// 获取搜索相关选项
commonStore.getCourseSearchOptions();
// 初始化获取视频播放资源
commonStore.getVideoAssets();
</script>

<template>
  <CommonDialog></CommonDialog>
  <ClientOnly>
    <SideToolbar></SideToolbar>
  </ClientOnly>
  <NuxtPage />
</template>
