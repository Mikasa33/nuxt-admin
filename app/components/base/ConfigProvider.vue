<script lang="ts" setup>
import type { ConfigProviderProps as NConfigProviderProps } from 'naive-ui'
import { dateZhCN, zhCN } from 'naive-ui'

interface ConfigProviderProps extends NConfigProviderProps {
  globalStyle?: boolean
}

const { dateLocale = dateZhCN, inlineThemeDisabled = true, locale = zhCN } = defineProps<ConfigProviderProps>()

// 挂载 naive 组件的方法至 window，以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$modal = useModal()
  window.$notification = useNotification()
}

const ProviderContent = defineComponent({
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  },
})
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
              <ProviderContent />
              <slot />
            </NNotificationProvider>
          </NModalProvider>
        </NMessageProvider>
      </NLoadingBarProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>
