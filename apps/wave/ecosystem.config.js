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
      script: 'src/scripts/telegramStreamProcess.ts',
      interpreter: 'bun',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      },
      // PM2 specific settings
      kill_timeout: 5000,
      wait_ready: false,
      listen_timeout: 3000,
      // Log management
      log_file: './logs/telegram-stream.log',
      out_file: './logs/telegram-stream-out.log',
      error_file: './logs/telegram-stream-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Process management - don't auto-restart since this starts FFmpeg and exits
      min_uptime: '1s',
      max_restarts: 0,
      restart_delay: 0
    }
  ],
};
