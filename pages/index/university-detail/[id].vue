<script lang="ts" setup>
import {
  Burger,
  Orange,
  Pear,
  Search,
  Sugar,
  Watermelon,
} from "@element-plus/icons-vue";
import type { UniversityDetail } from "~/type/university";

const route = useRoute();
const router = useRouter();
const detail = ref<UniversityDetail>();
const { locale } = useI18n();
const currentModule = ref<"course" | "desc">("desc");
const courseActiveName = ref("所有课程");
const universityCourseList = ref([]);
const name = ref("");
const paginationData = reactive({
  page_num: 1,
  page_size: 20,
  total: 0,
});

const courseTabs = [
  {
    label: "所有课程",
    queryData: {},
  },
  {
    label: "本科课程",
    queryData: {
      levels: [2],
    },
  },
  {
    label: "硕士课程",
    queryData: {
      levels: [4],
    },
  },
  {
    label: "博士课程",
    queryData: {
      levels: [5],
    },
  },
];

function toCourseDetail(id: string) {
  router.push({
    path: "/course-detail/" + id,
  });
}

async function loadUniversityInfo() {
  let res = await useFetch("/api/university/detail", {
    params: {
      id: route.params.id,
    },
  });
  detail.value = res.data.value;
}

async function loadUniversityCourse() {
  if (!route.params.id) {
    return;
  }
  let queryData: any = {
    page_num: paginationData.page_num,
    page_size: paginationData.page_size,
    sortFunc: 1,
    universities: [Number(route.params.id)],
  };
  if (name.value?.length) {
    queryData.name = name.value;
  }
  courseTabs.forEach((item) => {
    if (item.label === courseActiveName.value) {
      queryData = Object.assign(queryData, item.queryData);
    }
  });
  $fetch("/api/web/course/search", {
    method: "POST",
    body: JSON.stringify(queryData),
  }).then((res) => {
    //拿到数据后手动将英镑转化为对应的人民币
    if (res.items?.length) {
      res.items.forEach((item: any) => {
        if (item.tuition_fee_rmb === 0) {
          item.tuition_fee_rmb = Math.floor(item.tuition_fee_gbp * 9.3);
        }
      });
    }
    universityCourseList.value = res.items || [];
    paginationData.total = res.total || 0;
  });
}

const debounceLoadUniversityCourse = useDebounceFn(loadUniversityCourse, 1000);

loadUniversityInfo();

watch(currentModule, () => {
  if (currentModule.value === "course") {
    paginationData.page_num = 1;
    paginationData.page_size = 20;
    paginationData.total = 0;
    loadUniversityCourse();
  }
});

