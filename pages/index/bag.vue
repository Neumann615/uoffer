<script setup lang="ts">
import { useCommonStore } from "~/store/common";

const commonStore = useCommonStore();
const router = useRouter();

onMounted(() => {
  commonStore.getCartList();
});

function removeItem(id: number) {
  ElMessageBox.confirm("确定要移除这个课程吗？", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    commonStore.removeCartItem(id);
    ElMessage.success("已移除");
  }).catch(() => {});
}

function checkout() {
  if (!commonStore.cartList?.length) {
    ElMessage.warning("购物车为空");
    return;
  }
  ElMessage.info("结算功能开发中");
}

function goToCourse() {
  router.push({ path: "/course" });
}
</script>
<template>
  <Breadcrumb
    :breadcrumbList="decryptData($t('pageData.bag.breadcrumbList'))"
  ></Breadcrumb>
  <div class="bag-container">
    <div class="bag-header">
      <div class="text-20 font-550 color-#666">我的书包</div>
      <div v-if="commonStore.cartList?.length" class="text-13 color-#999">
        共 {{ commonStore.cartList.length }} 件商品
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!commonStore.cartList?.length"
      class="bag-empty"
    >
      <div class="text-16 color-#999 mb-24">购物车是空的</div>
      <ElButton type="primary" @click="goToCourse">浏览课程</ElButton>
    </div>

    <!-- Bag table -->
    <div v-else class="bag-table-wrapper">
      <el-table size="large" :data="commonStore.cartList" class="bag-table">
        <el-table-column label="商品" min-width="300">
          <template #default="scope">
            <div class="bag-product">
              <img class="bag-product-img" :src="scope.row.logo" />
              <div>
                <div class="mb-4 text-16 font-550 text-#000">
                  {{ scope.row.course_name_cn }}
                </div>
                <div class="text-13 color-#666">{{ scope.row.university_name_cn }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="120">
          <template #default="scope">
            ¥{{ scope.row.price_cny / 100 + ".00" }}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="80" prop="num" align="center">
        </el-table-column>
        <el-table-column label="小计" width="120">
          <template #default="scope">
            ¥{{ (scope.row.price_cny * scope.row.num) / 100 + ".00" }}
          </template>
        </el-table-column>
        <el-table-column label="入学日期" width="120">
          <template #default="scope">
            {{
              scope.row.entry_school_year_month.year +
              "/" +
              scope.row.entry_school_year_month.month
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template #default="scope">
            <ElButton
              type="danger"
              size="small"
              text
              @click.stop="removeItem(scope.row.id)"
            >
              移除
            </ElButton>
          </template>
        </el-table-column>
      </el-table>

      <div class="bag-footer">
        <div class="text-16 font-550">
          合计: ¥{{
            commonStore.cartList.reduce(
              (sum: number, item: any) =>
                sum + (item.price_cny * item.num) / 100,
              0
            ).toFixed(2)
          }}
        </div>
        <ElButton type="primary" size="large" @click="checkout">
          去结算
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bag-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 120px;

  @media (min-width: 768px) {
    padding: 0 36px 200px;
  }
}

.bag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  margin-top: 32px;

  @media (min-width: 768px) {
    margin-top: 80px;
    margin-bottom: 36px;
  }
}

.bag-empty {
  text-align: center;
  padding: 80px 0;
}

.bag-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.bag-table {
  min-width: 700px;
}

.bag-product {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (min-width: 768px) {
    gap: 16px;
  }
}

.bag-product-img {
  width: 120px;
  height: auto;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 200px;
  }
}

.bag-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid #ececec;
}
</style>
