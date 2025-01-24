<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  auth: false,
})

const message = useMessage()
const notification = useNotification()
const { user, fetch } = useUserSession()

const formRef = ref()
const model = ref<any>({})
const loading = ref(false)

function onLogin() {
  formRef.value.validate(async (errors: any) => {
    if (errors) {
      message.error('请输入正确的用户名和密码')
      return
    }

    loading.value = true

    try {
      const data = await $fetch('/api/auth/login', {
        method: 'post',
        body: model.value,
      })
      if (data.success) {
        await fetch()
        notification.success({
          title: '登录成功',
          content: `欢迎回来，${user.value!.nickname ?? user.value!.username}！`,
          duration: 2000,
        })
        navigateTo('/')
      }
    }
    catch (error: any) {
      message.error(error.data.message)
    }
    finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="h-100vh w-full flex flex-col items-center justify-center">
    <div class="mb-4 text-24px font-bold">
      欢迎使用
    </div>
    <NForm
      ref="formRef"
      :model
      :show-require-mark="false"
      class="w-300px"
    >
      <NFormItem
        label="用户名"
        path="username"
        :rule="[{ required: true, message: '', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.username"
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
        path="password"
        :rule="[{ required: true, message: '', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.password"
          type="password"
          show-password-on="mousedown"
          clearable
          placeholder="请输入密码"
          @keydown.enter="onLogin"
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
