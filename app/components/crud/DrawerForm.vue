<script lang="ts" setup>
import type { VNodeChild } from 'vue'

const { closable = true, width = 500 } = defineProps<{
  closable?: boolean
  title: string
  width?: number | string
}>()

const emits = defineEmits<{
  cancel: []
  confirm: []
}>()

defineSlots<{
  default: () => VNodeChild
}>()

const show = defineModel<boolean>('show')

function onCancel() {
  show.value = false
  emits('cancel')
}

function onConfirm() {
  emits('confirm')
}
</script>

<template>
  <NDrawer
    v-model:show="show"
    :auto-focus="false"
    :width
  >
    <NDrawerContent
      :closable
      :title
      header-class="h-64px"
    >
      <slot />

      <template #footer>
        <NFlex>
          <NButton @click="onCancel">
            取消
          </NButton>
          <NButton
            type="primary"
            @click="onConfirm"
          >
            保存
          </NButton>
        </NFlex>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
