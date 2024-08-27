export default defineEventHandler(async (event) => {
    let query = getQuery(event)
    let res = await $fetch(
        "https://www.uofferglobal.com/api/v1/ads/web/sides", {
            params: query
        }
    )
    return res.data
})
