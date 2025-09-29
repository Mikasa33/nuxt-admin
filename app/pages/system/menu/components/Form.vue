<script lang="tsx" setup>
import type { SelectOption } from 'naive-ui'
import { Icon } from '#components'
import { metadata } from '@iconify-json/icon-park-outline'
import { typeOptions } from '../utils/constants'

const iconOptions: SelectOption[] = []
for (const key in metadata.categories) {
  for (const icon of metadata.categories[key]!) {
    iconOptions.push({
      value: `i-icon-park-outline-${icon}`,
      label: icon,
    })
  }
}

const { formRef, loading, model, saving, show, title, onSave } = useCrudContext()
const { data, execute, pending } = await useCustomFetch('/api/system/menu/list', {
  params: {
    type: ['catalog', 'menu'],
  },
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

watch(
  show,
  async (val) => {
    if (val) {
      if (!model.value.type) {
        model.value.type = 'menu'
      }
      if (!model.value.slug) {
        model.value.slug = []
      }
    }
  },
)

const label = computed(() => model.value.type === 'permission' ? '权限' : model.value.type === 'catalog' ? '目录' : '菜单')

function renderLabel(option: SelectOption) {
  return (
    <div class="flex-y-center gap-x-8px">
      <Icon
        name={option.value as string}
        class="w-14px"
      />
      <span>{option.label}</span>
    </div>
  )
}
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
      :label-width="80"
      :model
      require-mark-placement="left"
    >
      <NFormItem
        label="菜单类型"
        path="type"
      >
        <NRadioGroup v-model:value="model.type">
          <NRadioButton
            v-for="item in typeOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </NRadioGroup>
      </NFormItem>
      <NFormItem
        label="父级菜单"
        path="parentId"
      >
        <NTreeSelect
          v-model:value="model.parentId"
          placeholder="请选择父级菜单"
          clearable
          :loading="pending"
          key-field="id"
          label-field="name"
          :options="data"
        />
      </NFormItem>
      <NFormItem
        :label="`${label}名称`"
        path="name"
        :rule="[{ required: true, message: `${label}名称必填`, trigger: ['input', 'change'] }]"
      >
        <NInput
          v-model:value="model.name"
          :placeholder="`请输入${label}名称`"
          clearable
        />
      </NFormItem>
      <NFormItem
        v-if="model.type !== 'permission'"
        :label="`${label}图标`"
        path="icon"
      >
        <NSelect
          v-model:value="model.icon"
          placeholder="请输入菜单图标"
          clearable
          filterable
          :options="iconOptions"
          :render-label
        />
      </NFormItem>
      <NFormItem
        v-if="model.type === 'menu'"
        label="菜单路由"
        path="router"
      >
        <NInput
          v-model:value="model.router"
          placeholder="请输入菜单路由"
          clearable
        />
      </NFormItem>
      <NFormItem
        v-if="model.type === 'permission'"
        label="权限标识"
        path="slug"
        :rule="[{ required: true, type: 'array', message: '权限标识必填', trigger: ['input', 'change'] }]"
      >
        <NDynamicTags
          v-model:value="model.slug"
          placeholder="请输入权限标识"
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="`${label}排序`"
        path="orderNum"
      >
        <NInputNumber
          v-model:value="model.orderNum"
          :default-value="0"
          :placeholder="`请输入${label}排序`"
          clearable
          class="!w-full"
        />
      </NFormItem>
    </NForm>
  </CrudDrawerForm>
</template>
