export function useDark() {
  const color = useColorMode()

  const isDark = computed({
    get() {
      return color.value === 'dark'
    },
    set() {
      color.preference = isDark.value ? 'light' : 'dark'
    },
  })

  return isDark
}