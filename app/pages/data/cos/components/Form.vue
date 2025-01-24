<script lang="ts" setup>
const message = useMessage()
const { formRef, model, show, title, onSave } = useCrudContext()

const loading = ref(false)
const catalogData = ref<any[]>([])

watch(
  show,
  async (val) => {
    if (val) {
      loading.value = true
      try {
        const data = await $fetch('/api/data/fileCatalog/list')
        catalogData.value = buildTree(data)
      }
      catch (error: any) {
        message.error(error.data.message)
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
        label="父级目录"
        path="parentId"
        :rule="[{ required: true, type: 'number', message: '父级目录必填', trigger: ['input', 'change'] }]"
      >
        <NTreeSelect
          v-model:value="model.parentId"
          placeholder="请选择父级目录"
          clearable
          :loading
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
