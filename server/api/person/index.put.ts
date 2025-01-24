import type { SelectSystemUser } from '~~/server/db/schema/system/user'
import { eq } from 'drizzle-orm'
import { omit, pick } from 'lodash-es'
import { systemUser, updateSystemUserSchema } from '~~/server/db/schema/system/user'
import { getPermissions, getRouters, getUserMenuList } from '../person/menu.get'

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, updateSystemUserSchema.parse)

  const { user } = await getUserSession(event)
  const userId = Number(user!.id)

  const list: SelectSystemUser[] = await useDrizzle()
    .update(systemUser)
    .set({
      ...omit(data, ['password', 'username']),
      id: userId,
    })
    .where(eq(systemUser.id, userId))
    .returning()

  const menuList = await getUserMenuList({
    userId: user!.id,
    includePermission: true,
  })

  await replaceUserSession(event, {
    user: {
      ...pick(list[0], ['id', 'username', 'nickname']),
      routers: getRouters(menuList),
      permissions: getPermissions(menuList),
    },
  })

  return list[0]
})
