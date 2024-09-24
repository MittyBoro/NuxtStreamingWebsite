import { resolve } from 'path'

const swrFactor = process.env.NODE_ENV === 'development' ? 0 : 1

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page' },
  },

  css: ['~/assets/styles/main.scss'],

  colorMode: {
    classSuffix: '',
    preference: 'dark', // default value of $colorMode.preference
    disableTransition: true,
  },

  components: [
    { path: '~/components/_App/', prefix: 'App' },
    { path: '~/components/_Base/', prefix: '' },
    '~/components',
  ],

  fonts: {
    defaults: {
      weights: [400, 600, 800],
      styles: ['normal'],
      subsets: ['cyrillic'],
    },
  },

  gtag: {
    id: process.env.GTAG_ID || '',
    initMode: 'manual',
    loadingStrategy: 'async',
  },

  hooks: {
    'pages:extend'(pages) {
      pages.push({
        path: '/password-reset/:id',
        file: resolve(__dirname, 'pages/index.vue'),
      })
    },
  },

  image: {
    domains: ['s2.example.com'],
    screens: {
      xs: 320,
      sm: 450,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1460,
      '2xl': 1600,
    },
  },

  modules: [
    '@nuxt/fonts', // https://github.com/nuxt/fonts
    '@nuxt/image', // https://image.nuxt.com/get-started/installation
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxtjs/sitemap', // https://sitemap.nuxtjs.org
    'nuxt-auth-sanctum', // https://manchenkoff.gitbook.io/nuxt-auth-sanctum
    'nuxt-gtag', // https://nuxt.com/modules/gtag
    'nuxt-icon', // https://nuxt.com/modules/icon
    'nuxt-purgecss', // https://nuxt.com/modules/purgecss
    'nuxt-schema-org', // https://nuxtseo.com/schema-org
  ],

  sitemap: {
    sitemaps: true,
    sitemapName: 'sitemap.xml',
    defaultSitemapsChunkSize: 3000,
    cacheMaxAgeSeconds: 7200,
    xsl: false,
    credits: false,
    excludeAppSources: true,
    experimentalWarmUp: false,
    urls: async () => {
      // -_-
      const data = await fetch(
        process.env.BACKEND_SERVER_URL + `/api/urls_asdf3q4fGFbfrj3fmasff23`,
        {
          headers: {
            'X-Api-Key': 'asdf3q4fGFbfrj3fmasff23',
          },
        },
      )
      return data.json()
    },
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      autoprefixer: {},
    },
  },

  purgecss: {
    enabled: true, // Always enable purgecss
    safelist: [/^pswp/, /^error-/, /^noUi/, /^router-/, /^prose/],
  },

  runtimeConfig: {
    public: {
      siteName: process.env.SITE_NAME,
      url: process.env.NUXT_PUBLIC_SITE_URL, // Nuxt app
      backendServerUrl: process.env.BACKEND_SERVER_URL + '/api/v1',
      nuxtIconApiUrl: process.env.ICON_API_URL,
      pusher: {
        key: process.env.PUSHER_APP_KEY,
        host: process.env.PUSHER_HOST,
        port: process.env.PUSHER_PORT,
        encrypted: process.env.PUSHER_ENCRYPTED,
        cluster: process.env.PUSHER_APP_CLUSTER,
      },
      yandexMetrikaId: process.env.YANDEX_METRIKA_ID,
    },
  },

  sanctum: {
    baseUrl: process.env.BACKEND_URL + '/api/v1', // Laravel API
    origin: process.env.NUXT_PUBLIC_SITE_URL,
    logLevel: process.env.NODE_ENV === 'development' ? 3 : 0,
    redirect: {
      onLogin: false,
      onLogout: false,
      onAuthOnly: '/',
    },
    endpoints: {
      csrf: '/../../sanctum/csrf-cookie',
      login: '/../auth/login',
      logout: '/../auth/logout',
      user: '/users/me',
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },

  schemaOrg: {
    defaults: false,
  },

  ssr: true,

  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/lark/_core.scss" as *;',
        },
      },
    },
  },

  routeRules: {
    '/': {
      swr: 60 * 5 * swrFactor,
      sitemap: { changefreq: 'daily', priority: 0.9 },
    },
    '/videos/**': { swr: 60 * 5 * swrFactor },
    '/categories': { swr: 60 * 30 * swrFactor },
    '/categories/**': { swr: 60 * 10 * swrFactor },
    '/albums': { swr: 60 * 10 * swrFactor },
    '/albums/**': { swr: 60 * 10 * swrFactor },
    '/studios': { swr: 60 * 30 * swrFactor },
    '/studios/**': { swr: 60 * 10 * swrFactor },
    '/actors': { swr: 60 * 30 * swrFactor },
    '/actors/**': { swr: 60 * 10 * swrFactor },
  },

  experimental: {
    payloadExtraction: true,
  },

  nitro: {
    compressPublicAssets: true,
  },

  compatibilityDate: '2024-07-10',
})
