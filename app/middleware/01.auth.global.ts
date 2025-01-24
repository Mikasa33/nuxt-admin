export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    if (to.path === '/login') {
      return navigateTo('/', { redirectCode: 301 })
    }
  }
  else {
    if (to.meta.auth || isUndefined(to.meta.auth)) {
      return navigateTo('/login', { redirectCode: 301 })
    }
  }
})
