<template lang="pug">
section.h-full.flex.flex-col.items-center.justify-evenly
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
      type='password',
      :rules='[(value) => (value && value.length > 0) || "Field is required"]'
    )
    va-button(@click='login') Войти
    div
      span Нет аккаунта?
      va-button.ml-1(preset='plain', @click='navigateTo("/register")') Регистрация
</template>

<script setup lang="ts">
const toast = useToast()
const authStore = useAuthStore()

const userData = reactive({
  email: '',
  password: '',
})

const form = ref<any>(null)

const login = async () => {
  const valid = form.value.validate()
  if (!valid) return

  try {
    const response = await authStore.login(userData)
    toast.init({
      color: 'success',
      message: response.message,
    })
    navigateTo('/map')
  } catch (error) {
    toast.init({
      color: 'danger',
      message: error.message,
    })
  }
}
</script>

<style scoped></style>
