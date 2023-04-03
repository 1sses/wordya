<template lang="pug">
.px-3.gap-2.flex.flex-col.w-full(style='user-select: none')
  .flex.gap-1(v-for='(row, i) in letters', :key='i')
    template(v-for='(letter, j) in row', :key='j')
      va-card.w-12.h-14.justify-center.items-center(
        v-if='letter === "Enter"',
        style='display: flex; cursor: pointer',
        @click='enterClick'
      )
        va-icon.material-icons done
      va-card.w-10.h-14.justify-center.items-center(
        v-else-if='letter === "Del"',
        style='display: flex; cursor: pointer',
        @click='backspaceClick'
      )
        va-icon.material-icons(size='20px') backspace
      va-card.h-14.flex-1.justify-center.items-center(
        v-else,
        color='#fafafa',
        style='display: flex; cursor: pointer',
        @click='letterClick(letter)'
      )
        h6.va-h6.text-center {{ letter.toUpperCase() }}
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'letter', value: string): void
  (e: 'backspace'): void
  (e: 'enter'): void
}>()

const letters = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['Del', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Enter'],
]

const letterClick = (letter: string) => emit('letter', letter)

const backspaceClick = () => emit('backspace')

const enterClick = () => emit('enter')
</script>

<style scoped></style>
