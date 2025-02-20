import { systemLog } from '~~/server/db/schema/system/log'

export default defineEventHandler(async () => {
  return crud({
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
