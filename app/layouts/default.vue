<script lang="ts" setup>
const { collapsed } = storeToRefs(useAppStore())
</script>

<template>
  <NLayout class="h-100vh w-full">
    <NLayoutHeader class="h-64px">
      <div class="h-full flex">
        <LayoutLogo />
        <div class="flex-1" />
        <div class="mr-24px h-full flex-y-center gap-x-8px">
          <LayoutGithub />
          <LayoutTheme />
          <LayoutUser />
        </div>
      </div>
    </NLayoutHeader>
    <NLayout
      has-sider
      position="absolute"
      class="!top-64px"
    >
      <NLayoutSider
        v-model:collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :native-scrollbar="false"
        show-trigger="arrow-circle"
        :width="240"
      >
        <LayoutMenu />
      </NLayoutSider>
      <NLayout
        embedded
        :native-scrollbar="false"
        content-class="p-24px"
        class="rounded-tl-12px"
      >
        <NuxtPage />
      </NLayout>
    </NLayout>
  </NLayout>
</template>
