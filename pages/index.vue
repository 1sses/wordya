<template lang="pug">
section.h-screen.flex.flex-col.items-center.justify-center
  .flex.flex-col.items-center
    img(src='/logo.svg', width='50%')
    h1.va-h1.text-grey.text-center Wordya
    h5.va-h5.text-grey.text-center Ваше приключение начинается здесь
    PuzzleAnimation
  va-button.mt-10(size='large') Начать игру
</template>

<script setup lang="ts"></script>

<style scoped></style>
