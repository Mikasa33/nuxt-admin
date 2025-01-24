import * as d from 'drizzle-orm/sqlite-core'
import { baseSchema } from '../../base'

export const systemUserRole = d.sqliteTable('system_user_role', {
  ...baseSchema,

  /**
   * 用户 ID，必填
   */
  userId: d.integer('user_id').notNull(),

  /**
   * 角色 ID，必填
   */
  roleId: d.integer('role_id').notNull(),
})

export type SelectSystemUserRole = typeof systemUserRole.$inferSelect
export type InsertSystemUserRole = typeof systemUserRole.$inferInsert
