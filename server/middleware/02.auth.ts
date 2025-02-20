export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event)

  if (pathname.startsWith('/api')) {
    // nuxt-auth-utils 相关接口不进行权限验证
    if (pathname.startsWith('/api/_auth')) {
      return
    }

    // 管理员相关接口
    if (pathname.startsWith('/api/admin')) {
      // 管理员登录接口不进行权限验证
      if (pathname.startsWith('/api/admin/auth')) {
        return
      }

      const { user } = await getUserSession(event)

      // 未登录，跳转到登录页面
      if (!user) {
        await sendRedirect(event, '/admin/login', 302)
      }
    }
  }
})
