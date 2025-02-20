<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '#components'
import DictForm from './components/DictForm.vue'
import Form from './components/Form.vue'

const message = useMessage()
const { hasPermission, hasAnyPermission } = usePermission()

const selectedKeys = ref<number[]>([])

const { data, loading, title, searchKeyword, onAdd, onBatchDelete, onDelete, onEdit, onLoad } = useCrud({
  key: 'dict',
  baseUrl: '/api/admin/data/dict',
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

const { data: typeData, loading: typeLoading, title: typeTitle, onAdd: onAddType, onDialogDelete: onDialogDeleteType, onEdit: onEditType, onLoad: onLoadType } = useCrud({
  baseUrl: '/api/admin/data/dictType',
  title: '字典类型',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: (data: any) => {
    // 如果当前没有选中类型，并且有类型数据，则选中第一个类型
    if (!selectedKeys.value.length && data.length) {
      selectedKeys.value = [data[0].id]
    }
    // 如果删除的类型中包含当前选中的类型，则选中第一个类型
    if (!data.find((item: any) => selectedKeys.value.includes(item.id)) && data.length) {
      selectedKeys.value = [data[0].id]
    }
    onLoad()
  },
})

const typeTreeData = computed(() => {
  return buildTree(typeData.value.map((item: any) => ({ ...item, prefix: renderIcon('i-icon-park-outline-bookmark-one') })))
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
      onDialogDeleteType(node, { content: '是否确认删除此类型，及类型中的所有字典？' })
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
      <BaseCard :title>
        <CrudTable
          :columns
          :data
          :loading
        >
          <template #header>
            <NFlex>
              <template v-if="selectedKeys.length">
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
              </template>
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
