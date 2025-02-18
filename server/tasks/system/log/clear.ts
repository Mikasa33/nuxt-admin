import { clearLog } from '~~/server/api/system/log/clear.post'

export default defineTask({
  meta: {
    name: 'system:log:clear',
    description: '清空系统日志',
  },
  async run() {
    await clearLog()

    return {
      result: 'Success',
    }
  },
})
