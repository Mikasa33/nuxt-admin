<script lang="ts" setup>
const { model: propsModel = {} } = defineProps<{
  model: any
}>()

const show = defineModel<boolean>('show')

const { showError } = useErrorMessage()
const message = useMessage()

const formRef = ref()
const model = ref<any>({})

const { error, execute, status } = useRequest('/api/permission/user/changePassword', {
  method: 'post',
})

watch(
  show,
  (val) => {
    if (val) {
      model.value = propsModel
    }
  },
)

function onSave() {
  formRef.value.validate(async (errors: any) => {
    if (errors) {
      message.error('表单填写有误')
      return
    }

    await execute({
      body: model.value,
    })

    if (error.value) {
      showError(error)
      return
    }

    message.success('密码修改成功')
    show.value = false
  })
}
</script>

<template>
  <CrudDrawerForm
    v-model:show="show"
    :confirm-loading="status === 'pending'"
    title="修改密码"
    @confirm="onSave"
  >
    <NForm
      ref="formRef"
      label-placement="left"
      label-width="auto"
      :model
    >
      <NFormItem
        label="新密码"
        path="password"
        :rule="[{ required: true, message: '新密码必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.password"
          placeholder="请输入新密码"
          clearable
          type="password"
          show-password-on="mousedown"
        />
      </NFormItem>
      <NFormItem
        label="确认密码"
        path="rePassword"
        :rule="[
          { required: true, message: '确认密码必填', trigger: ['input', 'change'] },
          { validator: (_: any, val: string) => model.password === val, message: '两次密码不一致', trigger: ['input', 'change'] },
        ]"
        first
      >
        <NInput
          v-model:value="model.rePassword"
          placeholder="请输入确认密码"
          clearable
          type="password"
          show-password-on="mousedown"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
