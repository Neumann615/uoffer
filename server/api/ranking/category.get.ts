import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("ranking_list/category", {
    query: getQuery(event),
  })
})
