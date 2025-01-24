<script lang="ts" setup>
import type { ButtonProps } from 'naive-ui'

const { type } = defineProps<{
  type?: ButtonProps['type']
}>()

const emits = defineEmits<{
  click: []
}>()

defineSlots<{
  default: () => VNode
}>()

function onClick() {
  emits('click')
}
</script>

<template>
  <NButton
    quaternary
    size="small"
    :type
    @click.stop="onClick"
  >
    <slot />
  </NButton>
</template>
