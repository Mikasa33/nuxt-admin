import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('.data/db.sqlite3')

export function useDrizzle() {
  return drizzle({
    client: sqlite,
  })
}
