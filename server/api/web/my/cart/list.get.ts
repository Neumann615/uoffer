import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("web/my/cart/list", {
    headers: { Token: getHeader(event, "Token") || "" },
  })
})
