import * as d from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../../base'

export const systemMenu = d.sqliteTable('system_menu', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.integer('parent_id'),

  /**
   * 名称，必填
   */
  name: d.text().notNull(),

  /**
   * 类型，必填
   */
  type: d.text({ enum: ['catalog', 'menu', 'permission'] }).default('menu'),

  /**
   * 标识，type 为 button 时必填
   */
  slug: d.text(),

  /**
   * 图标
   */
  icon: d.text(),

  /**
   * 路由
   */
  router: d.text(),

  /**
   * 排序，默认值 0
   */
  orderBy: d.integer('order_by').default(0),
})

export type SelectSystemMenu = typeof systemMenu.$inferSelect
export type InsertSystemMenu = typeof systemMenu.$inferInsert

export const insertSystemMenuSchema = createInsertSchema(systemMenu)
export const updateSystemMenuSchema = insertSystemMenuSchema.omit({ createdAt: true, updatedAt: true }).partial()
