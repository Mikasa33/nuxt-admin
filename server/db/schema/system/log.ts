import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { omit } from 'lodash-es'
import { baseSchema } from '../../base'

export const systemLog = d.sqliteTable('system_log', {
  ...omit(baseSchema, ['updatedAt']),

  /**
   * 用户 ID，必填
   */
  userId: d.integer('user_id'),

  /**
   * 用户昵称，必填
   */
  nickname: d.text(),

  /**
   * 请求方法，必填
   */
  method: d.text().notNull(),

  /**
   * 请求地址，必填
   */
  router: d.text().notNull(),

  /**
   * 查询参数
   */
  query: d.text({ mode: 'json' }),

  /**
   * 请求体
   */
  body: d.text({ mode: 'json' }),
})

export type SelectSystemLog = typeof systemLog.$inferSelect
export type InsertSystemLog = typeof systemLog.$inferInsert

export const insertSystemLogSchema = createInsertSchema(systemLog)
export const updateSystemLogSchema = insertSystemLogSchema.omit({ createdAt: true }).partial()
