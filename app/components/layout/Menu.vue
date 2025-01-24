<script lang="tsx" setup>
import type { MenuOption } from 'naive-ui'
import { NuxtLink } from '#components'

function convertToTree(data: any[]) {
  const map = new Map()
  const result: any[] = []

  data.forEach((item) => {
    map.set(item.id, {
      label: item.name,
      key: item.router ?? `key-${item.id}`,
      icon: item.icon ? renderIcon(item.icon) : null,
    })
  })

  data.forEach((item) => {
    if (item.parentId === null) {
      result.push(map.get(item.id))
    }
    else {
      const parent = map.get(item.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(map.get(item.id))
      }
    }
  })

  return result
}

const route = useRoute()

const { data: menuData } = await useFetch('/api/person/menu')
const options = computed(() => convertToTree(menuData.value as any[]))

const active = ref('')
watch(
  () => route.path,
  (path) => {
    active.value = path
  },
  { immediate: true },
)

function renderLabel(option: MenuOption) {
  return option.children
    ? <span>{option.label}</span>
    : (
        <NuxtLink to={option.key as string}>
          {option.label}
        </NuxtLink>
      )
}
</script>

<template>
  <NMenu
    v-model:value="active"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :icon-size="16"
    :options
    :render-label
  />
</template>
