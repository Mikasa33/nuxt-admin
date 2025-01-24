<script lang="ts" setup>
import Info from './components/Info.vue'
import Password from './components/Password.vue'
</script>

<template>
  <BaseTabs
    :data="[
      { name: 'info', tab: '个人信息' },
      { name: 'password', tab: '修改密码' },
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
