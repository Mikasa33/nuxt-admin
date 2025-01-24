import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../../base'

export const dataFile = d.sqliteTable('data_file', {
  ...baseSchema,

  /**
   * 目录 ID
   */
  catalogId: d.integer('catalog_id'),

  /**
   * 名称，必填
   */
  name: d.text().notNull(),

  /**
   * 大小，必填
   */
  size: d.integer().notNull(),

  /**
   * 类型，必填
   */
  type: d.text().notNull(),

  /**
   * 文件名，必填
   */
  filename: d.text().notNull(),

  /**
   * 存储路径，必填
   */
  path: d.text().notNull(),

  /**
   * 链接，必填
   */
  url: d.text().notNull(),
})

export type SelectDataFile = typeof dataFile.$inferSelect
export type InsertDataFile = typeof dataFile.$inferInsert

export const insertDataFileSchema = createInsertSchema(dataFile)
export const updateDataFileSchema = insertDataFileSchema.omit({ createdAt: true, updatedAt: true }).partial()
export { batchDeleteSchema } from '../../base'
