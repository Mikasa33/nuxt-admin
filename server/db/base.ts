import { sql } from 'drizzle-orm'
import * as d from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

export const baseSchema = {
  /**
   * 主键 id，自增
   */
  id: d.integer().primaryKey({ autoIncrement: true }),

  /**
   * 创建时间
   */
  createdAt: d.integer('created_at', { mode: 'timestamp_ms' }).default(sql`(unixepoch() * 1000)`),

  /**
   * 更新时间
   */
  updatedAt: d.integer('update_at', { mode: 'timestamp_ms' }).$onUpdate(() => new Date()),
}

export const batchDeleteSchema = z.object({
  ids: z.array(z.number()),
})

export const deleteSchema = z.object({
  id: z.array(z.number()),
})
