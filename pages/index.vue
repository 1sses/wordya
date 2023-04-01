<template lang="pug">
main
  va-app-bar.px-10.mb-10
    h1.va-h1(style='color: white') Wordya
  section.flex.flex-col.gap-y-5(style='max-width: 600px; margin: 0 auto')
    WordCard(:length='5', word='hello')
    WordCard(:length='5', word='hello')
    WordCard(:length='5', word='hello')
    WordCard(:length='5', word='hello')
    WordCard(:length='5', word='hello')
    WordCard(:length='5', word='hello')
    LetterKeyboard
</template>

<script setup lang="ts"></script>

<style scoped></style>
