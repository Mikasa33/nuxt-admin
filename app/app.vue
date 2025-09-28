<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { createHoverColor, createPressedColor } from 'naive-ui/es/_utils/color'

const isDark = useDark()

const theme = computed(() => isDark.value ? darkTheme : null)

const colorOverrides = computed(() => {
  return isDark.value
    ? {
        primaryColor: '#00dc82',
        primaryColorHover: createHoverColor('#00dc82'),
        primaryColorPressed: createPressedColor('#00dc82'),
        successColor: '#00dc82',
        successColorHover: createHoverColor('#00dc82'),
        successColorPressed: createPressedColor('#00dc82'),
        infoColor: '#51a2ff',
        infoColorHover: createHoverColor('#51a2ff'),
        infoColorPressed: createPressedColor('#51a2ff'),
        warningColor: '#fdc700',
        warningColorHover: createHoverColor('#fdc700'),
        warningColorPressed: createPressedColor('#fdc700'),
        errorColor: '#ff6467',
        errorColorHover: createHoverColor('#ff6467'),
        errorColorPressed: createPressedColor('#ff6467'),
      }
    : {
        primaryColor: '#00c16a',
        primaryColorHover: createHoverColor('#00c16a'),
        primaryColorPressed: createPressedColor('#00c16a'),
        successColor: '#00c16a',
        successColorHover: createHoverColor('#00c16a'),
        successColorPressed: createPressedColor('#00c16a'),
        infoColor: '#2b7fff',
        infoColorHover: createHoverColor('#2b7fff'),
        infoColorPressed: createPressedColor('#2b7fff'),
        warningColor: '#f0b100',
        warningColorHover: createHoverColor('#f0b100'),
        warningColorPressed: createPressedColor('#f0b100'),
        errorColor: '#fb2c36',
        errorColorHover: createHoverColor('#fb2c36'),
        errorColorPressed: createPressedColor('#fb2c36'),
      }
})

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  return {
    common: {
      borderRadius: '8px',
      ...colorOverrides.value,
    },
    Card: {
      borderRadius: '12px',
    },
    Checkbox: {
      borderRadius: '4px',
    },
    Dialog: {
      borderRadius: '12px',
    },
    Drawer: {
      borderRadius: '12px',
    },
    Tag: {
      borderRadius: '8px',
      closeBorderRadius: '4px',
    },
    Tree: {
      nodeBorderRadius: '6px',
    },
  }
})
</script>

<template>
  <BaseConfigProvider
    :theme
    :theme-overrides
  >
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </BaseConfigProvider>
</template>
