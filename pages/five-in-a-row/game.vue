<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5(class='max-w-[500px]')
  va-modal(v-model='endGameModal.isOpen')
    template(#content)
      va-card-title(v-if='endGameModal.data.status === "WIN"') Победа!
      va-card-title(v-else) Поражение :(
      va-card-content.flex.flex-col.gap-10
        div(v-if='endGameModal.data.status === "WIN"')
          p Поздравляем!
        div(v-else)
          p А слово на самом деле было
          h3.va-h3 {{ endGameModal.data.word }}
      va-card-actions
        va-button(@click='newGame') Попробовать еще
        va-button(@click='backHandler') Назад
  .h-full.flex.flex-col.justify-center
    .flex.flex-col.gap-2
      WordCard(
        v-for='(it, i) in game.iterations',
        :key='i',
        ref='words',
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
  layout: 'game',
})

type IGame = {
  iterations: number
  currentIteration: number
  wordLength: number
  words: Array<Array<{ letter: string; match: string; flipped: boolean }>>
}

const route = useRoute()
const toast = useToast()

const words = ref<any>(null)
const keyboard = ref<any>(null)
const endGameModal = reactive({
  isOpen: false,
  data: {},
})

const game = reactive<IGame>({
  iterations: 6,
  currentIteration: 0,
  wordLength: 5,
  words: [[], [], [], [], [], []],
})

const difficulty = computed(() => +route.query.difficulty)

const loadGame = async () => {
  const response = await FiveInARowAPI.start({ difficulty: difficulty.value })
  if (response.data.matches.length === 0) {
    game.words = [[], [], [], [], [], []]
    game.currentIteration = 0
    keyboard.value?.colorize(game.words)
    return
  }
  response.data.matches.forEach((wordMatches, i) => {
    game.words[i] = response.data.attempts[i].split('').map((letter, j) => ({
      letter,
      match: wordMatches[j],
      flipped: false,
    }))
    setTimeout(() => {
      words.value[i]?.flipWord()
    })
  })
  keyboard.value?.colorize(game.words)
  game.currentIteration = response.data.matches.length
}

onMounted(loadGame)

const addLetter = (letter: string) => {
  const currentWord = game.words.at(game.currentIteration)
  if (currentWord.length >= game.wordLength) return
  currentWord.push({ letter, match: '-', flipped: false })
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
    difficulty: difficulty.value,
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
  words.value[game.currentIteration - 1].flipWord()
  setTimeout(() => {
    keyboard.value.colorize(game.words)
  }, 300 * game.wordLength)
  if (
    response.data.matches.every((match) => match === 'full') ||
    game.currentIteration === game.iterations
  ) {
    const response = await FiveInARowAPI.end({ difficulty: difficulty.value })
    endGameModal.data = response.data
    endGameModal.isOpen = true
  }
}

const newGame = async () => {
  endGameModal.isOpen = false
  endGameModal.data = {}
  await loadGame()
}

const backHandler = () => {
  endGameModal.isOpen = false
  navigateTo('/five-in-a-row', { replace: true })
}
</script>

<style scoped></style>
