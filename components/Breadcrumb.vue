<script setup lang="ts">
import {Icon} from '#components'

const props = defineProps({
  breadcrumbList: {
    type: Array<{
      label: string
      path?: string
    }>,
  },
  isFull: {
    type: Boolean,
    default: false
  }
})
const MyIcon = h(Icon, {name: 'material-symbols:arrow-forward-ios-rounded'})

</script>

<template>
  <div v-if="props.breadcrumbList?.length" class="w-100% border-b border-b-#dedede bg-#fff">
    <div class="h-36px line-height-36px ma flex"
         :class="$props.isFull?'w-100% pl-36 pr-36 h-42 line-height-42':'w-1100px'"
         style="align-items: center">
      <ElBreadcrumb :separator-icon="MyIcon">
        <ElBreadcrumbItem
            :to="{path:item.path}"
            v-for="(item,index) in props.breadcrumbList" :key="index">
          <div class="text-13"> {{ item.label }}</div>
        </ElBreadcrumbItem>
      </ElBreadcrumb>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>