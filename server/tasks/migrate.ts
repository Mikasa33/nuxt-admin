export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },
  run() {
    return { result: 'Success' }
  },
})
