import type { UseFetchOptions } from '#app'
import { defaultOptions } from '@/utils/fetch'

export async function useCustomFetch<T = any>(url: string, options: UseFetchOptions<T> = {}) {
  return useFetch(url, {
    key: useId(),
    ...defaultOptions as UseFetchOptions<T>,
    ...options,
  })
}
