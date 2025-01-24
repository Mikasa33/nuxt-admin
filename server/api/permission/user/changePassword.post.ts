import { eq } from 'drizzle-orm'
import * as z from 'zod'
import { systemUser } from '~~/server/db/schema/system/user'

const schema = z.object({
  id: z.number(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  await verifyPermission('system:user:changePassword')

  const data = await readValidatedBody(event, schema.parse)
  return useDrizzle()
    .update(systemUser)
    .set({
      id: data.id,
      password: await hashPassword(data.password),
    })
    .where(eq(systemUser.id, Number(data.id)))
    .returning()
})
