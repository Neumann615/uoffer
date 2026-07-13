<script setup lang="ts">
const showSeekingAdvice = ref(false);
const { $Mitt } = useNuxtApp();
onMounted(() => {
  $Mitt.on("control-common-dialog", ({ type, show }) => {
    if (type === "seeking-advice") {
      showSeekingAdvice.value = show;
    }
  });
});
</script>
<template>
  <!-- 我要咨询 -->
  <el-dialog v-model="showSeekingAdvice" width="340">
    <div class="text-16 color-#333 text-center font-bold py-24 tracking-1">
      {{ $t("other.seekingAdvice.dialogTitle") }}
    </div>
    <div class="flex items-center justify-center">
      <img class="w-190" src="/img/course-detail/wechat-qr.jpg" />
    </div>
    <div class="text-center py-16">
      {{ $t("other.seekingAdvice.dialogSubTitle") }}
    </div>
  </el-dialog>
</template>
