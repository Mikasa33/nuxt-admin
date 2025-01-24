import type { SelectSystemMenu } from '~~/server/db/schema/system/menu'
import { and, asc, eq, getTableColumns, not } from 'drizzle-orm'
import { systemMenu } from '~~/server/db/schema/system/menu'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'
import { systemUser } from '~~/server/db/schema/system/user'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

export async function getUserMenuList(options: { userId: number, includePermission?: boolean }) {
  const { userId, includePermission = false } = options

  if (await isAdmin()) {
    return useDrizzle()
      .select(getTableColumns(systemMenu))
      .from(systemMenu)
      .orderBy(asc(systemMenu.orderBy))
      .where(includePermission ? undefined : not(eq(systemMenu.type, 'permission')))
      .all()
  }

  return useDrizzle()
    .select(getTableColumns(systemMenu))
    .from(systemMenu)
    .orderBy(asc(systemMenu.orderBy))
    .innerJoin(systemRoleMenu, eq(systemMenu.id, systemRoleMenu.menuId))
    .innerJoin(systemUserRole, eq(systemRoleMenu.roleId, systemUserRole.roleId))
    .innerJoin(systemUser, eq(systemUserRole.userId, systemUser.id))
    .where(
      and(
        eq(systemUser.id, userId),
        includePermission ? undefined : not(eq(systemMenu.type, 'permission')),
      ),
    )
    .all()
}

export function getRouters(menuList: SelectSystemMenu[]) {
  return menuList.filter(item => !!item.router).map(item => item.router) as string[]
}

export function getPermissions(menuList: SelectSystemMenu[]) {
  return menuList.filter(item => item.type === 'permission' && !!item.slug).flatMap((item) => {
    return item.slug?.split(',')
  }) as string[]
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return getUserMenuList({ userId: session.user!.id })
})
