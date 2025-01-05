<script lang="ts" setup>
const { title } = useAppConfig()
const { collapsed } = storeToRefs(useAppStore())
</script>

<template>
  <NuxtLink
    to="/"
    :class="collapsed ? 'w-64px' : 'w-240px'"
    class="h-full flex-center gap-x-8px"
  >
    <NImage
      preview-disabled
      src="/favicon.ico"
      class="h-32px"
    />
    <NH2
      v-show="!collapsed"
      class="m-0"
    >
      {{ title }}
    </NH2>
  </NuxtLink>
</template>