watch(courseActiveName, () => {
  loadUniversityCourse();
});
</script>
<template>
  <div v-if="detail">
    <Breadcrumb
      :is-full="true"
      :breadcrumbList="[
        ...decryptData($t('pageData.universityDetail.breadcrumbList')),
        {
          label: locale === 'cn' ? detail.chinese_name : detail.english_name,
        },
      ]"
    ></Breadcrumb>
    <div class="mt-24">
      <!-- 学校logo -->
      <div class="w-[800px] ma mb-24">
        <div class="flex justify-between items-center mb-36 px-24">
          <img class="w-250" :src="detail.badge_url" />
          <div>
            <div class="mb-20 text-16 color-#545454">Qs世界大学排名</div>
            <div class="text-20 color-[rgba(0,0,0,.6)]">
              {{ detail.qs_ranking }}
            </div>
          </div>
        </div>
        <div>
          <img class="w-full" :src="detail.university_image_url" />
        </div>
      </div>
      <!-- tab栏 -->
      <div
        class="w-full bg-#f8f8f8 h-60 mb-24 relative flex items-center justify-center"
      >
        <div
          class="flex-1 h-full"
          style="border-bottom: 1px solid #e4e7ed"
        ></div>
        <div
          :style="{
            borderBottom:
              currentModule === 'desc'
                ? '1px solid transparent'
                : '1px solid #e4e7ed',
          }"
          @click.stop="currentModule = 'desc'"
          :class="currentModule === 'desc' ? 'is-active' : ''"
          class="w-300 h-full flex justify-center items-center cursor-pointer color-#909399 hover:color-#545454 box-border"
        >
          简介
        </div>
        <div
          :style="{
            borderBottom:
              currentModule === 'course'
                ? '1px solid transparent'
                : '1px solid #e4e7ed',
          }"
          @click.stop="currentModule = 'course'"
          :class="currentModule === 'course' ? 'is-active' : ''"
          class="w-300 h-full flex justify-center items-center cursor-pointer color-#909399 hover:color-#545454 box-border"
        >
          课程名称
        </div>
        <div
          class="flex-1 h-full"
          style="border-bottom: 1px solid #e4e7ed"
        ></div>
      </div>
      <!-- 内容详情 -->
      <div class="w-1166 ma">
        <div v-if="currentModule === 'desc'" class="flex">
          <div class="w-[62.5%] pr-40">
            <div
              class="line-height-[1.4] tracking-[1px]"
              v-html="
                locale === 'cn'
                  ? detail.chinese_introduction
                  : detail.english_introduction
              "
            ></div>
          </div>
          <div class="flex-1 pl-40" style="border-left: 2px solid #dfdfdf">
            <div class="flex mb-5 items-center justify-between">
              <div class="flex items-center gap-8">
                <el-icon color="#ffe256" size="24">
                  <Pear></Pear>
                </el-icon>
                <div>预估生活费</div>
              </div>
              <div class="color-#545454">
                £ {{ (detail.living_expenses / 100).toFixed(1) }}
              </div>
            </div>
            <div class="flex mb-5 items-center justify-between">
              <div class="flex items-center gap-8">
                <el-icon color="#ffe256" size="24">
                  <Sugar></Sugar>
                </el-icon>
                <div>雅思最低要求</div>
              </div>
              <div class="color-#545454">
                {{ detail.ielts_min_requirement }}
              </div>
            </div>
            <div class="flex mb-5 items-center justify-between">
              <div class="flex items-center gap-8">
                <el-icon color="#ffe256" size="24">
                  <Burger></Burger>
                </el-icon>
                <div>就业率</div>
              </div>
              <div class="color-#545454">{{ detail.is_for_cas }} %</div>
            </div>
            <div class="flex mb-5 items-center justify-between">
              <div class="flex items-center gap-8">
                <el-icon color="#ffe256" size="24">
                  <Watermelon></Watermelon>
                </el-icon>
                <div>学生满意度</div>
              </div>
              <div class="color-#545454">{{ detail.satisfaction_rate }} %</div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-8">
                <el-icon color="#ffe256" size="24">
                  <Orange></Orange>
                </el-icon>
                <div class="line-height-[1]">国际留学生比例</div>
              </div>
              <div class="color-#545454">
                {{ detail.international_students_rate }} %
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="currentModule === 'course'">
          <el-tabs v-model="courseActiveName" class="course-tabs">
            <el-tab-pane
              v-for="item in courseTabs"
              :label="item.label"
              :name="item.label"
            >
            </el-tab-pane>
          </el-tabs>
          <div class="flex justify-between py-12">
            <el-input
              placeholder="搜索"
              v-model="name"
              @input="debounceLoadUniversityCourse"
              style="width: 260px"
              size="large"
              :suffix-icon="Search"
            ></el-input>
            <ElPagination
              background
              layout="prev, pager, next, jumper"
              @change="loadUniversityCourse"
              v-model:current-page="paginationData.page_num"
              :page-size="paginationData.page_size"
              :total="paginationData.total"
            />
          </div>
          <el-table
            size="large"
            :data="universityCourseList"
            @row-click="
              (v) => {
                toCourseDetail(v.course_id);
              }
            "
          >
            <el-table-column
              prop="name"
              align="center"
              class-name="cursor-pointer"
              :label="$t('pageData.universityDetail.tableHeader.course')"
            >
              <template #default="scope">
                <div class="text-left">
                  <div class="font-bold mb-4">
                    {{ scope.row["course_" + locale + "_name"] }}
                  </div>
                  <div>{{ scope.row["university_" + locale + "_name"] }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              class-name="cursor-pointer"
              min-width="100"
              align="center"
              :label="$t('pageData.universityDetail.tableHeader.courseType')"
            >
              <template #default="scope">
                <div class="text-15 font-bold">
                  {{ scope.row["course_level_" + locale + "_name"] }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              class-name="cursor-pointer"
              :label="$t('pageData.universityDetail.tableHeader.unitPrice')"
              width="300"
              align="center"
            >
              <template #default="scope">
                <ElStatistic
                  value-style="font-size:15px;"
                  :value="
                    scope.row[
                      locale === 'cn'
                        ? 'service_charge_rmb'
                        : 'service_charge_gbp'
                    ]
                  "
                >
                  <template #prefix>
                    <div class="text-14">{{ locale === "cn" ? "¥" : "£" }}</div>
                  </template>
                </ElStatistic>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex justify-end mt-24">
            <ElPagination
              background
              layout="prev, pager, next, jumper"
              @change="loadUniversityCourse"
              v-model:current-page="paginationData.page_num"
              :page-size="paginationData.page_size"
              :total="paginationData.total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.is-active {
  border: 1px solid #dcdfe6;
  border-top: none;
  border-bottom: none;
  box-shadow: inset 0 10px 20px #efeff3;
  color: #545454;
}

.course-tabs {
  :deep .el-tabs__nav-wrap {
    display: flex;
    justify-content: center;
  }
}
</style>
