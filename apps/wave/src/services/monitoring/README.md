# Monitoring Service

A dedicated service for collecting and aggregating statistics from all radio streaming services.

## Overview

The MonitoringService provides a centralized way to collect statistics from:
- **Telegram streaming service**: PM2 process status, daemon health, FFmpeg status, stream health
- **RTMP server**: Docker container stats, RTMP statistics, active connections

## API Endpoints

All endpoints are available under `/api/monitoring`:

### GET `/api/monitoring/`
Get complete monitoring data for all services.

**Response:**
```json
{
  "success": true,
  "data": {
    "services": {
      "telegram": { /* TelegramServiceStats */ },
      "rtmp": { /* RtmpServiceStats */ }
    },
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 3600
  }
}
```

### GET `/api/monitoring/health`
Get system health overview.

**Response:**
```json
{
  "success": true,
  "data": {
    "telegram": { /* TelegramServiceStats */ },
    "rtmp": { /* RtmpServiceStats */ },
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET `/api/monitoring/telegram`
Get Telegram service statistics only.

**Response:**
```json
{
  "success": true,
  "data": {
    "isRunning": true,
    "pm2Status": {
      "pid": 12345,
      "status": "online",
      "cpu": 15.2,
      "memory": 125829120,
      "uptime": 1641981000000
    },
    "daemonStatus": {
      "status": "running",
      "pid": 12345,
      "ffmpegPid": 12346,
      "restartAttempts": 0,
      "lastUpdate": "2024-01-15T10:29:00.000Z",
      "streamHealth": {
        "isConnected": true,
        "lastConnectionTime": "2024-01-15T10:25:00.000Z",
        "totalFramesSent": 15420,
        "currentBitrate": 2500,
        "connectionErrors": 0,
        "lastHealthCheck": "2024-01-15T10:29:30.000Z"
      }
    },
    "ffmpegRunning": true,
    "lastHealthCheck": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET `/api/monitoring/rtmp`
Get RTMP service statistics only.

**Response:**
```json
{
  "success": true,
  "data": {
    "isRunning": true,
    "containerName": "rtmp-server",
    "status": "Up 2 hours",
    "stats": {
      "container": {
        "cpuPercent": 5.2,
        "memoryUsage": 134217728,
        "memoryLimit": 2147483648,
        "memoryPercent": 6.25,
        "networkIn": 1024000,
        "networkOut": 2048000
      },
      "rtmp": {
        "activePublishers": 1,
        "totalConnections": 5,
        "applications": [
          {
            "name": "live",
            "streams": [
              {
                "name": "test",
                "bandwidth": 2500000,
                "clients": 3
              }
            ]
          }
        ]
      }
    },
    "lastHealthCheck": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET `/api/monitoring/metrics/:service`
Get metrics for a specific service (telegram or rtmp).

**Parameters:**
- `service`: "telegram" or "rtmp"

**Response:** Same as individual service endpoints above.

## Data Collection

### Telegram Service Monitoring
- **PM2 Process**: Status, PID, CPU, memory usage, uptime
- **Daemon Status**: Process status, restart attempts, stream health
- **FFmpeg Process**: Running status via process grep
- **Stream Health**: Connection status, frames sent, bitrate, errors

### RTMP Service Monitoring  
- **Docker Container**: CPU, memory, network I/O statistics
- **RTMP Server**: Active publishers, connections, stream data
- **Applications**: Stream names, bandwidth, client counts

## Usage Examples

### Basic Health Check
```typescript
import { monitoringService } from '@/services/monitoring';

const health = await monitoringService.getSystemHealth();
console.log('System Health:', health);
```

### Get Telegram Stats
```typescript
const telegramStats = await monitoringService.getTelegramServiceStats();
if (telegramStats?.isRunning) {
  console.log('Telegram stream is running');
  console.log('Stream health:', telegramStats.daemonStatus?.streamHealth);
}
```

### Get RTMP Stats
```typescript
const rtmpStats = await monitoringService.getRtmpServiceStats();
if (rtmpStats?.isRunning) {
  console.log('RTMP server is running');
  console.log('Active publishers:', rtmpStats.stats?.rtmp?.activePublishers);
}
```

## Error Handling

All methods return `null` if the service is unavailable or data cannot be collected. The API endpoints return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad request (invalid service name)
- **500**: Internal server error

## Integration

The monitoring service is automatically integrated into the existing route structure and is available at `/api/monitoring` endpoints. It uses the same data sources as the existing services but provides a unified, read-only interface for statistics collection.

