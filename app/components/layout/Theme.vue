<script lang="ts" setup>
const isDark = useDark()
</script>

<template>
  <NTooltip>
    <template #trigger>
      <NButton
        quaternary
        size="large"
        class="min-w-40px !px-12px"
        @click="isDark = !isDark"
      >
        <Icon
          :name="isDark ? 'i-icon-park-outline-moon' : 'i-icon-park-outline-sun-one'"
          :size="16"
        />
      </NButton>
    </template>
    切换主题
  </NTooltip>
</template>
