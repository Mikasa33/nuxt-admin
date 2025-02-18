<script lang="ts" setup>
const { layout: { inverted } } = useAppConfig()
const isDark = useDark()
</script>

<template>
  <NTooltip :theme-overrides="isDark ? {} : { color: '#fff', textColor: '#333639' }">
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
          :class="{
            'text-#fff': inverted && !isDark,
          }"
        />
      </NButton>
    </template>
    切换主题
  </NTooltip>
</template>
