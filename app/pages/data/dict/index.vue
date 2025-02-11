<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '#components'
import DictForm from './components/DictForm.vue'
import Form from './components/Form.vue'

const message = useMessage()
const { hasPermission, hasAnyPermission } = usePermission()

const selectedKeys = ref<number[]>([])

const { data: typeData, loading: typeLoading, title: typeTitle, onAdd: onAddType, onDialogDelete: onDialogDeleteType, onEdit: onEditType, onLoad: onLoadType } = useCrud({
  baseUrl: '/api/data/dictType',
  title: '字典类型',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: (data: any) => {
    if (!selectedKeys.value.length) {
      selectedKeys.value = [data?.[0]?.id]
    }
  },
})

const typeTreeData = computed(() => {
  return buildTree(typeData.value.map((item: any) => ({ ...item, prefix: renderIcon('i-icon-park-outline-bookmark-one') })))
})

const { data, loading, title, searchKeyword, onAdd, onBatchDelete, onDelete, onEdit, onLoad } = useCrud({
  key: 'dict',
  baseUrl: '/api/data/dict',
  title: '字典',
  listOptions: {
    immediate: false,
    searchParams: computed(() => {
      return {
        typeId: selectedKeys.value[0],
      }
    }),
  },
  onFetchListSuccess: (data: any) => {
    return buildTree(data.list)
  },
  onBeforeSave: (data: any) => {
    data.typeId = selectedKeys.value[0]
  },
})

function onUpdateSelectedKeys(keys: Array<number | string>) {
  if (keys.length) {
    onLoad()
  }
}

const dropdownOptions = ref<DropdownOption[]>([])

function onBeforeContextmenu() {
  if (!hasAnyPermission(['data:dictType:update', 'data:dictType:delete'])) {
    message.warning('您没有权限进行此操作')
    return
  }

  const options: DropdownOption[] = []
  if (hasPermission('data:dictType:update')) {
    options.push({
      key: 'edit',
      label: '编辑',
      icon: renderIcon('i-icon-park-outline-edit'),
    })
  }
  if (hasPermission('data:dictType:delete')) {
    options.push({
      key: 'delete',
      label: '删除',
      icon: renderIcon('i-icon-park-outline-delete'),
    })
  }

  dropdownOptions.value = options
}

function handleDropdownSelect(key: string | number, node: any) {
  switch (key) {
    case 'edit':
      onEditType(node)
      break
    case 'delete':
      onDialogDeleteType(node)
      break
  }
}

function renderLabel({ option }: { option: TreeOption }) {
  return `${option.name} - ${option.slug}`
}

const columns: DataTableColumns = [
  {
    type: 'selection',
  },
  {
    key: 'slug',
    title: '标识',
  },
  {
    key: 'name',
    title: '名称',
  },
  {
    key: 'orderBy',
    title: '排序',
  },
  {
    key: 'updatedAt',
    title: '更新时间',
  },
]
</script>

<template>
  <BaseSplitCard>
    <template #left>
      <BaseCard :title="typeTitle">
        <template #suffix>
          <NFlex
            size="small"
            class="mr-16px"
          >
            <NButton
              quaternary
              size="small"
              class="w-28px !p-0"
              @click="onLoadType"
            >
              <Icon
                name="i-icon-park-outline-refresh"
                :size="16"
              />
            </NButton>
            <NButton
              v-if="hasPermission('data:fileCatalog:add')"
              quaternary
              size="small"
              class="w-28px !p-0"
              @click="onAddType()"
            >
              <Icon
                name="i-icon-park-outline-plus"
                :size="18"
              />
            </NButton>
          </NFlex>
        </template>

        <BaseTree
          v-model:selected-keys="selectedKeys"
          :data="typeTreeData"
          :loading="typeLoading"
          :dropdown-options
          :render-label
          :on-before-contextmenu
          @update:selected-keys="onUpdateSelectedKeys"
          @dropdown-select="handleDropdownSelect"
        />
      </BaseCard>
    </template>
    <template #right>
      <BaseCard
        :title
        class="rounded-bl-0 rounded-tl-0"
      >
        <CrudTable
          :columns
          :data
          :loading
        >
          <template #header>
            <NFlex>
              <NButton
                v-if="hasPermission('data:dict:add')"
                type="primary"
                @click="onAdd({ typeId: selectedKeys[0] })"
              >
                新增
              </NButton>
              <CrudBatchDeleteBtn
                v-if="hasPermission('data:dict:delete')"
                @click="onBatchDelete"
              />
            </NFlex>
            <NFlex>
              <CrudSearch
                v-model:value="searchKeyword"
                @clear="onLoad"
                @enter="onLoad"
              />
              <NButton @click="onLoad">
                刷新
              </NButton>
            </NFlex>
          </template>

          <template #updatedAt="{ row }">
            {{ $dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>

          <template #operation="{ row }">
            <NFlex
              justify="center"
              size="small"
            >
              <CrudColumnBtn
                v-if="hasPermission('data:dict:update')"
                type="primary"
                @click="onEdit(row)"
              >
                编辑
              </CrudColumnBtn>
              <CrudColumnDeleteBtn
                v-if="hasPermission('data:dict:delete')"
                @click="onDelete(row)"
              />
            </NFlex>
          </template>
        </CrudTable>
      </BaseCard>

      <Form />
      <DictForm />
    </template>
  </BaseSplitCard>
</template>
