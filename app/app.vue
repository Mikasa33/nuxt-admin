<script setup lang="ts">
import AdminApp from './app.admin.vue'

const { isAdmin } = useApp()
</script>

<template>
  <AdminApp v-if="isAdmin" />
</template>
