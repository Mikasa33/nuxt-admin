import { Buffer } from 'node:buffer'
import { join } from 'node:path'
import { cwd } from 'node:process'
import dayjs from 'dayjs'
import fs from 'fs-extra'
import { dataFile } from '~~/server/db/schema/data/file'

export default defineEventHandler(async (event) => {
  await verifyPermission('data:file:upload')

  const db = await useDrizzle()

  const formData = await readFormData(event)

  const file = formData.get('file') as File
  if (!file) {
    throw createError({ statusCode: 500, message: '文件不能为空' })
  }

  const catalogId = formData.get('catalogId')
  if (!catalogId) {
    throw createError({ statusCode: 500, message: '文件目录不能为空' })
  }

  // 生成文件名
  const name = `${dayjs().valueOf()}_${file.name}`
  // 生成文件保存路径
  const path = `/upload/${name}`
  // 生成文件 URL
  const url = `${getRequestProtocol(event)}://${getRequestHost(event)}${path}`

  // 插入文件数据
  const [{ insertId }] = await db.insert(dataFile).values({
    catalogId: Number(catalogId),
    name,
    size: file.size,
    type: file.type,
    filename: file.name,
    path,
    url,
  })

  // 保存文件到磁盘，使用绝对路径
  const uploadDir = import.meta.dev ? 'public' : '.output/public'
  const fullPath = join(cwd(), uploadDir, path)
  const buffer = Buffer.from(await file.arrayBuffer())
  fs.outputFileSync(fullPath, buffer)

  return {
    id: insertId,
  }
})
