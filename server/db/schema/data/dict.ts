import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../base'

export const dataDict = d.mysqlTable('data_dict', {
  ...baseSchema,

  /**
   * 类型 ID
   */
  typeId: d.int('type_id'),

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

export type SelectDataDict = typeof dataDict.$inferSelect
export type InsertDataDict = typeof dataDict.$inferInsert

export const insertDataDictSchema = createInsertSchema(dataDict)
export const updateDataDictSchema = insertDataDictSchema.omit({ createdAt: true, updatedAt: true }).partial()
