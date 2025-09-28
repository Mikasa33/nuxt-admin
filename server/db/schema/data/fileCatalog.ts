import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../base'

export const dataFileCatalog = d.mysqlTable('data_file_catalog', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.int('parent_id'),

  /**
   * 名称，必填
   */
  name: d.varchar({ length: 32 }).notNull(),

  /**
   * 排序，默认值 0
   */
  orderNum: d.int('order_num').default(0),
})

export type SelectDataFileCatalog = typeof dataFileCatalog.$inferSelect
export type InsertDataFileCatalog = typeof dataFileCatalog.$inferInsert

export const insertDataFileCatalogSchema = createInsertSchema(dataFileCatalog)
export const updateDataFileCatalogSchema = insertDataFileCatalogSchema.omit({ createdAt: true, updatedAt: true }).partial()
