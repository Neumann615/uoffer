<script setup lang="ts">

const {data: rankingBanner} = await useFetch("/api/cms/banner", {
  params: {
    position: 3,
  },
})
const {data: _levelData} = await useFetch('/api/ranking/level')
const {locale} = useI18n()
const {getI18nData} = useI18nData()
const nowRankingType = ref(1)
const levelData = computed(() => _levelData.value.list[0])
//当前分页
const pageNum = ref(1)
const pageSize = 25
const pageCount = ref(1)
//当前年份
const year = ref(levelData.value.year_list[0])
//学校列表
const universityList = ref([])

//当前专业关键字
const word = ref(levelData.value.word_list[0])
//学校分类列表
const universityCategories = ref([])

//是否浏览排名详情
const reviewDetailData: any = ref({})
//分类下的学校
const categoryUniversityParams = reactive({
  pageNum: 1,
  pageSize: 25,
  pageCount: 1
})
const categoryUniversityList = ref([])

//获取学校数据
function getUniversityData() {
  useFetch("/api/ranking/year", {
    params: {
      page_num: pageNum.value,
      page_size: pageSize,
      year: year.value,
      level_id: 8,
    }
  }).then((res) => {
    pageCount.value = Math.ceil(res.data.value.total / pageSize)
    universityList.value = res.data.value.list
  })
}

//获取学校分类
function getUniversityCategories() {
  useFetch('/api/ranking/category', {
    params: {
      page_num: 1,
      page_size: 999,
      word: word.value,
      level_id: 8,
    }
  }).then((res) => {
    universityCategories.value = res.data.value.list
  })
}

//获取分类下的学校
function getCategoryUniversityList() {
  useFetch('/api/ranking/category/university', {
    params: {
      page_num: categoryUniversityParams.pageNum,
      page_size: categoryUniversityParams.pageSize,
      ranking_list_id: reviewDetailData.value.id
    }
  }).then(res => {
    categoryUniversityParams.pageCount = Math.ceil(res.data.value.total / pageSize)
    categoryUniversityList.value = res.data.value.list
  })
}

watch(() => reviewDetailData.value.id, getCategoryUniversityList, {immediate: false})

getUniversityData()
getUniversityCategories()
</script>

<template>
  <Breadcrumb :breadcrumbList="decryptData($t('pageData.ranking.breadcrumbList'))"></Breadcrumb>
  <ElCarousel autoplay>
    <img
        v-for="(item, index) in rankingBanner.list"
        :src="getI18nData(item, 'image_url')"
    />
  </ElCarousel>
  <div class="tab-container">
    <div class="tab">
      <div class="tab-item"
           @click.stop="nowRankingType=1"
           :class="{active:nowRankingType===1}"
      >
        {{ levelData[locale === 'cn' ? 'year_display_chinese_name' : 'year_display_english_name'] }}
      </div>
      <div class="tab-item"
           @click.stop="nowRankingType=2"
           :class="{active:nowRankingType===2}"
      >
        {{ levelData[locale === 'cn' ? 'category_display_chinese_name' : 'category_display_english_name'] }}
      </div>
    </div>
    <div v-show="nowRankingType===1" class="tab-content">
      <div class="tab-title">
        {{ levelData[locale === 'cn' ? 'year_display_chinese_name' : 'year_display_english_name'] }}
      </div>
      <div class="tab-intro">
        {{ levelData[locale === 'cn' ? 'chinese_description' : 'english_description'] }}
      </div>
      <div class="ranking-dates">
        <div class="ranking-year">
          <div class="ranking-year-item" :class="{active:year===item}" @click="()=>{
            year=item
            getUniversityData()
          }"
               v-for="(item,index) in levelData['year_list']">
            {{
              item + (levelData['year_list'].length - 1 > index ? " /" : "")
            }}
          </div>
        </div>
          <ElPagination
              @change="getUniversityData"
              v-model:current-page="pageNum"
              :page-count="pageCount"
          />
      </div>
      <div class="table-content">
        <div class="table-header">
          <div class="header-item font-ST number">
            {{ levelData[locale === 'cn' ? 'year_display_chinese_name' : 'year_display_english_name'] }}
          </div>
          <div class="header-item font-ST logo">{{ $t('pageData.ranking.universityLogo') }}</div>
          <div class="header-item font-ST university-name">
            {{ $t('pageData.ranking.universityLogo') }}
          </div>
          <div class="header-item font-ST button-wrapper"></div>
        </div>
        <div class="table-list" v-for="(item,index) in universityList">
          <div class="number">{{ item.qs_ranking }}</div>
          <div class="logo">
            <img :src="item.badge_url">
          </div>
          <div class="font-ST university-name">
            {{ item[locale === 'cn' ? 'chinese_name' : 'english_name'] }}
          </div>
          <div>
            <div class="contact-btn font-ST">
              我要咨询
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-show="nowRankingType===2" class="tab-content">
      <div v-show="!reviewDetailData.id">
        <div class="tab-title">
          {{ levelData[locale === 'cn' ? 'category_display_chinese_name' : 'category_display_english_name'] }}
        </div>
        <div class="ranking-dates">
          <div class="ranking-year">
            <div class="ranking-year-item" :class="{active:word===item}" @click="()=>{
            word=item
            getUniversityCategories()
          }"
                 v-for="(item,index) in levelData['word_list']">
              {{
                item + (levelData['word_list'].length - 1 > index ? " /" : "")
              }}
            </div>
          </div>
        </div>
        <div class="table-content">
          <div class="table-list" v-for="(item,index) in universityCategories">
            <div class="icon">
              <img src="/img/ranking/university-icon.png">
            </div>
            <div class="course-name">
              {{ item[locale === 'cn' ? 'chinese_name' : 'english_name'] }}
            </div>
            <div>
              <div class="contact-btn font-ST" @click="reviewDetailData=item">
                浏览
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="reviewDetailData.id">
        <div class="tab-title flex" style="align-items: center;">
          <img src="/img/ranking/back.png" class="w-32px mr-12px cursor-pointer" @click="reviewDetailData={}"/>
          {{ reviewDetailData[locale === 'cn' ? 'chinese_name' : 'english_name'] }}
        </div>
        <div class="ranking-dates">
          <div class="ranking-year">
          </div>
          <div>
            <ElPagination
                @change="getCategoryUniversityList"
                v-model:current-page="categoryUniversityParams.pageNum"
                :page-count="categoryUniversityParams.pageCount"
                size="large"
                show-quick-jumper
            />
          </div>
        </div>
        <div class="table-content">
          <div class="table-header">
            <div class="header-item font-ST number">
              {{ levelData[locale === 'cn' ? 'year_display_chinese_name' : 'year_display_english_name'] }}
            </div>
            <div class="header-item font-ST logo">{{ $t('pageData.ranking.universityLogo') }}</div>
            <div class="header-item font-ST university-name">
              {{ $t('pageData.ranking.universityLogo') }}
            </div>
            <div class="header-item font-ST button-wrapper"></div>
          </div>
          <div class="table-list" v-for="(item,index) in categoryUniversityList">
            <div class="number">{{ item.qs_ranking }}</div>
            <div class="logo">
              <img :src="item.badge_url">
            </div>
            <div class="font-ST university-name">
              {{ item[locale === 'cn' ? 'chinese_name' : 'english_name'] }}
            </div>
            <div>
              <div class="contact-btn font-ST">
                我要咨询
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.font-ST {
  font-family: STSongti-SC-Regular, STSongti-SC !important;
}

