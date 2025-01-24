<script lang="ts" setup>
import type { DataTableColumns, DialogReactive } from 'naive-ui'

const message = useMessage()
const { hasPermission } = usePermission()

const { data, loading, title, pagination, searchKeyword, onLoad, onReload } = useCrud({
  baseUrl: '/api/system/log',
  title: '日志',
})

const columns: DataTableColumns = [
  {
    key: 'userId',
    title: '用户 ID',
    width: 100,
    align: 'center',
  },
  {
    key: 'nickname',
    title: '用户昵称',
    width: 200,
    align: 'center',
  },
  {
    key: 'method',
    title: '请求方法',
    width: 100,
    align: 'center',
  },
  {
    key: 'router',
    title: '请求地址',
    align: 'center',
  },
  {
    key: 'query',
    title: '查询参数',
    align: 'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'body',
    title: '请求体',
    align: 'center',
    ellipsis: {
      tooltip: true,
    },
  },
  {
    key: 'createdAt',
    title: '请求时间',
    width: 200,
    align: 'center',
  },
]

const clearLoading = ref(false)

async function onClear() {
  clearLoading.value = true
  try {
    await $fetch('/api/system/log/clear', {
      method: 'POST',
    })
    message.success('清空成功')
    onReload()
  }
  catch (error: any) {
    message.error(error.data.message)
  }
  finally {
    clearLoading.value = false
  }
}
</script>

<template>
  <div class="h-full flex">
    <BaseCard :title>
      <CrudTable
        :columns
        :data
        :loading
        :pagination
        :operation="false"
      >
        <template #header>
          <NFlex>
            <BaseDialogBtn
              v-if="hasPermission('system:log:clear')"
              type="error"
              :dialog="{
                content: '是否确认清空日志？',
                onConfirm: async (dialog: DialogReactive) => {
                  dialog.loading = true
                  await onClear()
                  dialog.destroy()
                },
              }"
            >
              清空
            </BaseDialogBtn>
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

        <template #query="{ row }">
          {{ JSON.stringify(row.query) }}
        </template>

        <template #body="{ row }">
          {{ JSON.stringify(row.body) }}
        </template>

        <template #createdAt="{ row }">
          {{ $dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </CrudTable>
    </BaseCard>
  </div>
</template>
