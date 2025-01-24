<script lang="ts" setup>
const message = useMessage()
const { formRef, model, show, title, onSave } = useCrudContext({
  key: 'user',
})

const loading = ref(false)
const roleData = ref<any[]>([])

watch(
  show,
  async (val) => {
    if (val) {
      loading.value = true
      try {
        const data = await $fetch('/api/permission/role/list')
        roleData.value = data
      }
      catch (error: any) {
        message.error(error.model.message)
      }
      finally {
        loading.value = false
      }
    }
  },
)
</script>

<template>
  <CrudDrawerForm
    v-model:show="show"
    :title
    @confirm="onSave"
  >
    <NForm
      ref="formRef"
      label-placement="left"
      label-width="auto"
      :model
      require-mark-placement="left"
    >
      <NFormItem
        label="用户名"
        path="username"
        :rule="[{ required: true, message: '用户名必填', trigger: ['input', 'change'] }]"
        :show-require-mark="!model.id"
      >
        <NText
          v-if="!!model.id"
          :depth="3"
        >
          {{ model.username }}
        </NText>
        <NInput
          v-else
          v-model:value="model.username"
          placeholder="请输入用户名"
          clearable
          :readonly="!!model.id"
        />
      </NFormItem>
      <NFormItem
        v-if="!model.id"
        label="密码"
        path="password"
        :rule="[{ required: true, message: '密码必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.password"
          placeholder="请输入密码"
          clearable
          type="password"
        />
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
        label="角色"
        path="roleIds"
      >
        <NSelect
          v-model:value="model.roleIds"
          placeholder="请选择角色"
          clearable
          :options="roleData"
          label-field="name"
          value-field="id"
          multiple
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
