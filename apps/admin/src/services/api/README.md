# Admin API Services

This directory contains all API services and React Query hooks for the admin application.

## Structure

```
api/
├── clients/                    # HTTP clients and query client
│   ├── http-client.ts         # Axios HTTP client configuration
│   ├── query-client.ts        # React Query client configuration
│   └── index.ts               # Exports
├── hooks/                     # React Query hooks
│   ├── use-monitoring.ts      # Monitoring data hooks
│   ├── use-stream-control.ts  # Stream control hooks
│   └── index.ts               # Exports
├── monitoring-api.ts          # Monitoring API methods
├── stream-control-api.ts      # Stream control API methods
└── index.ts                   # Main exports
```

## Environment Variables

Set up your environment variables in `.env`:

```bash
# Wave API Configuration
VITE_WAVE_API_URL=http://localhost:3000
```

## Usage Examples

### Monitoring Data (Single Request)

```tsx
import { useMonitoringData } from '@/services/api';

const MonitoringDashboard = () => {
  // Single request every 10 seconds for all monitoring data
  const { data: monitoring, isLoading } = useMonitoringData();
  
  // Extract what you need from the monitoring data
  const telegramStats = monitoring?.services.telegram;
  const rtmpStats = monitoring?.services.rtmp;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>System Status</h1>
      <p>Telegram: {telegramStats?.isRunning ? 'Running' : 'Stopped'}</p>
      <p>RTMP: {rtmpStats?.isRunning ? 'Running' : 'Stopped'}</p>
      <p>System Uptime: {monitoring?.uptime}s</p>
      <p>Last Updated: {monitoring?.timestamp}</p>
    </div>
  );
};
```

### Stream Control

```tsx
import { 
  useStartTelegramStream, 
  useStopTelegramStream,
  useRestartTelegramStream,
  useStartRtmpServer,
  useRestartRtmpServer 
} from '@/services/api';

const StreamControls = () => {
  const startTelegram = useStartTelegramStream();
  const stopTelegram = useStopTelegramStream();
  const restartTelegram = useRestartTelegramStream();
  const startRtmp = useStartRtmpServer();
  const restartRtmp = useRestartRtmpServer();

  return (
    <div>
      <button 
        onClick={() => startTelegram.mutate()}
        disabled={startTelegram.isPending}
      >
        Start Telegram Stream
      </button>
      
      <button 
        onClick={() => restartTelegram.mutate()}
        disabled={restartTelegram.isPending}
      >
        Restart Telegram Stream
      </button>
      
      <button 
        onClick={() => startRtmp.mutate()}
        disabled={startRtmp.isPending}
      >
        Start RTMP Server
      </button>
    </div>
  );
};
```

### Configuration Management

```tsx
import { 
  useMonitoringData,
  useTelegramConfig, 
  useUpdateTelegramConfig 
} from '@/services/api';

const TelegramConfig = () => {
  const { data: monitoring } = useMonitoringData();
  const { data: config } = useTelegramConfig();
  const updateConfig = useUpdateTelegramConfig();
  
  const telegramStats = monitoring?.services.telegram;

  const handleUpdateQuality = (quality: 'low' | 'medium' | 'high') => {
    updateConfig.mutate({ quality });
  };

  return (
    <div>
      <p>Service Status: {telegramStats?.isRunning ? 'Running' : 'Stopped'}</p>
      <p>Current Quality: {config?.quality}</p>
      <button onClick={() => handleUpdateQuality('high')}>
        Set High Quality
      </button>
    </div>
  );
};
```

## Available Hooks

### Monitoring Hook
- `useMonitoringData()` - Complete monitoring data with 10s refresh (single request)
  - Access `data.services.telegram` for Telegram stats
  - Access `data.services.rtmp` for RTMP stats  
  - Access `data.timestamp` and `data.uptime` for system info


### Stream Control Hooks
- `useTelegramConfig()` - Get Telegram configuration
- `useStartTelegramStream()` - Start Telegram stream
- `useStopTelegramStream()` - Stop Telegram stream
- `useRestartTelegramStream()` - Restart Telegram stream (NEW!)
- `useUpdateTelegramConfig()` - Update Telegram configuration
- `useStartRtmpServer()` - Start RTMP server
- `useStopRtmpServer()` - Stop RTMP server
- `useRestartRtmpServer()` - Restart RTMP server

## API Endpoints

### Monitoring Endpoints
- `GET /api/monitoring` - Complete monitoring data (single endpoint)

### Stream Control Endpoints
- `POST /api/stream/telegram/start` - Start Telegram stream
- `POST /api/stream/telegram/stop` - Stop Telegram stream
- `POST /api/stream/telegram/restart` - Restart Telegram stream (NEW!)
- `GET /api/stream/telegram/config` - Get Telegram config
- `PUT /api/stream/telegram/config` - Update Telegram config
- `POST /api/stream/rtmp/start` - Start RTMP server
- `POST /api/stream/rtmp/stop` - Stop RTMP server
- `POST /api/stream/rtmp/restart` - Restart RTMP server

## Types

All types are shared from `@radio/types` package and include:

- `MonitoringData` - Complete monitoring data structure
- `SystemHealth` - System health overview
- `TelegramServiceStats` - Telegram service statistics
- `RtmpServiceStats` - RTMP service statistics
- `TelegramStreamConfig` - Telegram stream configuration
- `StreamControlResponse` - Stream control operation responses
- `ApiResponse<T>` - Generic API response wrapper

## Error Handling

All hooks automatically handle errors and provide error states. The HTTP client includes automatic error logging and response interceptors.

```tsx
const { data, error, isLoading } = useSystemHealth();

if (error) {
  return <div>Error: {error.message}</div>;
}
```
