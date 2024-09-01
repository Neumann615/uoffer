<script setup lang="ts">

const {locale} = useI18n()
const {getI18nData} = useI18nData()
const {data: filterOptions} = await useFetch("/api/course/search/options")
const universityList = ref([])

const paginationData = reactive({
  page_num: 1,
  page_size: 20,
  total: 100
})

const collapseData = ref(["levels", "categories", "locations", "universities", "starSchoolMonths", "fees", "other"])

const filterQuery = reactive({
  name: "",
  levels: [],
  categories: [],
  locations: [],
  universities: [],
  starSchoolMonths: [],
  ucasFeeStatus: false,
  paidStatus: false
})

const tuitionFee = ref([filterOptions.value.fees.min, filterOptions.value.fees.max])

function getUniversityList() {
  let queryData: any = {
    ...paginationData,
    ...filterQuery
  }
  if (queryData.ucasFeeStatus) {
    queryData.ucasFeeStatus = 1
  } else {
    delete queryData.ucasFeeStatus
  }
  if (queryData.paidStatus) {
    queryData.paidStatus = 1
  } else {
    delete queryData.paidStatus
  }
  queryData.tuitionFeeMax = tuitionFee.value[1]
  queryData.tuitionFeeMin = tuitionFee.value[0]
  $fetch("/api/course/search", {
    method: "POST",
    body: JSON.stringify(queryData),
  }).then((res) => {
    //拿到数据后手动将英镑转化为对应的人民币
    res.items.forEach((item: any) => {
      if (item.tuition_fee_rmb === 0) {
        item.tuition_fee_rmb = Math.floor(item.tuition_fee_gbp * 9.3)
      }
    })
    universityList.value = res.items
    paginationData.total = res.total
  })
}

watch(() => filterQuery, () => {
  paginationData.page_num = 1
  getUniversityList()
}, {immediate: true, deep: true})


</script>

