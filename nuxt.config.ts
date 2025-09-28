import process from 'node:process'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade-slide',
      mode: 'out-in',
    },
  },
  compatibilityDate: '2025-07-15',
  css: [
    '@unocss/reset/tailwind-compat.css',
    '~/assets/style/index.css',
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
  // https://github.com/nuxt/icon/
  icon: {
    serverBundle: 'local',
  },
  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxtjs-naive-ui',
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
        base: './.storage/file',
      },
      redis: {
        driver: 'redis',
        host: 'localhost',
        username: null,
        password: null,
        port: 6379,
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
    session: {
      maxAge: 60 * 60 * 2, // 2h
      password: String(process.env.NUXT_SESSION_PASSWORD),
    },
  },
  ssr: false,
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useDialogReactiveList',
              'useLoadingBar',
              'useMessage',
              'useModal',
              'useNotification',
              'useThemeVars',
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
})
