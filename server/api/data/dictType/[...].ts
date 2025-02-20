import { inArray } from 'drizzle-orm'
import { dataDict } from '~~/server/db/schema/data/dict'
import { dataDictType, insertDataDictTypeSchema, updateDataDictTypeSchema } from '~~/server/db/schema/data/dictType'

export default defineEventHandler(async () => {
  const db = await drizzle()

  return crud({
    entity: dataDictType,
    insertSchema: insertDataDictTypeSchema,
    updateSchema: updateDataDictTypeSchema,
    deleteOptions: {
      // 删除后
      after: async (data) => {
        // 查询所有字典类型
        const types = await db.select().from(dataDictType)

        // 查询所有子孙字典类型
        const descendantTypes: number[] = [...data.id]
        function findChildTypes(ids: number[]) {
          const childTypeIds = types.filter(type => type.parentId && ids.includes(type.parentId)).map(type => type.id)
          if (childTypeIds.length) {
            descendantTypes.push(...childTypeIds)
            findChildTypes(childTypeIds)
          }
        }
        findChildTypes(data.id)

        // 删除所有子孙字典类型
        await db.delete(dataDictType).where(inArray(dataDictType.parentId, descendantTypes))
        // 删除所有子孙字典
        await db.delete(dataDict).where(inArray(dataDict.typeId, descendantTypes))
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
