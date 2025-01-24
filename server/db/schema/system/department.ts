import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../../base'

export const systemDepartment = d.sqliteTable('system_department', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.integer('parent_id'),

  /**
   * 部门名称，必填
   */
  name: d.text().notNull(),

  /**
   * 排序，默认值 0
   */
  orderBy: d.integer('order_by').default(0),
})

export type SelectSystemDepartment = typeof systemDepartment.$inferSelect
export type InsertSystemDepartment = typeof systemDepartment.$inferInsert

export const insertSystemDepartmentSchema = createInsertSchema(systemDepartment)
export const updateSystemDepartmentSchema = insertSystemDepartmentSchema.omit({ createdAt: true, updatedAt: true }).partial()
export { batchDeleteSchema } from '../../base'
