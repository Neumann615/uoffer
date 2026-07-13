import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("web/university/detail", {
    query: getQuery(event),
  })
})
