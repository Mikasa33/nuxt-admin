import { eq, inArray } from 'drizzle-orm'
import { insertSystemRoleSchema, systemRole, updateSystemRoleSchema } from '~~/server/db/schema/system/role'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

export default defineEventHandler(async (event) => {
  const db = await drizzle()

  // 添加或更新角色后，更新角色菜单关联
  async function addOrUpdateAfter(data: { id: number }, type: 'add' | 'update') {
    const { id, menuIds = [] } = await readBody(event)

    // 更新时，删除旧的菜单
    if (type === 'update') {
      await db.delete(systemRoleMenu).where(eq(systemRoleMenu.roleId, Number(id)))
    }

    // 有菜单，则添加角色菜单关联
    if (menuIds.length) {
      await db.insert(systemRoleMenu).values(menuIds.map((id: number) => ({ roleId: data.id, menuId: id })))
    }
  }

  return crud({
    entity: systemRole,
    insertSchema: insertSystemRoleSchema,
    updateSchema: updateSystemRoleSchema,
    addOptions: {
      // 新增后管理菜单
      after: data => addOrUpdateAfter(data, 'add'),
    },
    deleteOptions: {
      // 删除后删除角色菜单和用户角色关联
      after: async (data: any) => {
        await db.delete(systemRoleMenu).where(inArray(systemRoleMenu.roleId, data.ids))
        await db.delete(systemUserRole).where(inArray(systemUserRole.roleId, data.ids))
      },
    },
    updateOptions: {
      // 更新后管理菜单
      after: data => addOrUpdateAfter(data, 'update'),
    },
    pageOptions: {
      keywordLike: ['name', 'slug'],
      orderBy: {
        id: 'asc',
      },
    },
    infoOptions: {
      // 查询后获取角色菜单
      after: async (data: any) => {
        const roleMenuList = await db
          .select()
          .from(systemRoleMenu)
          .where(eq(systemRoleMenu.roleId, data.id))

        data.menuIds = roleMenuList.map(item => item.menuId)
      },
    },
    listOptions: {
      keywordLike: ['name', 'slug'],
    },
  })
})
