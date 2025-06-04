module.exports = {
  apps: [
    {
      name: 'rtmp',
      script: './scripts/start-rtmp.sh',
      watch: false,
    },
    {
      name: 'stream',
      script: 'src/index.ts',
      interpreter: 'bun',
      exec_interpreter: 'bun',
      exec_mode: 'fork',
      env: {
        DOTENV_CONFIG_PATH: '.env',
      },
      node_args: '-r dotenv/config',
    },
  ],
};
