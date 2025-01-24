import type { SelectSystemUserRole } from '~~/server/db/schema/system/userRole'
import { eq, getTableColumns, inArray, not } from 'drizzle-orm'
import { omit } from 'lodash-es'
import { insertSystemUserSchema, systemUser, updateSystemUserSchema } from '~~/server/db/schema/system/user'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

export default defineEventHandler(async (event) => {
  const { departmentId } = getQuery(event)

  async function addOrUpdateAfter(data: any, type: 'add' | 'update') {
    const { id, roleIds } = await readBody(event)

    if (type === 'update') {
      await useDrizzle()
        .delete(systemUserRole)
        .where(eq(systemUserRole.userId, Number(id)))
    }

    if (data.length && roleIds?.length) {
      const roleMenuList = await useDrizzle()
        .insert(systemUserRole)
        .values(roleIds.map((id: number) => ({ userId: data[0].id, roleId: id })))
        .returning()

      data[0].roleIds = roleMenuList.map((item: SelectSystemUserRole) => item.roleId)
    }
  }

  return crud({
    entity: systemUser,
    insertSchema: insertSystemUserSchema,
    updateSchema: updateSystemUserSchema,
    addOptions: {
      before: async (data) => {
        data.password = await hashPassword(data.password)
      },
      after: options => addOrUpdateAfter(options, 'add'),
    },
    deleteOptions: {
      after: async (data: any) => {
        await useDrizzle()
          .delete(systemUserRole)
          .where(inArray(systemUserRole.userId, data.map((item: any) => item.id)))
      },
    },
    updateOptions: {
      before: async (data) => {
        return {
          ...omit(data, ['password', 'username']),
          id: Number(data.id),
        }
      },
      after: data => addOrUpdateAfter(data, 'update'),
    },
    infoOptions: {
      select: omit(getTableColumns(systemUser), ['password']),
      after: async (data: any) => {
        const userRoleList = useDrizzle()
          .select()
          .from(systemUserRole)
          .where(eq(systemUserRole.userId, Number(data.id)))
          .all()

        data.roleIds = userRoleList.map(item => item.roleId)
      },
    },
    listOptions: {
      inArray: ['type'],
      orderBy: {
        orderBy: 'asc',
        id: 'asc',
      },
    },
    pageOptions: {
      select: omit(getTableColumns(systemUser), ['password']),
      keywordLike: ['username', 'nickname', 'phone'],
      where: [
        not(eq(systemUser.username, 'admin')),
        eq(systemUser.departmentId, Number(departmentId)),
      ],
      orderBy: {
        id: 'asc',
      },
    },
  })
})
