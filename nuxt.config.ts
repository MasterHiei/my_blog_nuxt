import { Configuration } from '@nuxt/types';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import env from './server/utils/envalid';
import dateTimeFormats from './client/assets/locales/dateTimeFormats';

// Load environment variables from .env file
require('dotenv').config();

/** Seconds in a day */
const day = 60 * 60 * 24;

// Nuxt configuration options
const config: Configuration = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'masterhiei.com',
    titleTemplate: '%s - masterhiei.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Powered by Nuxt.js, Express and TypeScript.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+SC:300,400,500,700&amp;subset=chinese-simplified,japanese',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css',
      },
    ],
  },

  /*
   ** Nuxt loading component
   */
  loading: '@/components/ui/TheLoading.vue',

  /*
   ** Global CSS
   */
  css: ['~assets/style/stylus/app'],

  /**
   * Source directory
   */
  srcDir: 'client/',

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/aos', ssr: false },
    '~plugins/axios',
    '~plugins/vuetify',
    { src: '~plugins/vueLazyLoad', ssr: false },
  ],

  generate: {
    routes: ['/about', '/ja/about'],
  },

  /*
   ** Nuxt.js build modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    [
      '@nuxtjs/eslint-module',
      {
        cache: true,
      },
    ],
  ],

  /*
   ** Nuxt.js typescript settings
   */
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },

  serverMiddleware: [{ path: env.API_PREFIX, handler: '../server' }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/device',
    ['@nuxtjs/dotenv', { path: __dirname }],
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        vueI18n: {
          dateTimeFormats,
          fallbackLocale: 'zh',
        },
        vueI18nLoader: true,
        locales: [
          {
            code: 'zh',
            name: '简体中文',
            iso: 'zh-CN',
            file: 'zh_CN.ts',
          },
          {
            code: 'ja',
            name: '日本語',
            iso: 'ja-JP',
            file: 'ja.ts',
          },
        ],
        defaultLocale: 'zh',
        lazy: true,
        langDir: 'assets/locales/lang/',
        parsePages: false,
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true,
        },
      },
    ],
    [
      'vue-scrollto/nuxt',
      {
        duration: 1000,
        onStart: false,
        onDone: false,
        onCancel: false,
      },
    ],
  ],

  // Workbox options
  workbox: {
    runtimeCaching: [
      // Local API
      {
        urlPattern: `.*${env.API_PREFIX}/.*`,
        handler: 'staleWhileRevalidate',
        strategyOptions: {
          cacheName: 'local-api-cache',
          cacheExpiration: {
            maxAgeSeconds: 1 * day,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      // GitHub API
      {
        urlPattern: 'https://api.github.com/applications/.*',
        handler: 'networkOnly',
      },
      {
        urlPattern: 'https://api.github.com/repos/.*',
        handler: 'staleWhileRevalidate',
        strategyOptions: {
          cacheName: 'github-api-cache',
          cacheExpiration: {
            maxAgeSeconds: 1 * day,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      // Google fonts
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'google-fonts-cache',
          cacheExpiration: {
            maxAgeSeconds: 30 * day,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },

      // Font Awesome
      {
        urlPattern: 'https://use.fontawesome.com/.*',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'font-awesome-cache',
          cacheExpiration: {
            maxAgeSeconds: 30 * day,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },

  /*
   ** Build configuration
   */
  build: {
    plugins: [new VuetifyLoaderPlugin()],
    transpile: ['vuetify/lib'],
    loaders: {
      stylus: {
        import: [
          '~assets/style/stylus/variables',
          '~assets/style/stylus/mixins',
        ],
      },
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    analyze: env.isDev,

    /*
     ** You can extend webpack config here
     */
    extend(config): void {
      // Resolve file extensions
      if (config.resolve && config.resolve.extensions) {
        config.resolve.extensions.push('.ts');
      }
    },
  },
};

export default config;
