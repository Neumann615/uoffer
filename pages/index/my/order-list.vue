<script setup lang="ts">
const orders = ref([
  {
    id: "ORD202403001",
    course: "MSc Computer Science",
    university: "曼彻斯特大学",
    amount: 29800,
    status: "paid",
    statusText: "已支付",
    date: "2024-03-15",
  },
  {
    id: "ORD202404002",
    course: "MA Education",
    university: "伦敦大学学院",
    amount: 32800,
    status: "pending",
    statusText: "待支付",
    date: "2024-04-02",
  },
  {
    id: "ORD202402003",
    course: "MSc Data Science",
    university: "爱丁堡大学",
    amount: 26800,
    status: "completed",
    statusText: "已完成",
    date: "2024-02-20",
  },
]);

const statusTagType = (status: string) => {
  const map: Record<string, string> = {
    pending: "warning",
    paid: "info",
    completed: "success",
    cancelled: "danger",
  };
  return map[status] || "info";
};
</script>

<template>
  <div class="ma w-[80%] mb-200">
    <div class="mb-36 mt-80 text-20 font-550 color-#666">订单列表</div>

    <div v-if="orders.length === 0" class="text-center py-100">
      <div class="text-18 color-#999">暂无订单</div>
    </div>

    <el-table v-else :data="orders" size="large">
      <el-table-column label="订单编号" prop="id" width="180" />
      <el-table-column label="课程" width="300">
        <template #default="scope">
          <div>
            <div class="text-15 font-550">{{ scope.row.course }}</div>
            <div class="text-13 color-#666">{{ scope.row.university }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template #default="scope">
          ¥{{ (scope.row.amount / 100).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="下单日期" prop="date" />
      <el-table-column label="状态">
        <template #default="scope">
          <ElTag :type="statusTagType(scope.row.status)">
            {{ scope.row.statusText }}
          </ElTag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <ElButton
            v-if="scope.row.status === 'pending'"
            type="primary"
            size="small"
          >
            去支付
          </ElButton>
          <ElButton v-else size="small" text type="primary"> 查看详情 </ElButton>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
