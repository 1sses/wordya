<template lang="pug">
NuxtLayout
  NuxtPage
</template>

<style lang="scss">
.va-card__title {
  font-size: 16px !important;
}

// TRANSITIONS

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1px);
}
</style>
