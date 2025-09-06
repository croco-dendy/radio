import { Hono } from 'hono';
import { streamService } from '../services/stream/streamService';

const streamRoutes = new Hono();

streamRoutes.post('/telegram/start', async (c) => {
  try {
    const result = await streamService.startTelegramStream();
    return c.json(result);
  } catch (error) {
    console.error('Error starting Telegram stream:', error);
    return c.json({ error: 'Failed to start Telegram stream' }, 500);
  }
});

streamRoutes.post('/telegram/stop', async (c) => {
  try {
    const result = await streamService.stopTelegramStream();
    return c.json(result);
  } catch (error) {
    console.error('Error stopping Telegram stream:', error);
    return c.json({ error: 'Failed to stop Telegram stream' }, 500);
  }
});

streamRoutes.get('/telegram/config', async (c) => {
  try {
    const config = await streamService.getTelegramConfig();
    return c.json({ success: true, config });
  } catch (error) {
    console.error('Error getting Telegram config:', error);
    return c.json({ error: 'Failed to get Telegram config' }, 500);
  }
});

streamRoutes.put('/telegram/config', async (c) => {
  try {
    const updates = await c.req.json();
    const result = await streamService.updateTelegramConfig(updates);
    return c.json(result);
  } catch (error) {
    console.error('Error updating Telegram config:', error);
    return c.json({ error: 'Failed to update Telegram config' }, 500);
  }
});

streamRoutes.post('/rtmp/start', async (c) => {
  try {
    const result = await streamService.startRtmpServer();
    return c.json(result);
  } catch (error) {
    console.error('Error starting RTMP server:', error);
    return c.json({ error: 'Failed to start RTMP server' }, 500);
  }
});

streamRoutes.post('/rtmp/stop', async (c) => {
  try {
    const result = await streamService.stopRtmpServer();
    return c.json(result);
  } catch (error) {
    console.error('Error stopping RTMP server:', error);
    return c.json({ error: 'Failed to stop RTMP server' }, 500);
  }
});

streamRoutes.post('/rtmp/restart', async (c) => {
  try {
    const result = await streamService.restartRtmpServer();
    return c.json(result);
  } catch (error) {
    console.error('Error restarting RTMP server:', error);
    return c.json({ error: 'Failed to restart RTMP server' }, 500);
  }
});

export { streamRoutes };
