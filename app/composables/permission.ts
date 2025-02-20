export function usePermission() {
  const { permissions } = storeToRefs(usePermissionStore())

  /**
   * 判断当前用户是否有某项权限
   */
  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission)
  }

  /**
   * 判断当前用户是否拥有多个权限中的至少一个
   */
  function hasAnyPermission(_permissions: string[]): boolean {
    return _permissions.some(permission => permissions.value.includes(permission))
  }

  return {
    hasPermission,
    hasAnyPermission,
  }
}
