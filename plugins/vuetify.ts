import Vue from 'vue';
import LRU from 'lru-cache';
import Vuetify, { VuetifyOptions, VuetifyTheme } from 'vuetify';
import colors from 'vuetify/es5/util/colors';

// Theme
const theme: Partial<VuetifyTheme> = {
  primary: colors.grey.darken1,
  secondary: colors.grey.lighten1,
  accent: colors.deepOrange.lighten1,
};

// Options
const options: VuetifyOptions = {
  minifyTheme: (css): string => {
    return process.env.NODE_ENV === 'production'
      ? css.replace(/[\s|\r\n|\r|\n]/g, '')
      : css;
  },
  themeCache: new LRU({
    max: 10,
    maxAge: 1000 * 60 * 60,
  }),
  customProperties: true,
  cspNonce: 'nonce-Q1veajC7P6p',
};

// Use Vuetify
Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: theme,
  options: options,
});
