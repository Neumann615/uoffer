import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("web/my/cart/add", {
    method: "POST",
    body: await readBody(event),
  })
})
