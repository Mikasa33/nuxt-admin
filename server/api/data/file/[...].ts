import { dataFile, insertDataFileSchema, updateDataFileSchema } from '~~/server/db/schema/data/file'

export default defineEventHandler(async () => {
  return crud({
    entity: dataFile,
    insertSchema: insertDataFileSchema,
    updateSchema: updateDataFileSchema,
    pageOptions: {
      keywordLike: ['name', 'filename'],
      eq: ['catalogId'],
      orderBy: {
        id: 'asc',
      },
    },
  })
})
