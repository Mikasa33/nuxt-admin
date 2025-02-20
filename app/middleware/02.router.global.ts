export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return
  }

  const { ready, routes } = storeToRefs(usePermissionStore())
  const { fetch } = usePermissionStore()

  if (!ready.value) {
    await fetch()
  }

  if (!routes.value.find((item: string) => item === to.path)) {
    createError({ statusCode: 403, message: '无权限访问' })
  }
})
