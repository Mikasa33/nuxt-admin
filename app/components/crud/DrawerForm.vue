<script lang="ts" setup>
import type { VNodeChild } from 'vue'

const { closable = true, width = 500 } = defineProps<{
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
  <NDrawer
    v-model:show="show"
    :auto-focus="false"
    :width
  >
    <NDrawerContent
      :closable
      :title
      :native-scrollbar="false"
      header-class="h-64px"
      body-content-class="h-full"
    >
      <NSpin
        :show="loading"
        class="h-full"
      >
        <slot />
      </NSpin>

      <template #footer>
        <NFlex>
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
    </NDrawerContent>
  </NDrawer>
</template>
