// https://nuxt.com/docs/api/configuration/nuxt-config/
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade-slide',
      mode: 'out-in',
    },
  },
  compatibilityDate: '2024-11-01',
  css: [
    '@unocss/reset/tailwind-compat.css',
    '@/assets/style/index.css',
  ],
  // https://color-mode.nuxtjs.org/
  colorMode: {
    classSuffix: '',
  },
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
    'nuxt-auth-utils',
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
    'pinia-plugin-persistedstate/nuxt',
  ],
  nitro: {
    database: {
      default: {
        connector: 'sqlite',
        options: { name: 'db' },
      },
    },
    experimental: {
      asyncContext: true,
      database: true,
      tasks: true,
    },
    scheduledTasks: {
      // 每月 1 日 0 点清空系统日志
      '0 0 1 * *': ['system:log:clear'],
    },
    storage: {
      file: {
        driver: 'fs-lite',
        base: './storage/file',
      },
    },
  },
  runtimeConfig: {
    rootUsername: 'root',
    defaultDepartmentId: 1,
    mysql: {
      host: '',
      port: 3306,
      user: '',
      password: '',
      database: '',
    },
  },
  ssr: false,
})