<template>
  <Breadcrumb :breadcrumbList="decryptData($t('pageData.course.breadcrumbList'))" is-full></Breadcrumb>
  <div class="course-container">
    <div class="header">
      <div class="text-24 font-bold">{{ $t('pageData.course.title') }}</div>
      <div class="flex flex-items-center h-64 gap24">
        <div class="w-225">
          <ElInput size="large"></ElInput>
        </div>
        <div class="flex flex-1 flex-justify-between flex-items-center">
          <ElSelect size="large" style="width: 200px"></ElSelect>
          <ElPagination background layout="prev, pager, next, jumper"
                        @change="getUniversityList"
                        v-model:current-page="paginationData.page_num"
                        :page-size="paginationData.page_size"
                        :total="paginationData.total"/>
        </div>
      </div>
    </div>
    <div class="main flex gap24 h100%">
      <div class="w-225">
        <div class="text-19 mb-26">{{ $t('pageData.course.filter.title') }}</div>
        <ElCollapse v-model="collapseData">
          <ElCollapseItem name="levels" :title="$t('pageData.course.filter.levels')">
            <ElSelect size="large" clearable multiple v-model="filterQuery.levels">
              <ElOption v-for="item in filterOptions.levels" :label="item[locale ==='cn' ? 'name':'enName']"
                        :value="item.id"></ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem name="categories" :title="$t('pageData.course.filter.categories')">
            <ElSelect size="large" clearable multiple v-model="filterQuery.categories">
              <ElOptionGroup v-for="item in filterOptions.categories" :label="item[locale ==='cn' ? 'name':'enName']">
                <ElOption v-for="item2 in item.subs" :label="item2[locale ==='cn' ? 'name':'enName']"
                          :value="item2.id"></ElOption>
              </ElOptionGroup>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem name="locations" :title="$t('pageData.course.filter.locations')">
            <ElCheckboxGroup v-model="filterQuery.locations">
              <div v-for="item in filterOptions.locations">
                <ElCheckbox
                    :label="item[locale === 'cn'?'locationNameChinese':'locationName']"
                    :value="item.id"></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem name="universities" :title="$t('pageData.course.filter.universities')">
            <ElSelect size="large" clearable multiple v-model="filterQuery.universities">
              <ElOption v-for="item in filterOptions.universities"
                        :label="item[locale === 'cn'?'chinese_name':'english_name']"
                        :value="item.id"></ElOption>
            </ElSelect>
          </ElCollapseItem>
          <ElCollapseItem name="starSchoolMonths"
                          :title="$t('pageData.course.filter.starSchoolMonths')">
            <ElCheckboxGroup v-model="filterQuery.starSchoolMonths">
              <div v-for="item in filterOptions.starSchoolMonths">
                <ElCheckbox
                    :label="item[locale === 'cn'?'name':'enName']"
                    :value="item.value"></ElCheckbox>
              </div>
            </ElCheckboxGroup>
          </ElCollapseItem>
          <ElCollapseItem name="fees" :title="$t('pageData.course.filter.fees')">
            <div class="pl-16 pr-16">
              <ElSlider range
                        size="small"
                        @change="getUniversityList"
                        input-size="small"
                        :min="filterOptions.fees.min"
                        :max="filterOptions.fees.max"
                        v-model="tuitionFee"/>
              <div class="flex flex-items-center justify-center">
                <ElStatistic value-style="font-size:13px;" :value="tuitionFee[0]">
                  <template #prefix>
                    <div class="text-13"> {{ '£' }}</div>
                  </template>
                </ElStatistic>
                <div class="ma4">
                  -
                </div>
                <ElStatistic value-style="font-size:13px;" :value="tuitionFee[1]">
                  <template #prefix>
                    <div class="text-13"> {{ '£' }}</div>
                  </template>
                </ElStatistic>
              </div>
            </div>
          </ElCollapseItem>
          <ElCollapseItem name="other" :title="$t('pageData.course.filter.other')">
            <ElCheckbox v-model="filterQuery.ucasFeeStatus">
              {{ $t('pageData.course.filter.ucasFeeStatus') }}
              <ElTooltip popper-class="w-300" placement="top-end"
                         :content="$t('pageData.course.filter.ucasFeeDescription')">
                <ElButton size="small">问题</ElButton>
              </ElTooltip>
            </ElCheckbox>
            <ElCheckbox v-model="filterQuery.paidStatus"
                        :label="$t('pageData.course.filter.paidStatus')"></ElCheckbox>
          </ElCollapseItem>
        </ElCollapse>
      </div>
      <div class="flex-1 w-1">
        <el-table size="large" :data="universityList">
          <el-table-column :prop="'course_level_'+locale+'_name'" :label="$t('pageData.course.tableHeader.university')"
                           width="220">
            <template #default="scope">
              <img style="width:auto;max-width: 150px;height: auto;max-height: 50px"
                   :src="scope.row.university_badge"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('pageData.course.tableHeader.course')" width="300">
            <template #default="scope">
              <div class="font-bold mb-4">{{ scope.row['course_' + locale + '_name'] }}</div>
              <div>{{ scope.row['university_' + locale + '_name'] }}</div>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              :label="$t('pageData.course.tableHeader.courseType')">
            <template #default="scope">
              <div class="text-15 font-bold">{{ scope.row['course_level_' + locale + '_name'] }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('pageData.course.tableHeader.tuition')" align="right" width="200">
            <template #default="scope">
              <ElStatistic value-style="font-size:15px;"
                           :value=" scope.row[locale === 'cn' ?'tuition_fee_rmb' : 'tuition_fee_gbp']">
                <template #prefix>
                  <div class="text-14"> {{ locale === 'cn' ? '¥' : '£' }}</div>
                </template>
              </ElStatistic>
            </template>
          </el-table-column>
          <el-table-column :label="$t('pageData.course.tableHeader.unitPrice')" align="right" width="400">
            <template #default="scope">
              <ElStatistic value-style="font-size:15px;" :value="scope.row[locale === 'cn' ?
                    'service_charge_rmb' : 'service_charge_gbp']">
                <template #prefix>
                  <div class="text-14"> {{ locale === 'cn' ? '¥' : '£' }}</div>
                </template>
              </ElStatistic>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end mt-24">
          <ElPagination background layout="prev, pager, next, jumper"
                        @change="getUniversityList"
                        v-model:current-page="paginationData.page_num"
                        :page-size="paginationData.page_size"
                        :total="paginationData.total"/>
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
  padding: 0 36px 200px;
  width: 100%;

  ::v-deep(.el-collapse-item__content) {
    padding-bottom: 16px;
  }
}
</style>
