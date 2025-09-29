<script lang="ts" setup>
const { formRef, loading, model, saving, show, title, onSave } = useCrudContext()
const { data, execute, pending } = await useCustomFetch('/api/system/department/list', {
  immediate: false,
})

watch(
  show,
  async (val) => {
    if (val) {
      await execute()
    }
  },
)
</script>

<template>
  <CrudDrawerForm
    v-model:show="show"
    :confirm-loading="saving"
    :loading
    :title
    @confirm="onSave()"
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
          :loading="pending"
          key-field="id"
          label-field="name"
          :options="data"
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
        path="orderNum"
      >
        <NInputNumber
          v-model:value="model.orderNum"
          :default-value="0"
          placeholder="请输入部门排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
