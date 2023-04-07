<template lang="pug">
section.h-full.flex.flex-col.items-center.justify-center
  .flex.flex-col.items-center.gap-5
    PuzzleAnimation.w-80
    h1.va-h1.text-grey.text-center Wordya
    h5.va-h5.text-grey.text-center.max-w-sm Ваше приключение начинается здесь
  va-button.mt-10(size='large', @click='navigateTo("/map")') Начать игру
  .mt-3
    span Первый раз?
    va-button.ml-1(preset='plain', @click='navigateTo("/register")') Регистрация
</template>

<script setup lang="ts"></script>

<style scoped></style>
