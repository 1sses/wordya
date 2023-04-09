<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5.gap-5(class='max-w-[500px]')
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
