<script lang="ts" setup>
const { formRef, loading, model, saving, show, title, onSave } = useCrudContext()
const { data, execute, pending } = await useCustomFetch('/api/data/fileCatalog/list', {
  immediate: false,
})
const catalogData = computed(() => buildTree(data.value?.filter((item: any) => model.value.id !== item.id) ?? []))

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
          :loading="pending"
          key-field="id"
          label-field="name"
          :options="catalogData"
        />
      </NFormItem>
      <NFormItem
        label="名称"
        path="name"
        :rule="[{ required: true, message: '名称必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          placeholder="请输入名称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="排序"
        path="orderNum"
      >
        <NInputNumber
          v-model:value="model.orderNum"
          :default-value="0"
          placeholder="请输入排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
