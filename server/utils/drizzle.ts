import type { MySqlDatabase } from 'drizzle-orm/mysql2'
import process from 'node:process'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '../db/schema'

let db: MySqlDatabase<any, any, typeof schema>

export async function useDrizzle() {
  if (db) {
    return db
  }

  const event = useEvent()
  const config = useRuntimeConfig(event)

  const connection = await mysql.createConnection(config.mysql)

  db = drizzle({
    casing: 'snake_case',
    client: connection,
    logger: process.env.NODE_ENV !== 'production',
    mode: 'default',
    schema,
  })

  return db
}
