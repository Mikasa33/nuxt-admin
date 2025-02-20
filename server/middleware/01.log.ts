import { cloneDeep } from 'lodash-es'
import { systemLog } from '../db/schema/system/log'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const { pathname } = getRequestURL(event)
  const method = event.method
  const query = cloneDeep(getQuery(event))

  let body: any = {}
  if (method !== 'GET') {
    body = cloneDeep(await readBody(event))

    if (pathname === '/api/auth/login') {
      body.password = '******'
    }

    if (pathname === '/api/data/file/upload') {
      body = {}
    }
  }

  const db = await drizzle()
  await db.insert(systemLog).values({
    userId: user?.id,
    nickname: user?.nickname,
    method,
    router: pathname,
    query,
    body,
  })
})
