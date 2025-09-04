import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from '@/utils/env';
import { startWsServer } from './ws/server';
import { streamingRoutes } from './routes/stream';

const app = new Hono();

// Enable CORS for all routes
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
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mount streaming routes
app.route('/api/streaming', streamingRoutes);

Bun.serve({
  fetch: app.fetch,
  port: env.port,
});

startWsServer(env.socketPort);

console.log(`✅ Hono API on: http://localhost:${env.port}`);
console.log(`✅ Socket on: ws://localhost:${env.socketPort}`);
