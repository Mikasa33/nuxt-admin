import type { FetchOptions } from 'ofetch'

// 默认配置
export const defaultOptions: FetchOptions = {
  onResponseError({ response }) {
    switch (response.status) {
      case 401:
        showError({ statusCode: 401, statusMessage: '用户未登录' })
        break
      case 403:
        showError({ statusCode: 403, statusMessage: '无权限访问' })
        break
      case 404:
        showError({ statusCode: 404, statusMessage: '资源不存在' })
        break
      case 500:
        showError({ statusCode: 500, statusMessage: '服务器错误' })
        break
      case 503:
        showError({ statusCode: 503, statusMessage: '服务暂不可用' })
        break
      default:
        window.$message.error((response._data as any)?.message)
        break
    }
  },
  onRequestError({ error }) {
    showError({ statusCode: 500, statusMessage: error.message })
  },
}

export function $customFetch<T = any>(url: string, options: FetchOptions = {}): Promise<T> {
  return $fetch<T>(url, {
    ...defaultOptions,
    ...options as any,
  })
}
