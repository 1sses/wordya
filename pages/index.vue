<template lang="pug">
section.h-full.flex.flex-col.items-center.justify-center
  .flex.flex-col.items-center.gap-5
    PuzzleAnimation
    h1.va-h1.text-grey.text-center Wordya
    h5.va-h5.text-grey.text-center.max-w-sm Ваше приключение начинается здесь
  va-button.mt-10(size='large', @click='navigateTo("/map")') Начать игру
</template>

<script setup lang="ts"></script>

<style scoped></style>
