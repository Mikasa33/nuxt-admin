import { eq } from 'drizzle-orm'
import { omit } from 'lodash-es'
import { systemUser, updateSystemUserSchema } from '~~/server/db/schema/system/user'
import { updateUserSession } from '../auth/login.post'

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, updateSystemUserSchema.parse)

  const db = await drizzle()

  const { user } = await getUserSession(event)
  const userId = Number(user!.id)

  // 更新用户信息，排除用户名和密码
  await db.update(systemUser)
    .set({
      ...omit(data, ['username', 'password']),
      id: userId,
    })
    .where(eq(systemUser.id, userId))

  // 获取用户信息，排除密码
  const userInfo = await db.query.systemUser.findFirst({
    columns: {
      password: false,
    },
    where: eq(systemUser.id, userId),
  })

  // 更新用户信息
  await updateUserSession(userInfo)

  return {
    success: true,
  }
})
