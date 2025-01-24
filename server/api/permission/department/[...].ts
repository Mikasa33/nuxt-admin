import { count, eq } from 'drizzle-orm'
import { insertSystemDepartmentSchema, systemDepartment, updateSystemDepartmentSchema } from '~~/server/db/schema/system/department'
import { systemUser } from '~~/server/db/schema/system/user'

export default defineEventHandler(async () => {
  return crud({
    entity: systemDepartment,
    insertSchema: insertSystemDepartmentSchema,
    updateSchema: updateSystemDepartmentSchema,
    deleteOptions: {
      after: async (data) => {
        if (data.id === 1) {
          throw createError({ statusCode: 500, message: '无法删除根部门' })
        }
      },
      before: async (data) => {
        const userCount = useDrizzle()
          .select({ total: count() })
          .from(systemUser)
          .where(eq(systemUser.departmentId, Number(data.id)))
          .get()

        if (userCount?.total) {
          throw createError({ statusCode: 500, message: '部门下存在用户，无法删除' })
        }
      },
    },
    listOptions: {
      keywordLike: ['name'],
      orderBy: {
        orderBy: 'asc',
        id: 'asc',
      },
    },
    pageOptions: {
      keywordLike: ['name'],
      orderBy: {
        orderBy: 'asc',
        id: 'asc',
      },
    },
  })
})
