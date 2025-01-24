<script lang="ts" setup>
import type { ConfigProviderProps as NConfigProviderProps } from 'naive-ui'
import { dateZhCN, zhCN } from 'naive-ui'

interface ConfigProviderProps extends NConfigProviderProps {
  globalStyle?: boolean
}

const { dateLocale = dateZhCN, inlineThemeDisabled = true, locale = zhCN } = defineProps<ConfigProviderProps>()
</script>

<template>
  <NConfigProvider
    :date-locale
    :locale
    :inline-theme-disabled
    :theme
    :theme-overrides
  >
    <NDialogProvider>
      <NLoadingBarProvider>
        <NMessageProvider>
          <NModalProvider>
            <NNotificationProvider>
              <NGlobalStyle v-if="globalStyle" />
              <slot />
            </NNotificationProvider>
          </NModalProvider>
        </NMessageProvider>
      </NLoadingBarProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
