import { inArray } from 'drizzle-orm'
import { dataFile, insertDataFileSchema, updateDataFileSchema } from '~~/server/db/schema/data/file'

export default defineEventHandler(async () => {
  const db = await drizzle()

  return crud({
    prefix: '/api',
    apis: ['delete', 'page', 'info'],
    entity: dataFile,
    insertSchema: insertDataFileSchema,
    updateSchema: updateDataFileSchema,
    deleteOptions: {
      // 删除前
      before: async (data) => {
        // 查询文件
        const files = await db.select().from(dataFile).where(inArray(dataFile.id, data.ids))
        // 从磁盘上删除文件
        for (const file of files) {
          await useStorage('file').removeItem(file.fileName)
        }
      },
    },
    pageOptions: {
      keywordLike: ['name'],
      eq: ['catalogId'],
      orderBy: {
        createdAt: 'desc',
      },
    },
  })
})
