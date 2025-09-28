import type { SelectSystemMenu } from '~~/server/db/schema/system/menu'
import { eq } from 'drizzle-orm'
import { pick } from 'lodash-es'
import { systemUser } from '~~/server/db/schema/system/user'
import { getPermissionList, getRouteList, getUserMenuList } from '../person/menu.get'

export default defineEventHandler(async (event) => {
  const form: any = await readBody(event)

  const db = await drizzle()

  // 根据用户名查询用户信息
  const user = await db.query.systemUser.findFirst({
    where: eq(systemUser.username, form.username),
  })

  // 用户信息不存在，抛出错误
  if (!user) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  // 验证用户密码不一致，抛出错误
  if (!await verifyPassword(user.password, form.password)) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  // 更新用户信息

  return await updateUserSession(user)
})

/**
 * 更新用户信息
 * @param user 用户信息
 */
export async function updateUserSession(user: any) {
  const event = useEvent()

  const userInfo = pick(user, ['id', 'username', 'nickname', 'avatar'])

  // 获取用户菜单和权限列表
  const menuList = await getUserMenuList({
    userId: userInfo.id,
    username: userInfo.username,
    includePermission: true,
  })

  // 更新用户信息
  await replaceUserSession(event, {
    user: userInfo,
    loggedInAt: new Date(),
  })

  const runtimeConfig = useRuntimeConfig()
  const userStorage = useStorage<{ menuList: SelectSystemMenu[], routeList: string[], permissionList: string[] }>('redis')
  await userStorage.setItem(
    `nuxt:admin:user:${userInfo.id}:data`,
    {
      menuList: menuList.filter(menu => menu.type !== 'permission'),
      routeList: getRouteList(menuList),
      permissionList: getPermissionList(menuList),
    },
    {
      ttl: runtimeConfig.session.maxAge,
    },
  )

  return userInfo
}
