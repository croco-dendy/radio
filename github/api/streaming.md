# 📡 Streaming API Reference

Complete API reference for the Radio Streaming Platform backend services.

## 🌐 Base URL

- **Development**: `http://localhost:6970`
- **Production**: `https://wave.adoo.one`

## 🔐 Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🎵 Streaming Management

### Get Streaming Status
Get the current streaming status and system information.

```http
GET /api/streaming/status
```

**Response:**
```json
{
  "isActive": true,
  "mode": "radio",
  "currentTrack": {
    "id": "track-1",
    "url": "https://example.com/audio.mp3",
    "title": "Track Title",
    "duration": 180,
    "addedAt": "2024-01-01T00:00:00.000Z"
  },
  "uptime": 3600000,
  "listeners": 42,
  "error": null,
  "rtmpStatus": {
    "isRunning": true,
    "containerName": "rtmp-server",
    "status": "Up 2 hours",
    "error": null
  },
  "telegramStatus": {
    "isRunning": true,
    "success": true,
    "message": "Telegram stream is running"
  }
}
```

### Get Current Mode
Get the current streaming mode.

```http
GET /api/streaming/mode
```

**Response:**
```json
{
  "mode": "radio"
}
```

### Set Streaming Mode
Change the streaming mode between live and radio.

```http
POST /api/streaming/mode
Content-Type: application/json

{
  "mode": "live"
}
```

**Request Body:**
- `mode` (string, required): Either "live" or "radio"

**Response:**
```json
{
  "success": true,
  "mode": "live"
}
```

### Start Streaming
Start the streaming process.

```http
POST /api/streaming/start
```

**Response:**
```json
{
  "success": true,
  "message": "Started radio streaming"
}
```

### Stop Streaming
Stop the streaming process.

```http
POST /api/streaming/stop
```

**Response:**
```json
{
  "success": true,
  "message": "Streaming stopped successfully"
}
```

### Get Now Playing
Get information about the currently playing track.

```http
GET /api/streaming/now-playing
```

**Response:**
```json
{
  "track": {
    "id": "track-1",
    "url": "https://example.com/audio.mp3",
    "title": "Track Title",
    "duration": 180,
    "addedAt": "2024-01-01T00:00:00.000Z"
  },
  "position": 45.5,
  "duration": 180,
  "isPlaying": true
}
```

### Skip Track
Skip to the next track in the playlist (radio mode only).

```http
POST /api/streaming/skip
```

**Response:**
```json
{
  "success": true,
  "message": "Skipped to next track"
}
```

## 🎵 Track Management

### Get All Tracks
Get a list of all audio tracks.

```http
GET /api/streaming/tracks
```

**Response:**
```json
{
  "tracks": [
    {
      "id": "track-1",
      "url": "https://example.com/audio1.mp3",
      "title": "Track 1",
      "duration": 180,
      "addedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "track-2",
      "url": "https://example.com/audio2.mp3",
      "title": "Track 2",
      "duration": 240,
      "addedAt": "2024-01-01T01:00:00.000Z"
    }
  ]
}
```

### Add New Track
Add a new audio track to the playlist.

```http
POST /api/streaming/tracks
Content-Type: application/json

{
  "url": "https://example.com/new-track.mp3",
  "title": "New Track",
  "duration": 200
}
```

**Request Body:**
- `url` (string, required): Audio file URL
- `title` (string, required): Track title
- `duration` (number, optional): Track duration in seconds

**Response:**
```json
{
  "id": "track-3",
  "url": "https://example.com/new-track.mp3",
  "title": "New Track",
  "duration": 200,
  "addedAt": "2024-01-01T02:00:00.000Z"
}
```

### Update Track
Update an existing audio track.

```http
PUT /api/streaming/tracks/{id}
Content-Type: application/json

{
  "title": "Updated Track Title",
  "duration": 220
}
```

**Path Parameters:**
- `id` (string, required): Track ID

**Request Body:**
- `url` (string, optional): Audio file URL
- `title` (string, optional): Track title
- `duration` (number, optional): Track duration in seconds

**Response:**
```json
{
  "id": "track-3",
  "url": "https://example.com/new-track.mp3",
  "title": "Updated Track Title",
  "duration": 220,
  "addedAt": "2024-01-01T02:00:00.000Z"
}
```

### Delete Track
Delete an audio track from the playlist.

```http
DELETE /api/streaming/tracks/{id}
```

**Path Parameters:**
- `id` (string, required): Track ID

**Response:**
```json
{
  "success": true
}
```

## 📡 RTMP Server Management

### Get RTMP Server Status
Get the current status of the RTMP server.

```http
GET /api/streaming/rtmp/status
```

**Response:**
```json
{
  "success": true,
  "isRunning": true,
  "containerName": "rtmp-server",
  "status": "Up 2 hours",
  "error": null
}
```

### Start RTMP Server
Start the RTMP server.

```http
POST /api/streaming/rtmp/start
```

**Response:**
```json
{
  "success": true,
  "message": "RTMP server started successfully"
}
```

### Stop RTMP Server
Stop the RTMP server.

```http
POST /api/streaming/rtmp/stop
```

**Response:**
```json
{
  "success": true,
  "message": "RTMP server stopped successfully"
}
```

### Restart RTMP Server
Restart the RTMP server.

```http
POST /api/streaming/rtmp/restart
```

**Response:**
```json
{
  "success": true,
  "message": "RTMP server restarted successfully"
}
```

## 📱 Telegram Integration

