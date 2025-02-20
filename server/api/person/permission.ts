export default defineEventHandler(async (event) => {
  const { secure } = await getUserSession(event)

  return {
    routes: secure?.routes,
    permissions: secure?.permissions,
  }
})
