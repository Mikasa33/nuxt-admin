<script lang="ts" setup>
const { layout: { inverted, header: { github } } } = useAppConfig()
const isDark = useDark()
const { collapsed } = storeToRefs(useAppStore())
</script>

<template>
  <NLayout class="h-100vh w-full">
    <NLayoutHeader
      :inverted
      class="h-64px"
    >
      <div class="h-full flex">
        <LayoutLogo />
        <div class="flex-1" />
        <div class="mr-24px h-full flex-y-center gap-x-8px">
          <LayoutGithub v-if="github" />
          <LayoutTheme />
          <LayoutUser />
        </div>
      </div>
    </NLayoutHeader>
    <NLayout
      has-sider
      position="absolute"
      :class="{
        'bg-#001428': inverted && !isDark,
      }"
      class="!top-64px !dark:bg-#18181c"
    >
      <NLayoutSider
        v-model:collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :inverted
        :native-scrollbar="false"
        show-trigger="arrow-circle"
        :width="240"
        trigger-class="!top-160px"
        collapsed-trigger-class="!top-160px"
      >
        <LayoutMenu />
      </NLayoutSider>
      <NLayout
        :native-scrollbar="false"
        content-class="p-24px h-full"
        class="rounded-tl-12px bg-#f0f2f5 dark:bg-#101014"
      >
        <NuxtPage />
      </NLayout>
    </NLayout>
  </NLayout>
</template>
