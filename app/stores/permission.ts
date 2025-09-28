export const usePermissionStore = defineStore(
  'permission',
  () => {
    const routeList = ref<string[]>([])
    const permissionList = ref<string[]>([])
    const menuList = ref<any[]>([])

    async function fetch() {
      const { data } = await useCustomFetch('/api/person/permission')
      routeList.value = data.value?.routeList ?? []
      permissionList.value = data.value?.permissionList ?? []
      menuList.value = data.value?.menuList ?? []
    }

    return {
      routeList,
      permissionList,
      menuList,
      fetch,
    }
  },
  {
    persist: {
      key: 'nuxt-admin:permission-store',
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
)
