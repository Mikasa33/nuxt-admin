// 判断是否超级管理员
export async function isAdmin() {
  const event = useEvent()
  const { user } = await getUserSession(event)
  const { adminUsername } = useRuntimeConfig(event)
  return user?.username === adminUsername
}
