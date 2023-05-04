<template lang="pug">
va-card
  va-card-title Профиль
  va-card-content
    h3 Добро пожаловать
      |
      ClientOnly , {{ user?.name }}
      | !
  va-card-actions
    va-button(
      color='success',
      icon='stars',
      @click='navigateTo("/achievements")'
    ) Достижения
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const user = computed(() => authStore.user)
</script>

<style scoped></style>
