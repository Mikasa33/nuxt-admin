<script lang="ts" setup>
import type { ResultProps } from 'naive-ui'

const { error } = defineProps<{
  error?: any
}>()

const err = computed(() => error?.data ?? error)

const status = computed(() => {
  if ([403, 404, 500, 418].includes(err.value.statusCode ?? 0)) {
    return err.value.statusCode?.toString() as ResultProps['status']
  }
  return 'warning'
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NResult
    :status
    :title="`${err.statusCode} - ${err.message}`"
    class="h-100vh w-full flex-center flex-col"
  >
    <template #footer>
      <NButton
        type="primary"
        @click="goHome"
      >
        返回首页
      </NButton>
    </template>
  </NResult>
</template>
