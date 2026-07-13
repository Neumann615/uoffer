<script setup lang="ts">
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { useCommonDialog } from "~/composables/useCommonDialog";
import type { CourseDetail } from "~/type/course";

const detail = ref<{
  courseInfo: CourseDetail;
  universityInfo: UniversityDetail;
}>();
const { setCommonDialogStatus } = useCommonDialog();
const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const startEnterSchoolYear = ref();
const startEnterSchoolMonth = ref();

function back() {
  router.back();
}

async function loadCourseInfo() {
  let res = await useFetch("/api/web/course/detail", {
    params: {
      id: Number(route.params.id),
    },
  });
  if (res.data.value.courseInfo) {
    res.data.value.courseInfo.start_enter_school_year = JSON.parse(
      res.data.value.courseInfo.start_enter_school_year
    ).map((item: string) => Number(item));
    res.data.value.courseInfo.start_enter_school_month = JSON.parse(
      res.data.value.courseInfo.start_enter_school_month
    ).map((item: string) => Number(item));
  }
  detail.value = res.data.value;
}

async function addToBag() {
  if (!startEnterSchoolYear.value) {
    return ElMessage.warning("请选择入学年份");
  }
  if (!startEnterSchoolMonth.value) {
    return ElMessage.warning("请选择入学月份");
  }
  const res: any = await useFetch("/api/web/my/cart/add", {
    method: "POST",
    body: JSON.stringify({
      start_month: startEnterSchoolMonth.value,
      start_year: startEnterSchoolYear.value,
      course_id: Number(route.params.id),
    }),
  });
  if (res && res.code === 200 && res.msg === "ok") {
    ElMessage.success("添加成功");
  }
}

