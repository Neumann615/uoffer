import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async () => {
  return fetchFromAPI("ranking_list/level/list")
})
