import { systemLog } from '../db/schema/system/log'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  const { pathname } = getRequestURL(event)
  const method = event.method
  const query = getQuery(event)
  let body = {}
  if (method !== 'GET' && pathname !== '/api/auth/login') {
    body = await readBody(event)
  }

  useDrizzle()
    .insert(systemLog)
    .values({
      userId: user?.id,
      nickname: user?.nickname,
      method,
      router: pathname,
      query,
      body,
    })
    .run()
})
