<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '#components'
import dayjs from 'dayjs'
import ChangePassword from './components/ChangePassword.vue'
import DepartmentForm from './components/DepartmentForm.vue'
import UserForm from './components/UserForm.vue'

const message = useMessage()
const { hasPermission, hasAnyPermission } = usePermission()

const selectedKeys = ref<Array<number | string>>([])

const { data, loading, title, pagination, searchKeyword, onAdd, onBatchDelete, onDelete, onEdit, onLoad } = useCrud({
  key: 'user',
  baseUrl: '/api/system/user',
  title: '用户',
  listOptions: {
    immediate: false,
    searchParams: computed(() => {
      return {
        departmentId: selectedKeys.value[0],
      }
    }),
  },
})

const {
  data: departmentData,
  loading: departmentLoading,
  title: departmentTitle,
  onLoad: onLoadDepartment,
  onAdd: onAddDepartment,
  onEdit: onEditDepartment,
  onDelete: onDeleteDepartment,
  onDialogDelete: onDialogDeleteDepartment,
} = useCrud({
  baseUrl: '/api/system/department',
  title: '部门',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: async (data: any) => {
    // 如果当前没有选中部门，并且有部门数据，则选中第一个部门
    if (!selectedKeys.value.length && data.length) {
      selectedKeys.value = [data[0].id]
    }
    // 如果删除的部门中包含当前选中的部门，则选中第一个部门
    if (!data.find((item: any) => selectedKeys.value.includes(item.id)) && data.length) {
      selectedKeys.value = [data[0].id]
    }
    onLoad()
  },
})

const departmentTreeData = computed(() => {
  return buildTree(departmentData.value.map((item: any) => ({ ...item, prefix: renderIcon('i-icon-park-outline-peoples') })))
})

function onUpdateSelectedKeys(keys: Array<number | string>) {
  if (keys.length) {
    onLoad()
  }
}

const columns: DataTableColumns = [
  {
    type: 'selection',
  },
  {
    key: 'username',
    title: '用户名',
    align: 'center',
  },
  {
    key: 'nickname',
    title: '昵称',
    align: 'center',
  },
  {
    key: 'phone',
    title: '手机号',
    align: 'center',
  },
  {
    key: 'updatedAt',
    title: '更新时间',
    align: 'center',
  },
]

const dropdownOptions = ref<DropdownOption[]>([])

function onBeforeContextmenu(option: TreeOption) {
  if (!hasAnyPermission(['system:department:update', 'system:department:delete'])) {
    message.warning('您没有权限进行此操作')
    return
  }

  const options: DropdownOption[] = []
  if (hasPermission('system:department:add')) {
    options.push({
      key: 'add',
      label: '新增',
      icon: renderIcon('i-icon-park-outline-plus'),
    })
  }
  if (hasPermission('system:department:update')) {
    options.push({
      key: 'edit',
      label: '编辑',
      icon: renderIcon('i-icon-park-outline-edit'),
    })
  }
  if (option.id !== 1 && hasPermission('system:department:delete')) {
    options.push({
      key: 'delete',
      label: '删除',
      icon: renderIcon('i-icon-park-outline-delete'),
    })
  }

  dropdownOptions.value = options
}

function onDropdownSelect(key: string | number, node: any) {
  switch (key) {
    case 'add':
      onAddDepartment({ parentId: node.id })
      break
    case 'edit':
      onEditDepartment(node)
      break
    case 'delete': {
      const d = onDialogDeleteDepartment(node, {
        content: '此操作将会删除此部门中的所有子部门和用户，是否确认删除？',
        negativeText: '保留用户',
        positiveText: '全部删除',
        onNegativeClick: async () => {
          d.loading = true
          await onDeleteDepartment(node, { retain: true })
          d.loading = false
        },
      })
      break
    }
  }
}

const changePasswordShow = ref(false)
const changePasswordModel = ref({})
function onChangePassword(row: any) {
  changePasswordShow.value = true
  changePasswordModel.value = { id: row.id }
}
</script>

<template>
  <BaseSplitCard c-key="system-user">
    <template #left>
      <BaseCard :title="departmentTitle">
        <template #suffix>
          <NFlex
            size="small"
            class="mr-16px"
          >
            <NButton
              quaternary
              size="small"
              class="w-28px !p-0"
              @click="onLoadDepartment"
            >
              <Icon
                name="i-icon-park-outline-refresh"
                :size="16"
              />
            </NButton>
            <NButton
              v-if="hasPermission('system:department:add')"
              quaternary
              size="small"
              class="w-28px !p-0"
              @click="onAddDepartment({ parentId: selectedKeys[0] })"
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
          :data="departmentTreeData"
          default-expand-all
          :loading="departmentLoading"
          :dropdown-options
          :on-before-contextmenu
          @update:selected-keys="onUpdateSelectedKeys"
          @dropdown-select="onDropdownSelect"
        />

        <DepartmentForm />
      </BaseCard>
    </template>
    <template #right>
      <BaseCard :title>
        <CrudTable
          :columns
          :data
          :loading
          :pagination
        >
          <template #header>
            <NFlex>
              <NButton
                v-if="hasPermission('system:user:add')"
                type="primary"
                @click="onAdd({ departmentId: selectedKeys[0] })"
              >
                新增
              </NButton>
              <CrudBatchDeleteBtn
                v-if="hasPermission('system:user:delete')"
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
                v-if="hasPermission('system:user:changePassword')"
                type="primary"
                @click="onChangePassword(row)"
              >
                修改密码
              </CrudColumnBtn>
              <!-- TODO: 转移部门 -->
              <CrudColumnBtn
                v-if="hasPermission('system:user:update')"
                type="primary"
                @click="onEdit(row)"
              >
                编辑
              </CrudColumnBtn>
              <CrudColumnDeleteBtn
                v-if="hasPermission('system:user:delete')"
                @click="onDelete(row)"
              />
            </NFlex>
          </template>
        </CrudTable>
      </BaseCard>

      <UserForm />
      <ChangePassword
        v-model:show="changePasswordShow"
        :model="changePasswordModel"
      />
    </template>
  </BaseSplitCard>
</template>
