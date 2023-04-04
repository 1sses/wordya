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

onMounted(async () => {
  const response = await FiveInARowAPI.start()
  if (response.data.result.matches.length === 0) return
  response.data.result.matches.forEach((wordMatches, i) => {
    game.words[i] = response.data.result.game.attempts[i]
      .split('')
      .map((letter, j) => ({
        letter,
        match: wordMatches[j],
      }))
  })
  game.currentIteration = response.data.result.matches.length
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
  if (response.ok) {
    if (response.data.result.valid) {
      const matches = response.data.result.matches
      currentWord.forEach((obj, i) => (obj.match = matches[i]))
    } else {
      toast.init({
        color: 'warning',
        message: `Попробуйте другое слово!`,
      })
      return
    }
    if (response.data.result.matches.every((match) => match === 'full')) {
      const response = await FiveInARowAPI.end()
      console.log(response.data)
    }
    game.currentIteration++
  }
}
</script>

<style scoped></style>
