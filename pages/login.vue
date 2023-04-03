<template lang="pug">
section.h-screen.flex.flex-col.items-center.justify-evenly
  div
    h2.va-h2.text-grey.text-center Вход
    h5.va-h5.text-grey.text-center С возвращением!
  va-form.flex.flex-col.items-center.gap-5(ref='form')
    va-input(
      v-model='userData.email',
      label='Email',
      :rules='[(value) => (value && value.length > 0) || "Field is required"]'
    )
    va-input(
      v-model='userData.password',
      label='Пароль',
      :rules='[(value) => (value && value.length > 0) || "Field is required"]'
    )
    va-button(@click='login') Войти
    div
      span Нет аккаунта?
      va-button.ml-1(preset='plain', @click='navigateTo("/register")') Регистрация
</template>

<script setup lang="ts">
const userData = reactive({
  email: '',
  password: '',
})

const form = ref<any>(null)

const login = async () => {
  const valid = form.value.validate()
  if (!valid) return

  const response = await AuthAPI.login(userData)
  console.log(response)
}
</script>

<style scoped></style>
