import { eq } from 'drizzle-orm'
import { pick } from 'lodash-es'
import { systemUser } from '~~/server/db/schema/system/user'
import { getPermissions, getRouters, getUserMenuList } from '../person/menu.get'

export default defineEventHandler(async (event) => {
  const form: any = await readBody(event)

  const user = useDrizzle()
    .select()
    .from(systemUser)
    .where(eq(systemUser.username, form.username))
    .get()
  if (!user) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  if (await verifyPassword(user.password, form.password)) {
    await replaceUserSession(event, {
      user: {
        ...pick(user, ['id', 'username', 'nickname']),
      },
      secure: {},
      loggedInAt: new Date(),
    })

    const menuList = await getUserMenuList({
      userId: user.id,
      includePermission: true,
    })

    await replaceUserSession(event, {
      user: {
        ...pick(user, ['id', 'username', 'nickname']),
        routers: getRouters(menuList),
        permissions: getPermissions(menuList),
      },
    })
    return {
      success: true,
    }
  }

  throw createError({ statusCode: 401, message: '用户名或密码错误' })
})
