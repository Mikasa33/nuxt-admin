// https://nuxt.com/docs/api/configuration/nuxt-config/
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '@unocss/reset/tailwind-compat.css',
  ],
  // https://devtools.nuxt.com/
  devtools: {
    enabled: true,
  },
  // https://eslint.nuxt.com/
  eslint: {
    config: {
      standalone: false,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  // https://github.com/nuxt/icon/
  icon: {
    serverBundle: 'remote',
  },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    'nuxt-lodash',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          'storeToRefs',
        ],
      },
    ],
  ],
})
