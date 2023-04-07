module.exports = {
  apps: [
    {
      name: 'wordya',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
