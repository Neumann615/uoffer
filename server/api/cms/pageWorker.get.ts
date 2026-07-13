import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("cmsPagerWorker/web/list", {
    query: {
      page_num: 1,
      page_size: 18,
      ...getQuery(event),
    },
  })
})
