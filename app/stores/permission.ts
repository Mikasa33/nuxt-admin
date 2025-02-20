export const usePermissionStore = defineStore(
  'permission',
  () => {
    const ready = ref(false)
    const routes = ref<string[]>([])
    const permissions = ref<string[]>([])

    async function fetch() {
      const data = await $fetch('/api/admin/person/permission')
      ready.value = true
      routes.value = data.routes ?? []
      permissions.value = data.permissions ?? []
    }

    return {
      ready,
      routes,
      permissions,
      fetch,
    }
  },
  {
    persist: {
      key: 'nuxt-admin-permission-state',
      omit: ['ready'],
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
)
