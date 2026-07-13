import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("cms_store_display/web/list", {
    query: getQuery(event),
  })
})
