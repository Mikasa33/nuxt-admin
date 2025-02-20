// 判断是否超级管理员
export function isRoot(username: string) {
  const event = useEvent()
  const { rootUsername } = useRuntimeConfig(event)
  return username === rootUsername
}
