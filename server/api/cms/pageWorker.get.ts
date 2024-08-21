export default defineEventHandler(async (event) => {
  let query = getQuery(event)
  let res = await $fetch(
    "https://uofferglobal.com/api/v1/cmsPagerWorker/web/list",
    {
      params: {
        page_num: 1,
        page_size: 18,
        ...query,
      },
    }
  )
  return res.data
})
