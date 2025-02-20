// 判断是否超级管理员
export function isAdmin(username: string) {
  const event = useEvent()
  const { adminUsername } = useRuntimeConfig(event)
  return username === adminUsername
}
