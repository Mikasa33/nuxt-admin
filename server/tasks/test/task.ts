export default defineTask({
  meta: {
    name: 'test:task',
    description: 'Test task',
  },
  run() {
    console.log('Running DB migration task...')
    return { result: 'Success' }
  },
})
