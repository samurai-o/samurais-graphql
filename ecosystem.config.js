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
  deploy: {
    production: {
      user: 'root',
      host: ['118.195.142.167'],
      ref: 'origin/release',
      repo: 'https://github.com/samurai-o/samurais-node.git',
      path: '/home/node',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'npm install && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
