<template lang="pug">
.flex.gap-2.justify-center(style='user-select: none')
  template(v-for='index in length', :key='index')
    va-card.w-16.h-20.justify-center.items-center.card.flip-transition(
      :outlined='!!word[index - 1]',
      :color='word[index - 1]?.flipped ? computeColor(word[index - 1]?.match) : "backgroundPrimary"',
      :class='{ flip: !word[index - 1]?.flipped }'
    )
      h2.va-h2.text-center.flip-transition(
        :class='{ flip: !word[index - 1]?.flipped }'
      ) {{ word[index - 1]?.letter.toUpperCase() }}
</template>

<script setup lang="ts">
const props = defineProps<{
  length: number
  word: Array<{
    letter: string
    match: 'full' | 'letter' | 'no' | '-'
    flipped: boolean
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

const flipWord = () => {
  for (let i = 0; i < props.word.length; i++) {
    setTimeout(() => {
      props.word[i].flipped = true
    }, i * 300)
  }
}

defineExpose({ flipWord })
</script>

<style scoped lang="scss">
.card {
  --va-card-display: flex;
}

.flip-transition {
  transition: transform 0.6s ease-in-out;
}

.flip {
  transform: rotateX(180deg);
}
</style>
