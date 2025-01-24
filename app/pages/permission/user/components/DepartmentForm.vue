<script lang="ts" setup>
const message = useMessage()
const { formRef, model, show, title, onSave } = useCrudContext()

const loading = ref(false)
const departmentData = ref<any[]>([])

watch(
  show,
  async (val) => {
    if (val) {
      loading.value = true
      try {
        const data = await $fetch('/api/permission/department/list')
        departmentData.value = buildTree(data)
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
        v-if="!model.id || model.id !== 1"
        label="父级部门"
        path="parentId"
        :rule="[{ required: true, type: 'number', message: '父级部门必填', trigger: ['input', 'change'] }]"
      >
        <NTreeSelect
          v-model:value="model.parentId"
          placeholder="请选择父级部门"
          clearable
          :loading
          key-field="id"
          label-field="name"
          :options="departmentData"
        />
      </NFormItem>
      <NFormItem
        label="部门名称"
        path="name"
        :rule="[{ required: true, message: '部门名称必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          placeholder="请输入部门名称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="部门排序"
        path="orderBy"
      >
        <NInputNumber
          v-model:value="model.orderBy"
          placeholder="请输入部门排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
