export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession()

  if (!loggedIn.value) {
    return
  }

  if (!user?.value?.routers?.find((item: string) => item === to.path)) {
    createError({ statusCode: 403, message: '无权限访问' })
  }
})
