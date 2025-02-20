<script lang="ts" setup>
import ErrorAdmin from './error.admin.vue'

const { isAdmin } = useApp()
</script>

<template>
  <ErrorAdmin v-if="isAdmin" />
</template>
