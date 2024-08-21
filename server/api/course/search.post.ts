export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let res = await $fetch(
    "https://uofferglobal.com/api/v1/web/course/search",
    body
  )
  return res.data
})
