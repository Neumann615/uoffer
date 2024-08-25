export default defineEventHandler(async (event) => {
    let res = await $fetch(
        "https://uofferglobal.com/api/v1/ranking_list/level/list"
    )
    return res.data
})
