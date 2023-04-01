<template lang="pug">
.flex.gap-5.justify-center(style='user-select: none')
  va-card.w-12.h-20(v-for='index in length', :key='index')
    h1.va-h1.text-center {{ word[index - 1] }}
</template>

<script setup lang="ts">
defineProps<{
  length: number
  word: string[]
}>()
</script>

<style scoped></style>
