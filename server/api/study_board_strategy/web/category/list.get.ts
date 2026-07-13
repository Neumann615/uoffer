import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async () => {
  return fetchFromAPI("study_abroad_strategy/web/category/list")
})
