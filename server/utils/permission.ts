import type { SelectSystemMenu } from '../db/schema/system/menu'

// 验证权限
export async function verifyPermission(slug: string) {
  const userStorage = useStorage<{ menuList: SelectSystemMenu[], routeList: string[], permissionList: string[] }>('redis')
  const { user } = await getUserSession(useEvent())

  // 超级管理员默认所有权限
  if (isRoot(user?.username ?? '')) {
    return
  }

  const userData = await userStorage.getItem(`nuxt:admin:user:${user?.id}:data`)

  if (!userData?.permissionList?.includes(slug)) {
    throw createError({ statusCode: 403, message: '无权限访问' })
  }
}
