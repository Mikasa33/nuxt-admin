import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { omit } from 'lodash-es'
import { baseSchema } from '../base'

export const systemLog = d.mysqlTable('system_log', {
  ...omit(baseSchema, ['updatedAt']),

  /**
   * 用户 ID，必填
   */
  userId: d.int('user_id'),

  /**
   * 用户昵称，必填
   */
  nickname: d.varchar({ length: 32 }),

  /**
   * 请求方法，必填
   */
  method: d.varchar({ length: 10 }).notNull(),

  /**
   * 请求地址，必填
   */
  router: d.varchar({ length: 255 }).notNull(),

  /**
   * 查询参数
   */
  query: d.json(),

  /**
   * 请求体
   */
  body: d.json(),
})

export type SelectSystemLog = typeof systemLog.$inferSelect
export type InsertSystemLog = typeof systemLog.$inferInsert

export const insertSystemLogSchema = createInsertSchema(systemLog)
export const updateSystemLogSchema = insertSystemLogSchema.omit({ createdAt: true }).partial()
