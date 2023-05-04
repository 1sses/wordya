<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5.gap-5(class='max-w-[500px]')
  h2 Oops, страница не найдена!
  va-button(preset='plain', @click='navigateTo("/register")') Главная страница
</template>

<script setup lang="ts"></script>

<style scoped></style>
