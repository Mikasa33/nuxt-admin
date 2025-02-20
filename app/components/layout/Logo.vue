<script lang="ts" setup>
const { admin: { title, logo } } = useAppConfig()
const { collapsed } = storeToRefs(useAppStore())
</script>

<template>
  <NuxtLink
    to="/admin"
    :class="collapsed ? 'w-64px' : 'w-240px'"
    class="h-full flex-center gap-x-8px transition-300"
  >
    <NImage
      preview-disabled
      :src="logo"
      class="h-42px"
    />
    <NH2
      v-show="!collapsed"
      class="m-0"
    >
      {{ title }}
    </NH2>
  </NuxtLink>
</template>
