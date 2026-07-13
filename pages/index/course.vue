<script setup lang="ts">
import { decryptData } from "#imports";
import { QuestionFilled, Search, Filter } from "@element-plus/icons-vue";

const route = useRoute();
const { locale } = useI18n();
const { data: filterOptions } = await useFetch(
  "/api/web/course/search/options"
);
const courseList = ref([]);
const router = useRouter();
const paginationData = reactive({
  page_num: 1,
  page_size: 20,
  total: 0,
});

const mobileFilterOpen = ref(false);

const courseCategories = computed(() => {
  const dataList: Array<CourseSearchCategoryItem> = [];
  filterOptions.value.categories.forEach((item: CourseSearchCategoryItem) => {
    dataList.push(item);
    if (item.subs?.length) {
      item.subs.forEach((item2: CourseSearchCategoryItem) => {
        dataList.push(item2);
      });
    }
  });
  return dataList;
});

const collapseData = ref([
  "levels",
  "categories",
  "locations",
  "universities",
  "starSchoolMonths",
  "fees",
  "other",
]);

const filterQuery = reactive<any>({
  name: "",
  levels: [],
  categories: [],
  locations: [],
  universities: [],
  starSchoolMonths: [],
  ucasFeeStatus: false,
  paidStatus: false,
  sortField: 1,
});

const tuitionFee = ref([
  filterOptions.value.fees.min,
  filterOptions.value.fees.max,
]);

function toCourseDetail(id: string) {
  router.push({
    path: "/course-detail/" + id,
  });
}

function getCourseList() {
  let queryData: any = {
    ...filterQuery,
    page_num: paginationData.page_num,
    page_size: paginationData.page_size,
    sortFunc: 1,
  };
  if (!queryData.name.length) {
    delete queryData.name;
  }
  if (!queryData.categories.length) {
    delete queryData.categories;
  }
  if (!queryData.levels.length) {
    delete queryData.levels;
  }
  if (!queryData.locations?.length) {
    delete queryData.locations;
  }
  if (!queryData.starSchoolMonths?.length) {
    delete queryData.starSchoolMonths;
  }
  if (!queryData.universities?.length) {
    delete queryData.universities;
  }
  queryData.tuitionFeeMax = tuitionFee.value[1];
  if (tuitionFee.value[0] !== filterOptions.value.fees.min) {
    queryData.tuitionFeeMin = tuitionFee.value[0];
  }
  if (queryData.ucasFeeStatus) {
    queryData.ucasFeeStatus = 1;
  } else {
    delete queryData.ucasFeeStatus;
  }
  if (queryData.paidStatus) {
    queryData.paidStatus = 1;
  } else {
    delete queryData.paidStatus;
  }

  $fetch("/api/web/course/search", {
    method: "POST",
    body: JSON.stringify(queryData),
  }).then((res) => {
    res.items.forEach((item: any) => {
      if (item.tuition_fee_rmb === 0) {
        item.tuition_fee_rmb = Math.floor(item.tuition_fee_gbp * 9.3);
      }
    });
    courseList.value = res.items;
    paginationData.total = res.total;
  });
}

function applyFilters() {
  paginationData.page_num = 1;
  mobileFilterOpen.value = false;
  getCourseList();
}

watch(
  () => filterQuery,
  () => {
    paginationData.page_num = 1;
    getCourseList();
  },
  { immediate: true, deep: true }
);

watch(
  () => route.fullPath,
  () => {
    const { level, categories } = route.query;
    if (level?.length) {
      filterQuery.levels = [Number(level)];
    }
    if (categories?.length) {
      filterQuery.categories = (categories as string)
        .split(",")
        .map((item) => Number(item));
    }
  },
  { immediate: true }
);
</script>

