import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../base'

export const dataDictType = d.mysqlTable('data_dict_type', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.int('parent_id'),

  /**
   * 标识，必填
   */
  slug: d.varchar({ length: 32 }).notNull(),

  /**
   * 名称，必填
   */
  name: d.varchar({ length: 32 }).notNull(),

  /**
   * 排序，默认值 0
   */
  orderBy: d.int('order_by').default(0),
})

export type SelectDataDictType = typeof dataDictType.$inferSelect
export type InsertDataDictType = typeof dataDictType.$inferInsert

export const insertDataDictTypeSchema = createInsertSchema(dataDictType)
export const updateDataDictTypeSchema = insertDataDictTypeSchema.omit({ createdAt: true, updatedAt: true }).partial()
