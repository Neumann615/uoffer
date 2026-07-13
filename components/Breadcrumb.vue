<script setup lang="ts">
const props = defineProps({
  breadcrumbList: {
    type: Array<{
      label: string
      path?: string
    }>,
  },
  isFull: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    v-if="props.breadcrumbList?.length"
    class="w-100% border-b border-b-#dedede bg-#fff"
  >
    <div
      class="breadcrumb-inner"
      :class="
        $props.isFull ? 'breadcrumb-full' : 'breadcrumb-default'
      "
    >
      <ElBreadcrumb>
        <ElBreadcrumbItem
          :to="{ path: item.path }"
          v-for="(item, index) in props.breadcrumbList"
          :key="index"
        >
          <div class="text-13">{{ item.label }}</div>
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
  </div>
</template>

<style scoped lang="less">
.breadcrumb-inner {
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  width: 100%;
  box-sizing: border-box;
}

.breadcrumb-default {
  max-width: 1100px;
}

.breadcrumb-full {
  width: 100%;
  height: 42px;
  line-height: 42px;

  @media (min-width: 768px) {
    padding: 0 36px;
  }
}
</style>
