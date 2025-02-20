import { inArray } from 'drizzle-orm'
import { insertSystemMenuSchema, systemMenu, updateSystemMenuSchema } from '~~/server/db/schema/system/menu'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'

export default defineEventHandler(async () => {
  const db = await drizzle()

  return crud({
    apis: ['add', 'delete', 'update', 'info', 'list'],
    entity: systemMenu,
    insertSchema: insertSystemMenuSchema,
    updateSchema: updateSystemMenuSchema,
    deleteOptions: {
      // 删除后删除子菜单和角色菜单关联
      after: async (data) => {
        // 查询所有菜单
        const menus = await db.select().from(systemMenu)

        // 查询所有子孙菜单
        const descendantMenus: number[] = [...data.ids]
        function findChildMenus(ids: number[]) {
          const childMenuIds = menus.filter(menu => menu.parentId && ids.includes(menu.parentId)).map(menu => menu.id)
          if (childMenuIds.length) {
            descendantMenus.push(...childMenuIds)
            findChildMenus(childMenuIds)
          }
        }
        findChildMenus(data.ids)

        // 删除所有子孙菜单
        await db.delete(systemMenu).where(inArray(systemMenu.parentId, descendantMenus))
        // 删除所有子孙菜单的角色菜单关联
        await db.delete(systemRoleMenu).where(inArray(systemRoleMenu.menuId, descendantMenus))
      },
    },
    listOptions: {
      inArray: ['type'],
      orderBy: {
        orderBy: 'asc',
        id: 'asc',
      },
    },
  })
})
