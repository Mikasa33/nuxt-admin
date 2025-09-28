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
        label="标识"
        path="slug"
        :rule="[{ required: true, message: '标识必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.slug"
          placeholder="请输入标识"
          clearable
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
