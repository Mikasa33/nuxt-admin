export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event)

  if (pathname.startsWith('/api')) {
    // nuxt-auth-utils 相关接口不进行权限验证
    if (pathname.startsWith('/api/_auth')) {
      return
    }

    // 管理员登录接口不进行权限验证
    if (pathname.startsWith('/api/auth')) {
      return
    }

    const { user } = await getUserSession(event)

    // 未登录，跳转到登录页面
    if (!user) {
      throw createError({ statusCode: 401, message: '未登录' })
    }
  }
})
