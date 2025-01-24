<script lang="ts" setup>
// const message = useMessage()
const { formRef, model, show, title, onSave } = useCrudContext()

// const loading = ref(false)
// const dictType = ref<any[]>([])

// watch(
//   show,
//   async (val) => {
//     if (val) {
//       loading.value = true
//       try {
//         const data = await $fetch('/api/system/dictType')
//         dictType.value = buildTree(data)
//       }
//       catch (error: any) {
//         message.error(error.data.message)
//       }
//       finally {
//         loading.value = false
//       }
//     }
//   },
// )
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
      <!-- <NFormItem
        label="父级类型"
        path="parentId"
        :rule="[{ required: true, message: '父级类型必填', trigger: ['input', 'change'] }]"
      >
        <NTreeSelect
          v-model:value="model.parentId"
          placeholder="请选择父级类型"
          clearable
          :loading
          key-field="id"
          label-field="name"
          :options="dictType"
        />
      </NFormItem> -->
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
