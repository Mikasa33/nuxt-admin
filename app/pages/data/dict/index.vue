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
      onUpdateSelectedKeys([data?.[0]?.id])
    }
  },
})

const typeTreeData = computed(() => {
  return buildTree(typeData.value.map((item: any) => ({ ...item, prefix: renderPrefix() })))
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

async function onUpdateSelectedKeys(keys: number[]) {
  if (keys.length) {
    selectedKeys.value = keys
    await nextTick()
    onLoad()
  }
}

function renderPrefix() {
  return renderIcon('i-icon-park-outline-bookmark-one')
}

const dropdown = ref<any>({
  node: {},
  options: [],
  show: false,
  x: 0,
  y: 0,
})

function handleSelect(key: string | number) {
  dropdown.value.show = false

  switch (key) {
    case 'edit':
      onEditType(dropdown.value.node)
      break
    case 'delete':
      onDialogDeleteType(dropdown.value.node)
      break
  }
}

function nodeProps({ option }: { option: TreeOption }) {
  return {
    async onContextmenu(e: MouseEvent) {
      e.preventDefault()

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

      setTimeout(() => {
        dropdown.value = {
          node: option,
          options,
          show: true,
          x: e.clientX,
          y: e.clientY,
        }
      }, 200)
    },
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
  <NSplit
    default-size="280px"
    direction="horizontal"
    :max="0.5"
    min="220px"
    class="h-full flex overflow-hidden rounded-16px bg-#fff transition-300 dark:bg-#18181d"
  >
    <template #1>
      <BaseCard
        :title="typeTitle"
        class="rounded-br-0 rounded-tr-0"
      >
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

        <NSpin
          :show="typeLoading"
          size="small"
          content-class="wh-full"
          class="wh-full"
        >
          <NTree
            :selected-keys="selectedKeys"
            accordion
            block-line
            :data="typeTreeData"
            expand-on-click
            key-field="id"
            label-field="name"
            :node-props="nodeProps"
            :render-label="renderLabel"
            show-line
            :theme-overrides="{
              nodeHeight: '40px',
            }"
            :class="{
              'flex-y-center': !typeData.length,
            }"
            class="wh-full"
            @update:selected-keys="onUpdateSelectedKeys"
          />
        </NSpin>
        <BaseContextMenu
          v-model:show="dropdown.show"
          :options="dropdown.options"
          :x="dropdown.x"
          :y="dropdown.y"
          @select="handleSelect"
        />
      </BaseCard>
    </template>
    <template #2>
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

    <template #resize-trigger>
      <NEl class="group h-full w-full flex-x-center">
        <div class="h-full w-1px bg-#efeff5 transition-300 group-active:w-2px group-hover:w-2px dark:bg-#ffffff17 group-active:bg-[var(--primary-color)] group-hover:bg-[var(--primary-color)]" />
      </NEl>
    </template>
  </NSplit>
</template>
