import { systemLog } from '~~/server/db/schema/system/log'

// 清空系统日志
export async function clearLog() {
  const db = await drizzle()
  await db.delete(systemLog)
}

export default defineEventHandler(async () => {
  await verifyPermission('system:log:clear')

  await clearLog()

  return {
    success: true,
  }
})
