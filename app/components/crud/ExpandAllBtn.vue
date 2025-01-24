<script lang="ts" setup>
const expandAll = inject<Ref<boolean>>('crud-table-expand-all')
</script>

<template>
  <NButton @click="expandAll = !expandAll">
    {{ expandAll ? '收缩' : '展开' }}全部
  </NButton>
</template>
