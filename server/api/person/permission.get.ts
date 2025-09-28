import type { SelectSystemMenu } from '~~/server/db/schema/system/menu'

export default defineEventHandler(async (event) => {
  const userStorage = useStorage<{ menuList: SelectSystemMenu[], routeList: string[], permissionList: string[] }>('redis')
  const { user } = await getUserSession(event)

  if (!user?.id) {
    throw createError({ statusCode: 401, message: '未登录' })
  }

  return await userStorage.getItem(`nuxt:admin:user:${user.id}:data`)
})
