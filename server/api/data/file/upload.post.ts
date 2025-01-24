import type { SelectDataFile } from '~~/server/db/schema/data/file'
import { Buffer } from 'node:buffer'
import dayjs from 'dayjs'
import fs from 'fs-extra'
import { dataFile } from '~~/server/db/schema/data/file'

export default defineEventHandler(async (event) => {
  await verifyPermission('data:file:upload')

  const formData = await readFormData(event)
  const file = formData.get('file') as File
  if (!file) {
    throw createError({ statusCode: 500, message: '文件不能为空' })
  }
  const name = `${dayjs().valueOf()}_${file.name}`
  const path = `/upload/${name}`
  const url = `${getRequestProtocol(event)}://${getRequestHost(event)}${path}`
  const list: SelectDataFile[] = await useDrizzle()
    .insert(dataFile)
    .values({
      catalogId: Number(formData.get('catalogId')) || null,
      name,
      size: file.size,
      type: file.type,
      filename: file.name,
      path,
      url,
    })
    .returning()

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.outputFileSync(`public${path}`, buffer)

  return list[0]
})
