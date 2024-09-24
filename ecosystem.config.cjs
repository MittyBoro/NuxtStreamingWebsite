require('dotenv').config()

module.exports = {
  apps: [
    {
      name: 'Front:' + process.env.APP_PORT,
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      env: {
        PORT: process.env.APP_PORT,
      },
    },
  ],
}
