<template lang="pug">
.select-none
  va-app-bar.flex.justify-center.text-white(fixed, :color='game.color')
    h3 {{ game.title }}
  main.h-screen
    slot
</template>

<script setup lang="ts">
type Game = {
  title?: string
  color?: string
}

const route = useRoute()

const game = computed<Game>(() => {
  const [_, gameName] = route.fullPath.split('/')
  switch (gameName) {
    case 'five-in-a-row': {
      if (!route.query.difficulty) return {}
      const difficulty = fiveInARowDifficulties[+route.query.difficulty].label
      return {
        title: `Wordya - Five In A Row - ${difficulty}`,
        color: fiveInARowDifficulties[+route.query.difficulty].color,
      }
    }
  }
})
</script>

<style scoped></style>
