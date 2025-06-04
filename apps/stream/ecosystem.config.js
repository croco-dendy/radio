module.exports = {
  apps: [
    {
      name: 'test',
      script: 'src/index.ts',
      interpreter: 'bun',
      env_production: { PORT: 8888, SOCKET_PORT: 8889 },
    },
  ],
};
