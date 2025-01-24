<script lang="ts" setup>
const message = useMessage()
const { user, fetch } = useUserSession()

const formRef = ref()
const model = ref<any>({})
const loading = ref(false)

onMounted(async () => {
  model.value = await $fetch('/api/person')
})

async function onSave() {
  formRef.value.validate(async (errors: any) => {
    if (errors) {
      return
    }

    loading.value = true
    try {
      await $fetch('/api/person', {
        method: 'PUT',
        body: model.value,
      })
      message.success('修改成功')
      await fetch()
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
        :loading
        @click="onSave"
      >
        保存修改
      </NButton>
    </NFormItem>
  </NForm>
</template>
