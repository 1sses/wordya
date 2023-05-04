<template lang="pug">
va-card
  va-modal(v-model='isOpen')
    template(#content)
      va-card-title Как играть?
      va-card-content.flex.flex-col.gap-10
        p Ваша задача - отгадать загаданное слово из 5 букв за 6 попыток. После каждой попытки цвета букв будут меняться, чтобы показать, какие буквы есть в загаданном слове.
        va-divider
        p Например, мы пытаемся отгадать слово "БАТУТ" и вводим слово "БУХТА":
        WordCard(
          :length='5',
          :word='[ { letter: "б", match: "full", flipped: true }, { letter: "у", match: "letter", flipped: true }, { letter: "х", match: "no", flipped: true }, { letter: "т", match: "letter", flipped: true }, { letter: "а", match: "letter", flipped: true }, ]'
        )
        p Зеленая буква "Б" означает, что она стоит на своем месте
        p Желтый цвет показывает, что такая буква есть в слове, но стоит не на том месте (например, "А")
        p Если буквы нет в загаданном слове, то она выделяется серым, как "Х".
        WordCard(
          :length='5',
          :word='[ { letter: "б", match: "full", flipped: true }, { letter: "а", match: "full", flipped: true }, { letter: "т", match: "full", flipped: true }, { letter: "у", match: "full", flipped: true }, { letter: "т", match: "full", flipped: true }, ]'
        )
        p Если слово полностью зеленое, значит вы угадали слово и победили в этом раунде!
        p Если же вам не удалось отгадать слово за 6 попыток, раунд считается проигранным.
        va-divider
        p По правилам русских кроссвордов, буква "Ё" заменяется на "Е" во всех словах.
      va-card-actions
        va-button(@click='isOpen = false') Понятно
  va-card-title Five In A Row
  WordCard(
    :length='5',
    :word='[ { letter: "щ", match: "letter", flipped: true }, { letter: "е", match: "full", flipped: true }, { letter: "г", match: "no", flipped: true }, { letter: "о", match: "letter", flipped: true }, { letter: "л", match: "full", flipped: true }, ]'
  )
  va-card-content.whitespace-normal
    p.mb-3 Five In A Row - увлекательный режим для любителей словесных головоломок. Отгадывайте слова, улучшайте свои лексические и логические навыки. Наслаждайтесь простой, но захватывающей игрой!
  va-card-actions
    va-button(color='success', @click='$emit("start")') Начать игру
    va-button(color='warning', @click='isOpen = true') Как играть?
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'start')
}>()

const isOpen = ref(false)
</script>

<style scoped></style>
