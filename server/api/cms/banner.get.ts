// 首页顶部幻灯片
export default defineEventHandler(async (event) => {
  let query = getQuery(event)
  let res = await $fetch("https://uofferglobal.com/api/v1/ads/web/banners", {
    params: query,
  })
  return res.data
})
