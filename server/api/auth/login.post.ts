import { eq } from 'drizzle-orm'
import { pick } from 'lodash-es'
import { systemUser } from '~~/server/db/schema/system/user'
import { getPermissions, getRouters, getUserMenuList } from '../person/menu.get'

export default defineEventHandler(async (event) => {
  const form: any = await readBody(event)

  const db = await useDrizzle()

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

  // 更新用户信息和登录时间（因为获取用户菜单和权限列表需要判断是否为 admin 用户，所以先更新一次用户信息）
  await replaceUserSession(event, {
    user: userInfo,
    secure: {},
    loggedInAt: new Date(),
  })

  // 获取用户菜单和权限列表
  const menuList = await getUserMenuList({
    userId: user.id,
    includePermission: true,
  })

  // 更新用户信息、路由信息、权限信息
  await replaceUserSession(event, {
    user: {
      ...userInfo,
      routers: getRouters(menuList),
      permissions: getPermissions(menuList),
    },
  })
}
