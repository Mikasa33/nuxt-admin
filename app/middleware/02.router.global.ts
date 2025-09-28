export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return
  }

  const { routeList } = storeToRefs(usePermissionStore())
  if (!routeList.value.find((item: string) => item === to.path)) {
    createError({ statusCode: 403, message: '无权限访问' })
  }
})
