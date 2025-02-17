<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '#components'
import ChangePassword from './components/ChangePassword.vue'
import DepartmentForm from './components/DepartmentForm.vue'
import UserForm from './components/UserForm.vue'

const message = useMessage()
const { hasPermission, hasAnyPermission } = usePermission()

const selectedKeys = ref<Array<number | string>>([])

const { data, loading, title, pagination, searchKeyword, onAdd, onBatchDelete, onDelete, onEdit, onLoad } = useCrud({
  key: 'user',
  baseUrl: '/api/permission/user',
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

const { data: departmentData, loading: departmentLoading, title: departmentTitle, onLoad: onLoadDepartment, onAdd: onAddDepartment, onEdit: onEditDepartment, onDialogDelete: onDialogDeleteDepartment } = useCrud({
  baseUrl: '/api/permission/department',
  title: '部门',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: async (data: any) => {
    if (!selectedKeys.value.length) {
      selectedKeys.value = [data?.[0]?.id]
      onLoad()
    }
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
  if (!hasAnyPermission(['permission:department:update', 'permission:department:delete'])) {
    message.warning('您没有权限进行此操作')
    return
  }

  const options: DropdownOption[] = []
  if (hasPermission('permission:department:update')) {
    options.push({
      key: 'edit',
      label: '编辑',
      icon: renderIcon('i-icon-park-outline-edit'),
    })
  }
  if (option.id !== 1 && hasPermission('permission:department:delete')) {
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
      onEditDepartment(node)
      break
    case 'delete':
      onDialogDeleteDepartment(node)
      break
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
  <BaseSplitCard>
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
              v-if="hasPermission('permission:department:add')"
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
          @dropdown-select="handleDropdownSelect"
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
                v-if="hasPermission('permission:user:add')"
                type="primary"
                @click="onAdd({ departmentId: selectedKeys[0] })"
              >
                新增
              </NButton>
              <CrudBatchDeleteBtn
                v-if="hasPermission('permission:user:delete')"
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
                v-if="hasPermission('permission:user:changePassword')"
                type="primary"
                @click="onChangePassword(row)"
              >
                修改密码
              </CrudColumnBtn>
              <CrudColumnBtn
                v-if="hasPermission('permission:user:update')"
                type="primary"
                @click="onEdit(row)"
              >
                编辑
              </CrudColumnBtn>
              <CrudColumnDeleteBtn
                v-if="hasPermission('permission:user:delete')"
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
