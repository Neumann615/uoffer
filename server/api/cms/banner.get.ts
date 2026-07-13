import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("ads/web/banners", {
    query: getQuery(event),
  })
})
