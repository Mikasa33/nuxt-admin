import { eq } from 'drizzle-orm'
import { systemUser } from '~~/server/db/schema/system/user'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const db = await useDrizzle()

  // 获取用户信息，排除密码
  const user = await db.query.systemUser.findFirst({
    columns: {
      password: false,
    },
    where: eq(systemUser.id, session.user!.id),
  })

  // 用户信息不存在，抛出错误
  if (!user) {
    throw createError({ statusCode: 401, message: '用户不存在' })
  }

  return user
})
