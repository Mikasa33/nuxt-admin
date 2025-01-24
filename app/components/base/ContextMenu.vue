<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'

const { options = [] } = defineProps<{
  options: DropdownOption[]
  x: number
  y: number
}>()

const emits = defineEmits<{
  select: [key: string | number, option: DropdownOption]
  clickoutside: [e: MouseEvent]
}>()

const show = defineModel<boolean>('show')

function handleSelect(key: string | number, option: DropdownOption) {
  emits('select', key, option)
}

function handleClickoutside(e: MouseEvent) {
  show.value = false
  emits('clickoutside', e)
}
</script>

<template>
  <NDropdown
    v-model:show="show"
    trigger="manual"
    placement="bottom-start"
    :options
    :x
    :y
    class="min-w-100px"
    @select="handleSelect"
    @clickoutside="handleClickoutside"
  />
</template>
