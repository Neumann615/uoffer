<script lang="ts" setup>
import { decryptData } from "~/utils";
const route = useRoute();
const detail = ref<StudyAbroadGuideItem>();
const recommends = ref<Array<StudyAbroadGuideItem>>([]);
const router = useRouter();

async function getStrategyDetail() {
  let res = await useFetch("/api/study_board_strategy/web/detail", {
    params: {
      id: route.params.id,
    },
  });
  detail.value = res.data.value;
}

async function getStrategyRecommend() {
  let res = await useFetch("/api/study_board_strategy/web/recommend/list", {
    params: {
      limit: 4,
    },
  });
  recommends.value = res.data.value.list;
}

function toRecommend(id: number) {
  router.replace({ path: "/show-strategy/" + id });
}

getStrategyDetail();
getStrategyRecommend();
</script>
<template>
  <Breadcrumb
    :breadcrumbList="decryptData($t('pageData.showStrategy.breadcrumbList'))"
  ></Breadcrumb>
  <div class="strategy-detail">
    <div class="flex items-center justify-center">
      <StudyAbroadGuideCard
        class="strategy-detail-card"
        v-if="detail"
        :item="detail"
        renderType="detail"
      ></StudyAbroadGuideCard>
    </div>
    <div v-if="recommends?.length" class="recommend-section">
      <div class="text-center color-#4a4a4a text-20 md:text-24 mb-40 md:mb-60">
        阅读推荐
      </div>
      <div class="recommend-grid">
        <div
          v-for="item in recommends"
          @click="toRecommend(item.id)"
          class="recommend-card"
        >
          <img class="recommend-card-img" :src="item.image_url" />
          <div class="px-8 pt-16 md:pt-24 text-14 md:text-16 color-#4a4a4a text-center">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.strategy-detail {
  width: 100%;
  height: auto;
  background: #f8f8f8;
  padding: 24px 12px 50px;

  @media (min-width: 768px) {
    padding: 50px 24px;
  }
}

.strategy-detail-card {
  width: 100%;
  max-width: 970px;
}

.recommend-section {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 44px;
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

.recommend-card {
  background: #f8f8f8;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 #d8d8d8;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  &-img {
    width: 100%;
    aspect-ratio: 268 / 163;
    object-fit: cover;
  }
}
</style>
