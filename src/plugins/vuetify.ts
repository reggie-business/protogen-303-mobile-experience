import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'fieldLight',
    themes: {
      fieldLight: {
        dark: false,
        colors: {
          background: '#F7F8F8',
          surface: '#FFFFFF',
          'on-surface': '#16191C',
          primary: '#0E7C86',
          ok: '#1B8A5A',
          watch: '#E8A13C',
          down: '#D64545',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

export default vuetify
