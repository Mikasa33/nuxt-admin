<script lang="ts" setup>
const { error } = defineProps<{
  error?: any
}>()

const { clear } = useUserSession()

const err = computed(() => error?.data ?? error ?? { statusCode: 404, message: 'Not Found' })

async function goLogin() {
  await clear()
  clearError({ redirect: '/login' })
}

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NResult
    status="warning"
    :title="`${err.statusCode ?? 404} ${err.message ?? '资源不存在'}`"
    class="h-100vh w-full flex-center flex-col"
  >
    <template #footer>
      <NButton
        v-if="err.statusCode === 401"
        type="primary"
        @click="goLogin"
      >
        跳转登录
      </NButton>
      <NButton
        v-else
        type="primary"
        @click="goHome"
      >
        返回首页
      </NButton>
    </template>
  </NResult>
</template>
