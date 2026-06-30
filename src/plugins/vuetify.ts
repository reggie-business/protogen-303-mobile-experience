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
          background: '#F8FAF8',
          surface: '#FFFFFF',
          'on-surface': '#14342B',
          primary: '#4C934C',
          secondary: '#53A548',
          ok: '#53A548',
          watch: '#FFC300',
          down: '#D64545',
          ink: '#14342B',
          appbar: '#14342B',
          'on-appbar': '#FFFFFF',
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
