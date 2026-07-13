import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("web/course/detail", {
    query: getQuery(event),
  })
})
