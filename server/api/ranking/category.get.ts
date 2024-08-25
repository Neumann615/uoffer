export default defineEventHandler(async (event) => {
    let query = getQuery(event)
    let res = await $fetch(
        "https://uofferglobal.com/api/v1/ranking_list/category", {
            params: query
        }
    )
    return res.data
})
