<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '#components'
import Form from './components/Form.vue'

const message = useMessage()
const { hasPermission, hasAnyPermission } = usePermission()

const selectedKeys = ref<number[]>([])

const { data: catalogData, loading: catalogLoading, title: catalogTitle, onAdd: onAddCatalog, onDialogDelete: onDialogDeleteCatalog, onEdit: onEditCatalog, onLoad: onLoadCatalog } = useCrud({
  baseUrl: '/api/data/fileCatalog',
  title: '文件目录',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: (data: any) => {
    if (!selectedKeys.value.length) {
      selectedKeys.value = [data?.[0]?.id]
    }
  },
})

const catalogTreeData = computed(() => {
  return buildTree(catalogData.value.map((item: any) => ({ ...item, prefix: renderPrefix('collapse') })))
})

const { data, loading, title, pagination, searchKeyword, onBatchDelete, onDelete, onLoad } = useCrud({
  key: 'file',
  baseUrl: '/api/data/file',
  title: '文件',
  listOptions: {
    immediate: false,
    searchParams: computed(() => {
      return {
        catalogId: selectedKeys.value[0],
      }
    }),
  },
})

function onUpdateSelectedKeys(keys: Array<number | string>) {
  if (keys.length) {
    onLoad()
  }
}

const dropdownOptions = ref<DropdownOption[]>([])

function onBeforeContextmenu() {
  if (!hasAnyPermission(['data:fileCatalog:update', 'data:fileCatalog:delete'])) {
    message.warning('您没有权限进行此操作')
    return
  }

  const options: DropdownOption[] = []
  if (hasPermission('data:fileCatalog:update')) {
    options.push({
      key: 'edit',
      label: '编辑',
      icon: renderIcon('i-icon-park-outline-edit'),
    })
  }
  if (hasPermission('data:fileCatalog:delete')) {
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
      onEditCatalog(node)
      break
    case 'delete':
      onDialogDeleteCatalog(node)
      break
  }
}

function onUpdateExpandedKeys(
  _keys: Array<string | number>,
  _option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'expand' | 'collapse' | 'filter'
  },
) {
  if (!meta.node)
    return

  switch (meta.action) {
    case 'expand':
      meta.node.prefix = renderPrefix('expand')
      break
    case 'collapse':
      meta.node.prefix = renderPrefix('collapse')
      break
  }
}

function renderPrefix(action: 'expand' | 'collapse' = 'collapse') {
  return renderIcon(action === 'expand' ? 'i-icon-park-outline-folder-open' : 'i-icon-park-outline-folder-close')
}

const columns: DataTableColumns = [
  {
    type: 'selection',
  },
  {
    key: 'thumbnail',
    title: '缩略图',
  },
  {
    key: 'filename',
    title: '文件名',
    ellipsis: true,
  },
  {
    key: 'size',
    title: '大小',
  },
  {
    key: 'type',
    title: '类型',
  },
  {
    key: 'createdAt',
    title: '上传时间',
  },
]
</script>

<template>
  <BaseSplitCard>
    <template #left>
      <BaseCard :title="catalogTitle">
        <template #suffix>
          <NFlex
            size="small"
            class="mr-16px"
          >
            <NButton
              quaternary
              size="small"
              class="w-28px !p-0"
              @click="onLoadCatalog"
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
              @click="onAddCatalog({ parentId: selectedKeys[0] })"
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
          :data="catalogTreeData"
          :loading="catalogLoading"
          :dropdown-options
          :on-before-contextmenu
          @update:expanded-keys="onUpdateExpandedKeys"
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
          :pagination
        >
          <template #header>
            <NFlex>
              <div v-if="hasPermission('data:file:upload')">
                <NUpload
                  action="/api/data/file/upload"
                  :data="{ catalogId: selectedKeys?.[0]?.toString() ?? '' }"
                  multiple
                  :show-file-list="false"
                  @finish="onLoad()"
                >
                  <NButton type="primary">
                    上传
                  </NButton>
                </NUpload>
              </div>
              <CrudBatchDeleteBtn
                v-if="hasPermission('data:file:delete')"
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

          <template #thumbnail="{ row }">
            <NImage
              lazy
              :src="row.url"
              class="h-40px cursor-pointer"
            />
          </template>

          <template #createdAt="{ row }">
            {{ $dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>

          <template #operation="{ row }">
            <NFlex
              justify="center"
              size="small"
            >
              <CrudColumnDeleteBtn
                v-if="hasPermission('data:file:delete')"
                @click="onDelete(row)"
              />
            </NFlex>
          </template>
        </CrudTable>
      </BaseCard>

      <Form />
    </template>
  </BaseSplitCard>
</template>
