<script lang="ts" setup>
import type { NuxtError } from '#app'
import type { ResultProps } from 'naive-ui'

const { error } = defineProps<{
  error?: NuxtError
}>()

const status = computed(() => {
  if ([403, 404, 500, 418].includes(error?.statusCode ?? 0)) {
    return error?.statusCode.toString() as ResultProps['status']
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
    :title="error?.message"
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
