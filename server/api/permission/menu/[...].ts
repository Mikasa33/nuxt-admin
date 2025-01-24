import { inArray } from 'drizzle-orm'
import { insertSystemMenuSchema, systemMenu, updateSystemMenuSchema } from '~~/server/db/schema/system/menu'
import { systemRoleMenu } from '~~/server/db/schema/system/roleMenu'

export default defineEventHandler(async () => {
  return crud({
    apis: ['add', 'delete', 'update', 'info', 'list'],
    entity: systemMenu,
    insertSchema: insertSystemMenuSchema,
    updateSchema: updateSystemMenuSchema,
    deleteOptions: {
      after: async (data: any) => {
        await useDrizzle()
          .delete(systemRoleMenu)
          .where(inArray(systemRoleMenu.menuId, data.map((item: any) => item.id)))
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
