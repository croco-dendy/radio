module.exports = {
  apps: [
    {
      name: 'radio.stream',
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
