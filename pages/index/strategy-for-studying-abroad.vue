<script setup lang="ts">
const rankingTypeList = [
  {
    label: "阅读量从多到少",
    value: "1"
  },
  {
    label: "发布时间从新到旧",
    value: "2"
  },
  {
    label: "发布时间从旧到新",
    value: "3"
  },
]


const {data: banner} = await useFetch("/api/cms/banner", {
  params: {
    category: 2,
    position: 4,
    page_num: 1,
    page_size: 100,
  },
})
const {data: categoryList} = await useFetch('/api/study_board_strategy/web/category/list')
const {getI18nData} = useI18nData()
const nowCategory = ref("1")
const hotArticle = ref<any>([])
const filterArticle = ref<any>([])
const rankingType = ref(rankingTypeList[0].value)
const searchTitle = ref("")
const articlePagination = reactive({
  page_num: 1,
  page_size: 5,
})

async function getHotArticle() {
  let res = await useFetch('/api/study_board_strategy/web/list', {
    params: {
      page_num: 1,
      page_size: 5,
      ranking_type: rankingType.value,
      is_hot: true
    }
  })
  console.log(res, {
    page_num: 1,
    page_size: 5,
    ranking_type: rankingType.value,
    is_hot: true
  })
  if (res.data.value?.list) {
    hotArticle.value = res.data.value.list
  }
}

async function getFilterArticle() {
  let res = await useFetch('/api/study_board_strategy/web/list', {
    params: {
      page_num: articlePagination.page_num,
      page_size: articlePagination.page_size,
      ranking_type: rankingType.value,
      category_id: nowCategory.value,
      title: searchTitle.value,
    }
  })
  filterArticle.value = res.data.value.list
}

watch(() => rankingType.value, () => {
  getHotArticle()
  getFilterArticle()
}, {immediate: true})


</script>

<template>

  <Breadcrumb :breadcrumbList="decryptData($t('pageData.strategyForStudyingAbroad.breadcrumbList'))"></Breadcrumb>
  <ElCarousel :autoplay="false">
    <ElCarouselItem v-for="(item, index) in banner.list">
      <img
          class="object-cover"
          style="height: 100%"
          :src="getI18nData(item, 'image_url')"
      />
    </ElCarouselItem>

  </ElCarousel>
  <div class="flex flex-items-center justify-center h-48px border-1 border-#dcdcdc border-solid ">
    <div
        :class="{
      'bg-#f8f8f8':item.id === nowCategory
        }"
        @click="nowCategory=item.id"
        class="flex flex-items-center justify-center pl-4 pr-4 gap-1 w-167px h-100% cursor-pointer hover:bg-#f8f8f8"
        v-for="(item,index) in categoryList.list">
      <img class="w-28px" :src="item.icon_url">
      <div> {{ item.title }}</div>
    </div>
  </div>
  <div class="w-100% h-a bg-#f8f8f8 pt-24px">
    <div class="flex w-1200px ma gap-4">
      <div>
        <div class="flex  justify-between flex-items-center pt-16px pb-16px">
          <div class="text-24px">热门文章</div>
          <div>查看更多</div>
        </div>
        <div v-for="(item,index) in hotArticle" class="mb-2 bg-#fff">
          <img class="w-280px" :src="item.image_url">
          <div class="w-280px p-2 text-left">{{ item.description }}</div>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex justify-between ">
          <ElSelect style="width:200px" v-model="rankingType" :popper-options="rankingTypeList">
            <ElOption v-for="(item,index) in rankingTypeList" :label="item.label" :value="item.value"></ElOption>
          </ElSelect>
          <ElInput placeholder="搜索" style="width:220px" v-model="searchTitle"></ElInput>
        </div>
        <div v-for="(item,index) in filterArticle" class="mb-2 bg-#fff">
          <img :src="item.image_url">
          <div class="w-280px p-2 text-left">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>