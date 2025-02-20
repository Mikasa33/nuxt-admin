import { useMessage } from 'naive-ui'

export function useCustomMessage() {
  const message = useMessage()

  function error(error: any) {
    const msg = toValue(error)?.data?.message
    if (msg) {
      message.error(msg)
    }
  }

  return {
    error,
  }
}
