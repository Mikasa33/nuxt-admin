<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const model = ref<any>({})
const loading = ref(false)

function onLogin() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    navigateTo('/')
  }, 1000)
}
</script>

<template>
  <div class="h-100vh w-full flex flex-col items-center justify-center">
    <div class="mb-4 text-24px font-bold">
      欢迎使用
    </div>
    <NForm
      :model
      class="w-300px"
    >
      <NFormItem
        label="用户名"
        name="username"
      >
        <NInput
          v-model="model.username"
          clearable
          placeholder="请输入用户名"
        >
          <template #prefix>
            <Icon
              name="i-icon-park-outline-user"
              class="mr-4px"
            />
          </template>
        </NInput>
      </NFormItem>
      <NFormItem
        label="密码"
        name="password"
      >
        <NInput
          v-model="model.password"
          type="password"
          show-password-on="mousedown"
          clearable
          placeholder="请输入密码"
        >
          <template #prefix>
            <Icon
              name="i-icon-park-outline-lock"
              class="mr-4px"
            />
          </template>
        </NInput>
      </NFormItem>
      <NButton
        type="primary"
        block
        :loading
        @click="onLogin"
      >
        登录
      </NButton>
    </NForm>
  </div>
</template>
