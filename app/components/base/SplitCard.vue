<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const { cKey = 'default', defaultSize = '280px', max = 0.5, min = '220px', resizeTriggerSize = 24 } = defineProps<{
  cKey?: string
  defaultSize?: string
  max?: number | string
  min?: number | string
  resizeTriggerSize?: number
}>()

const { name } = useAppConfig()

const storage = useStorage<any>(`${name}:split-card`, {})

function onUpdateSize(value: string) {
  storage.value[cKey] = value
}
</script>

<template>
  <NSplit
    v-model:size="storage[cKey]"
    :default-size
    direction="horizontal"
    :max
    :min
    :resize-trigger-size
    class="h-full flex overflow-hidden rounded-16px transition-300"
    @update:size="onUpdateSize"
  >
    <template #1>
      <slot name="left" />
    </template>

    <template #2>
      <slot name="right" />
    </template>

    <template #resize-trigger>
      <NEl class="group h-full w-full flex-x-center">
        <div class="h-full w-1px transition-300 group-active:w-2px group-hover:w-2px group-active:bg-[var(--primary-color)] group-hover:bg-[var(--primary-color)]" />
      </NEl>
    </template>
  </NSplit>
</template>
