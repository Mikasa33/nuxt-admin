<script lang="ts" setup>
import type { VNodeChild } from 'vue'

defineProps<{
  title: string | number
}>()

defineSlots<{
  default: () => VNodeChild
  suffix: () => VNodeChild
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
