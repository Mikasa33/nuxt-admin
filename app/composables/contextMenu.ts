export function useContextMenu(opts: any = {}) {
  const options = ref(opts.options ?? [])
  const show = ref(false)
  const x = ref(0)
  const y = ref(0)

  function onContextMenu(e: MouseEvent) {
    e.preventDefault()
    show.value = true
    x.value = e.clientX
    y.value = e.clientY
  }

  return {
    options,
    show,
    x,
    y,
    onContextMenu,
  }
}
