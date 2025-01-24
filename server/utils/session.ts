export async function isAdmin() {
  const event = useEvent()
  const { user } = await getUserSession(event)
  return user?.username === 'admin'
}
