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
  <NInput
    v-model:value="value"
    placeholder="请输入关键词"
    clearable
    class="max-w-180px"
    @clear="onClear"
    @keydown.enter="onEnter"
  >
    <template #prefix>
      <Icon
        name="i-icon-park-outline-search"
        class="mr-4px"
      />
    </template>
  </NInput>
</template>
