import { inArray } from 'drizzle-orm'
import { systemUserRole } from '~~/server/db/schema'
import { insertSystemDepartmentSchema, systemDepartment, updateSystemDepartmentSchema } from '~~/server/db/schema/system/department'
import { systemUser } from '~~/server/db/schema/system/user'

export default defineEventHandler(async (event) => {
  const db = await useDrizzle()
  const { defaultDepartmentId } = useRuntimeConfig(event)

  return crud({
    entity: systemDepartment,
    insertSchema: insertSystemDepartmentSchema,
    updateSchema: updateSystemDepartmentSchema,
    deleteOptions: {
      // 删除后
      after: async (data) => {
        // 查询所有部门
        const departments = await db.select().from(systemDepartment)

        // 查询所有子孙部门
        const descendantDepartments: number[] = [...data.id]
        function findChildDepartments(ids: number[]) {
          const childDepartmentIds = departments.filter(department => department.parentId && ids.includes(department.parentId)).map(department => department.id)
          if (childDepartmentIds.length) {
            descendantDepartments.push(...childDepartmentIds)
            findChildDepartments(childDepartmentIds)
          }
        }
        findChildDepartments(data.id)

        // 删除所有子孙部门
        await db.delete(systemDepartment).where(inArray(systemDepartment.parentId, descendantDepartments))

        // 如果保留用户，则将用户迁移到默认部门，否则删除所有子孙用户
        if (data.retain) {
          await db.update(systemUser)
            .set({
              departmentId: defaultDepartmentId,
            })
            .where(inArray(systemUser.departmentId, descendantDepartments))
        }
        else {
          // 查询所有子孙用户
          const users = await db.select().from(systemUser).where(inArray(systemUser.departmentId, descendantDepartments))
          // 删除所有子孙用户
          await db.delete(systemUser).where(inArray(systemUser.departmentId, descendantDepartments))
          // 删除所有子孙用户角色关联
          await db.delete(systemUserRole).where(inArray(systemUserRole.userId, users.map(user => user.id)))
        }
      },
      // 删除前
      before: async (data) => {
        // 是根部门，抛出异常
        if (data.id.includes(defaultDepartmentId)) {
          throw createError({ statusCode: 500, message: '无法删除根部门' })
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
