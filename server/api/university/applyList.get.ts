export default defineEventHandler(async (event) => {
  let query = getQuery(event)
  let res = await $fetch(
    "https://uofferglobal.com/api/v1/web/university/applylist",
    {
      params: {
        page_num: 1,
        page_size: 23,
        ...query,
      },
    }
  )
  return res.data
})
