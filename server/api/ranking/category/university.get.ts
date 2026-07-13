import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("ranking_list/category/university", {
    query: getQuery(event),
  })
})
