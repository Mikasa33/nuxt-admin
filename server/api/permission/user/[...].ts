import { eq, getTableColumns, inArray, not } from 'drizzle-orm'
import { omit } from 'lodash-es'
import { insertSystemUserSchema, systemUser, updateSystemUserSchema } from '~~/server/db/schema/system/user'
import { systemUserRole } from '~~/server/db/schema/system/userRole'

export default defineEventHandler(async (event) => {
  const { departmentId } = getQuery(event)
  const db = await useDrizzle()
  const { adminUsername } = useRuntimeConfig(event)

  // 新增或更新后，更新用户角色关联
  async function addOrUpdateAfter(data: { id: number }, type: 'add' | 'update') {
    const { id, roleIds } = await readBody(event)

    // 更新时删除旧的角色
    if (type === 'update') {
      await db.delete(systemUserRole).where(eq(systemUserRole.userId, Number(id)))
    }

    // 有角色，则添加用户角色关联
    if (roleIds?.length) {
      await db.insert(systemUserRole).values(roleIds.map((id: number) => ({ userId: data.id, roleId: id })))
    }
  }

  return crud({
    entity: systemUser,
    insertSchema: insertSystemUserSchema,
    updateSchema: updateSystemUserSchema,
    addOptions: {
      // 新增前加密密码
      before: async (data) => {
        data.password = await hashPassword(data.password)
      },
      // 新增后管理角色
      after: data => addOrUpdateAfter(data, 'add'),
    },
    deleteOptions: {
      // 删除后删除用户角色关联
      after: async (data) => {
        await db.delete(systemUserRole).where(inArray(systemUserRole.userId, data.id))
      },
    },
    updateOptions: {
      // 更新前排除用户名和密码
      before: async (data) => {
        return {
          ...omit(data, ['username', 'password']),
          id: Number(data.id),
        }
      },
      // 更新后管理角色
      after: data => addOrUpdateAfter(data, 'update'),
    },
    infoOptions: {
      // 查询字段排除密码
      select: omit(getTableColumns(systemUser), ['password']),
      // 查询后获取用户角色
      after: async (data: any) => {
        const userRoleList = await db
          .select()
          .from(systemUserRole)
          .where(eq(systemUserRole.userId, Number(data.id)))

        data.roleIds = userRoleList.map(item => item.roleId)
      },
    },
    listOptions: {
      inArray: ['type'],
      // 排除超级管理员
      where: [
        not(eq(systemUser.username, adminUsername)),
      ],
      orderBy: {
        orderBy: 'asc',
        id: 'asc',
      },
    },
    pageOptions: {
      // 查询字段排除密码
      select: omit(getTableColumns(systemUser), ['password']),
      keywordLike: ['username', 'nickname', 'phone'],
      // 排除超级管理员
      where: [
        not(eq(systemUser.username, adminUsername)),
        eq(systemUser.departmentId, Number(departmentId)),
      ],
      orderBy: {
        id: 'asc',
      },
    },
  })
})
