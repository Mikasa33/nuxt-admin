<script lang="ts" setup>
const message = useMessage()
const { user, fetch } = useUserSession()
const formRef = useTemplateRef('form')
const model = ref()

const { data, pending } = await useCustomFetch('/api/person')
model.value = data.value ?? {}

const { error, execute: saveExecute, pending: saving } = await useCustomFetch('/api/person', {
  method: 'put',
  body: model,
  immediate: false,
  watch: false,
})

async function onSave() {
  formRef.value?.validate(async (errors: any) => {
    if (errors) {
      return
    }

    await saveExecute()

    if (error.value) {
      return
    }

    message.success('修改成功')
    fetch()
  })
}
</script>

<template>
  <NSpin :show="pending">
    <NForm
      ref="form"
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
          :loading="saving"
          @click="onSave"
        >
          保存修改
        </NButton>
      </NFormItem>
    </NForm>
  </NSpin>
</template>
