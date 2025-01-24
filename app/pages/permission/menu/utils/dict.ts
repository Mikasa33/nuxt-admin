import type { TagProps } from 'naive-ui'

export const typeOptions: { label: string, value: 'catalog' | 'menu' | 'permission', type: TagProps['type'] }[] = [
  { label: '目录', value: 'catalog', type: 'success' },
  { label: '菜单', value: 'menu', type: 'info' },
  { label: '权限', value: 'permission', type: 'warning' },
]
