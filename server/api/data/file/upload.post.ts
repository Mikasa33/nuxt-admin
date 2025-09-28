import dayjs from 'dayjs'
import mime from 'mime'
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

  // 文件扩展名
  const fileExt = file.name.split('.').pop()
  // 文件 ID
  const fileId = nanoid()
  // 文件名
  const fileName = `${dayjs().format('YYYYMMDDHHmmss')}_${fileId}${fileExt ? `.${fileExt}` : ''}`
  // 文件路径
  const filePath = `/api/data/file/view?name=${fileName}`
  // URL
  const url = `${getRequestProtocol(event)}://${getRequestHost(event)}${filePath}`

  const storage = useStorage('file')

  // 保存文件
  await storage.setItemRaw(fileName, file.stream())

  const meta = await storage.getMeta(fileName)

  // 插入文件数据
  const [{ insertId }] = await db.insert(dataFile).values({
    catalogId: Number(catalogId),
    name: file.name,
    url,
    fileId,
    fileName,
    filePath,
    fileSize: meta.size as number,
    fileMime: mime.getType(fileExt ?? ''),
    fileExt,
  })

  return {
    id: insertId,
    name: file.name,
    url,
  }
})
