import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.NUXT_MYSQL_HOST as string,
    port: Number(process.env.NUXT_MYSQL_PORT) ?? 3306,
    user: process.env.NUXT_MYSQL_USER as string,
    password: process.env.NUXT_MYSQL_PASSWORD as string,
    database: process.env.NUXT_MYSQL_DATABASE as string,
  },
  out: './server/db/migrations',
  schema: './server/db/schema/*',
  verbose: true,
})
