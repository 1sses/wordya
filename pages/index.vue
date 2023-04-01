<template lang="pug">
main
  va-app-bar.px-10.mb-10
    h1.va-h1(style='color: white') Wordya
  section.flex.flex-col.gap-y-5(style='max-width: 600px; margin: 0 auto')
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
type IGame = {
  iterations: number
  currentIteration: number
  wordLength: number
  words: Array<Array<string>>
}

const game = reactive<IGame>({
  iterations: 6,
  currentIteration: 0,
  wordLength: 5,
  words: [[], [], [], [], [], []],
})

const addLetter = (letter: string) => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length >= game.wordLength) return
  console.log(letter)
  currentWord.push(letter)
}

const removeLetter = () => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length <= 0) return
  console.log('remove')
  currentWord.pop()
}

const submitWord = () => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length !== game.wordLength) return // notification
  console.log('submit word')
  game.currentIteration++
}
</script>

<style scoped></style>
