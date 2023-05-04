<template lang="pug">
section.h-full.flex.flex-col.justify-between.m-auto.py-5.gap-5(class='max-w-[500px]')
  va-accordion
    va-collapse(
      v-for='game in achievements',
      :key='game.title',
      :header='game.title'
    )
      va-card.my-3(
        v-for='achievement in game.items',
        :key='achievement.name',
        :disabled='!achievement.received'
      )
        va-card-title {{ achievement.title }}
        va-card-content {{ achievement.description }}
</template>

<script setup lang="ts">
const achievements = ref([])

;(async () => {
  const response = await AchievementsAPI.findAll()
  achievements.value = achievementsList.map((game) => {
    return {
      ...game,
      items: game.items.map((item) => {
        const findResult = response.data.find((i) => item.name === i.name)
        return { ...item, received: !!findResult }
      }),
    }
  })
  console.log(achievements.value)
})()
</script>

<style scoped></style>
