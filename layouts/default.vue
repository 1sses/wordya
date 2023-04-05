<template lang="pug">
.select-none
  nav
    va-navbar(color='primary', shape, fixed, style='height: 120px')
      template(#left)
        va-navbar-item
          img(src='/logo.svg', width='80px', height='80px')
          h2.va-h2 Wordya
      //template(#right)
      //  va-navbar-item Dashboard
      //  va-navbar-item Reports
      //  va-navbar-item Users
      //  va-navbar-item
      //    va-icon.material-icons(size='large') account_circle
  main.h-screen(style='padding-top: 120px')
    slot
</template>

<script setup lang="ts"></script>

<style scoped></style>
