import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { systemUser } from '~~/server/db/schema/system/user'

const schema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, schema.parse)

  const db = await useDrizzle()

  const { user } = await getUserSession(event)
  const userId = Number(user!.id)

  // 获取用户信息
  const userInfo = await db.query.systemUser.findFirst({
    where: eq(systemUser.id, userId),
  })

  // 用户信息不存在，抛出错误
  if (!userInfo) {
    throw createError({ statusCode: 401, message: '用户不存在' })
  }

  // 原密码错误，抛出错误
  if (!await verifyPassword(userInfo.password, data.oldPassword)) {
    throw createError({ statusCode: 500, message: '原密码错误' })
  }

  // 更新密码
  await db.update(systemUser)
    .set({
      id: userId,
      password: await hashPassword(data.newPassword),
    })
    .where(eq(systemUser.id, userId))

  return {
    success: true,
  }
})
