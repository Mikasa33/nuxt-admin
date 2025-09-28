import * as d from 'drizzle-orm/mysql-core'
import { createInsertSchema } from 'drizzle-zod'
import { baseSchema } from '../base'

export const systemMenu = d.mysqlTable('system_menu', {
  ...baseSchema,

  /**
   * 父级 ID
   */
  parentId: d.int('parent_id'),

  /**
   * 名称，必填
   */
  name: d.varchar({ length: 32 }).notNull(),

  /**
   * 类型，必填
   */
  type: d.mysqlEnum(['catalog', 'menu', 'permission']).default('menu'),

  /**
   * 标识，type 为 button 时必填
   */
  slug: d.varchar({ length: 255 }),

  /**
   * 图标
   */
  icon: d.varchar({ length: 64 }),

  /**
   * 路由
   */
  router: d.varchar({ length: 255 }),

  /**
   * 排序，默认值 0
   */
  orderNum: d.int('order_num').default(0),
})

export type SelectSystemMenu = typeof systemMenu.$inferSelect
export type InsertSystemMenu = typeof systemMenu.$inferInsert

export const insertSystemMenuSchema = createInsertSchema(systemMenu)
export const updateSystemMenuSchema = insertSystemMenuSchema.omit({ createdAt: true, updatedAt: true }).partial()
