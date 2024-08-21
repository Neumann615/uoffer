// 活动列表
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  console.log(query)
  let res = await $fetch(
    "https://uofferglobal.com/api/v1/cms_branding_activity/web/list",
    {
      params: query,
    }
  )
  return res.data
})
