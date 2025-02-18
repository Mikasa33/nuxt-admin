export function useRequest(url: string, options?: any) {
  const data = ref()
  const error = ref()
  const status = ref('idle')

  async function fetch(url: string, options: any) {
    status.value = 'pending'

    try {
      data.value = await $fetch(url, options)
      status.value = 'success'
    }
    catch (err) {
      error.value = err
      status.value = 'error'
    }
  }

  async function execute(opts?: any) {
    await fetch(url, { ...options, ...opts })
    return {
      data,
      error,
      status,
    }
  }

  return {
    data,
    error,
    execute,
    status,
  }
}
