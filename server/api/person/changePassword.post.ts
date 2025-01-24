import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { systemUser } from '~~/server/db/schema/system/user'

const schema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, schema.parse)

  const session = await getUserSession(event)
  const userId = Number(session.user!.id)

  const user = useDrizzle()
    .select()
    .from(systemUser)
    .where(eq(systemUser.id, userId))
    .get()
  if (!await verifyPassword(user!.password, data.oldPassword)) {
    throw createError({ statusCode: 500, message: '原密码错误' })
  }

  return useDrizzle()
    .update(systemUser)
    .set({
      id: userId,
      password: await hashPassword(data.newPassword),
    })
    .where(eq(systemUser.id, userId))
    .returning()
})
