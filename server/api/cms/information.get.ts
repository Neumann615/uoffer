// 首页相关基本信息
export default defineEventHandler(async (event) => {
  let res = await $fetch("https://uofferglobal.com/api/v1/cmsIndex/web/index")
  return res.data
})
