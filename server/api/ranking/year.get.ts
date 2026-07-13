import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("ranking_list/year", {
    query: getQuery(event),
  })
})
