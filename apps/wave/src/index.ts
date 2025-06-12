import { Hono } from 'hono';
import { env } from '@/utils/env';
import { startWsServer } from './ws/server';

const app = new Hono();

Bun.serve({
  fetch: app.fetch,
  port: env.port,
});

startWsServer(env.socketPort);

console.log(`✅ Hono API on: http://localhost:${env.port}`);
console.log(`✅ Socket on: ws://localhost:${env.socketPort}`);
