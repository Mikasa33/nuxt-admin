import type { SelectSystemMenu } from '~~/server/db/schema/system/menu'
import { and, asc, eq, getTableColumns, not } from 'drizzle-orm'
import { systemMenu } from '~~/server/db/schema/system/menu'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'
import { systemUser } from '~~/server/db/schema/system/user'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)

  return getUserMenuList({
    userId: user!.id,
    username: user!.username,
  })
})

// 获取用户菜单和权限列表
export async function getUserMenuList(options: { userId: number, username: string, includePermission?: boolean }) {
  const { userId, username, includePermission = false } = options

  const db = await drizzle()

  const permissionWhere = includePermission ? undefined : not(eq(systemMenu.type, 'permission'))
  const orderBy = asc(systemMenu.orderNum)

  // 超级管理员，获取所有菜单和权限列表
  if (isRoot(username)) {
    return db
      .select(getTableColumns(systemMenu))
      .from(systemMenu)
      .orderBy(orderBy)
      .where(permissionWhere)
  }

  // 非超级管理员，获取用户菜单和权限列表
  return db
    .select(getTableColumns(systemMenu))
    .from(systemMenu)
    .orderBy(orderBy)
    .innerJoin(systemRoleMenu, eq(systemMenu.id, systemRoleMenu.menuId))
    .innerJoin(systemUserRole, eq(systemRoleMenu.roleId, systemUserRole.roleId))
    .innerJoin(systemUser, eq(systemUserRole.userId, systemUser.id))
    .where(
      and(
        eq(systemUser.id, userId),
        permissionWhere,
      ),
    )
}

// 获取路由
export function getRouteList(menuList: SelectSystemMenu[]) {
  return menuList.filter(item => !!item.router).map(item => item.router) as string[]
}

// 获取权限
export function getPermissionList(menuList: SelectSystemMenu[]) {
  return menuList.filter(item => item.type === 'permission' && !!item.slug).flatMap((item) => {
    return item.slug?.split(',')
  }) as string[]
}
