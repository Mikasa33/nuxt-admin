<script lang="ts" setup>
const message = useMessage()
const { formRef, model, show, title, onSave } = useCrudContext({
  key: 'dict',
})

const loading = ref(false)
const dictType = ref<any[]>([])

watch(
  show,
  async (val) => {
    if (val) {
      loading.value = true
      try {
        const data = await $fetch('/api/admin/data/dictType/list')
        dictType.value = data
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
      <!-- <NFormItem
        label="所属类型"
        path="parentId"
      >
        <NTreeSelect
          v-model:value="model.typeId"
          placeholder="请选择所属类型"
          clearable
          :loading
          key-field="id"
          label-field="name"
          :options="dictType"
        />
      </NFormItem> -->
      <!-- <NFormItem
        label="父级字典"
        path="parentId"
      >
        <NTreeSelect
          v-model:value="model.parentId"
          placeholder="请选择父级字典"
          clearable
          :loading
          key-field="id"
          label-field="name"
          :options="dictType"
        />
      </NFormItem> -->
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
        path="orderBy"
      >
        <NInputNumber
          v-model:value="model.orderBy"
          placeholder="请输入字典排序"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
