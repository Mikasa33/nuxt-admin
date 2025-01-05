export default defineEventHandler(async () => {
  return [
    {
      id: 1,
      parentId: null,
      name: 'Home',
      path: '/',
      icon: 'i-icon-park-outline-home',
    },
    {
      id: 2,
      parentId: null,
      name: 'System',
      path: '/system',
      icon: 'i-icon-park-outline-setting-one',
    },
    {
      id: 3,
      parentId: 2,
      name: 'User',
      path: '/system/user',
      icon: 'i-icon-park-outline-peoples',
    },
    {
      id: 4,
      parentId: 2,
      name: 'Role',
      path: '/system/role',
      icon: 'i-icon-park-outline-permissions',
    },
    {
      id: 5,
      parentId: 2,
      name: 'Menu',
      path: '/system/menu',
      icon: 'i-icon-park-outline-mindmap-list',
    },
  ]
})
