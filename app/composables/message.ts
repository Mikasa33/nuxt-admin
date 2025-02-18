export function useErrorMessage(error: any) {
  const msg = toValue(error)?.data?.message

  if (msg) {
    const message = useMessage()
    message.error(msg)
  }
}
