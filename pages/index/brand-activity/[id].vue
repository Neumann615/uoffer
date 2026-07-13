<script lang="ts" setup>
import { Clock } from "@element-plus/icons-vue"
import dayjs from "dayjs"
import { decryptData, getBrandActivityTag } from "~/utils"

const route = useRoute()
const time = computed(() => {
  return detail.value?.created_at
    ? dayjs(detail.value?.created_at * 1000).format("DD/MM/YYYY")
    : ""
})

const { data: detail } = useFetch("/api/cms_branding_activity/web/detail", {
  params: {
    id: route.params.id,
  },
})
</script>

<template>
  <Breadcrumb
    :breadcrumbList="decryptData($t('pageData.brandActivity.breadcrumbList'))"
  ></Breadcrumb>
  <div class="w-100% h-a bg-#f8f8f8 py-50">
    <div class="flex items-center justify-center">
      <div v-if="detail" class="w-974 bg-#fff py-47 px-91">
        <div class="text-30 color-#4a4a4a font-bold line-height-[1.2]">
          {{ detail.title }}
        </div>
        <div class="mt-12 flex gap-24 items-center">
          <div class="flex">
            <div
              v-for="item in detail.category_list"
              class="bg-#f8f8f8 color-#9b9b9b px-10 py-6"
            >
              {{ getBrandActivityTag(item) }}
            </div>
          </div>
          <div class="color-#9b9b9b flex items-center gap-4">
            <el-icon>
              <Clock></Clock>
            </el-icon>
            <div>{{ time }}</div>
          </div>
        </div>
        <div v-html="detail.content" class="mt-36"></div>
      </div>
    </div>
  </div>
</template>
