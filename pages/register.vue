<template lang="pug">
section.h-full.flex.flex-col.items-center.justify-evenly
  div
    h2.va-h2.text-center Регистрация
    h5.va-h5.text-center Добро пожаловать!
  va-form.flex.flex-col.items-center.gap-5(ref='form')
    va-input(
      v-model='userData.name',
      label='Имя',
      :rules='[(value) => (value && value.length > 0) || "Field is required"]'
    )
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
    va-button(@click='register') Зарегистрироваться
    div
      span Уже есть аккаунт?
      va-button.ml-1(preset='plain', @click='navigateTo("/login")') Вход
</template>

<script setup lang="ts">
const toast = useToast()
const authStore = useAuthStore()

const userData = reactive({
  name: '',
  email: '',
  password: '',
})

const form = ref<any>(null)

const register = async () => {
  const valid = form.value.validate()
  if (!valid) return

  try {
    const response = await authStore.register(userData)
    toast.init({
      color: 'success',
      message: response.message,
    })
    navigateTo('/')
  } catch (error) {
    toast.init({
      color: 'danger',
      message: error.message,
    })
  }
}
</script>

<style scoped></style>