<template>
  <Breadcrumb
    :breadcrumbList="decryptData($t('pageData.course.breadcrumbList'))"
    is-full
  ></Breadcrumb>
  <div class="course-container">
    <div class="header">
      <div class="text-24 font-bold">{{ $t("pageData.course.title") }}</div>
      <div class="header-controls">
        <div class="search-wrapper">
          <ElInput
            :placeholder="$t('pageData.course.searchPlaceholder')"
            v-model="filterQuery.name"
            size="large"
          >
            <template v-slot:suffix>
              <div
                class="cursor-pointer"
                @click.stop="
                  () => {
                    paginationData.page_num = 1;
                    getCourseList();
                  }
                "
              >
                <el-icon>
                  <Search></Search>
                </el-icon>
              </div>
            </template>
          </ElInput>
        </div>
        <div class="sort-wrapper">
          <div class="sort-box">
            <div class="sort-label">分类</div>
            <ElSelect style="width: 160px" v-model="filterQuery.sortField">
              <ElOption
                v-for="item in (decryptData($t('pageData.course.sortFieldList') as any))"
                :label="item.label"
                :value="item.value"
              ></ElOption>
            </ElSelect>
          </div>
          <div class="hidden md:block">
            <ElPagination
              background
              layout="prev, pager, next, jumper"
              @change="getCourseList"
              v-model:current-page="paginationData.page_num"
              :page-size="paginationData.page_size"
              :total="paginationData.total"
            />
          </div>
        </div>
        <!-- Mobile filter button -->
        <div class="md:hidden">
          <ElButton @click="mobileFilterOpen = true" :icon="Filter">
            筛选
          </ElButton>
        </div>
      </div>
    </div>

    <div class="main">
      <!-- Desktop Sidebar -->
      <div class="sidebar hidden md:block">
        <div class="filter-title">
          {{ $t("pageData.course.filter.title") }}
        </div>
        <ElCollapse v-model="collapseData">
          <ElCollapseItem
            name="levels"
            :title="$t('pageData.course.filter.levels')"
          >
            <ElSelect
              size="large"
              clearable
              multiple
              v-model="filterQuery.levels"
            >
              <ElOption
                v-for="item in filterOptions.levels"
                :label="item[locale === 'cn' ? 'name' : 'enName']"
                :value="item.id"
              ></ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem
            name="categories"
            :title="$t('pageData.course.filter.categories')"
          >
            <ElSelect
              size="large"
              clearable
              multiple
              v-model="filterQuery.categories"
            >
              <ElOption
                v-for="item in courseCategories"
                :value="item.id"
                :label="item[locale === 'cn' ? 'name' : 'enName']"
              >
                <div :class="item.level === 1 ? 'font-550' : ''">
                  {{ item[locale === "cn" ? "name" : "enName"] }}
                  {{ item.level !== 1 ? "(" + item.course_nums + ")" : "" }}
                </div>
              </ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem
            name="locations"
            :title="$t('pageData.course.filter.locations')"
          >
            <ElCheckboxGroup v-model="filterQuery.locations">
              <div v-for="item in filterOptions.locations">
                <ElCheckbox
                  :label="
                    item[
                      locale === 'cn' ? 'locationNameChinese' : 'locationName'
                    ]
                  "
                  :value="item.id"
                ></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem
            name="universities"
            :title="$t('pageData.course.filter.universities')"
          >
            <ElSelect
              size="large"
              clearable
              multiple
              v-model="filterQuery.universities"
            >
              <ElOption
                v-for="item in filterOptions.universities"
                :label="item[locale === 'cn' ? 'chinese_name' : 'english_name']"
                :value="item.id"
              ></ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem
            name="starSchoolMonths"
            :title="$t('pageData.course.filter.starSchoolMonths')"
          >
            <ElCheckboxGroup v-model="filterQuery.starSchoolMonths">
              <div v-for="item in filterOptions.starSchoolMonths">
                <ElCheckbox
                  :label="item[locale === 'cn' ? 'name' : 'enName']"
                  :value="item.value"
                ></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem
            name="fees"
            :title="$t('pageData.course.filter.fees')"
          >
            <div class="pl-16 pr-16">
              <ElSlider
                range
                size="small"
                @change="getCourseList"
                input-size="small"
                :min="filterOptions.fees.min"
                :max="filterOptions.fees.max"
                v-model="tuitionFee"
              />
              <div class="flex flex-items-center justify-center">
                <ElStatistic
                  value-style="font-size:13px;"
                  :value="tuitionFee[0]"
                >
                  <template #prefix>
                    <div class="text-13">{{ "£" }}</div>
                  </template>
                </ElStatistic>
                <div class="ma4">-</div>
                <ElStatistic
                  value-style="font-size:13px;"
                  :value="tuitionFee[1]"
                >
                  <template #prefix>
                    <div class="text-13">{{ "£" }}</div>
                  </template>
                </ElStatistic>
              </div>
            </div>
          </ElCollapseItem>
          <ElCollapseItem
            name="other"
            :title="$t('pageData.course.filter.other')"
          >
            <ElCheckbox v-model="filterQuery.ucasFeeStatus">
              {{ $t("pageData.course.filter.ucasFeeStatus") }}
              <ElTooltip
                popper-class="w-320"
                effect="light"
                placement="top-end"
                :content="$t('pageData.course.filter.ucasFeeDescription')"
              >
                <el-icon><QuestionFilled /></el-icon>
              </ElTooltip>
            </ElCheckbox>
            <ElCheckbox
              v-model="filterQuery.paidStatus"
              :label="$t('pageData.course.filter.paidStatus')"
            ></ElCheckbox>
          </ElCollapseItem>
        </ElCollapse>
      </div>

      <!-- Mobile Filter Drawer -->
      <ElDrawer
        v-model="mobileFilterOpen"
        direction="ltr"
        size="85%"
        title="筛选条件"
      >
        <ElCollapse v-model="collapseData">
          <ElCollapseItem
            name="levels"
            :title="$t('pageData.course.filter.levels')"
          >
            <ElSelect
              size="large"
              clearable
              multiple
              v-model="filterQuery.levels"
            >
              <ElOption
                v-for="item in filterOptions.levels"
                :label="item[locale === 'cn' ? 'name' : 'enName']"
                :value="item.id"
              ></ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem
            name="categories"
            :title="$t('pageData.course.filter.categories')"
          >
            <ElSelect
              size="large"
              clearable
              multiple
              v-model="filterQuery.categories"
            >
              <ElOption
                v-for="item in courseCategories"
                :value="item.id"
                :label="item[locale === 'cn' ? 'name' : 'enName']"
              >
                <div :class="item.level === 1 ? 'font-550' : ''">
                  {{ item[locale === "cn" ? "name" : "enName"] }}
                  {{ item.level !== 1 ? "(" + item.course_nums + ")" : "" }}
                </div>
              </ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem
            name="locations"
            :title="$t('pageData.course.filter.locations')"
          >
            <ElCheckboxGroup v-model="filterQuery.locations">
              <div v-for="item in filterOptions.locations">
                <ElCheckbox
                  :label="
                    item[
                      locale === 'cn' ? 'locationNameChinese' : 'locationName'
                    ]
                  "
                  :value="item.id"
                ></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem
            name="universities"
            :title="$t('pageData.course.filter.universities')"
          >
            <ElSelect
              size="large"
              clearable
              multiple
              v-model="filterQuery.universities"
            >
              <ElOption
                v-for="item in filterOptions.universities"
                :label="item[locale === 'cn' ? 'chinese_name' : 'english_name']"
                :value="item.id"
              ></ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem
            name="starSchoolMonths"
            :title="$t('pageData.course.filter.starSchoolMonths')"
          >
            <ElCheckboxGroup v-model="filterQuery.starSchoolMonths">
              <div v-for="item in filterOptions.starSchoolMonths">
                <ElCheckbox
                  :label="item[locale === 'cn' ? 'name' : 'enName']"
                  :value="item.value"
                ></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem
            name="fees"
            :title="$t('pageData.course.filter.fees')"
          >
            <div class="pl-16 pr-16">
              <ElSlider
                range
                size="small"
                :min="filterOptions.fees.min"
                :max="filterOptions.fees.max"
                v-model="tuitionFee"
              />
              <div class="flex flex-items-center justify-center">
                <ElStatistic value-style="font-size:13px;" :value="tuitionFee[0]">
                  <template #prefix>
                    <div class="text-13">£</div>
                  </template>
                </ElStatistic>
                <div class="ma4">-</div>
                <ElStatistic value-style="font-size:13px;" :value="tuitionFee[1]">
                  <template #prefix>
                    <div class="text-13">£</div>
                  </template>
                </ElStatistic>
              </div>
            </div>
          </ElCollapseItem>
        </ElCollapse>
        <div class="mt-24">
          <ElButton type="primary" @click="applyFilters" class="w-full">
            应用筛选
          </ElButton>
        </div>
      </ElDrawer>

      <!-- Table area -->
      <div class="table-area">
        <div class="table-scroll">
          <el-table
            size="large"
            :data="courseList"
            @row-click="
              (v) => {
                toCourseDetail(v.course_id);
              }
            "
          >
            <el-table-column
              :prop="'course_level_' + locale + '_name'"
              :label="$t('pageData.course.tableHeader.university')"
              width="220"
            >
              <template #default="scope">
                <img
                  style="
                    width: auto;
                    max-width: 150px;
                    height: auto;
                    max-height: 50px;
                  "
                  :src="scope.row.university_badge"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('pageData.course.tableHeader.course')"
              min-width="200"
            >
              <template #default="scope">
                <div class="font-bold mb-4">
                  {{ scope.row["course_" + locale + "_name"] }}
                </div>
                <div>{{ scope.row["university_" + locale + "_name"] }}</div>
              </template>
            </el-table-column>
            <el-table-column
              min-width="100"
              align="center"
              :label="$t('pageData.course.tableHeader.courseType')"
            >
              <template #default="scope">
                <div class="text-15 font-bold">
                  {{ scope.row["course_level_" + locale + "_name"] }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pageData.course.tableHeader.tuition')"
              align="right"
              width="160"
            >
              <template #default="scope">
                <ElStatistic
                  value-style="font-size:15px;"
                  :value="
                    scope.row[
                      locale === 'cn' ? 'tuition_fee_rmb' : 'tuition_fee_gbp'
                    ]
                  "
                >
                  <template #prefix>
                    <div class="text-14">{{ locale === "cn" ? "¥" : "£" }}</div>
                  </template>
                </ElStatistic>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('pageData.course.tableHeader.unitPrice')"
              align="right"
              width="180"
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
        </div>
        <div class="flex justify-center mt-24 md:hidden">
          <ElPagination
            background
            layout="prev, pager, next"
            @change="getCourseList"
            v-model:current-page="paginationData.page_num"
            :page-size="paginationData.page_size"
            :total="paginationData.total"
          />
        </div>
        <div class="flex justify-end mt-24 hidden md:flex">
          <ElPagination
            background
            layout="prev, pager, next, jumper"
            @change="getCourseList"
            v-model:current-page="paginationData.page_num"
            :page-size="paginationData.page_size"
            :total="paginationData.total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.course-container {
  box-sizing: border-box;
  height: 100%;
  margin-top: 16px;
  padding: 0 16px 200px;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 36px 200px;
  }

  ::v-deep(.el-collapse-item__content) {
    padding-bottom: 16px;
  }
}

.header {
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 8px;
  }
}

.header-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
}

.search-wrapper {
  width: 100%;

  @media (min-width: 768px) {
    width: 225px;
  }
}

.sort-wrapper {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.sort-box {
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  padding: 8px;

  .sort-label {
    color: #909399;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
  }
}

.main {
  display: flex;
  gap: 24px;
  height: 100%;
}

.sidebar {
  width: 225px;
  flex-shrink: 0;
}

.filter-title {
  font-size: 19px;
  margin-bottom: 26px;
}

.table-area {
  flex: 1;
  min-width: 0;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ::v-deep(.el-table) {
    min-width: 700px;
  }
}
</style>
