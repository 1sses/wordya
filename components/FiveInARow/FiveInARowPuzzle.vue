<template lang="pug">
.relative
  h2.va-h1.text-center Five In A Row
  .flex.gap-2.px-3.absolute.w-full.h-full.top-0
    div(
      v-for='stat in statistics',
      :key='stat.diffuculty',
      class='w-1/5',
      :class='{ "bg-gray-400": stat.wins < 25 }'
    )
</template>

<script setup lang="ts">
defineProps<{ statistics: any }>()
</script>

<style scoped></style>
