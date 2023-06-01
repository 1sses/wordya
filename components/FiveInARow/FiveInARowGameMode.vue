<template lang="pug">
va-card
  .flex
    .flex-col.mx-5.w-24
      client-only
        img(
          :src='"/five-in-a-row/level" + statistics.difficulty + ".png"',
          :style='{ filter: `grayscale(` + grayscale + "%)" }'
        )
    .flex-col
      va-card-content
        em {{ fiveInARowReplicas[statistics.difficulty].name }}:
        p.va-text-bold {{ replica }}
  va-card-content.whitespace-normal
    p.mb-2
      em {{ fiveInARowReplicas[statistics.difficulty].description }}
    va-card-title {{ _difficulty.label }}
    p.mb-3 {{ _difficulty.content }}
    .mb-3
      va-chip.m-1(outline, :color='_difficulty.color') Сыграно: {{ statistics.played ?? '-' }}
      va-chip.m-1(outline, :color='_difficulty.color') Побед: {{ statistics.wins ?? '-' }}
      va-chip.m-1(outline, :color='_difficulty.color') Среднее число попыток: {{ Math.round(statistics.averageAttempts * 100) / 100 ?? '-' }}
      va-chip.m-1(outline, :color='_difficulty.color') Максимально побед подряд: {{ statistics.maximumWins ?? '-' }}
      va-chip.m-1(outline, :color='_difficulty.color') Текущее число побед подряд: {{ statistics.currentWins ?? '-' }}
    div
      p(v-if='statistics.wins >= 25') Свободный режим
      p(v-else) Прогресс: {{ statistics.wins }} / 25
      va-progress-bar.mt-2(
        :model-value='statistics.wins',
        :color='_difficulty.color',
        :max='25'
      )
  va-card-actions
    va-button(
      :color='_difficulty.color',
      icon-right='play_arrow',
      @click='navigateTo({ path: "/five-in-a-row/game", query: { difficulty: statistics.difficulty } })'
    ) Играть
</template>

<script setup lang="ts">
type Statistics = {
  difficulty: number
  played: number
  wins: number
  averageAttempts: number
  maximumWins: number
  currentWins: number
}

const props = defineProps<{
  statistics: Statistics
}>()

defineEmits<{ (e: 'start') }>()

const _difficulty = computed(
  () => fiveInARowDifficulties[props.statistics.difficulty]
)

const grayscale = computed(() => {
  if (props.statistics.wins >= 25) return 0
  return (100 - props.statistics.wins * 4) * 2
})

const replica = computed(() => {
  const roundUpToNearest = (x) => {
    const numbers = [5, 10, 15, 20, 25]
    let nearest = numbers[0]

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] >= x) {
        nearest = numbers[i]
        break
      }
    }

    return nearest
  }
  return fiveInARowReplicas[props.statistics.difficulty][
    roundUpToNearest(props.statistics.wins)
  ]
})
</script>

<style scoped></style>
