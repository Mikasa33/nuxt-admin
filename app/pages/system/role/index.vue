<script lang="tsx" setup>
import type { DataTableColumns } from 'naive-ui'
import dayjs from 'dayjs'
import Form from './components/Form.vue'

const { hasPermission } = usePermission()

const { data, loading, title, pagination, searchKeyword, onAdd, onBatchDelete, onDelete, onEdit, onLoad } = useCrud({
  baseUrl: '/api/system/role',
  title: '角色',
})

const columns: DataTableColumns = [
  {
    type: 'selection',
  },
  {
    key: 'slug',
    title: '角色标识',
    align: 'center',
  },
  {
    key: 'name',
    title: '角色名称',
    align: 'center',
  },
  {
    key: 'updatedAt',
    title: '更新时间',
    align: 'center',
  },
]
</script>

<template>
  <div class="h-full flex">
    <BaseCard :title>
      <CrudTable
        :columns
        :data
        :loading
        :pagination
        select-on-row-click
      >
        <template #header>
          <NFlex>
            <NButton
              v-if="hasPermission('system:role:add')"
              type="primary"
              @click="onAdd()"
            >
              新增
            </NButton>
            <CrudBatchDeleteBtn
              v-if="hasPermission('system:role:delete')"
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
          {{ dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>

        <template #operation="{ row }">
          <NFlex
            justify="center"
            size="small"
          >
            <CrudColumnBtn
              v-if="hasPermission('system:role:update')"
              type="primary"
              @click="onEdit(row)"
            >
              编辑
            </CrudColumnBtn>
            <CrudColumnDeleteBtn
              v-if="hasPermission('system:role:delete')"
              @click="onDelete(row)"
            />
          </NFlex>
        </template>
      </CrudTable>
    </BaseCard>

    <Form />
  </div>
</template>
