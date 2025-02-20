import { systemLog } from '~~/server/db/schema/system/log'

export default defineEventHandler(async () => {
  return crud({
    prefix: '/api/admin',
    apis: ['page'],
    entity: systemLog,
    pageOptions: {
      keywordLike: ['nickname', 'router'],
      orderBy: {
        createdAt: 'desc',
      },
    },
  })
})
