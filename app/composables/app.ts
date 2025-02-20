export function useApp() {
  const route = useRoute()
  const isAdmin = computed(() => route.fullPath.startsWith('/admin'))

  return {
    isAdmin,
  }
}
