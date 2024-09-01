export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let res = await $fetch(
        "https://uofferglobal.com/api/v1/web/course/search", {
            method: "POST",
            body: JSON.stringify(body)
        }
    )
    return res.data
})
