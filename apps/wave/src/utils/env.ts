import 'dotenv/config';

export const env = {
  port: Number.parseInt(process.env.PORT || '8888'),
  socketPort: Number.parseInt(process.env.SOCKET_PORT || '8889'),
};
