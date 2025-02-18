import * as d from 'drizzle-orm/mysql-core'
import { baseSchema } from '../base'

export const systemUserRole = d.mysqlTable('system_user_role', {
  ...baseSchema,

  /**
   * 用户 ID，必填
   */
  userId: d.int('user_id').notNull(),

  /**
   * 角色 ID，必填
   */
  roleId: d.int('role_id').notNull(),
})

export type SelectSystemUserRole = typeof systemUserRole.$inferSelect
export type InsertSystemUserRole = typeof systemUserRole.$inferInsert
