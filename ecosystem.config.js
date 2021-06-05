module.exports = {
  apps: [
    {
      name: 'auth',
      namespace: 'samurai',
      script: 'dist/apps/auth/main.js',
      mode: 'cluster',
      instances: 2,
      autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: 'logs/pm2/auth.log',
      error_file: 'logs/pm2/error_auth.log',
      max_memory_restart: '1024M',
      env: {
        NODE_ENV: 'production',
      },
      env_dev: {
        NODE_ENV: 'development',
      },
    },
  ],
};
