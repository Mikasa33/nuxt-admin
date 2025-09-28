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
  updatedAt: d.timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()),
}

export const deleteSchema = z.object({
  ids: z.array(z.number()),
})
