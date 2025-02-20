import { useMessage } from 'naive-ui'

export function useErrorMessage() {
  const message = useMessage()

  function showError(error: any) {
    const msg = toValue(error)?.data?.message
    if (msg) {
      message.error(msg)
    }
  }

  return {
    showError,
  }
}
