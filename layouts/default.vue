<template lang="pug">
.select-none
  nav
    va-navbar(color='primary', shape, fixed, style='height: 120px; z-index: 5')
      template(#left)
        va-navbar-item
          va-image(src='/logo.svg', style='width: 80px; height: 80px', lazy)
          h2.va-h2 Wordya
      //template(#right)
      //  va-navbar-item
      //    va-icon.material-icons(size='large') account_circle
  main.h-screen(style='padding-top: 120px')
    slot
</template>

<script setup lang="ts"></script>

<style scoped></style>
