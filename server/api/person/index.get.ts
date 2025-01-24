import { eq, getTableColumns } from 'drizzle-orm'
import { omit } from 'lodash-es'
import { systemUser } from '~~/server/db/schema/system/user'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  return useDrizzle()
    .select(omit(getTableColumns(systemUser), ['password']))
    .from(systemUser)
    .where(eq(systemUser.id, session.user!.id))
    .get()
})
