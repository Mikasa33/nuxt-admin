import { count, eq } from 'drizzle-orm'
import { dataFile } from '~~/server/db/schema/data/file'
import { dataFileCatalog, insertDataFileCatalogSchema, updateDataFileCatalogSchema } from '~~/server/db/schema/data/fileCatalog'

export default defineEventHandler(async () => {
  return crud({
    entity: dataFileCatalog,
    insertSchema: insertDataFileCatalogSchema,
    updateSchema: updateDataFileCatalogSchema,
    deleteOptions: {
      before: async (data) => {
        const userCount = useDrizzle()
          .select({ total: count() })
          .from(dataFile)
          .where(eq(dataFile.catalogId, Number(data.id)))
          .get()

        if (userCount?.total) {
          throw createError({ statusCode: 500, message: '文件目录下存在文件，无法删除' })
        }
      },
    },
    listOptions: {
      keywordLike: ['name'],
      orderBy: {
        orderBy: 'asc',
        id: 'asc',
      },
    },
  })
})
