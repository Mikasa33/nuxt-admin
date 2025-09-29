<script lang="ts" setup>
const { formRef, loading, model, saving, show, title, onSave } = useCrudContext({
  key: 'dict',
})

const { data, execute, pending } = await useCustomFetch('/api/data/dictType/list', {
  immediate: false,
  transform: (data) => {
    return buildTree(data ?? [])
  },
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
        label="所属类型"
        path="typeId"
        :rule="[{ required: true, type: 'number', message: '所属类型必选', trigger: ['input', 'change'] }]"
      >
        <NTreeSelect
          v-model:value="model.typeId"
          placeholder="请选择所属类型"
          :loading="pending"
          key-field="id"
          label-field="name"
          :options="data"
        />
      </NFormItem>
      <NFormItem
        label="字典标识"
        path="slug"
        :rule="[{ required: true, message: '字典标识必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.slug"
          placeholder="请输入字典标识"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="字典名称"
        path="name"
        :rule="[{ required: true, message: '类型字典必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          placeholder="请输入字典名称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="字典排序"
        path="orderNum"
      >
        <NInputNumber
          v-model:value="model.orderNum"
          :default-value="0"
          placeholder="请输入字典排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
