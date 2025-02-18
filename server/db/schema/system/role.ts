import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import * as z from 'zod'
import { baseSchema } from '../base'

export const systemRole = d.mysqlTable('system_role', {
  ...baseSchema,

  /**
   * 角色标识，必填
   */
  slug: d.varchar({ length: 32 }).notNull(),

  /**
   * 角色名称，必填
   */
  name: d.varchar({ length: 32 }).notNull(),
})

export type SelectSystemRole = typeof systemRole.$inferSelect & {
  menuIds?: number[]
}
export type InsertSystemRole = typeof systemRole.$inferInsert

export const insertSystemRoleSchema = createInsertSchema(systemRole).extend({
  menuIds: z.array(z.number()).optional().default([]),
})
export const updateSystemRoleSchema = insertSystemRoleSchema.omit({ createdAt: true, updatedAt: true }).extend({
  menuIds: z.array(z.number()).optional().default([]),
}).partial()
