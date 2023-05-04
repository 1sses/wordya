<template lang="pug">
section.h-full.flex.flex-col.items-center.justify-center
  UserPreview
  va-carousel(
    v-model='step',
    :items='steps',
    swipable,
    :indicators='false',
    height='100%'
  )
    template(#default='{ item }')
      .mx-5(class='max-w-[500px]')
        FiveInARowGameSelect(
          v-if='item.name === "five-in-a-row"',
          @start='navigateTo("/five-in-a-row")'
        )
</template>

<script setup lang="ts">
const step = ref(0)

const steps = [
  {
    name: 'five-in-a-row',
  },
]
</script>

<style scoped></style>
