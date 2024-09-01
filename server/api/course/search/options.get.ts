export default defineEventHandler(async (event) => {
    let res = await $fetch(
        "https://www.uofferglobal.com/api/v1/web/course/search/options",
    )
    return res.data
})
