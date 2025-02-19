<script lang="tsx" setup>
import type { DropdownOption } from 'naive-ui'
import { NuxtLink } from '#components'

const dialog = useCustomDialog()
const message = useMessage()
const { loggedIn, user, clear } = useUserSession()

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
      const d = dialog.create({
        content: '是否确认退出登录？',
        onPositiveClick: async () => {
          await clear()
          d.loading = true
          if (!loggedIn.value) {
            message.success('退出登录成功')
            navigateTo('/login')
          }
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
      <NEl class="flex-y-center gap-x-8px">
        <NAvatar
          round
          :size="28"
          :src="user?.avatar"
          class="bg-[var(--primary-color)]"
        >
          <template
            v-if="!user?.avatar"
            #default
          >
            {{ (user?.nickname ?? user?.username)?.slice(0, 1) }}
          </template>
        </NAvatar>
        <span>
          {{ user?.nickname ?? user?.username }}
        </span>
      </NEl>
    </NButton>
  </NDropdown>
</template>
