// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
      title: 'Wordya',
    },
  },
  modules: ['@vuestic/nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
  vuestic: {
    config: {
      // Config here
    },
  },
  components: {
    global: true,
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  imports: {
    dirs: [],
  },
})
