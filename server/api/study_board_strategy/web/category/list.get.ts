export default defineEventHandler(async (event) => {
    let res = await $fetch("https://www.uofferglobal.com/api/v1/study_abroad_strategy/web/category/list")
    return res.data
})
