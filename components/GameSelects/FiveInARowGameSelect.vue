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
          :word='[ { letter: "б", match: "full" }, { letter: "у", match: "letter" }, { letter: "х", match: "no" }, { letter: "т", match: "letter" }, { letter: "а", match: "letter" }, ]'
        )
        p Зеленая буква "Б" означает, что она стоит на своем месте
        p Желтый цвет показывает, что такая буква есть в слове, но стоит не на том месте (например, "А")
        p Если буквы нет в загаданном слове, то она выделяется серым, как "Х".
        WordCard(
          :length='5',
          :word='[ { letter: "б", match: "full" }, { letter: "а", match: "full" }, { letter: "т", match: "full" }, { letter: "у", match: "full" }, { letter: "т", match: "full" }, ]'
        )
        p Если слово полностью зеленое, значит вы угадали слово и победили в этом раунде!
        p Если же вам не удалось отгадать слово за 6 попыток, раунд считается проигранным.
        va-divider
        p По правилам русских кроссвордов, буква "Ё" заменяется на "Е" во всех словах.
      va-card-actions
        va-button(@click='isOpen = false') Понятно
  va-card-title {{ item.label }}
  WordCard(
    :length='5',
    :word='[ { letter: "щ", match: "letter" }, { letter: "е", match: "full" }, { letter: "г", match: "no" }, { letter: "о", match: "letter" }, { letter: "л", match: "full" }, ]'
  )
  va-card-content.whitespace-normal {{ item.content }}
  va-card-actions
    va-button(color='success', @click='$emit("start")') Начать игру
    va-button(color='warning', @click='isOpen = true') Как играть?
</template>

<script setup lang="ts">
defineProps<{
  item: {
    label: string
    content: string
  }
}>()

defineEmits<{
  (e: 'start')
}>()

const isOpen = ref(false)
</script>

<style scoped></style>
