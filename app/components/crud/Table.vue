<script lang="tsx" setup>
import type { DataTableProps } from 'naive-ui'
import type { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNodeChild } from 'vue'
import { cloneDeep } from 'lodash-es'

const {
  // batchOperationOptions = [],
  // batchOperationProps = {},
  bordered = true,
  columns = [],
  data = [],
  loading = false,
  operation = true,
  operationProps,
  rowKey = (row: any) => row.id,
  remote = true,
  singleColumn = false,
  singleLine = true,
} = defineProps<{
  // batchOperationOptions?: Array<DropdownOption | DropdownGroupOption | DropdownDividerOption | DropdownRenderOption>
  // batchOperationProps?: DropdownProps
  bordered?: boolean
  columns?: DataTableProps['columns']
  data?: DataTableProps['data']
  loading?: boolean
  operation?: boolean
  operationProps?: Omit<TableBaseColumn, 'key'>
  pagination?: DataTableProps['pagination']
  remote?: DataTableProps['remote']
  rowKey?: DataTableProps['rowKey']
  rowClassName?: DataTableProps['rowClassName']
  singleColumn?: boolean
  singleLine?: boolean
}>()

// const emits = defineEmits<{
//   selectBatchOperation: [key: string | number]
// }>()

const slots = defineSlots<{
  header: () => VNodeChild
  [key: string]: ({ row, index }: { row: any, index: number }) => VNodeChild
}>()

const checkedRowKeys = defineModel<Array<string | number>>('checked-row-keys', {
  default: () => [],
})

const processedColumns = computed(() => {
  const cols = cloneDeep(columns)
  if (operation) {
    cols.push({
      align: 'center',
      ...operationProps,
      key: 'operation',
      title: '操作',
    })
  }
  for (const col of cols) {
    const { key } = col as TableBaseColumn
    if (!key || !slots[key]) {
      continue
    }
    (col as TableBaseColumn).render = (row: any, index: number) => {
      if (key === 'operation') {
        return (
          <div class="flex-center">
            {slots[key]!({ row, index })}
          </div>
        )
      }
      return slots[key]!({ row, index })
    }
  }
  return cols
})

const showCheckedInfo = computed(() => columns.find(column => column.type === 'selection'))

const expandAll = ref(false)
const expandedRowKeys = ref<string[]>([])
watch(
  expandAll,
  (value: boolean) => {
    expandedRowKeys.value = []
    if (value) {
      recursivelyExpandRowsWithChildren(data)
    }
  },
)
function onExpandAll() {
  expandAll.value = true
}
function onFoldAll() {
  expandAll.value = false
}
function recursivelyExpandRowsWithChildren(data: any[]) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.children && item.children.length > 0) {
      expandedRowKeys.value.push(item.id)
      recursivelyExpandRowsWithChildren(item.children)
    }
  }
}

// function onSelectBatchOperation(key: string | number) {
//   emits('selectBatchOperation', key)
// }

provide('crud-table-checked-row-keys', checkedRowKeys)
provide('crud-table-expand-all', expandAll)

defineExpose({
  expandAll: onExpandAll,
  foldAll: onFoldAll,
})
</script>

<template>
  <div class="h-full flex flex-col gap-12px">
    <div class="flex-y-center flex-wrap justify-between gap-12px">
      <slot name="header" />
    </div>
    <NDataTable
      v-model:checked-row-keys="checkedRowKeys"
      v-model:expanded-row-keys="expandedRowKeys"
      :bordered
      :columns="processedColumns"
      :data
      flex-height
      :loading
      :remote
      :row-key
      :row-class-name
      :single-column
      :single-line
      class="h-full"
    />
    <NFlex
      v-if="pagination"
      align="center"
      :justify="showCheckedInfo ? 'space-between' : 'end'"
    >
      <div
        v-if="showCheckedInfo"
        class="flex-y-center gap-x-8px"
      >
        <div>已选 {{ checkedRowKeys.length }} 条</div>
        <!-- <NDropdown
          placement="top-start"
          v-bind="batchOperationProps"
          :options="batchOperationOptions"
          class="min-w-160px"
          @select="onSelectBatchOperation"
        >
          <NButton
            :disabled="!checkedRowKeys.length"
          >
            批量操作
          </NButton>
        </NDropdown> -->
      </div>
      <div class="flex-y-center gap-x-8px">
        <div>共 {{ pagination.itemCount }} 条</div>
        <NPagination v-bind="pagination" />
      </div>
    </NFlex>
  </div>
</template>
