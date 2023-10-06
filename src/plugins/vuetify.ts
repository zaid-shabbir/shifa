// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/styles/main.scss';
import '@/styles/settings.scss';

// Composables
import { createVuetify } from 'vuetify';

import { aliases } from '@/icon-sets';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#5F63D7',
          secondary: '#111256',
          disabled: '#9FA1B8',
          indigo: '#6064D8',
          whisper: '#F9F8FC',
          almond: '#DCE2F1',
          water: '#EFF1F8',
          light: 'F5F7FA',
          pink: '#FFDFDF',
          error: '#FF5252',
          success: '#01B574',

          // TODO: refactor duplicated colors and naming later
          // login
          'white-lilac-22': '#F9F9FC',
          'link-water': '#DCE2F1',
        },
      },
    },
  },
  icons: {
    aliases,
  },
});
