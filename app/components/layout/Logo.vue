<script lang="ts" setup>
const { title, logo, layout: { inverted } } = useAppConfig()
const isDark = useDark()
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
      :src="logo"
      class="h-42px"
    />
    <NH2
      v-show="!collapsed"
      :class="{
        'text-#fff': inverted && !isDark,
      }"
      class="m-0"
    >
      {{ title }}
    </NH2>
  </NuxtLink>
</template>
