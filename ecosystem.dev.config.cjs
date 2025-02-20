module.exports = {
  apps: [
    {
      name: 'nuxt-admin',
      port: '3000',
      script: '.output/server/index.mjs',
      instances: 'max', // 根据 CPU 核心数启动最大实例数
      exec_mode: 'cluster', // 使用集群模式
      watch: false, // 不监视文件变化
      max_memory_restart: '1G', // 超过 1G 内存就重启
      env: {
        NUXT_SESSION_PASSWORD: '',
        NUXT_MYSQL_HOST: '127.0.0.1',
        NUXT_MYSQL_PORT: '3306',
        NUXT_MYSQL_USER: 'root',
        NUXT_MYSQL_PASSWORD: '',
        NUXT_MYSQL_DATABASE: 'nuxt_admin_dev',
      },
    },
  ],
}
