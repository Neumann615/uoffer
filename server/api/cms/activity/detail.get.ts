// 活动详情
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let res = await $fetch(
    "https://uofferglobal.com/api/v1/cms_branding_activity/web/detail",
    {
      params: query,
    }
  )
  return res.data
})
