import 'dotenv/config';

export const env = {
  port: Number.parseInt(process.env.PORT || '8888'),
};
