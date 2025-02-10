<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption, UploadCustomRequestOptions } from 'naive-ui'
import { Icon } from '#components'
import COS, { type Credentials } from 'cos-js-sdk-v5'
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
      onUpdateSelectedKeys([data?.[0]?.id])
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

async function onUpdateSelectedKeys(keys: number[]) {
  if (keys.length) {
    selectedKeys.value = keys
    await nextTick()
    onLoad()
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
      onEditCatalog(dropdown.value.node)
      break
    case 'delete':
      onDialogDeleteCatalog(dropdown.value.node)
      break
  }
}

function nodeProps({ option }: { option: TreeOption }) {
  return {
    async onContextmenu(e: MouseEvent) {
      e.preventDefault()

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
  <NSplit
    default-size="280px"
    direction="horizontal"
    :max="0.5"
    min="220px"
    class="h-full flex overflow-hidden rounded-16px bg-#fff transition-300 dark:bg-#18181d"
  >
    <template #1>
      <BaseCard
        :title="catalogTitle"
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

        <NSpin
          :show="catalogLoading"
          size="small"
          content-class="wh-full"
          class="wh-full"
        >
          <NTree
            :selected-keys="selectedKeys"
            accordion
            block-line
            :data="catalogTreeData"
            expand-on-click
            key-field="id"
            label-field="name"
            :node-props="nodeProps"
            show-line
            :theme-overrides="{
              nodeHeight: '40px',
            }"
            :class="{
              'flex-y-center': !catalogData.length,
            }"
            class="wh-full"
            @update:selected-keys="onUpdateSelectedKeys"
            @update:expanded-keys="onUpdateExpandedKeys"
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

    <template #resize-trigger>
      <NEl class="group h-full w-full flex-x-center">
        <div class="h-full w-1px bg-#efeff5 transition-300 group-active:w-2px group-hover:w-2px dark:bg-#ffffff17 group-active:bg-[var(--primary-color)] group-hover:bg-[var(--primary-color)]" />
      </NEl>
    </template>
  </NSplit>
</template>
