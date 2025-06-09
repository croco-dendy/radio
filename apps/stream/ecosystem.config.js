module.exports = {
  apps: [
    {
      name: 'radio.core',
      script: 'src/index.ts',
      interpreter: 'bun',
      env_production: { PORT: 6970, SOCKET_PORT: 6971 },
    },
  ],
};
