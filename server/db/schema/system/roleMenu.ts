import * as d from 'drizzle-orm/mysql-core'
import { baseSchema } from '../base'

export const systemRoleMenu = d.mysqlTable('system_role_menu', {
  ...baseSchema,

  /**
   * 角色 ID，必填
   */
  roleId: d.int('role_id').notNull(),

  /**
   * 菜单 ID，必填
   */
  menuId: d.int('menu_id').notNull(),
})

export type SelectSystemRoleMenu = typeof systemRoleMenu.$inferSelect
export type InsertSystemRoleMenu = typeof systemRoleMenu.$inferInsert
