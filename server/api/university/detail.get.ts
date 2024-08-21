export default defineEventHandler(async (event) => {
  let query = getQuery(event)
  let res = await $fetch(
    "https://uofferglobal.com/api/v1/web/university/detail",
    {
      params: {
        ...query,
      },
    }
  )
  return res.data
})
