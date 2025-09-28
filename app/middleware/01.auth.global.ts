import { isUndefined } from 'lodash-es'

export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    if (to.path === '/login') {
      return await navigateTo('/', { redirectCode: 301 })
    }
  }
  else {
    if (to.meta.auth || isUndefined(to.meta.auth)) {
      return await navigateTo('/login', { redirectCode: 301 })
    }
  }
})
