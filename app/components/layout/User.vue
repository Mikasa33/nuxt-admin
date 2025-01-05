<script lang="tsx" setup>
import type { DropdownOption } from 'naive-ui'
import { NuxtLink } from '#components'

const dialog = useDialog()

const { data: userData } = await useFetch('/api/person')

const options = [
  {
    icon: renderIcon('i-icon-park-outline-user'),
    label: '个人中心',
    key: '/person',
  },
  {
    type: 'divider',
  },
  {
    icon: renderIcon('i-icon-park-outline-logout'),
    label: '退出登录',
    key: 'logout',
  },
]

function renderLabel(option: DropdownOption) {
  if ((option.key as string)?.startsWith('/')) {
    return (
      <NuxtLink to={option.key as string}>
        {option.label}
      </NuxtLink>
    )
  }
  return <span>{option.label}</span>
}

function onSelect(key: string) {
  switch (key) {
    case 'logout': {
      dialog.warning({
        autoFocus: false,
        title: '提示',
        content: '是否确认退出登录？',
        positiveText: '确认',
        negativeText: '取消',
        onPositiveClick: () => {
          navigateTo('/login')
        },
      })
    }
  }
}
</script>

<template>
  <NDropdown
    :options
    :render-label
    @select="onSelect"
  >
    <NButton
      quaternary
      size="large"
      class="!px-12px"
    >
      <div class="flex-y-center gap-x-8px">
        <NAvatar
          round
          :size="32"
          :src="userData?.avatar"
        >
          <template
            v-if="!userData?.avatar"
            #default
          >
            {{ userData?.nickname.slice(0, 1) }}
          </template>
        </NAvatar>
        <span>{{ userData?.nickname }}</span>
      </div>
    </NButton>
  </NDropdown>
</template>
