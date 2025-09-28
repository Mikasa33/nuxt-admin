<script lang="ts" setup>
import type { TabPaneProps } from 'naive-ui'
import type { VNode } from 'vue'

defineProps<{
  data?: TabPaneProps[]
}>()

defineSlots<{
  [key: string]: () => VNode
  suffix: () => VNode
}>()
</script>

<template>
  <NCard
    :bordered="false"
    content-class="h-full !p-0"
    class="h-full"
  >
    <NTabs
      size="large"
      pane-class="!p-0"
      :tabs-padding="24"
      :theme-overrides="{
        tabPaddingLargeBar: '12px 0',
      }"
      class="h-full"
    >
      <NTabPane
        v-for="tab in data"
        :key="tab.name"
        v-bind="tab"
        :name="tab.name!"
        class="h-full min-h-0"
      >
        <NScrollbar content-class="h-full px-24px !py-20px">
          <slot :name="(tab.name as string)" />
        </NScrollbar>
      </NTabPane>

      <template #suffix>
        <slot name="suffix" />
      </template>
    </NTabs>
  </NCard>
</template>
