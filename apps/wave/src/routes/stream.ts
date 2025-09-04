import { Hono } from 'hono';
import { streamingService } from '../services/streamingService';

const app = new Hono();

// Get current streaming status
app.get('/status', async (c) => {
  try {
    const status = await streamingService.getStatus();
    return c.json(status);
  } catch (error) {
    console.error('Error getting streaming status:', error);
    return c.json({ error: 'Failed to get streaming status' }, 500);
  }
});

// Get current streaming mode
app.get('/mode', async (c) => {
  try {
    const mode = await streamingService.getCurrentMode();
    return c.json({ mode });
  } catch (error) {
    console.error('Error getting streaming mode:', error);
    return c.json({ error: 'Failed to get streaming mode' }, 500);
  }
});

// Set streaming mode
app.post('/mode', async (c) => {
  try {
    const { mode } = await c.req.json();

    if (!mode || !['live', 'radio'].includes(mode)) {
      return c.json({ error: 'Invalid mode. Must be "live" or "radio"' }, 400);
    }

    const result = await streamingService.setMode(mode);
    return c.json(result);
  } catch (error) {
    console.error('Error setting streaming mode:', error);
    return c.json({ error: 'Failed to set streaming mode' }, 500);
  }
});

// Get available audio tracks
app.get('/tracks', async (c) => {
  try {
    const tracks = await streamingService.getAudioTracks();
    return c.json({ tracks });
  } catch (error) {
    console.error('Error getting audio tracks:', error);
    return c.json({ error: 'Failed to get audio tracks' }, 500);
  }
});

// Add new audio track
app.post('/tracks', async (c) => {
  try {
    const { url, title, duration } = await c.req.json();

    if (!url || !title) {
      return c.json({ error: 'URL and title are required' }, 400);
    }

    const track = await streamingService.addAudioTrack({
      url,
      title,
      duration,
    });
    return c.json(track);
  } catch (error) {
    console.error('Error adding audio track:', error);
    return c.json({ error: 'Failed to add audio track' }, 500);
  }
});

// Update audio track
app.put('/tracks/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();

    const track = await streamingService.updateAudioTrack(id, updates);
    return c.json(track);
  } catch (error) {
    console.error('Error updating audio track:', error);
    return c.json({ error: 'Failed to update audio track' }, 500);
  }
});

// Delete audio track
app.delete('/tracks/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await streamingService.deleteAudioTrack(id);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting audio track:', error);
    return c.json({ error: 'Failed to delete audio track' }, 500);
  }
});

// Start streaming
app.post('/start', async (c) => {
  try {
    const result = await streamingService.startStreaming();
    return c.json(result);
  } catch (error) {
    console.error('Error starting streaming:', error);
    return c.json({ error: 'Failed to start streaming' }, 500);
  }
});

// Stop streaming
app.post('/stop', async (c) => {
  try {
    const result = await streamingService.stopStreaming();
    return c.json(result);
  } catch (error) {
    console.error('Error stopping streaming:', error);
    return c.json({ error: 'Failed to stop streaming' }, 500);
  }
});

// Get current playing track (for radio mode)
app.get('/now-playing', async (c) => {
  try {
    const nowPlaying = await streamingService.getNowPlaying();
    return c.json(nowPlaying);
  } catch (error) {
    console.error('Error getting now playing:', error);
    return c.json({ error: 'Failed to get now playing' }, 500);
  }
});

// Skip to next track (for radio mode)
app.post('/skip', async (c) => {
  try {
    const result = await streamingService.skipToNext();
    return c.json(result);
  } catch (error) {
    console.error('Error skipping track:', error);
    return c.json({ error: 'Failed to skip track' }, 500);
  }
});

// Start Telegram stream
app.post('/telegram/start', async (c) => {
  try {
    const result = await streamingService.startTelegramStream();
    return c.json(result);
  } catch (error) {
    console.error('Error starting Telegram stream:', error);
    return c.json({ error: 'Failed to start Telegram stream' }, 500);
  }
});

// Stop Telegram stream
app.post('/telegram/stop', async (c) => {
  try {
    const result = await streamingService.stopTelegramStream();
    return c.json(result);
  } catch (error) {
    console.error('Error stopping Telegram stream:', error);
    return c.json({ error: 'Failed to stop Telegram stream' }, 500);
  }
});

// Get Telegram stream status
app.get('/telegram/status', async (c) => {
  try {
    const result = await streamingService.getTelegramStreamStatus();
    return c.json(result);
  } catch (error) {
    console.error('Error getting Telegram stream status:', error);
    return c.json({ error: 'Failed to get Telegram stream status' }, 500);
  }
});

// Get Telegram stream configuration
app.get('/telegram/config', async (c) => {
  try {
    const config = await streamingService.getTelegramConfig();
    return c.json({ success: true, config });
  } catch (error) {
    console.error('Error getting Telegram config:', error);
    return c.json({ error: 'Failed to get Telegram config' }, 500);
  }
});

// Update Telegram stream configuration
app.put('/telegram/config', async (c) => {
  try {
    const updates = await c.req.json();
    const result = await streamingService.updateTelegramConfig(updates);
    return c.json(result);
  } catch (error) {
    console.error('Error updating Telegram config:', error);
    return c.json({ error: 'Failed to update Telegram config' }, 500);
  }
});

// RTMP Server Management
// Get RTMP server status
app.get('/rtmp/status', async (c) => {
  try {
    const status = await streamingService.getRtmpServerStatus();
    return c.json({ success: true, ...status });
  } catch (error) {
    console.error('Error getting RTMP server status:', error);
    return c.json({ error: 'Failed to get RTMP server status' }, 500);
  }
});

// Start RTMP server
app.post('/rtmp/start', async (c) => {
  try {
    const result = await streamingService.startRtmpServer();
    return c.json(result);
  } catch (error) {
    console.error('Error starting RTMP server:', error);
    return c.json({ error: 'Failed to start RTMP server' }, 500);
  }
});

// Stop RTMP server
app.post('/rtmp/stop', async (c) => {
  try {
    const result = await streamingService.stopRtmpServer();
    return c.json(result);
  } catch (error) {
    console.error('Error stopping RTMP server:', error);
    return c.json({ error: 'Failed to stop RTMP server' }, 500);
  }
});

// Restart RTMP server
app.post('/rtmp/restart', async (c) => {
  try {
    const result = await streamingService.restartRtmpServer();
    return c.json(result);
  } catch (error) {
    console.error('Error restarting RTMP server:', error);
    return c.json({ error: 'Failed to restart RTMP server' }, 500);
  }
});

export { app as streamingRoutes };
