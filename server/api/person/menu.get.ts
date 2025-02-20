import type { SelectSystemMenu } from '~~/server/db/schema/system/menu'
import { and, asc, eq, getTableColumns, not } from 'drizzle-orm'
import { systemMenu } from '~~/server/db/schema/system/menu'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'
import { systemUser } from '~~/server/db/schema/system/user'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

// 获取用户菜单和权限列表
export async function getUserMenuList(options: { userId: number, username: string, includePermission?: boolean }) {
  const { userId, username, includePermission = false } = options

  const db = await useDrizzle()

  // 超级管理员，获取所有菜单和权限列表
  if (isAdmin(username)) {
    return db
      .select(getTableColumns(systemMenu))
      .from(systemMenu)
      .orderBy(asc(systemMenu.orderBy))
      .where(includePermission ? undefined : not(eq(systemMenu.type, 'permission')))
  }

  // 非超级管理员，获取用户菜单和权限列表
  return db
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
}

// 获取路由
export function getRouters(menuList: SelectSystemMenu[]) {
  return menuList.filter(item => !!item.router).map(item => item.router) as string[]
}

// 获取权限
export function getPermissions(menuList: SelectSystemMenu[]) {
  return menuList.filter(item => item.type === 'permission' && !!item.slug).flatMap((item) => {
    return item.slug?.split(',')
  }) as string[]
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return getUserMenuList({
    userId: session.user!.id,
    username: session.user!.username,
  })
})
