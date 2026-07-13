import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("cms_branding_activity/web/detail", {
    query: getQuery(event),
  })
})
