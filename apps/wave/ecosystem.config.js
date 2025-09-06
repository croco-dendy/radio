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
      name: 'radio.telegram',
      script: 'bun',
      args: 'scripts/telegramStreamDaemon.ts',
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
      kill_timeout: 10000,
      wait_ready: false,
      listen_timeout: 15000,
      log_file: './logs/telegram-stream.log',
      out_file: './logs/telegram-stream-out.log',
      error_file: './logs/telegram-stream-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 5000,
      stop_exit_codes: [0]
    }
  ],
};
