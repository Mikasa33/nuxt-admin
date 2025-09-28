export function usePermission() {
  const { permissionList } = storeToRefs(usePermissionStore())

  /**
   * 判断当前用户是否有某项权限
   */
  function hasPermission(permission: string): boolean {
    return permissionList.value.includes(permission)
  }

  /**
   * 判断当前用户是否拥有多个权限中的至少一个
   */
  function hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(permission => permissionList.value.includes(permission))
  }

  return {
    hasPermission,
    hasAnyPermission,
  }
}
