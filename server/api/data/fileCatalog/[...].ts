import { inArray } from 'drizzle-orm'
import { dataFile } from '~~/server/db/schema/data/file'
import { dataFileCatalog, insertDataFileCatalogSchema, updateDataFileCatalogSchema } from '~~/server/db/schema/data/fileCatalog'

export default defineEventHandler(async () => {
  const db = await drizzle()

  return crud({
    prefix: '/api',
    entity: dataFileCatalog,
    insertSchema: insertDataFileCatalogSchema,
    updateSchema: updateDataFileCatalogSchema,
    deleteOptions: {
      // 删除后
      after: async (data) => {
        // 查询所有文件目录
        const catalogs = await db.select().from(dataFileCatalog)

        // 查询所有子孙文件目录
        const descendantCatalogs: number[] = [...data.id]
        function findChildCatalogs(ids: number[]) {
          const childCatalogIds = catalogs.filter(catalog => catalog.parentId && ids.includes(catalog.parentId)).map(catalog => catalog.id)
          if (childCatalogIds.length) {
            descendantCatalogs.push(...childCatalogIds)
            findChildCatalogs(childCatalogIds)
          }
        }
        findChildCatalogs(data.id)

        // 删除所有子孙文件目录
        await db.delete(dataFileCatalog).where(inArray(dataFileCatalog.parentId, descendantCatalogs))

        // 查询所有子孙文件
        const files = await db.select().from(dataFile).where(inArray(dataFile.catalogId, descendantCatalogs))
        // 删除所有子孙文件
        await db.delete(dataFile).where(inArray(dataFile.catalogId, descendantCatalogs))
        // 从磁盘上删除所有子孙文件
        for (const file of files) {
          await useStorage('file').removeItem(file.fileName)
        }
      },
    },
    listOptions: {
      keywordLike: ['name'],
      orderBy: {
        orderNum: 'asc',
        id: 'asc',
      },
    },
  })
})
