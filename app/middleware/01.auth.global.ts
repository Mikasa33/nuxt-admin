export default defineNuxtRouteMiddleware((to) => {
  const { isAdmin } = useApp()

  if (!isAdmin.value) {
    return
  }

  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    if (to.path === '/admin/login') {
      return navigateTo('/admin', { redirectCode: 301 })
    }
  }
  else {
    if (to.meta.auth || isUndefined(to.meta.auth)) {
      return navigateTo('/admin/login', { redirectCode: 301 })
    }
  }
})
