<script lang="ts" setup>
import type { DialogProps, DialogReactive } from 'naive-ui'

const props = defineProps<{
  dialog: DialogProps & {
    onConfirm?: (dialog: DialogReactive) => void
  }
}>()

const dialog = useCustomDialog()

function onClick() {
  const d = dialog.create({
    ...props.dialog,
    onPositiveClick: () => {
      props.dialog.onConfirm?.(d)
    },
  })
}
</script>

<template>
  <NButton
    v-bind="props"
    @click="onClick"
  >
    <slot v-if="$slots.default" />
  </NButton>
</template>
