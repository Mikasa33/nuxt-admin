import mime from 'mime'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({ statusCode: 404, message: '文件不存在' })
  }

  const file = await useStorage('file').getItemRaw(name)

  if (!file) {
    throw createError({ statusCode: 404, message: '文件不存在' })
  }

  // 获取文件扩展名
  const fileExt = name.split('.').pop()

  // 设置响应头
  setResponseHeader(event, 'Content-Type', mime.getType(fileExt ?? '') ?? 'application/octet-stream')

  return file
})
