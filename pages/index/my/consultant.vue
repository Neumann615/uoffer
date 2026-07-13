<script setup lang="ts">
const consultants = ref([
  {
    id: 1,
    name: "张老师",
    title: "资深留学顾问",
    avatar: "",
    description: "10年留学行业经验，专注英国G5名校申请，累计帮助500+学生圆梦名校。",
    wechat: "consultant_zhang",
    cases: 537,
  },
  {
    id: 2,
    name: "李老师",
    title: "高级申请顾问",
    avatar: "",
    description: "8年文书指导经验，Native Speaker级别英语写作能力，擅长个人陈述润色。",
    wechat: "consultant_li",
    cases: 328,
  },
  {
    id: 3,
    name: "王老师",
    title: "留学规划师",
    avatar: "",
    description: "6年留学规划经验，精通英国、澳洲、新加坡多国申请政策与流程。",
    wechat: "consultant_wang",
    cases: 256,
  },
]);
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">我的顾问</div>

    <div class="grid grid-cols-3 gap-24">
      <div
        v-for="c in consultants"
        :key="c.id"
        class="bg-white rounded-8 border-1 border-#eee pa-24 text-center"
      >
        <div
          class="w-80 h-80 rounded-full bg-#f0f0f0 mx-auto mb-16 flex items-center justify-center text-28 color-#bbb"
        >
          {{ c.name.charAt(0) }}
        </div>

        <div class="text-18 font-600 mb-4">{{ c.name }}</div>
        <div class="text-13 color-#999 mb-12">{{ c.title }}</div>
        <div class="text-13 color-#666 mb-16 line-height-loose">
          {{ c.description }}
        </div>

        <div class="flex justify-center gap-16 mb-16">
          <div class="text-center">
            <div class="text-20 font-600 color-#5e4d00">{{ c.cases }}+</div>
            <div class="text-12 color-#999">成功案例</div>
          </div>
        </div>

        <ElButton type="primary" plain>
          <span>联系顾问</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>
