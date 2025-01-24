<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'

// const message = useMessage()
// const { hasPermission } = usePermission()

const { data, loading, onLoad } = useCrud({
  baseUrl: '/_nitro/tasks',
  apis: {
    list: '',
  },
  title: '任务',
  listOptions: {
    pagination: false,
  },
  onFetchListSuccess: (data: any) => {
    const tasks = []
    for (const key in data.tasks) {
      const task = {
        cron: null,
        name: key,
        description: data.tasks[key].description,
      }

      if (data.scheduledTasks.length) {
        const find = data.scheduledTasks.find((item: any) => item.tasks.includes(key))
        if (find) {
          task.cron = find.cron
        }
      }

      tasks.push(task)
    }
    return tasks
  },
})

const columns: DataTableColumns = [
  {
    key: 'name',
    title: '任务标识',
    align: 'center',
  },
  {
    key: 'description',
    title: '任务描述',
    align: 'center',
  },
  {
    key: 'cron',
    title: '定时规则',
    align: 'center',
  },
]

// function onRun(row: any) {
//   console.log(row)
// }
</script>

<template>
  <div class="h-full flex">
    <BaseCard title="任务管理">
      <CrudTable
        :columns
        :data
        :loading
        :operation="false"
      >
        <template #header>
          <div class="flex-1" />
          <NFlex>
            <!-- <CrudSearch
              v-model:value="searchKeyword"
              @clear="onLoad"
              @enter="onLoad"
            /> -->
            <NButton @click="onLoad">
              刷新
            </NButton>
          </NFlex>
        </template>

        <!-- <template #operation="{ row }">
          <CrudColumnBtn
            v-if="hasPermission('system:task:run')"
            type="primary"
            @click="onRun(row)"
          >
            立即执行
          </CrudColumnBtn>
        </template> -->
      </CrudTable>
    </BaseCard>
  </div>
</template>
