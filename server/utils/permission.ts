// 验证权限
export async function verifyPermission(slug: string) {
  const { user, secure } = await getUserSession(useEvent())

  // 超级管理员默认所有权限
  if (isRoot(user?.username ?? '')) {
    return
  }

  if (!secure?.permissions?.includes(slug)) {
    throw createError({ statusCode: 403, message: '无权限访问' })
  }
}
