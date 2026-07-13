import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async () => {
  return fetchFromAPI("web/university/options")
})
