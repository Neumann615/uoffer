import { fetchFromAPI } from "~/server/utils/api"

export default defineEventHandler(async (event) => {
  return fetchFromAPI("auth/signup/web-login", {
    method: "POST",
    body: await readBody(event),
  })
})
