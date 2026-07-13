<script setup lang="ts">
import { decryptData } from "#imports";
import { Search, Filter } from "@element-plus/icons-vue";

const { locale } = useI18n();
const router = useRouter();
const { data: filterOptions }: any = await useFetch(
  "/api/web/university/options"
);
const universityList = ref([]);

const paginationData = reactive({
  page_num: 1,
  page_size: 20,
  total: 100,
});

const collapseData = ref(["locations", "IELTS", "qsRanking"]);
const mobileFilterOpen = ref(false);

const filterQuery = reactive({
  name: "",
  ielts: [],
  location_ids: [],
  qs: [],
  sortField: 1,
  sortFunc: 1,
});

function toUniversityDetail(id: string) {
  router.push({
    path: "/university-detail/" + id,
  });
}

function getUniversityList() {
  let queryData: any = {
    ...filterQuery,
    page_num: paginationData.page_num,
    page_size: paginationData.page_size,
  };
  if (!queryData.name.length) {
    delete queryData.name;
  }
  if (!queryData.ielts.length) {
    delete queryData.ielts;
  }
  if (!queryData.location_ids.length) {
    delete queryData.location_ids;
  }
  if (!queryData.qs?.length) {
    delete queryData.qs;
  }

  $fetch("/api/web/university/search", {
    method: "POST",
    body: JSON.stringify(queryData),
  }).then((res) => {
    universityList.value = res.items;
    paginationData.total = res.total;
  });
}

function applyFilters() {
  paginationData.page_num = 1;
  mobileFilterOpen.value = false;
  getUniversityList();
}

watch(
  () => filterQuery,
  () => {
    paginationData.page_num = 1;
    getUniversityList();
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <Breadcrumb
    :breadcrumbList="decryptData($t('pageData.university.breadcrumbList'))"
    is-full
  ></Breadcrumb>
  <div class="university-container">
    <div class="header">
      <div class="text-24 font-bold">{{ $t("pageData.university.title") }}</div>
      <div class="header-controls">
        <div class="search-wrapper">
          <ElInput
            :placeholder="$t('pageData.university.searchPlaceholder')"
            v-model="filterQuery.name"
            size="large"
          >
            <template v-slot:suffix>
              <div
                class="cursor-pointer"
                @click.stop="
                  () => {
                    paginationData.page_num = 1;
                    getUniversityList();
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
                v-for="item in (decryptData($t('pageData.university.sortFieldList') as any))"
                :label="item.label"
                :value="item.value"
              ></ElOption>
            </ElSelect>
          </div>
          <div class="hidden md:block">
            <ElPagination
              background
              layout="prev, pager, next, jumper"
              @change="getUniversityList"
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
          {{ $t("pageData.university.filter.title") }}
        </div>
        <ElCollapse v-model="collapseData">
          <ElCollapseItem
            name="locations"
            :title="$t('pageData.university.filter.locations')"
          >
            <ElCheckboxGroup v-model="filterQuery.location_ids">
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
            name="IELTS"
            :title="$t('pageData.university.filter.IELTS')"
          >
            <ElCheckboxGroup v-model="filterQuery.ielts">
              <div v-for="item in filterOptions.IELTS">
                <ElCheckbox :label="item.name" :value="item.value"></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem
            name="qsRanking"
            :title="$t('pageData.university.filter.qsRanking')"
          >
            <ElCheckboxGroup v-model="filterQuery.qs">
              <div v-for="item in filterOptions.qsRanking">
                <ElCheckbox :label="item.name" :value="item.value"></ElCheckbox>
              </div>
            </ElCheckboxGroup>
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
            name="locations"
            :title="$t('pageData.university.filter.locations')"
          >
            <ElCheckboxGroup v-model="filterQuery.location_ids">
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
            name="IELTS"
            :title="$t('pageData.university.filter.IELTS')"
          >
            <ElCheckboxGroup v-model="filterQuery.ielts">
              <div v-for="item in filterOptions.IELTS">
                <ElCheckbox :label="item.name" :value="item.value"></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem
            name="qsRanking"
            :title="$t('pageData.university.filter.qsRanking')"
          >
            <ElCheckboxGroup v-model="filterQuery.qs">
              <div v-for="item in filterOptions.qsRanking">
                <ElCheckbox :label="item.name" :value="item.value"></ElCheckbox>
              </div>
            </ElCheckboxGroup>
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
            :data="universityList"
            @row-click="
              (v) => {
                toUniversityDetail(v.id);
              }
            "
          >
            <el-table-column
              align="center"
              :label="$t('pageData.university.tableHeader.schoolBadge')"
              width="200"
            >
              <template #default="scope">
                <div class="flex items-center justify-center">
                  <img
                    v-if="scope.row.badgeUrl"
                    class="table-badge"
                    :src="scope.row.badgeUrl"
                  />
                  <img v-else class="w-150" src="/img/text-logo.png" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              :label="$t('pageData.university.tableHeader.university')"
              min-width="160"
            >
            </el-table-column>
            <el-table-column
              prop="qsRanking"
              align="center"
              :label="$t('pageData.university.tableHeader.qsRanking')"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="satisfactionRate"
              :label="$t('pageData.university.tableHeader.satisfactionRate')"
              align="center"
              width="120"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="flex justify-center mt-24 md:hidden">
          <ElPagination
            background
            layout="prev, pager, next"
            @change="getUniversityList"
            v-model:current-page="paginationData.page_num"
            :page-size="paginationData.page_size"
            :total="paginationData.total"
          />
        </div>
        <div class="flex justify-end mt-24 hidden md:flex">
          <ElPagination
            background
            layout="prev, pager, next, jumper"
            @change="getUniversityList"
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
.university-container {
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
    min-width: 600px;
  }
}

.table-badge {
  width: auto;
  max-width: 120px;
  height: auto;
  max-height: 40px;

  @media (min-width: 768px) {
    max-width: 150px;
    max-height: 50px;
  }
}
</style>
