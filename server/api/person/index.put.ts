import { eq } from 'drizzle-orm'
import { omit } from 'lodash-es'
import { systemUser, updateSystemUserSchema } from '~~/server/db/schema/system/user'
import { updateUserSession } from '../auth/login.post'

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, updateSystemUserSchema.parse)

  const db = await drizzle()

  const { user } = await getUserSession(event)

  // 更新用户信息，排除用户名和密码
  await db.update(systemUser)
    .set({
      ...omit(data, ['id', 'username', 'password', 'createdAt', 'updatedAt']),
      id: user!.id,
    })
    .where(eq(systemUser.id, user!.id))

  // 获取用户信息，排除密码
  const userInfo = await db.query.systemUser.findFirst({
    columns: {
      password: false,
    },
    where: eq(systemUser.id, user!.id),
  })

  // 更新用户信息
  await updateUserSession(userInfo)

  return {
    success: true,
  }
})
