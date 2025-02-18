import { inArray } from 'drizzle-orm'
import fs from 'fs-extra'
import { dataFile, insertDataFileSchema, updateDataFileSchema } from '~~/server/db/schema/data/file'

export default defineEventHandler(async () => {
  const db = await useDrizzle()

  return crud({
    entity: dataFile,
    insertSchema: insertDataFileSchema,
    updateSchema: updateDataFileSchema,
    deleteOptions: {
      // 删除前
      before: async (data) => {
        // 查询文件
        const files = await db.select().from(dataFile).where(inArray(dataFile.id, data.id))
        // 从磁盘上删除文件
        files.forEach((file) => {
          fs.removeSync(`public${file.path}`)
        })
      },
    },
    pageOptions: {
      keywordLike: ['name', 'filename'],
      eq: ['catalogId'],
      orderBy: {
        id: 'asc',
      },
    },
  })
})
