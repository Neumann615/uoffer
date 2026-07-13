import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("study_abroad_strategy/web/detail", {
    query: getQuery(event),
  })
})
