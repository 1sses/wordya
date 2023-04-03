// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, user-scalable=no',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo-fill.svg' }],
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
    dirs: ['lib/**'],
  },
})
