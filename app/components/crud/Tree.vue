<script lang="ts" setup>
import type { DropdownOption, TreeOption, TreeProps } from 'naive-ui'

const { cancelable = false, data = [], loading = false, dropdownOptions = [], onBeforeContextmenu, defaultExpandAll = false } = defineProps<{
  cancelable?: boolean
  data?: TreeProps['data']
  defaultExpandAll?: boolean
  loading?: boolean
  dropdownOptions?: DropdownOption[]
  renderLabel?: TreeProps['renderLabel']
  onBeforeContextmenu?: (option: TreeOption) => boolean | void
}>()

const emits = defineEmits<{
  'dropdownSelect': [key: string | number, node: any]
  'update:expanded-keys': [keys: Array<string | number>, option: Array<TreeOption | null>, meta: any]
}>()

const selectedKeys = defineModel<Array<number | string>>('selected-keys')
function onUpdateSelectedKeys(keys: Array<number | string>) {
  selectedKeys.value = keys
}
function onUpdateExpandedKeys(
  keys: Array<string | number>,
  option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'expand' | 'collapse' | 'filter'
  },
) {
  emits('update:expanded-keys', keys, option, meta)
}

const node = ref()
const { options, show, x, y, onContextMenu } = useContextMenu({
  options: computed(() => dropdownOptions),
})
function nodeProps({ option }: { option: TreeOption }) {
  return {
    async onContextmenu(e: MouseEvent) {
      if (onBeforeContextmenu?.(option)) {
        return
      }
      node.value = option
      onContextMenu(e)
    },
  }
}
function onSelect(key: string | number) {
  show.value = false
  emits('dropdownSelect', key, node.value)
}
function onClickoutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('.n-tree-node')) {
    show.value = true
  }
  else {
    show.value = false
  }
}
</script>

<template>
  <NSpin
    :show="loading"
    size="small"
    content-class="wh-full"
    class="wh-full"
  >
    <NTree
      :selected-keys="selectedKeys"
      accordion
      :cancelable
      block-line
      :data
      :default-expand-all
      expand-on-click
      key-field="id"
      label-field="name"
      :node-props
      :render-label
      show-line
      :theme-overrides="{
        nodeHeight: '40px',
      }"
      :class="{
        'flex-y-center': !data.length,
      }"
      class="wh-full"
      @update:expanded-keys="onUpdateExpandedKeys"
      @update:selected-keys="onUpdateSelectedKeys"
    />
  </NSpin>
  <BaseContextMenu
    v-model:show="show"
    :options
    :x
    :y
    @select="onSelect"
    @clickoutside="onClickoutside"
  />
</template>
