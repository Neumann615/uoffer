<script lang="ts" setup>
import type { PaperWorker } from "~/type";
import { decryptData } from "~/utils";
const { data: paperWorks } = await useFetch<{
  total: number;
  list: Array<PaperWorker>;
}>("/api/cms/pageWorker");
const route = useRoute();
const currentWorkerId = ref(
  Number(route.params.id) || paperWorks.value?.list[0].id
);
const swiperContainerRef = ref(null);
const swiper = useSwiper(swiperContainerRef);
const currentWorker = computed<PaperWorker | undefined>(() => {
  let result;
  if (paperWorks.value?.list.length && currentWorkerId.value) {
    paperWorks.value?.list.forEach((item) => {
      if (item.id == currentWorkerId.value) {
        result = item;
      }
    });
  }
  return result;
});
</script>

<template>
  <div class="w-full ha min-h-1200 bg-#f7f7f7">
    <Breadcrumb
      :breadcrumbList="decryptData($t('pageData.paperWorker.breadcrumbList'))"
    ></Breadcrumb>
    <div class="w-full pt-60 pb-180 h-a flex items-center justify-center">
      <div class="w-1036" v-if="currentWorker">
        <div class="flex gap-100">
          <img
            :src="currentWorker.image"
            class="w-180 h-180 object-cover b-rd-12"
          />
          <div>
            <div
              class="text-32 color-#333 font-600 whitespace-nowrap line-height-[1]"
            >
              {{ currentWorker.name }}
            </div>
            <div class="text-16 color-#1f1f1f font-600 mt-4">
              {{ currentWorker.intro_cn }}
            </div>
            <div class="bg-#d8d8d8 mt-12 w-50 h-1"></div>
            <div
              class="color-#333 mt-12 line-height-[1.8]"
              style="white-space: pre-wrap; letter-spacing: 0.5px"
              v-html="currentWorker.description_cn"
            ></div>
          </div>
        </div>
        <div class="text-20 color-#333 font-600 py-30">老师案例</div>
        <div :key="currentWorkerId">
          <PdfRender :pdfUrl="currentWorker.document_cn"></PdfRender>
        </div>
      </div>
    </div>
    <div
      class="w-full position-fixed bottom-0 left-0 h-150 bg-#fff flex items-center justify-center"
    >
      <div class="w-1036">
        <swiper-container :slidesPerView="10" ref="swiperContainerRef">
          <swiper-slide v-for="item in paperWorks?.list">
            <div class="flex items-center justify-center">
              <div
                class="wa ha"
                style="user-select: none; cursor: pointer"
                @click="
                  () => {
                    currentWorkerId = item.id;
                  }
                "
              >
                <div class="wa ha relative">
                  <div
                    v-show="item.id !== currentWorkerId"
                    class="absolute left-0 top-0 bg-[rgba(0,0,0,.35)] z-10 w-full h-full"
                  ></div>
                  <img class="w-70 h-70 ma" :src="item.image" />
                </div>
                <div class="text-center mt-10 text-10 color-#333">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>
