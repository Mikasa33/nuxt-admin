<script lang="ts" setup>
const message = useMessage()
const { user } = useUserSession()
const formRef = useTemplateRef('form')
const model = ref<any>({})

const { error, execute, status } = await useCustomFetch('/api/person/changePassword', {
  method: 'POST',
  body: model,
  immediate: false,
  watch: false,
})

async function onSave() {
  formRef.value?.validate(async (errors: any) => {
    if (errors) {
      return
    }

    await execute()

    if (error.value) {
      return
    }

    message.success('修改成功')

    model.value = {
      oldPassword: '',
      newPassword: '',
      rePassword: '',
    }
  })
}
</script>

<template>
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
      label="旧密码"
      path="oldPassword"
      :rule="[{ required: true, message: '旧密码必填', trigger: ['input', 'change'] }]"
    >
      <NInput
        v-model:value="model.oldPassword"
        placeholder="请输入旧密码"
        clearable
        type="password"
        show-password-on="mousedown"
      />
    </NFormItem>
    <NFormItem
      label="新密码"
      path="newPassword"
      :rule="[
        { required: true, message: '新密码必填' },
        { validator: (_: any, val: string) => !!val && model.oldPassword !== val, message: '新密码不能与旧密码相同', trigger: ['input', 'change'] },
      ]"
      first
    >
      <NInput
        v-model:value="model.newPassword"
        placeholder="请输入新密码"
        clearable
        type="password"
        show-password-on="mousedown"
      />
    </NFormItem>
    <NFormItem
      label="重复密码"
      path="rePassword"
      :rule="[
        { required: true, message: '重复密码必填' },
        { validator: (_: any, val: string) => model.newPassword === val, message: '两次密码不一致', trigger: ['input', 'change'] },
      ]"
      first
    >
      <NInput
        v-model:value="model.rePassword"
        placeholder="请再次输入密码"
        clearable
        type="password"
        show-password-on="mousedown"
      />
    </NFormItem>
    <NFormItem
      label=" "
      :show-feedback="false"
    >
      <NButton
        type="primary"
        :loading="status === 'pending'"
        @click="onSave"
      >
        保存修改
      </NButton>
    </NFormItem>
  </NForm>
</template>
