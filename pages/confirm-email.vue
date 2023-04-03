<template lang="pug">
section.h-screen.flex.flex-col.items-center.justify-evenly
  .flex.flex-col(v-if='status === "success"')
    h2.va-h2.text-grey.text-center Email подтвержден
    h5.va-h5.text-grey.text-center Теперь мы можете начать играть!
    va-button(preset='plain', @click='navigateTo("/")') На главную страницу
  .flex.flex-col(v-else-if='status === "fail"')
    h2.va-h2.text-grey.text-center Произошла ошибка
    h5.va-h5.text-grey.text-center Что-то пошло не так :(
    va-button(preset='plain', @click='navigateTo("/")') На главную страницу
</template>

<script setup lang="ts">
const route = useRoute()

const status = ref<'success' | 'fail' | 'pending'>('pending')

onMounted(async () => {
  const token = route.query.token as string
  const response = await AuthAPI.confirmEmail(token)
  if (response.ok) {
    status.value = 'success'
  } else {
    status.value = 'fail'
  }
})
</script>

<style scoped></style>
