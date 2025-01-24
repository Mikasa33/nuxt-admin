import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../../base'

export const dataFileCatalog = d.sqliteTable('data_file_catalog', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.integer('parent_id'),

  /**
   * 名称，必填
   */
  name: d.text().notNull(),

  /**
   * 排序，默认值 0
   */
  orderBy: d.integer('order_by').default(0),
})

export type SelectDataFileCatalog = typeof dataFileCatalog.$inferSelect
export type InsertDataFileCatalog = typeof dataFileCatalog.$inferInsert

export const insertDataFileCatalogSchema = createInsertSchema(dataFileCatalog)
export const updateDataFileCatalogSchema = insertDataFileCatalogSchema.omit({ createdAt: true, updatedAt: true }).partial()
