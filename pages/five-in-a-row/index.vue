<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5.gap-5(class='max-w-[500px]')
  va-card
    va-card-content
      p Освобоите обесцвеченных персонажей, решая головолочки для них и отгадывая слова!
      p По мере побед в уровнях каждый персонаж будет возвращать свой цвет.
      p Давайте же, вперед к приключениям!
  FiveInARowGameMode(
    v-for='stat in statistics',
    :key='stat.difficulty',
    :statistics='stat'
  )
</template>

<script setup lang="ts">
const statistics = ref([])

;(async () => {
  const response = await FiveInARowAPI.statistics()
  statistics.value = response.data.statistics
})()
</script>

<style scoped></style>
