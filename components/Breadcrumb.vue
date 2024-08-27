<script setup lang="ts">
import { Icon } from '#components'
const props = defineProps({
  breadcrumbList: {
    type: Array<{
      label: string
      path?: string
    }>,
    default: []
  }
})
const MyIcon = h(Icon, { name: 'material-symbols:arrow-forward-ios-rounded' })

</script>

<template>
  <div v-if="props.breadcrumbList?.length" class="w-100% border-b border-b-#dedede bg-#fff">
    <div class="h-36px line-height-36px ma w-1100px flex " style="align-items: center">
      <ElBreadcrumb :separator-icon="MyIcon">
        <ElBreadcrumbItem @click="$router.push({
            path:item.path
            })" v-for="(item,index) in props.breadcrumbList" :key="index">
          {{ item.label }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>