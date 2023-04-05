<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5(class='max-w-[500px]')
  .h-full.flex.flex-col.justify-center
    .flex.flex-col.gap-2
      WordCard(
        v-for='(it, i) in game.iterations',
        :key='i',
        :length='game.wordLength',
        :word='game.words[it - 1]'
      )
  LetterKeyboard(
    ref='keyboard',
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
  words: Array<Array<{ letter: string; match: string }>>
}

const toast = useToast()

const keyboard = ref<any>(null)

const game = reactive<IGame>({
  iterations: 6,
  currentIteration: 0,
  wordLength: 5,
  words: [[], [], [], [], [], []],
})

onMounted(async () => {
  const response = await FiveInARowAPI.start()
  if (response.data.matches.length === 0) return
  response.data.matches.forEach((wordMatches, i) => {
    game.words[i] = response.data.attempts[i].split('').map((letter, j) => ({
      letter,
      match: wordMatches[j],
    }))
  })
  keyboard.value.colorize(game.words)
  game.currentIteration = response.data.matches.length
})

const addLetter = (letter: string) => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length >= game.wordLength) return
  currentWord.push({ letter, match: '-' })
}

const removeLetter = () => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length <= 0) return
  currentWord.pop()
}

const submitWord = async () => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length !== game.wordLength) {
    toast.init({
      color: 'warning',
      message: `Введите слово из ${game.wordLength} букв!`,
    })
    return
  }
  const response = await FiveInARowAPI.checkWord({
    word: currentWord.map((obj) => obj.letter).join(''),
  })
  if (!response.ok) {
    toast.init({
      color: 'error',
      message: response.message,
    })
    return
  }
  if (!response.data.valid) {
    toast.init({
      color: 'warning',
      message: `Попробуйте другое слово!`,
    })
    return
  }
  game.currentIteration++
  const matches = response.data.matches
  currentWord.forEach((obj, i) => (obj.match = matches[i]))
  keyboard.value.colorize(game.words)
  if (
    response.data.matches.every((match) => match === 'full') ||
    game.currentIteration === game.iterations
  ) {
    const response = await FiveInARowAPI.end()
    console.log(response.data)
  }
}
</script>

<style scoped></style>