### Get Telegram Stream Status
Get the current status of the Telegram stream.

```http
GET /api/streaming/telegram/status
```

**Response:**
```json
{
  "isRunning": true,
  "success": true,
  "message": "Telegram stream is running via PM2",
  "config": {
    "rtmpUrl": "rtmps://dc4-1.rtmp.t.me/s/",
    "streamKey": "your-stream-key",
    "inputUrl": "rtmp://localhost:1935/live/test",
    "quality": "medium",
    "audioBitrate": "128k"
  }
}
```

### Start Telegram Stream
Start streaming to Telegram.

```http
POST /api/streaming/telegram/start
```

**Response:**
```json
{
  "success": true,
  "message": "Telegram stream started successfully via PM2"
}
```

### Stop Telegram Stream
Stop streaming to Telegram.

```http
POST /api/streaming/telegram/stop
```

**Response:**
```json
{
  "success": true,
  "message": "Telegram stream stopped successfully via PM2"
}
```

### Get Telegram Configuration
Get the current Telegram stream configuration.

```http
GET /api/streaming/telegram/config
```

**Response:**
```json
{
  "success": true,
  "config": {
    "rtmpUrl": "rtmps://dc4-1.rtmp.t.me/s/",
    "streamKey": "your-stream-key",
    "inputUrl": "rtmp://localhost:1935/live/test",
    "quality": "medium",
    "audioBitrate": "128k"
  }
}
```

### Update Telegram Configuration
Update the Telegram stream configuration.

```http
PUT /api/streaming/telegram/config
Content-Type: application/json

{
  "quality": "high",
  "audioBitrate": "192k"
}
```

**Request Body:**
- `rtmpUrl` (string, optional): Telegram RTMP URL
- `streamKey` (string, optional): Telegram stream key
- `inputUrl` (string, optional): Input stream URL
- `quality` (string, optional): Stream quality ("low", "medium", "high")
- `audioBitrate` (string, optional): Audio bitrate

**Response:**
```json
{
  "success": true,
  "message": "Telegram configuration updated successfully",
  "config": {
    "rtmpUrl": "rtmps://dc4-1.rtmp.t.me/s/",
    "streamKey": "your-stream-key",
    "inputUrl": "rtmp://localhost:1935/live/test",
    "quality": "high",
    "audioBitrate": "192k"
  }
}
```

## 🏥 Health & Monitoring

### Health Check
Check the health status of the API server.

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🔌 WebSocket API

### Connection
Connect to the WebSocket server for real-time updates.

```javascript
const ws = new WebSocket('ws://localhost:6971');

ws.onopen = () => {
  console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

### Message Types

#### Status Update
```json
{
  "type": "status_update",
  "data": {
    "isActive": true,
    "mode": "radio",
    "listeners": 42
  }
}
```

#### Track Change
```json
{
  "type": "track_change",
  "data": {
    "track": {
      "id": "track-1",
      "title": "New Track",
      "artist": "Artist Name"
    }
  }
}
```

#### Error Notification
```json
{
  "type": "error",
  "data": {
    "message": "Stream connection lost",
    "code": "STREAM_ERROR"
  }
}
```

## 🚨 Error Codes

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

### Error Types
- `INVALID_MODE` - Invalid streaming mode
- `TRACK_NOT_FOUND` - Track not found
- `STREAM_ERROR` - Streaming error
- `RTMP_ERROR` - RTMP server error
- `TELEGRAM_ERROR` - Telegram stream error

## 📝 Examples

### Complete Streaming Workflow

1. **Check Status**
```bash
curl http://localhost:6970/api/streaming/status
```

2. **Set Mode to Radio**
```bash
curl -X POST http://localhost:6970/api/streaming/mode \
  -H "Content-Type: application/json" \
  -d '{"mode": "radio"}'
```

3. **Add a Track**
```bash
curl -X POST http://localhost:6970/api/streaming/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/track.mp3",
    "title": "My Track",
    "duration": 180
  }'
```

4. **Start Streaming**
```bash
curl -X POST http://localhost:6970/api/streaming/start
```

5. **Check Now Playing**
```bash
curl http://localhost:6970/api/streaming/now-playing
```

### JavaScript Client Example

```javascript
class StreamingAPI {
  constructor(baseURL = 'http://localhost:6970') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getStatus() {
    return this.request('/api/streaming/status');
  }

  async setMode(mode) {
    return this.request('/api/streaming/mode', {
      method: 'POST',
      body: JSON.stringify({ mode }),
    });
  }

  async startStreaming() {
    return this.request('/api/streaming/start', {
      method: 'POST',
    });
  }

  async addTrack(track) {
    return this.request('/api/streaming/tracks', {
      method: 'POST',
      body: JSON.stringify(track),
    });
  }
}

// Usage
const api = new StreamingAPI();

// Get status
const status = await api.getStatus();
console.log('Status:', status);

// Start streaming
await api.startStreaming();
console.log('Streaming started');
```

## 🔧 Rate Limiting

Currently, there are no rate limits implemented. All endpoints are accessible without restrictions.

## 📊 Monitoring

### Metrics
- **Response Time**: Average response time per endpoint
- **Error Rate**: Error rate per endpoint
- **Request Count**: Total requests per endpoint
- **Active Connections**: Number of active WebSocket connections

### Logging
All API requests are logged with:
- Timestamp
- HTTP method and endpoint
- Response status
- Response time
- Error details (if any)

---

**Next**: [WebSocket API](websocket.md) | [Status Endpoints](status.md)
