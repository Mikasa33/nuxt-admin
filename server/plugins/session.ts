import type { SelectSystemMenu } from '../db/schema/system/menu'

export default defineNitroPlugin(() => {
  sessionHooks.hook('clear', async (session) => {
    const userStorage = useStorage<{ menuList: SelectSystemMenu[], routeList: string[], permissionList: string[] }>('redis')
    await userStorage.removeItem(`nuxt:admin:user:${session.user?.id}:data`)
  })
})
