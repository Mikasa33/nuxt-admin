export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event)

  if (pathname.startsWith('/api') || pathname === '/_nitro/tasks') {
    if (pathname.startsWith('/api/_auth') || pathname.startsWith('/api/auth')) {
      return
    }

    const session = await getUserSession(event)
    if (!session.user) {
      await sendRedirect(event, '/login', 302)
    }
  }
})
