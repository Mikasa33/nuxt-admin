<script lang="ts" setup>
const emits = defineEmits<{
  clear: []
  enter: []
}>()

const value = defineModel<string>('value')

async function onClear() {
  await nextTick()
  emits('clear')
}

function onEnter() {
  emits('enter')
}
</script>

<template>
  <NInputGroup class="max-w-240px">
    <NInput
      v-model:value="value"
      placeholder="请输入关键词"
      clearable
      @clear="onClear"
      @keydown.enter="onEnter"
    />
    <NButton @click="onEnter">
      搜索
    </NButton>
  </NInputGroup>
</template>
