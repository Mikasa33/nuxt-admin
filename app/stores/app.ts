export const useAppStore = defineStore('app', () => {
  const collapsed = ref(false)

  return {
    collapsed,
  }
})
