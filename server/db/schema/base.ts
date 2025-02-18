import * as d from 'drizzle-orm/mysql-core'
import { z } from 'zod'

export const baseSchema = {
  /**
   * id，主键，自增
   */
  id: d.int().primaryKey().autoincrement(),

  /**
   * 创建时间，时间戳，当前时间
   */
  createdAt: d.timestamp('created_at', { mode: 'date' }).defaultNow(),

  /**
   * 更新时间，时间戳
   */
  updatedAt: d.timestamp('update_at', { mode: 'date' }).$onUpdate(() => new Date()),
}

export const deleteSchema = z.object({
  id: z.array(z.number()),
}).passthrough()
