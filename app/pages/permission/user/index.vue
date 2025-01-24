<script lang="tsx" setup>
import type { DataTableColumns, DropdownOption, TreeOption } from 'naive-ui'
import { Icon } from '#components'
import ChangePassword from './components/ChangePassword.vue'
import DepartmentForm from './components/DepartmentForm.vue'
import UserForm from './components/UserForm.vue'

const message = useMessage()
const { hasPermission, hasAnyPermission } = usePermission()

const selectedKeys = ref<number[]>([])

const { data: departmentData, loading: departmentLoading, title: departmentTitle, onLoad: onLoadDepartment, onAdd: onAddDepartment, onEdit: onEditDepartment, onDialogDelete: onDialogDeleteDepartment } = useCrud({
  baseUrl: '/api/permission/department',
  title: '部门',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: async (data: any) => {
    if (!selectedKeys.value.length) {
      onUpdateSelectedKeys([data?.[0]?.id])
    }
  },
})

const departmentTreeData = computed(() => {
  return buildTree(departmentData.value.map((item: any) => ({ ...item, prefix: renderPrefix() })))
})

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

async function onUpdateSelectedKeys(keys: number[]) {
  if (keys.length) {
    selectedKeys.value = keys
    await nextTick()
    onLoad()
  }
}

function renderPrefix() {
  return renderIcon('i-icon-park-outline-peoples')
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
      onEditDepartment(dropdown.value.node)
      break
    case 'delete':
      onDialogDeleteDepartment(dropdown.value.node)
      break
  }
}

function nodeProps({ option }: { option: TreeOption }) {
  return {
    async onContextmenu(e: MouseEvent) {
      e.preventDefault()

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

const changePasswordShow = ref(false)
const changePasswordModel = ref({})
function onChangePassword(row: any) {
  changePasswordShow.value = true
  changePasswordModel.value = { id: row.id }
}
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
        :title="departmentTitle"
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

        <NSpin
          :show="departmentLoading"
          size="small"
          content-class="wh-full"
          class="wh-full"
        >
          <NTree
            :selected-keys="selectedKeys"
            accordion
            block-line
            :data="departmentTreeData"
            default-expand-all
            expand-on-click
            key-field="id"
            label-field="name"
            :node-props="nodeProps"
            show-line
            :theme-overrides="{
              nodeHeight: '40px',
            }"
            :class="{
              'flex-y-center': !departmentData.length,
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
        <DepartmentForm />
      </BaseCard>
    </template>
    <template #2>
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
            <NFlex size="small">
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

    <template #resize-trigger>
      <div class="group h-full w-full flex-x-center">
        <NEl class="h-full w-1px bg-#efeff5 transition-300 dark:bg-#ffffff17 group-active:bg-[var(--primary-color)] group-hover:bg-[var(--primary-color)]" />
      </div>
    </template>
  </NSplit>
</template>
