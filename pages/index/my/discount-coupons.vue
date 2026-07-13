<script setup lang="ts">
const coupons = ref([
  {
    id: 1,
    name: "新用户专享优惠",
    amount: 2000,
    minAmount: 10000,
    expireDate: "2024-12-31",
    used: false,
    description: "适用于所有课程申请服务",
  },
  {
    id: 2,
    name: "推荐有礼",
    amount: 500,
    minAmount: 5000,
    expireDate: "2024-06-30",
    used: true,
    description: "被推荐人首次下单可用",
  },
  {
    id: 3,
    name: "限时折扣券",
    amount: 1500,
    minAmount: 8000,
    expireDate: "2024-09-15",
    used: false,
    description: "指定合作院校课程可用",
  },
]);
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">优惠券</div>

    <div v-if="coupons.length === 0" class="text-center py-100">
      <div class="text-18 color-#999">暂无优惠券</div>
    </div>

    <div v-else class="grid gap-16">
      <div
        v-for="c in coupons"
        :key="c.id"
        class="bg-white rounded-8 border-1 border-#eee pa-24 flex items-center justify-between"
        :class="{ 'opacity-50': c.used }"
      >
        <div class="flex items-start gap-16">
          <div
            class="w-80 h-80 rounded-8 flex flex-col items-center justify-center"
            :class="c.used ? 'bg-#ddd' : 'bg-#fff5e6'"
          >
            <div class="text-24 font-600 color-#ff6b00">¥{{ c.amount }}</div>
            <div class="text-11 color-#999">满{{ c.minAmount }}可用</div>
          </div>
          <div>
            <div class="text-16 font-600 mb-4">{{ c.name }}</div>
            <div class="text-13 color-#666 mb-2">{{ c.description }}</div>
            <div class="text-12 color-#999">
              有效期至 {{ c.expireDate }}
            </div>
          </div>
        </div>

        <div>
          <ElTag v-if="c.used" type="info" size="large">已使用</ElTag>
          <ElButton v-else type="primary" size="small" plain>立即使用</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>
