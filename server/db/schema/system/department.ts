import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../base'

export const systemDepartment = d.mysqlTable('system_department', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.int('parent_id'),

  /**
   * 部门名称，必填
   */
  name: d.varchar({ length: 64 }).notNull(),

  /**
   * 排序，默认值 0
   */
  orderBy: d.int('order_by').default(0),
})

export type SelectSystemDepartment = typeof systemDepartment.$inferSelect
export type InsertSystemDepartment = typeof systemDepartment.$inferInsert

export const insertSystemDepartmentSchema = createInsertSchema(systemDepartment)
export const updateSystemDepartmentSchema = insertSystemDepartmentSchema.omit({ createdAt: true, updatedAt: true }).partial()
