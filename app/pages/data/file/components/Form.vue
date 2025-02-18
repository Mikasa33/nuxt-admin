<script lang="ts" setup>
const { formRef, loading, model, saving, show, title, onSave } = useCrudContext()

const { data, error, execute, status } = useRequest('/api/data/fileCatalog/list')
const catalogData = computed(() => buildTree(data.value?.filter((item: any) => model.value.id !== item.id) ?? []))

watch(
  show,
  async (val) => {
    if (val) {
      await execute()

      if (error.value) {
        useErrorMessage(error)
      }
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
        label="父级目录"
        path="parentId"
      >
        <NTreeSelect
          v-model:value="model.parentId"
          placeholder="请选择父级目录"
          clearable
          :loading="status === 'pending'"
          key-field="id"
          label-field="name"
          :options="catalogData"
        />
      </NFormItem>
      <NFormItem
        label="目录名称"
        path="name"
        :rule="[{ required: true, message: '目录名称必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          placeholder="请输入目录名称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="目录排序"
        path="orderBy"
      >
        <NInputNumber
          v-model:value="model.orderBy"
          placeholder="请输入目录排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
