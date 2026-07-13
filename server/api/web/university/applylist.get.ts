import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async () => {
  return fetchFromAPI("web/university/applylist", {
    query: {
      page_num: 1,
      page_size: 23,
    },
  })
})
