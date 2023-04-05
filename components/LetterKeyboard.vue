<template lang="pug">
.px-3.gap-2.flex.flex-col.w-full(style='user-select: none')
  .flex.gap-1(v-for='(row, i) in letters', :key='i')
    template(v-for='(letterObj, j) in row', :key='j')
      va-card.w-12.h-14.justify-center.items-center(
        v-if='letterObj.letter === "Enter"',
        style='display: flex; cursor: pointer',
        @click='enterClick'
      )
        va-icon.material-icons done
      va-card.w-10.h-14.justify-center.items-center(
        v-else-if='letterObj.letter === "Del"',
        style='display: flex; cursor: pointer',
        @click='backspaceClick'
      )
        va-icon.material-icons(size='20px') backspace
      va-card.h-14.flex-1.justify-center.items-center(
        v-else,
        :color='computeColor(letterObj.match)',
        style='display: flex; cursor: pointer',
        @click='letterClick(letterObj.letter)'
      )
        h6.va-h6.text-center {{ letterObj.letter.toUpperCase() }}
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'letter', value: string): void
  (e: 'backspace'): void
  (e: 'enter'): void
}>()

// color='#fafafa',

const keyboard = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['Del', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Enter'],
]

const letters = ref(
  keyboard.map((row) => row.map((letter) => ({ letter, match: '-' })))
)

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

const letterClick = (letter: string) => emit('letter', letter)

const backspaceClick = () => emit('backspace')

const enterClick = () => emit('enter')

const colorize = (words: { letter: string; match: string }[][]) => {
  for (const row of letters.value) {
    for (const letterObj of row) {
      const matches = new Set<string>()
      for (const attemptWord of words) {
        for (const attemptLetterObj of attemptWord) {
          if (letterObj.letter === attemptLetterObj.letter)
            matches.add(attemptLetterObj.match)
        }
      }
      // console.log(letterObj.letter, matches)
      if (matches.has('full')) {
        letterObj.match = 'full'
        continue
      }
      if (matches.has('letter')) {
        letterObj.match = 'letter'
        continue
      }
      if (matches.has('no')) {
        letterObj.match = 'no'
        continue
      }
      letterObj.match = '-'
      // if (matches.has('letter')) return (letterObj.match = 'letter')
    }
  }
}

defineExpose({ colorize })
</script>

<style scoped></style>
