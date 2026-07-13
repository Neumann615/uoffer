export interface CourseSearchCategoryItem {
  course_nums: number
  enName: string
  id: number
  level: number
  name: string
  subs: Array<CourseSearchCategoryItem> | null
}

export interface CourseSearchOptions {
  fees: {
    max: number
    min: 0
  }
  categories: Array<CourseSearchCategoryItem>
  levels: Array<{
    courseNums: number
    enName: string
    id: number
    name: string
  }>
  locations: Array<{
    id: number
    locationName: string
    created_at: number
    updated_at: number
    locationNameChinese: string
    currency: string
    hemisphere: number
  }>
  starSchoolMonths: Array<{
    name: string
    enName: string
    value: string
  }>
  universities: Array<{
    id: number
    chinese_name: string
    english_name: string
  }>
}

export interface VideoAssets {
  url_1: string
  url_2: string
  url_3: string
}

export interface PaperWorker {
  created_at: number
  description_cn: string
  description_en: string
  document_cn: string
  document_en: string
  id: number
  image: string
  intro_cn: string
  intro_en: string
  name: string
  offer_wall_case_id: string
  operator_id: number
  sort: number
  status: number
  updated_at: number
}
