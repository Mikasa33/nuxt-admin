import { systemLog } from '~~/server/db/schema/system/log'

export function clearLog() {
  useDrizzle()
    .delete(systemLog)
    .run()
}

export default defineEventHandler(async () => {
  await verifyPermission('system:log:clear')

  clearLog()

  return {
    success: true,
  }
})
