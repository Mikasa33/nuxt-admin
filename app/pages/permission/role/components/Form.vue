<script lang="ts" setup>
const message = useMessage()
const { formRef, model, show, title, onSave } = useCrudContext()

const loading = ref(false)
const menuData = ref<any[]>([])

watch(
  show,
  async (val) => {
    if (val) {
      loading.value = true
      try {
        const data = await $fetch('/api/permission/menu/list')
        menuData.value = buildTree(data)
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
        label="角色标识"
        path="slug"
        :rule="[{ required: true, message: '角色标识必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.slug"
          placeholder="请输入角色标识"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="角色名称"
        path="name"
        :rule="[{ required: true, message: '角色名称必填', trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          placeholder="请输入角色名称"
          clearable
        />
      </NFormItem>
      <NFormItem
        label="菜单权限"
        path="menuIds"
      >
        <NScrollbar
          content-class="p-8px"
          class="max-h-400px w-full border border-#e0e0e6 rounded-8px dark:border-none dark:bg-#ffffff1a"
        >
          <NTree
            v-model:checked-keys="model.menuIds"
            block-line
            checkable
            :data="menuData"
            key-field="id"
            label-field="name"
            :selectable="false"
            class="w-full"
          />
        </NScrollbar>
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
