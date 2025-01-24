import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { baseSchema } from '../../base'

export const systemUser = d.sqliteTable('system_user', {
  ...baseSchema,

  /**
   * 所属部门 ID，必填
   */
  departmentId: d.integer(),

  /**
   * 用户名，必填
   */
  username: d.text().notNull(),

  /**
   * 密码，必填
   */
  password: d.text().notNull(),

  /**
   * 用户昵称
   */
  nickname: d.text().notNull(),

  /**
   * 手机号，长度 11 位
   */
  phone: d.text({ length: 11 }),
})

export type SelectSystemUser = typeof systemUser.$inferSelect & {
  roleIds?: number[]
}
export type InsertSystemUser = typeof systemUser.$inferInsert

export const insertSystemUserSchema = createInsertSchema(systemUser).extend({
  roleIds: z.array(z.number()).optional().default([]),
})
export const updateSystemUserSchema = insertSystemUserSchema.omit({ createdAt: true, updatedAt: true }).extend({
  roleIds: z.array(z.number()).optional().default([]),
}).partial()
export { batchDeleteSchema } from '../../base'
