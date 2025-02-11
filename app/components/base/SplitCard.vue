<script lang="ts" setup>
const { defaultSize = '280px', max = 0.5, min = '220px', resizeTriggerSize = 24 } = defineProps<{
  defaultSize?: string
  max?: number | string
  min?: number | string
  resizeTriggerSize?: number
}>()
</script>

<template>
  <NSplit
    :default-size
    direction="horizontal"
    :max
    :min
    :resize-trigger-size
    class="h-full flex overflow-hidden rounded-16px transition-300 dark:bg-#18181d"
  >
    <template #1>
      <slot name="left" />
    </template>

    <template #2>
      <slot name="right" />
    </template>

    <template #resize-trigger>
      <NEl class="group h-full w-full flex-x-center">
        <div class="h-full w-1px transition-300 group-active:w-2px group-hover:w-2px dark:bg-#ffffff17 group-active:bg-[var(--primary-color)] group-hover:bg-[var(--primary-color)]" />
      </NEl>
    </template>
  </NSplit>
</template>
