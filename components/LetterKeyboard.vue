<template lang="pug">
.gap-2
  .flex.flex-row.gap-1(v-for='(row, i) in letters', :key='i')
    .grow(v-for='(letter, j) in row', :key='j')
      va-card.w-28.h-14(
        v-if='letter === "Enter"',
        style='cursor: pointer',
        @click='enterClick'
      )
        h4.va-h4.text-center Ввод
      va-card.h-14(
        v-else,
        style='cursor: pointer',
        @click='letterClick(letter)'
      )
        h3.va-h3.text-center {{ letter }}
</template>

<script setup lang="ts">
const letters = [
  ['й', 'ц', 'у', 'к', 'е', 'ё', 'н', 'г', 'ш', 'щ', 'з', 'х'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ъ'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Enter'],
]

const letterClick = (letter: string) => {
  console.log(letter)
}

const enterClick = () => {
  console.log('DONE')
}
</script>

<style scoped></style>
