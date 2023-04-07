module.exports = {
  apps: [
    {
      name: 'wordya',
      port: '4001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
