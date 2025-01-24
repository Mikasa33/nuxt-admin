import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../../base'

export const dataDict = d.sqliteTable('data_dict', {
  ...baseSchema,

  /**
   * 类型 ID
   */
  typeId: d.integer('type_id'),

  /**
   * 父级 ID
   */
  parentId: d.integer('parent_id'),

  /**
   * 标识，必填
   */
  slug: d.text().notNull(),

  /**
   * 名称，必填
   */
  name: d.text().notNull(),

  /**
   * 排序，默认值 0
   */
  orderBy: d.integer('order_by').default(0),
})

export type SelectDataDict = typeof dataDict.$inferSelect
export type InsertDataDict = typeof dataDict.$inferInsert

export const insertDataDictSchema = createInsertSchema(dataDict)
export const updateDataDictSchema = insertDataDictSchema.omit({ createdAt: true, updatedAt: true }).partial()
export { batchDeleteSchema } from '../../base'
