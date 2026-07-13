<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

// 模拟申请数据 - 实际项目中从API获取
const applications = ref([
  {
    id: 1,
    university: "曼彻斯特大学",
    course: "MSc Computer Science",
    status: "in_review",
    statusText: "审核中",
    applyDate: "2024-03-15",
    progress: 60,
  },
  {
    id: 2,
    university: "伦敦大学学院",
    course: "MA Education",
    status: "submitted",
    statusText: "已提交",
    applyDate: "2024-04-02",
    progress: 30,
  },
  {
    id: 3,
    university: "爱丁堡大学",
    course: "MSc Data Science",
    status: "offer",
    statusText: "已获Offer",
    applyDate: "2024-02-20",
    progress: 100,
  },
]);

const statusTagType = (status: string) => {
  const map: Record<string, string> = {
    submitted: "info",
    in_review: "warning",
    offer: "success",
    rejected: "danger",
  };
  return map[status] || "info";
};
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">我的申请</div>

    <div v-if="!authStore.webLoginResult.apiToken" class="text-center py-100">
      <div class="text-18 color-#999 mb-16">请先登录查看申请状态</div>
      <ElButton type="primary" @click="navigateTo('/auth')">前往登录</ElButton>
    </div>

    <div v-else class="grid gap-24">
      <div
        v-for="app in applications"
        :key="app.id"
        class="bg-white pa-24 rounded-8 border-1 border-#eee"
      >
        <div class="flex justify-between items-start mb-16">
          <div>
            <div class="text-18 font-600 mb-4">{{ app.course }}</div>
            <div class="text-14 color-#666">{{ app.university }}</div>
          </div>
          <ElTag :type="statusTagType(app.status)" size="large">
            {{ app.statusText }}
          </ElTag>
        </div>

        <ElProgress :percentage="app.progress" :stroke-width="8" />

        <div class="mt-12 text-13 color-#999">
          申请日期：{{ app.applyDate }}
        </div>
      </div>
    </div>
  </div>
</template>
