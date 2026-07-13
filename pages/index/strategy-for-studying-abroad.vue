<script setup lang="ts">
import { decryptData } from "~/utils";
const rankingTypeList = [
  {
    label: "阅读量从多到少",
    value: "1",
  },
  {
    label: "发布时间从新到旧",
    value: "2",
  },
  {
    label: "发布时间从旧到新",
    value: "3",
  },
];

const { data: banner } = await useFetch("/api/cms/banner", {
  params: {
    category: 2,
    position: 4,
    page_num: 1,
    page_size: 100,
  },
});
const { data: categoryList } = await useFetch(
  "/api/study_board_strategy/web/category/list"
);
const { getI18nData } = useI18nData();
const nowCategory = ref("1");
const hotArticle = ref<any>([]);
const filterArticle = ref<any>([]);
const rankingType = ref(rankingTypeList[0].value);
const searchTitle = ref("");
const articlePagination = reactive({
  page_num: 1,
  page_size: 5,
  total: 0,
});
async function getHotArticle() {
  let res = await useFetch("/api/study_board_strategy/web/list", {
    params: {
      page_num: 1,
      page_size: 5,
      ranking_type: rankingType.value,
      is_hot: true,
    },
  });
  if (res.data.value?.list) {
    hotArticle.value = res.data.value.list;
  }
}

async function getFilterArticle() {
  let res = await useFetch("/api/study_board_strategy/web/list", {
    params: {
      page_num: articlePagination.page_num,
      page_size: articlePagination.page_size,
      ranking_type: rankingType.value,
      category_id: nowCategory.value,
      title: searchTitle.value,
    },
  });
  filterArticle.value = res.data.value.list;
  articlePagination.total = res.data.value.total;
}

watch(
  () => rankingType.value,
  () => {
    getHotArticle();
    getFilterArticle();
  },
  { immediate: true }
);
</script>

<template>
  <Breadcrumb
    :breadcrumbList="
      decryptData($t('pageData.strategyForStudyingAbroad.breadcrumbList'))
    "
  ></Breadcrumb>
  <ElCarousel :autoplay="false">
    <ElCarouselItem v-for="(item, index) in banner.list">
      <img
        class="object-cover"
        style="height: 100%"
        :src="getI18nData(item, 'image_url')"
      />
    </ElCarouselItem>
  </ElCarousel>
  <div
    class="flex flex-items-center justify-center h-48px border-1 border-#dcdcdc border-solid"
  >
    <div
      :class="{
        'bg-#f8f8f8': item.id === nowCategory,
      }"
      @click="nowCategory = item.id"
      class="flex flex-items-center justify-center pl-4 pr-4 gap-1 w-167px h-100% cursor-pointer hover:bg-#f8f8f8"
      v-for="(item, index) in categoryList.list"
    >
      <img class="w-28px" :src="item.icon_url" />
      <div>{{ item.title }}</div>
    </div>
  </div>
  <div class="w-100% h-a bg-#f8f8f8 pt-16 pb-70">
    <div class="w-1200px ma gap-4">
      <div class="flex flex-row-reverse mb-16">
        <div class="flex w-830 items-center justify-between">
          <div
            style="border: 1px solid #dcdfe6; box-sizing: border-box"
            class="pa-8"
          >
            <div class="color-#909399 text-12 font-600 mb-4">分类</div>
            <ElSelect
              style="width: 200px"
              v-model="rankingType"
              :popper-options="rankingTypeList"
            >
              <ElOption
                v-for="(item, index) in rankingTypeList"
                :label="item.label"
                :value="item.value"
              ></ElOption>
            </ElSelect>
          </div>
          <ElInput
            placeholder="搜索"
            v-model="searchTitle"
            style="width: 200px"
          >
            <template v-slot:suffix>
              <div class="cursor-pointer" @click.stop="() => {}">
                <el-icon>
                  <Search></Search>
                </el-icon>
              </div>
            </template>
          </ElInput>
        </div>
      </div>
      <div class="flex gap-40">
        <div class="w-280">
          <div class="flex justify-between flex-items-center pt-8 pb-16">
            <div class="text-22px">热门文章</div>
            <div class="cursor-pointer color-#409eff">查看更多</div>
          </div>
          <StudyAbroadGuideCard
            :item="item"
            v-for="(item, index) in hotArticle"
            renderType="simple"
            :class="index < filterArticle.length - 1 ? 'mb24' : ''"
          ></StudyAbroadGuideCard>
        </div>
        <div class="flex-1">
          <StudyAbroadGuideCard
            :item="item"
            v-for="(item, index) in filterArticle"
            :class="index < filterArticle.length - 1 ? 'mb30' : ''"
          ></StudyAbroadGuideCard>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-24">
      <ElPagination
        background
        layout="prev, pager, next, jumper"
        @change="getFilterArticle"
        v-model:current-page="articlePagination.page_num"
        :page-size="articlePagination.page_size"
        :total="articlePagination.total"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.strategy-container {
  width: 100%;
  max-width: 1200px;
  padding: 0 12px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0 24px;
  }

  @media (min-width: 1200px) {
    padding: 0;
  }
}

.strategy-toolbar {
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;

  @media (min-width: 768px) {
    width: 830px;
    flex-wrap: nowrap;
  }
}

:deep(.el-carousel__container) {
  height: 180px !important;

  @media (min-width: 768px) {
    height: 350px !important;
  }
}
</style>
