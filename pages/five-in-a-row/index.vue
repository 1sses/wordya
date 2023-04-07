<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5.gap-5(class='max-w-[500px]')
  FiveInARowGameMode(
    v-for='difficulty in 5',
    :key='difficulty',
    :difficulty='difficulty'
  )
</template>

<script setup lang="ts"></script>

<style scoped></style>
