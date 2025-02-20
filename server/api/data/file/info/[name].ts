export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({ statusCode: 404, message: '文件不存在' })
  }

  const file = await useStorage('file').getItemRaw(name)

  if (!file) {
    throw createError({ statusCode: 404, message: '文件不存在' })
  }

  return file
})
