/**
 * 统一的 API 请求辅助函数
 * 所有服务端路由通过此函数代理请求到后端 API
 */
const API_BASE = "https://uofferglobal.com/api/v1"

export async function fetchFromAPI(path: string, options?: {
  query?: Record<string, any>
  method?: "GET" | "POST"
  body?: any
  headers?: Record<string, string>
}) {
  try {
    const res = await $fetch(`${API_BASE}/${path}`, {
      method: options?.method ?? "GET",
      params: options?.query,
      body: options?.body,
      headers: options?.headers,
    })
    return res.data ?? res
  } catch (error: any) {
    console.error(`[API Error] ${path}:`, error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || `Failed to fetch ${path}`,
    })
  }
}
