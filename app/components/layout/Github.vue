<script lang="ts" setup>

</script>

<template>
  <NTooltip>
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
        />
      </NButton>
    </template>
    代码仓库
  </NTooltip>
</template>
