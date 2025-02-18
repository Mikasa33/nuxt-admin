<script lang="ts" setup>
const { layout: { inverted } } = useAppConfig()
const isDark = useDark()
</script>

<template>
  <NTooltip :theme-overrides="isDark ? {} : { color: '#fff', textColor: '#333639' }">
    <template #trigger>
      <NButton
        href="https://github.com/Mikasa33/starter-nuxt"
        quaternary
        size="large"
        tag="a"
        target="_blank"
        class="min-w-40px !px-12px"
      >
        <Icon
          name="i-icon-park-outline-github-one"
          :size="16"
          :class="{
            'text-#fff': inverted && !isDark,
          }"
        />
      </NButton>
    </template>
    代码仓库
  </NTooltip>
</template>
