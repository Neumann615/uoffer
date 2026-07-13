export interface StudyAbroadGuideItem {
  id: number
  title: string
  description: string
  html_content: string
  image_url: string
  is_release: number
  release_at: number
  is_core: number
  is_top: number
  is_hot: number
  is_recommend: number
  read_count: number
  invented_read_count: number
  created_user_id: number
  created_at: number
  updated_at: number
  deleted_at?: any
  map_category_list?: Array<{
    created_at: number
    deleted_at: number
    icon_url: string
    id: number
    image_url: string
    is_release: number
    ranking: number
    title: string
    updated_at: number
  }>
}

export type StudyAbroadGuideCardRenderType = "simple" | "default" | "detail"
