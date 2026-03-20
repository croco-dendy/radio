# API Documentation

REST API reference for the Radio Streaming Platform.

## Base URLs

- **Development**: `http://localhost:6870`
- **WebSocket**: `ws://localhost:6871`

## Authentication

JWT-based authentication via session tokens. Login returns a token used in subsequent requests.

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | User registration |

## Collection API

### Albums

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/albums` | List albums (paginated, filterable) |
| `POST` | `/api/albums` | Create album |
| `PUT` | `/api/albums/:id` | Update album |
| `DELETE` | `/api/albums/:id` | Delete album |

### Audio Files

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/audio-files/upload` | Upload audio file |
| `GET` | `/api/audio-files/:id` | Get audio file info |
| `GET` | `/api/audio-files/:id/stream` | Stream audio file |
| `DELETE` | `/api/audio-files/:id` | Delete audio file |

### Collections (Playlists)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/collections` | List collections |
| `POST` | `/api/collections` | Create collection |
| `PUT` | `/api/collections/:id` | Update collection |
| `DELETE` | `/api/collections/:id` | Delete collection |

## User Management (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/accounts` | List users |
| `POST` | `/api/accounts` | Create user |
| `PUT` | `/api/accounts/:id` | Update user |
| `DELETE` | `/api/accounts/:id` | Delete user |

## Stream Control API (`/api/stream`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/telegram/start` | Start Telegram stream |
| `POST` | `/telegram/stop` | Stop Telegram stream |
| `POST` | `/telegram/restart` | Restart Telegram stream |
| `GET` | `/telegram/config` | Get Telegram configuration |
| `PUT` | `/telegram/config` | Update Telegram configuration |
| `POST` | `/rtmp/start` | Start RTMP server |
| `POST` | `/rtmp/stop` | Stop RTMP server |
| `POST` | `/rtmp/restart` | Restart RTMP server |
| `GET` | `/rtmp/config` | Get RTMP configuration |
| `PUT` | `/rtmp/config` | Update RTMP configuration |

## Monitoring API (`/api/monitoring`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get complete monitoring data |
| `GET` | `/health` | System health overview |
| `GET` | `/telegram` | Telegram service statistics |
| `GET` | `/rtmp` | RTMP service statistics |
| `GET` | `/metrics/:service` | Metrics for specific service |
| `GET` | `/logs` | System logs |
| `GET` | `/logs/:service` | Logs for specific service |

## WebSocket

Connect to `ws://localhost:6871` for real-time updates.

### Event Types

- `status_update` - Stream status changes
- `track_change` - Now playing updates
- `chat_message` - Chat messages
- `error` - Error notifications

### Example

```javascript
const ws = new WebSocket('ws://localhost:6871');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'status_update':
      break;
    case 'track_change':
      break;
    case 'chat_message':
      break;
  }
};
```

## Response Format

### Success

```json
{
  "success": true,
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated

```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "hasNext": true,
  "hasPrev": false
}
```

## Quick Test

```bash
curl http://localhost:6870/health
curl http://localhost:6870/api/monitoring/
curl http://localhost:6870/api/monitoring/health
```
