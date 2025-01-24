import * as d from 'drizzle-orm/sqlite-core'
import { baseSchema } from '../../base'

export const systemRoleMenu = d.sqliteTable('system_role_menu', {
  ...baseSchema,

  /**
   * 角色 ID，必填
   */
  roleId: d.integer('role_id').notNull(),

  /**
   * 菜单 ID，必填
   */
  menuId: d.integer('menu_id').notNull(),
})

export type SelectSystemRoleMenu = typeof systemRoleMenu.$inferSelect
export type InsertSystemRoleMenu = typeof systemRoleMenu.$inferInsert
