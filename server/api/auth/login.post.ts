import { eq } from 'drizzle-orm'
import { pick } from 'lodash-es'
import { systemUser } from '~~/server/db/schema/system/user'
import { getPermissions, getRouters, getUserMenuList } from '../person/menu.get'

export default defineEventHandler(async (event) => {
  const form: any = await readBody(event)

  const db = await drizzle()

  // 根据用户名查询用户信息
  const userInfo = await db.query.systemUser.findFirst({
    where: eq(systemUser.username, form.username),
  })

  // 用户信息不存在，抛出错误
  if (!userInfo) {
    throw createError({ statusCode: 401, statusMessage: '用户名或密码错误' })
  }

  // 验证用户密码不一致，抛出错误
  if (!await verifyPassword(userInfo.password, form.password)) {
    throw createError({ statusCode: 401, statusMessage: '用户名或密码错误' })
  }

  // 更新用户信息
  await updateUserSession(userInfo)

  return {
    loggedIn: true,
  }
})

/**
 * 更新用户信息
 * @param user 用户信息
 */
export async function updateUserSession(user: any) {
  const event = useEvent()

  const userInfo = { ...pick(user, ['id', 'username', 'nickname']) }

  // 获取用户菜单和权限列表
  const menuList = await getUserMenuList({
    userId: user.id,
    username: user.username,
    includePermission: true,
  })

  // 更新用户信息、路由信息、权限信息
  await replaceUserSession(event, {
    user: {
      ...userInfo,
      routers: getRouters(menuList),
      permissions: getPermissions(menuList),
    },
    secure: {},
    loggedInAt: new Date(),
  })
}
