<!-- 留学攻略卡片 -->
<script lang="ts" setup>
import dayjs from "dayjs"
import type { PropType } from "vue"
import type {
  StudyAbroadGuideCardRenderType,
  StudyAbroadGuideItem,
} from "~/type/studyBoroadStrategy"

const props = defineProps({
  item: {
    type: Object as PropType<StudyAbroadGuideItem>,
    default: () => {},
  },
  renderType: {
    type: String as PropType<StudyAbroadGuideCardRenderType>,
    default: () => "default",
  },
})

const router = useRouter()
const time = computed(() => {
  return dayjs(props.item.release_at * 1000).format("DD/MM/YYYY")
})
function toDetail() {
  router.push({
    path: "/show-strategy/" + props.item.id,
  })
}
</script>
<template>
  <div>
    <div
      v-if="props.renderType === 'simple'"
      @click="toDetail"
      class="bg-#fff cursor-pointer"
    >
      <img :src="item.image_url" />
      <div class="py-16 px-12 text-left color-#333">
        {{ item.description }}
      </div>
    </div>
    <div
      v-else-if="props.renderType === 'default'"
      @click="toDetail"
      class="w-full h-a bg-#fff cursor-pointer relative"
    >
      <!-- 精选 -->
      <div
        v-if="props.item.is_core === 2"
        class="absolute left-[-15px] top-18 w-115"
      >
        <img src="/img/strategy-for-studying-abroad/core.png" />
      </div>
      <img :src="props.item.image_url" />
      <div class="w-80% ma py-24">
        <div class="flex justify-between items-center">
          <div class="text-20 font-550 hover:color-#ff9f00" style="">
            {{ props.item.title }}
          </div>
          <div class="flex gap-16 text-13 color-#9b9b9b font-550">
            <div>
              {{ time }}
            </div>
            <div>
              {{ props.item.invented_read_count + props.item.read_count }}
            </div>
          </div>
        </div>
        <div class="py-8">
          <div class="w-full h1 bg-[rgba(0,0,0,.3)]"></div>
        </div>
        <div class="text-16 color-#333">
          {{ props.item.description }}
        </div>
      </div>
    </div>
    <div
      v-else-if="props.renderType === 'detail'"
      class="w-full h-a bg-#fff py-40 px-50 b-rd-16"
    >
      <div
        v-if="props.item.map_category_list?.length"
        class="flex gap-36 flex-wrap"
      >
        <div
          v-for="item2 in props.item.map_category_list"
          class="flex items-center mb-36"
        >
          <img class="w-30" :src="item2.icon_url" />
          <div class="color-#9c9c9c font-bold">{{ item2.title }}</div>
        </div>
      </div>
      <div class="flex justify-between items-center mb-44">
        <div class="text-30 font-550 color-#4a4a4a">
          {{ props.item.title }}
        </div>
        <div class="flex gap-16 text-13 color-#9b9b9b font-550 items-center">
          <div>
            {{ time }}
          </div>
          <div>
            {{ props.item.invented_read_count + props.item.read_count }}
          </div>
        </div>
      </div>
      <div v-html="props.item.html_content"></div>
    </div>
  </div>
</template>
