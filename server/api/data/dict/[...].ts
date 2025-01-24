import { dataDict, insertDataDictSchema, updateDataDictSchema } from '~~/server/db/schema/data/dict'

export default defineEventHandler(async () => {
  return crud({
    entity: dataDict,
    insertSchema: insertDataDictSchema,
    updateSchema: updateDataDictSchema,
    listOptions: {
      keywordLike: ['name'],
      eq: ['typeId'],
      orderBy: {
        id: 'asc',
      },
    },
    pageOptions: {
      keywordLike: ['name'],
      eq: ['typeId'],
      orderBy: {
        id: 'asc',
      },
    },
  })
})
