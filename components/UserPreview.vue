<template lang="pug">
va-card
  va-card-title Профиль
  va-card-content
    h3 Добро пожаловать, {{ user?.name }}!
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const user = computed(() => authStore.user)
</script>

<style scoped></style>
