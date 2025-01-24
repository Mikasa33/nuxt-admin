<script lang="ts" setup>
import type { DropdownOption, TreeOption } from 'naive-ui'

const selectedKeys = ref<number[]>([])

async function onUpdateSelectedKeys(keys: number[]) {
  if (keys.length) {
    selectedKeys.value = keys
    await nextTick()
    onLoadUser()
  }
}

function renderPrefix() {
  return renderIcon('i-icon-park-outline-peoples')
}

const dropdown = ref<any>({
  node: {},
  options: [],
  show: false,
  x: 0,
  y: 0,
})

function handleSelect(key: string | number) {
  dropdown.value.show = false

  switch (key) {
    case 'edit':
      onEdit(dropdown.value.node)
      break
    case 'delete':
      onDialogDelete(dropdown.value.node)
      break
  }
}

function nodeProps({ option }: { option: TreeOption }) {
  return {
    async onContextmenu(e: MouseEvent) {
      e.preventDefault()

      if (!hasAnyPermission(['system:department:update', 'system:department:delete'])) {
        message.warning('您没有权限进行此操作')
        return
      }

      const options: DropdownOption[] = []
      if (hasPermission('system:department:update')) {
        options.push({
          key: 'edit',
          label: '编辑',
          icon: renderIcon('i-icon-park-outline-edit'),
        })
      }
      if (option.id !== 1 && hasPermission('system:department:delete')) {
        options.push({
          key: 'delete',
          label: '删除',
          icon: renderIcon('i-icon-park-outline-delete'),
        })
      }

      setTimeout(() => {
        dropdown.value = {
          node: option,
          options,
          show: true,
          x: e.clientX,
          y: e.clientY,
        }
      }, 200)
    },
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
      block-line
      :data="treeData"
      default-expand-all
      expand-on-click
      key-field="id"
      label-field="name"
      :node-props="nodeProps"
      show-line
      :theme-overrides="{
        nodeHeight: '40px',
      }"
      :class="{
        'flex-y-center': !data.length,
      }"
      class="wh-full"
      @update:selected-keys="onUpdateSelectedKeys"
    >
      <template
        v-if="loading"
        #empty
      >
        <div class="wh-full" />
      </template>
    </NTree>
  </NSpin>
  <BaseContextMenu
    v-model:show="dropdown.show"
    :options="dropdown.options"
    :x="dropdown.x"
    :y="dropdown.y"
    @select="handleSelect"
  />
</template>
