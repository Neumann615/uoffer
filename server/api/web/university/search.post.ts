import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("web/university/search", {
    method: "POST",
    body: await readBody(event),
  })
})
