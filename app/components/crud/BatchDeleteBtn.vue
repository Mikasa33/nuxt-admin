<script lang="ts" setup>
const props = defineProps<{
  onClick?: (checkedRowKeys: number[]) => void | Promise<void>
}>()

const dialog = useCustomDialog()

const checkedRowKeys = inject<Ref<number[]>>('crud-table-checked-row-keys')

function onClick() {
  const d = dialog.create({
    content: '是否确认批量删除已勾选数据？',
    onPositiveClick: async () => {
      d.loading = true
      try {
        await props.onClick?.(checkedRowKeys!.value)
        checkedRowKeys!.value = []
      }
      finally {
        d.loading = false
      }
    },
  })
}
</script>

<template>
  <NButton
    :disabled="!checkedRowKeys?.length"
    type="error"
    @click="onClick"
  >
    批量删除
  </NButton>
</template>
