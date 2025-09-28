<script lang="ts" setup>
import type { VNode } from 'vue'

defineProps<{
  title: string | number
}>()

defineSlots<{
  default: () => VNode
  suffix: () => VNode
}>()
</script>

<template>
  <BaseTabs :data="[{ name: 'card', tab: title }]">
    <template #card>
      <slot />
    </template>

    <template #suffix>
      <slot name="suffix" />
    </template>
  </BaseTabs>
</template>
