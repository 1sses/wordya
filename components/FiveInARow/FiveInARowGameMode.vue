<template lang="pug">
va-card
  va-card-title {{ _difficulty.label }}
  va-card-content.whitespace-normal
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

defineEmits<{
  (e: 'start')
}>()

const _difficulty = computed(
  () => fiveInARowDifficulties[props.statistics.difficulty]
)
</script>

<style scoped></style>
