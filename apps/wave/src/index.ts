import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { join } from 'node:path';
import { env } from '@/utils/env';
import {
  accountsRoutes,
  collectionsRoutes,
  audioFilesRoutes,
  albumsRoutes,
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
      'http://localhost:3030',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3030',
      'http://deimos:3001',
      'http://deimos:3030',
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

// Serve media files (vinyl audio) from MEDIA_ROOT_PATH at MEDIA_BASE_URL
app.get(`${env.mediaBaseUrl}/*`, async (c) => {
  const relativePath = c.req.path.replace(env.mediaBaseUrl, '');
  const filePath = join(env.mediaRootPath, relativePath);
  const file = Bun.file(filePath);

  if (!(await file.exists())) {
    return c.notFound();
  }

  return new Response(file, {
    headers: {
      'Content-Type': file.type || 'audio/mp4',
      'Content-Length': file.size.toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
});

app.route('/api/stream', streamRoutes);
app.route('/api/monitoring', monitoringRoutes);
app.route('/api/accounts', accountsRoutes);
app.route('/api/collections', collectionsRoutes);
app.route('/api/audio-files', audioFilesRoutes);
app.route('/api/albums', albumsRoutes);

Bun.serve({
  fetch: app.fetch,
  port: env.port,
});

startWsServer(env.socketPort);

console.log(`✅ Hono API on: http://localhost:${env.port}`);
console.log(`✅ Socket on: ws://localhost:${env.socketPort}`);
