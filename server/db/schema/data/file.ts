import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../base'

export const dataFile = d.mysqlTable('data_file', {
  ...baseSchema,

  /**
   * 目录 ID
   */
  catalogId: d.int('catalog_id'),

  /**
   * 名称，必填
   */
  name: d.varchar({ length: 255 }).notNull(),

  /**
   * 大小，必填
   */
  size: d.int().notNull(),

  /**
   * 类型，必填
   */
  type: d.varchar({ length: 128 }).notNull(),

  /**
   * 文件名，必填
   */
  filename: d.varchar({ length: 255 }).notNull(),

  /**
   * 存储路径，必填
   */
  path: d.varchar({ length: 512 }).notNull(),

  /**
   * 链接，必填
   */
  url: d.varchar({ length: 512 }).notNull(),
})

export type SelectDataFile = typeof dataFile.$inferSelect
export type InsertDataFile = typeof dataFile.$inferInsert

export const insertDataFileSchema = createInsertSchema(dataFile)
export const updateDataFileSchema = insertDataFileSchema.omit({ createdAt: true, updatedAt: true }).partial()