.tab-container {

  margin-bottom: 140px;
}

.tab {
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: center;
  margin: 0 auto;
  max-width: 1060px;
  box-sizing: border-box;
  background-color: #f8f7f5;

  &-item {
    background: 0 0;
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: 0 !important;
    border-top: none;
    color: rgba(0, 0, 0, .87);
    cursor: pointer;
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    line-height: 64px;
    border-bottom: 1px solid #dcdcdc;
  }

  &-item.active {
    background: none #fff;
    border-color: #d4d4d5;
    border-radius: 0.28571429rem 0.28571429rem 0 0 !important;
    border-top-width: 1px;
    box-shadow: -6px 0 6px -4px #d8d8d8, 6px 0 6px -4px #d8d8d8;
    color: rgba(0, 0, 0, 0.95);
    font-weight: 700;
    border-bottom: none;
  }
}

.tab-content {
  background: #fff;
  margin: 0 auto;
  overflow: hidden;

  .tab-title {
    color: #4a4a4a;
    font-size: 28px;
    font-weight: 700;
    line-height: 40px;
    margin: 70px auto 0;
    width: 1100px;
  }

  .tab-intro {
    color: #4a4a4a;
    font-size: 15px;
    margin: 30px auto 0;
    width: 1100px;
  }

  .ranking-dates {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 40px auto 0;
    width: 1100px;

    .ranking-year {
      align-items: center;
      display: flex;
      flex: 1;
      width: 100%;

      &-item {
        cursor: pointer;
        font-size: 21px;
        font-weight: 700;
        line-height: 40px;
        margin-right: 6px;
        color: #c8c8c8;
      }

      .active {
        color: #f2aa34;
        cursor: pointer;
      }
    }
  }
}

.table-content {
  margin: 10px auto;
  position: relative;
  width: 1100px;

  .table-header {
    align-items: center;
    border: none;
    box-shadow: 2px 0 0 2px #fff, -2px 0 0 2px #fff, 0 4px 5px 0 #f2f2f2;
    display: flex;
    height: 50px;
    margin: 0 -16px 30px;
    padding: 0 66px;
    pointer-events: none;

    .header-item {
      color: #545454;
      display: flex;
      font-size: 18px;
      font-weight: 400;
      justify-content: center;
      line-height: 26px;
      text-transform: capitalize;
      white-space: nowrap;
    }

    .number {
      margin-right: 60px;
      width: 140px;
    }

    .logo {
      margin-right: 20px;
      max-width: 160px;
      width: 100%;
    }

    .university-name {
      width: 400px;
    }
  }

  .table-list {
    align-items: center;
    border-color: #f0f0f0;
    border-style: solid;
    border-width: 1px 0;
    cursor: pointer;
    display: flex;
    height: 72px;
    margin: 20px 0;
    padding: 0 50px;

    .number {
      color: #f2aa34;
      font-size: 36px;
      font-weight: 700;
      line-height: 40px;
      margin-right: 60px;
      text-align: center;
      width: 140px;
    }

    .course-name {
      color: #4a4a4a;
      flex: 1;
      font-size: 18px;
      line-height: 40px;
      margin-right: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon {
      margin-right: 30px;
    }

    .logo {
      align-items: center;
      display: flex;
      height: 60px;
      justify-content: center;
      margin-right: 20px;
      max-width: 160px;
      text-align: center;
      width: 100%;

      img {
        display: block;
        max-height: 60px;
        max-width: 100%;
        -o-object-fit: contain;
        object-fit: contain;
      }
    }

    .university-name {
      color: #4a4a4a;
      flex: 1;
      font-size: 18px;
      line-height: 40px;
      margin-right: 100px;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 400px;
    }

    .contact-btn {
      background-color: #ffe256;
      user-select: none;
      box-shadow: 0 2px 5px 1px #d8d8d8;
      color: #545454;
      cursor: pointer;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      margin-left: auto;
      min-width: 120px;
      text-align: center;
    }
  }

  .table-list:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

}

</style>
