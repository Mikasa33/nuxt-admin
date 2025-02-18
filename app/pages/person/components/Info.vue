<script lang="ts" setup>
const message = useMessage()
const { user, fetch } = useUserSession()
const formRef = ref()
const model = ref()

const { data, error, status } = await useFetch('/api/person')
if (error.value) {
  showError(error.value)
}
model.value = data.value ?? {}

const { error: updateError, execute: updateExecute, status: updateStatus } = useRequest('/api/person', {
  method: 'put',
})

async function onSave() {
  formRef.value.validate(async (errors: any) => {
    if (errors) {
      return
    }

    await updateExecute({
      body: model.value,
    })

    if (updateError.value) {
      useErrorMessage(updateError)
      return
    }

    message.success('修改成功')
    fetch()
  })
}
</script>

<template>
  <NSpin :show="status === 'pending'">
    <NForm
      ref="formRef"
      label-placement="left"
      label-width="80px"
      :model
    >
      <NFormItem label="用户名">
        <NText :depth="3">
          {{ user?.username }}
        </NText>
      </NFormItem>
      <NFormItem
        label="昵称"
        path="nickname"
        :rule="[{ required: true, message: '昵称必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.nickname"
          placeholder="请输入昵称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="手机号"
        path="phone"
      >
        <NInput
          v-model:value="model.phone"
          placeholder="请输入手机号"
          clearable
        />
      </NFormItem>
      <NFormItem
        label=" "
        :show-feedback="false"
      >
        <NButton
          type="primary"
          :loading="updateStatus === 'pending'"
          @click="onSave"
        >
          保存修改
        </NButton>
      </NFormItem>
    </NForm>
  </NSpin>
</template>
