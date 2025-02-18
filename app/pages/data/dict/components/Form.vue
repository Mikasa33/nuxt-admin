<script lang="ts" setup>
const { formRef, loading, model, saving, show, title, onSave } = useCrudContext()
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
        label="类型标识"
        path="slug"
        :rule="[{ required: true, message: '类型标识必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.slug"
          placeholder="请输入类型标识"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="类型名称"
        path="name"
        :rule="[{ required: true, message: '类型名称必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          placeholder="请输入类型名称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="类型排序"
        path="orderBy"
      >
        <NInputNumber
          v-model:value="model.orderBy"
          placeholder="请输入类型排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
