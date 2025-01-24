import { systemLog } from '~~/server/db/schema/system/log'

export default defineEventHandler(async () => {
  await verifyPermission('system:log:clear')

  useDrizzle()
    .delete(systemLog)
    .run()

  return {
    success: true,
  }
})
