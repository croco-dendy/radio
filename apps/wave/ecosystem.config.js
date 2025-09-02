module.exports = {
  apps: [
    {
      name: 'radio.wave',
      script: 'src/index.ts',
      interpreter: 'bun',
      instances: 1,
      env_production: { PORT: 6970, SOCKET_PORT: 6971 },
    },
    {
      name: 'telegram-stream',
      script: './scripts/telegram-stream.sh',
      interpreter: 'bash',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      },
      // PM2 specific settings for shell scripts
      kill_timeout: 5000,
      wait_ready: false,
      listen_timeout: 3000,
      // Log management
      log_file: './logs/telegram-stream.log',
      out_file: './logs/telegram-stream-out.log',
      error_file: './logs/telegram-stream-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Process management
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ],
};
