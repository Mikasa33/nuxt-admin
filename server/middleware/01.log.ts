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

    // 管理员登录接口不记录明文密码
    if (pathname === '/api/auth/login') {
      body.password = '******'
    }

    // 管理员文件上传接口不记录文件内容
    if (pathname === '/api/data/file/upload') {
      body = {}
    }

    // 管理员文件预览接口不记录文件内容
    if (pathname === '/api/data/file/view') {
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
