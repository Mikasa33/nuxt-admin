export async function verifyPermission(slug: string) {
  const { user } = await getUserSession(useEvent())

  if (await isAdmin()) {
    return
  }

  if (!user?.permissions?.includes(slug)) {
    throw createError({ statusCode: 403, message: '无权限访问' })
  }
}
