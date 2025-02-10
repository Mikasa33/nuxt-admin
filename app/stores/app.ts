export const useAppStore = defineStore(
  'app',
  () => {
    const collapsed = ref(false)

    return {
      collapsed,
    }
  },
  {
    persist: {
      key: 'nuxt-admin-app-state',
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
)
