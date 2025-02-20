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
   * 链接，必填
   */
  url: d.varchar({ length: 512 }).notNull(),

  /**
   * 文件 ID，必填
   */
  fileId: d.varchar('file_id', { length: 64 }).notNull(),

  /**
   * 文件名，必填
   */
  fileName: d.varchar('file_name', { length: 255 }).notNull(),

  /**
   * 文件存储路径，必填
   */
  filePath: d.varchar('file_path', { length: 512 }).notNull(),

  /**
   * 文件大小，必填
   */
  fileSize: d.bigint('file_size', { mode: 'number' }).notNull(),

  /**
   * 文件扩展名
   */
  fileExt: d.varchar('file_ext', { length: 128 }),
  /**
   * 文件类型，必填
   */
  fileMime: d.varchar('file_mime', { length: 128 }),
})

export type SelectDataFile = typeof dataFile.$inferSelect
export type InsertDataFile = typeof dataFile.$inferInsert

export const insertDataFileSchema = createInsertSchema(dataFile)
export const updateDataFileSchema = insertDataFileSchema.omit({ createdAt: true, updatedAt: true }).partial()
