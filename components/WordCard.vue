<template lang="pug">
.flex.gap-2.justify-center(style='user-select: none')
  va-card.w-16.h-20.justify-center.items-center(
    v-for='index in length',
    :key='index',
    :outlined='!!word[index - 1]',
    :color='computeColor(word[index - 1]?.match)',
    style='display: flex'
  )
    h2.va-h2.text-center {{ word[index - 1]?.letter.toUpperCase() }}
</template>

<script setup lang="ts">
defineProps<{
  length: number
  word: Array<{
    letter: string
    match: 'full' | 'letter' | 'no' | '-'
  }>
}>()

const computeColor = (match) => {
  switch (match) {
    case 'full':
      return 'success'
    case 'letter':
      return 'warning'
    case 'no':
      return 'secondary'
    case '-':
    default:
      return 'backgroundPrimary'
  }
}
</script>

<style scoped></style>
