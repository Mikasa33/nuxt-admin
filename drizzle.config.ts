import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: '.data/db.sqlite3',
  },
  introspect: { casing: 'camel' },
  out: './server/db/migrations',
  schema: './server/db/schema/*',
  verbose: true,
})
