export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event)

  if (pathname.startsWith('/api')) {
    if (pathname.startsWith('/api/_auth') || pathname.startsWith('/api/auth')) {
      return
    }

    const { user } = await getUserSession(event)

    // 未登录，跳转到登录页面
    if (!user) {
      await sendRedirect(event, '/login', 302)
    }
  }
})
