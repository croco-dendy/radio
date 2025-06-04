import 'dotenv/config';
import { Hono } from 'hono';
import { env } from '@/utils/env';
import { startWsServer } from './ws';

const app = new Hono();

Bun.serve({
  fetch: app.fetch,
  port: env.port,
});

startWsServer();

console.log(`✅ Hono API on: http://localhost:${env.port}`);
