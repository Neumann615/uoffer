<template>
  <Header></Header>
  <NuxtPage />
  <Footer></Footer>
</template>
<style>
@import "@unocss/reset/tailwind.css";
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 8px; /* 水平滚动条的高度、垂直滚动条的宽度 */
  background-color: #f9f9f9; /* 滚动条的背景色 */
}

/* 滚动条内的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #bdbdbd; /* 滑块的背景色 */
  border-radius: 6px; /* 滑块的圆角 */
}

/* 滚动条内的滑块：鼠标悬停时 */
::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1; /* 滑块的背景色 */
}

/* 滚动条内的滑块：被按下时 */
::-webkit-scrollbar-thumb:active {
  background-color: #919191; /* 滑块的背景色 */
}

/* 滚动条外的轨道 */
::-webkit-scrollbar-track {
  background-color: #f0f0f0; /* 轨道的背景色 */
}
</style>
<script setup lang="ts">
</script>