onMounted(() => {
  setTimeout(() => {
    loadCourseInfo();
  }, 0);
});
</script>
<template>
  <div v-if="detail">
    <Breadcrumb
      :is-full="true"
      :breadcrumbList="[
        ...decryptData($t('pageData.courseDetail.breadcrumbList')),
        {
          label:
            locale === 'cn'
              ? detail.courseInfo.chinese_name
              : detail.courseInfo.english_name,
        },
      ]"
    ></Breadcrumb>
    <div class="w-full pt-100 pb-60 ma bg-[#f8f7f5]">
      <div class="wa max-w-[1280px] flex ma relative">
        <!-- 返回按钮 -->
        <div
          @click.stop="back"
          class="absolute cursor-pointer left-0 top-[-50px] flex items-center"
        >
          <el-icon class="mr-4">
            <ArrowLeftBold></ArrowLeftBold>
          </el-icon>
          {{ $t("pageData.courseDetail.back") }}
        </div>
        <img
          class="w-650"
          :src="
            detail.universityInfo.app_background_url ||
            detail.universityInfo.university_image_url
          "
        />
        <!-- 表单内容区域 -->
        <div class="ml-50">
          <div class="color-#9b9b9b text-20 font-700 mb-10">
            {{
              detail.universityInfo[
                locale === "cn" ? "chinese_name" : "english_name"
              ]
            }}
          </div>
          <div class="color-#4a4a4a text-24 font-700 mb-10">
            {{
              detail.courseInfo[
                locale === "cn" ? "chinese_name" : "english_name"
              ]
            }}
          </div>
          <div class="mb-20 color-#4a4a4a text-18">
            {{ $t("pageData.courseDetail.qsRanking") }}
            {{ detail.universityInfo.qs_ranking }}
          </div>
          <div
            class="w-full h-80 min-w-480 mb-30 mt-40 flex items-center b-rd-2xl"
            style="background-image: url('/img/course-detail/form-bg.jpg')"
          >
            <span class="color-#4a4a4a text-16 mr-12 ml-8">
              {{ $t("pageData.courseDetail.applicationServiceFee") }}</span
            >
            <span class="color-#4a4a4a text-32">
              ¥
              {{ detail.courseInfo.service_charge_rmb / 1000 }}
            </span>
          </div>
          <!-- 选择入学时间 -->
          <div class="flex items-center">
            <div class="color-#4a4a4a font-bold mr-10">
              {{ $t("pageData.courseDetail.startEnterSchoolYear") }}
            </div>
            <div class="flex">
              <el-radio-group v-model="startEnterSchoolYear">
                <el-radio
                  v-for="item in detail.courseInfo.start_enter_school_year"
                  :value="item"
                >
                  {{ item }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="flex items-center mt-4">
            <div class="color-#4a4a4a font-bold mr-10">
              {{ $t("pageData.courseDetail.startEnterSchoolMonth") }}
            </div>
            <div class="flex">
              <el-radio-group v-model="startEnterSchoolMonth">
                <el-radio
                  v-for="item in detail.courseInfo.start_enter_school_month"
                  :value="item"
                >
                  {{ item + "月" }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 按钮操作 -->
          <div class="flex mt-50">
            <div
              class="btn hover"
              @click.stop="setCommonDialogStatus('seeking-advice', true)"
            >
              {{ $t("other.seekingAdvice.btnText") }}
            </div>
            <div class="btn default" @click.stop="addToBag">
              {{ $t("pageData.courseDetail.addToBag") }}
            </div>
          </div>
          <div class="text-10 color-#4a4a4a mt-10">
            {{ $t("pageData.courseDetail.tip") }}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部模块描述 -->
    <div class="w-full ha">
      <img :src="$t('pageData.courseDetail.module1')" />
      <div class="bg-#f0f0f0 py-40 text-center">
        <div class="mb-36">
          <span class="module-title">
            {{ $t("pageData.courseDetail.module2.title") }}
          </span>
        </div>
        <div
          class="flex flex-wrap justify-center ma w-full max-w-[1280px] mb-12"
        >
          <div
            class="module2-item"
            :style="{ backgroundImage: `url(${item.bgImg})` }"
            v-for="item in decryptData(
              $t('pageData.courseDetail.module2.list')
            )"
          >
            <div class="w-full flex h-90 items-center justify-center">
              <img class="w-80" :src="item.icon" />
            </div>
            <div class="mt-20 font-700 color-#4a4a4a text-16">
              {{ item.title }}
            </div>
            <div class="mt-10 color-#4a4a4a">{{ item.desc }}</div>
          </div>
        </div>
        <div class="text-left w-full ma max-w-[1280px]">
          <div
            class="color-#333 mb-5"
            v-for="(item, index) in decryptData(
              $t('pageData.courseDetail.module2.tips')
            )"
          >
            {{ index + 1 }}. {{ item }}
          </div>
        </div>
      </div>
      <div class="relative">
        <div
          class="absolute top-20 left-50%"
          style="transform: translateX(-50%)"
        >
          <span class="module-title">
            {{ $t("pageData.courseDetail.module3.title1") }}
          </span>
        </div>
        <div
          class="absolute top-[45%] left-50%"
          style="transform: translateX(-50%)"
        >
          <span class="module-title">
            {{ $t("pageData.courseDetail.module3.title2") }}
          </span>
        </div>
        <img :src="$t('pageData.courseDetail.module3.bgImg')" />
      </div>
      <!-- 底部模块 -->
      <div class="relative">
        <div
          class="absolute top-20 left-50%"
          style="transform: translateX(-50%)"
        >
          <span class="module-title">
            {{ $t("pageData.courseDetail.module4.title1") }}
          </span>
        </div>
        <div
          class="absolute top-[62%] left-50% w-860 flex flex-col justify-center items-center"
          style="transform: translateX(-50%)"
        >
          <span class="module-title">
            {{ $t("pageData.courseDetail.module4.title2") }}
          </span>
          <div class="mt-30 color-#545454 text-16 font-550">
            {{ $t("pageData.courseDetail.module4.subTitle2") }}
          </div>
          <div class="mt-24">
            <div
              class="mb-16 tracking-1 line-height-[1.5]"
              v-for="item in decryptData(
                $t('pageData.courseDetail.module4.tips')
              )"
            >
              <span class="color-#545454 text-16 font-bold"
                >{{ item.key }}：</span
              >
              <span class="color-#9b9b9b text-16 font-400">{{
                item.value
              }}</span>
            </div>
          </div>
        </div>
        <img :src="$t('pageData.courseDetail.module4.bgImg')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.btn {
  border-radius: 4px;
  font-size: 17px;
  font-weight: 500;
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
  width: 160px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}
.btn.hover {
  background-color: #545454;
  color: #fff;
}

.btn.default {
  background-color: #ffe256;
  color: #212121;
}

.btn.default:hover {
  background-color: #545454;
  color: #fff;
}

.module-title {
  color: #4a4a4a;
  font-size: 28px;
  font-weight: 700;
  position: relative;
}
.module-title:after {
  background-color: #ffe256;
  bottom: -10px;
  content: "";
  height: 5px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 110%;
}

.module2-item {
  align-items: center;
  background-color: #fff;
  background-position: left 68px bottom 10px;
  background-repeat: no-repeat;
  background-size: 180px;
  border-radius: 4px;
  box-shadow: 0 0 6px 2px #ececec;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 6px 20px;
  min-height: 280px;
  padding: 20px;
  width: 216px;
}
</style>
