<script lang="tsx" setup>
import type { DataTableColumns } from 'naive-ui'
import { Icon } from '#components'
import Form from './components/Form.vue'
import { typeOptions } from './utils/dict'

const { hasPermission } = usePermission()

const { data, loading, title, onAdd, onDelete, onEdit, onLoad } = useCrud({
  baseUrl: '/api/permission/menu',
  title: '菜单',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: (data) => {
    return buildTree(data as Record<string, any>[])
  },
  onFetchInfoSuccess: (data) => {
    data.slug = data.slug?.split(',')
  },
  onBeforeSave: (data) => {
    data.slug = data.slug?.toString() ?? null
  },
})

function getType(type: string) {
  return typeOptions.find(item => item.value === type)
}

const columns: DataTableColumns = [
  {
    key: 'name',
    title: '菜单名称',
  },
  {
    key: 'type',
    title: '菜单类型',
    align: 'center',
  },
  {
    key: 'icon',
    title: '菜单图标',
    align: 'center',
  },
  {
    key: 'router',
    title: '菜单/权限路由',
    align: 'center',
  },
  {
    key: 'slug',
    title: '权限标识',
    align: 'center',
    width: 200,
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
      >
        <template #header>
          <NFlex>
            <NButton
              v-if="hasPermission('permission:menu:add')"
              type="primary"
              @click="onAdd()"
            >
              新增
            </NButton>
            <CrudExpandAllBtn />
          </NFlex>
          <NFlex>
            <NButton @click="onLoad">
              刷新
            </NButton>
          </NFlex>
        </template>

        <template #type="{ row }">
          <NTag
            v-if="getType(row.type)"
            :type="getType(row.type)?.type"
          >
            {{ getType(row.type)?.label }}
          </NTag>
        </template>

        <template #icon="{ row }">
          <Icon
            v-if="row.icon"
            :name="row.icon"
            :size="16"
            class="w-full flex-center"
          />
        </template>

        <template #slug="{ row }">
          <NFlex
            v-if="row.type === 'permission' && row.slug"
            break-line
            :size="4"
            wrap
            class="!flex-center"
          >
            <NTag
              v-for="item in row.slug?.split(',')"
              :key="item"
              size="small"
            >
              {{ item }}
            </NTag>
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
              v-if="hasPermission('permission:menu:add')"
              type="primary"
              @click="onAdd({ parentId: row.id })"
            >
              新增
            </CrudColumnBtn>
            <CrudColumnBtn
              v-if="hasPermission('permission:menu:update')"
              type="primary"
              @click="onEdit(row)"
            >
              编辑
            </CrudColumnBtn>
            <CrudColumnDeleteBtn
              v-if="hasPermission('permission:menu:delete')"
              @click="onDelete(row)"
            />
          </NFlex>
        </template>
      </CrudTable>
    </BaseCard>

    <Form />
  </div>
</template>
