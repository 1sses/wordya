<template lang="pug">
section.h-full.flex.flex-col.items-center.justify-center
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
          :item='item',
          @start='navigateTo("/five-in-a-row")'
        )
</template>

<script setup lang="ts">
const step = ref(0)

const steps = [
  {
    label: 'Five In A Row',
    content:
      'Five In A Row - увлекательный режим для любителей словесных головоломок. Отгадывайте слова, улучшайте свои лексические и логические навыки. Наслаждайтесь простой, но захватывающей игрой!',
  },
  {
    label: 'Второй поворот',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    label: 'Третий вариант',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    label: 'Чертвертый финал',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]
</script>

<style scoped></style>
