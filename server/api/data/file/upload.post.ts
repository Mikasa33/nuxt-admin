import { Buffer } from 'node:buffer'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { dataFile } from '~~/server/db/schema/data/file'

export default defineEventHandler(async (event) => {
  await verifyPermission('data:file:upload')

  const db = await drizzle()

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
  const name = `${dayjs().valueOf()}_${nanoid()}.${file.name.split('.').pop()}`
  // 生成文件路径
  const path = `/api/data/file/info/${name}`
  // 生成文件 URL
  const url = `${getRequestProtocol(event)}://${getRequestHost(event)}${path}`

  // 保存文件
  const buffer = Buffer.from(await file.arrayBuffer())
  await useStorage('file').setItemRaw(name, buffer)

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

  return {
    id: insertId,
    url,
  }
})
