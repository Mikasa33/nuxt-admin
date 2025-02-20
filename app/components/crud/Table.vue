<script lang="tsx" setup>
import type { DataTableProps } from 'naive-ui'
import type { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNodeChild } from 'vue'

const {
  columns = [],
  data = [],
  loading = false,
  operation = true,
  rowKey = (row: any) => row.id,
  remote = true,
} = defineProps<{
  columns?: DataTableProps['columns']
  data?: DataTableProps['data']
  loading?: boolean
  operation?: boolean
  pagination?: DataTableProps['pagination']
  remote?: DataTableProps['remote']
  rowKey?: DataTableProps['rowKey']
  rowClassName?: DataTableProps['rowClassName']
}>()

const slots = defineSlots<{
  header: () => VNodeChild
  [key: string]: ({ row, index }: { row: any, index: number }) => VNodeChild
}>()

const processedColumns = computed(() => {
  const cols = useCloneDeep(columns)
  if (operation) {
    cols.push({
      key: 'operation',
      title: '操作',
      align: 'center',
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

const checkedRowKeys = ref([])

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

provide('crud-table-checked-row-keys', checkedRowKeys)
provide('crud-table-expand-all', expandAll)

defineExpose({
  expandAll: onExpandAll,
  foldAll: onFoldAll,
})
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-12px flex-y-center flex-wrap justify-between gap-12px">
      <slot name="header" />
    </div>
    <NDataTable
      v-model:checked-row-keys="checkedRowKeys"
      v-model:expanded-row-keys="expandedRowKeys"
      :columns="processedColumns"
      :data
      flex-height
      :loading
      :pagination
      :remote
      :row-key
      :row-class-name
      class="h-full"
    />
  </div>
</template>
