<script lang="ts" setup>
import Info from './components/Info.vue'
import Password from './components/Password.vue'
</script>

<template>
  <BaseTabs
    :data="[
      { name: 'info', tab: '个人信息', displayDirective: 'show:lazy' },
      { name: 'password', tab: '修改密码', displayDirective: 'show:lazy' },
    ]"
  >
    <template #info>
      <Info />
    </template>
    <template #password>
      <Password />
    </template>
  </BaseTabs>
</template>
