export default defineEventHandler(async (event) => {
    let query = getQuery(event)
    let res = await $fetch(
        "https://www.uofferglobal.com/api/v1/study_abroad_strategy/web/recommend/list", {
            params: query
        }
    )
    return res.data
})
