import { defineVuesticConfig, createIconsConfig } from 'vuestic-ui'

export default defineVuesticConfig({
  colors: {
    variables: {
      purple: '#673AB7',
    },
  },
  icons: createIconsConfig({
    fonts: [
      {
        name: 'fa-{name}',
        resolve: ({ name }) => ({
          class: `fas fa-${name}`,
        }),
      },
    ],
  }),
})
