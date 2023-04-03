<template lang="pug">
section.h-full.flex.flex-col.justify-between.py-5(
  style='max-width: 500px; margin: 0 auto'
)
  .h-full.flex.flex-col.justify-center
    .flex.flex-col.gap-2
      WordCard(
        v-for='(it, i) in game.iterations',
        :key='i',
        :length='game.wordLength',
        :word='game.words[it - 1]'
      )
  LetterKeyboard(
    @letter='addLetter',
    @backspace='removeLetter',
    @enter='submitWord'
  )
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

type IGame = {
  iterations: number
  currentIteration: number
  wordLength: number
  words: Array<Array<string>>
}

const toast = useToast()

const game = reactive<IGame>({
  iterations: 6,
  currentIteration: 0,
  wordLength: 5,
  words: [[], [], [], [], [], []],
})

const addLetter = (letter: string) => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length >= game.wordLength) return
  currentWord.push(letter)
}

const removeLetter = () => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length <= 0) return
  currentWord.pop()
}

const submitWord = () => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length !== game.wordLength) {
    toast.init({
      color: 'warning',
      message: `Введите слово из ${game.wordLength} букв!`,
    })
    return
  }
  console.log('submit word')
  game.currentIteration++
}
</script>

<style scoped></style>
