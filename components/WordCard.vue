<template lang="pug">
.flex.gap-2.justify-center(style='user-select: none')
  va-card.w-16.h-20.justify-center.items-center(
    v-for='index in length',
    :key='index',
    :outlined='!!word[index - 1]',
    style='display: flex'
  )
    h2.va-h2.text-center {{ word[index - 1]?.toUpperCase() }}
</template>

<script setup lang="ts">
defineProps<{
  length: number
  word: string[]
}>()
</script>

<style scoped></style>
