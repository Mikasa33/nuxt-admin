<script lang="ts" setup>
import type { VNodeChild } from 'vue'
import { isNumber } from 'lodash-es'

const { closable = true, width = 800 } = defineProps<{
  closable?: boolean
  confirmLoading?: boolean
  loading?: boolean
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
  <NModal
    v-model:show="show"
    :auto-focus="false"
    :closable
    preset="card"
    :title
    header-class="h-64px"
    :style="{ width: isNumber(width) ? `${width}px` : width }"
  >
    <NSpin
      :show="loading"
      class="h-full"
    >
      <slot />
    </NSpin>

    <template #footer>
      <NFlex justify="end">
        <NButton @click="onCancel">
          取消
        </NButton>
        <NButton
          :loading="confirmLoading"
          type="primary"
          @click="onConfirm"
        >
          保存
        </NButton>
      </NFlex>
    </template>
  </NModal>
</template>
