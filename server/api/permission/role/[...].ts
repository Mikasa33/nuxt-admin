import type { SelectSystemRoleMenu } from '~~/server/db/schema/system/roleMenu'
import { eq, inArray } from 'drizzle-orm'
import { insertSystemRoleSchema, systemRole, updateSystemRoleSchema } from '~~/server/db/schema/system/role'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

export default defineEventHandler(async (event) => {
  async function addOrUpdateAfter(data: any, type: 'add' | 'update') {
    const { id, menuIds } = await readBody(event)

    if (type === 'update') {
      await useDrizzle()
        .delete(systemRoleMenu)
        .where(eq(systemRoleMenu.roleId, Number(id)))
    }

    if (data.length && menuIds?.length) {
      const roleMenuList = await useDrizzle()
        .insert(systemRoleMenu)
        .values(menuIds.map((id: number) => ({ roleId: data[0].id, menuId: id })))
        .returning()

      data[0].menuIds = roleMenuList.map((item: SelectSystemRoleMenu) => item.menuId)
    }
  }

  return crud({
    entity: systemRole,
    insertSchema: insertSystemRoleSchema,
    updateSchema: updateSystemRoleSchema,
    addOptions: {
      after: data => addOrUpdateAfter(data, 'add'),
    },
    deleteOptions: {
      after: async (data: any) => {
        await useDrizzle()
          .delete(systemRoleMenu)
          .where(inArray(systemRoleMenu.roleId, data.map((item: any) => item.id)))

        await useDrizzle()
          .delete(systemUserRole)
          .where(inArray(systemUserRole.roleId, data.map((item: any) => item.id)))
      },
    },
    updateOptions: {
      after: data => addOrUpdateAfter(data, 'update'),
    },
    pageOptions: {
      keywordLike: ['name', 'slug'],
      orderBy: {
        id: 'asc',
      },
    },
    infoOptions: {
      after: async (data: any) => {
        const roleMenuList = useDrizzle()
          .select()
          .from(systemRoleMenu)
          .where(eq(systemRoleMenu.roleId, data.id))
          .all()

        data.menuIds = roleMenuList.map(item => item.menuId)
      },
    },
    listOptions: {
      keywordLike: ['name', 'slug'],
    },
  })
})
