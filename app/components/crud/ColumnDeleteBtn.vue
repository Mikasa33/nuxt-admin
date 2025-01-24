<script lang="ts" setup>
const props = defineProps<{
  onClick?: () => void | Promise<void>
}>()

const dialog = useCustomDialog()

function onClick() {
  const d = dialog.create({
    content: '是否确认删除此数据？',
    onPositiveClick: async () => {
      d.loading = true
      try {
        await props.onClick?.()
      }
      finally {
        d.loading = false
      }
    },
  })
}
</script>

<template>
  <CrudColumnBtn
    type="error"
    @click="onClick"
  >
    删除
  </CrudColumnBtn>
</template>
