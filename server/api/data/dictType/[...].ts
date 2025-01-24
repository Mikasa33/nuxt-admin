import { count, eq } from 'drizzle-orm'
import { dataDict } from '~~/server/db/schema/data/dict'
import { dataDictType, insertDataDictTypeSchema, updateDataDictTypeSchema } from '~~/server/db/schema/data/dictType'

export default defineEventHandler(async () => {
  return crud({
    entity: dataDictType,
    insertSchema: insertDataDictTypeSchema,
    updateSchema: updateDataDictTypeSchema,
    deleteOptions: {
      before: async (data) => {
        const userCount = useDrizzle()
          .select({ total: count() })
          .from(dataDict)
          .where(eq(dataDict.typeId, Number(data.id)))
          .get()

        if (userCount?.total) {
          throw createError({ statusCode: 500, message: '字典类型下存在字典，无法删除' })
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
