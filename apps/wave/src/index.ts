import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from '@/utils/env';
import {
  accountsRoutes,
  collectionsRoutes,
  audioFilesRoutes,
  monitoringRoutes,
  streamRoutes,
} from '@/api';
import { startWsServer } from './ws/server';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      'http://deimos:3001',
      'https://stream.adoo.one',
      'https://wave.adoo.one',
      'https://pan.adoo.one',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.route('/api/stream', streamRoutes);
app.route('/api/monitoring', monitoringRoutes);
app.route('/api/accounts', accountsRoutes);
app.route('/api/collections', collectionsRoutes);
app.route('/api/audio-files', audioFilesRoutes);

Bun.serve({
  fetch: app.fetch,
  port: env.port,
});

startWsServer(env.socketPort);

console.log(`✅ Hono API on: http://localhost:${env.port}`);
console.log(`✅ Socket on: ws://localhost:${env.socketPort}`);
