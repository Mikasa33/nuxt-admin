import type { DialogOptions } from 'naive-ui'

export function useCustomDialog() {
  const dialog = useDialog()

  function create(options: DialogOptions) {
    return dialog.create({
      autoFocus: false,
      draggable: true,
      title: '提示',
      type: 'warning',
      positiveText: '确认',
      negativeText: '取消',
      ...options,
    })
  }

  return {
    create,
  }
}
