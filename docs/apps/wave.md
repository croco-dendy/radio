# 🌊 Wave Backend Server

The Wave backend is the core streaming server built with Bun and Hono, providing RESTful APIs, WebSocket support, and comprehensive streaming management.

## 🏗️ Architecture

### Core Components
- **Hono Framework**: Fast, lightweight web framework
- **WebSocket Server**: Real-time communication
- **Streaming Services**: Audio track and stream management
- **RTMP Integration**: Docker-based RTMP server management
- **Telegram Integration**: Stream to Telegram channels
- **PM2 Process Management**: Production-ready process handling

### Service Layer
```
src/
├── services/
│   ├── stream/
│   │   ├── streamService.ts        # Main stream orchestration
│   │   ├── telegramStreamService.ts # Telegram streaming
│   │   ├── rtmpService.ts          # RTMP server management
│   │   └── rtmpConfigService.ts    # RTMP configuration
│   ├── monitoring/
│   │   ├── monitoringService.ts    # System monitoring
│   │   └── types.ts               # Monitoring types
│   └── types/streaming.ts         # Shared type definitions
├── routes/
│   ├── stream.ts                  # Stream API endpoints
│   └── monitoring.ts              # Monitoring API endpoints
├── scripts/
│   └── telegramStreamDaemon.ts    # Telegram stream daemon
└── index.ts                       # Main server entry point
```

## 🚀 Features

### Stream Management
- **RTMP Server Control**: Start, stop, restart RTMP streaming server
- **Telegram Integration**: Stream to Telegram channels via PM2 daemon
- **Configuration Management**: Update RTMP and Telegram stream settings
- **Real-time Monitoring**: System health and service status monitoring

### Server Management
- **RTMP Server**: Docker-based RTMP server control
- **Telegram Streaming**: Stream to Telegram channels
- **Process Monitoring**: PM2-based process management
- **Health Checks**: Comprehensive health monitoring
- **Error Handling**: Robust error management and recovery

### API Capabilities
- **RESTful API**: Complete REST API for all operations
- **WebSocket Support**: Real-time updates and communication
- **CORS Enabled**: Cross-origin request support
- **Type Safety**: Full TypeScript coverage
- **Request Validation**: Input validation and sanitization

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
PORT=6970                    # HTTP server port
SOCKET_PORT=6971            # WebSocket server port
NODE_ENV=development        # Environment mode

# Optional: Custom paths
DATA_DIR=./data             # Data directory
LOG_DIR=./logs              # Log directory
```

### Data Storage
- **Audio Tracks**: `data/audio-tracks.json`
- **Streaming Config**: `data/streaming-config.json`
- **Telegram Config**: `data/telegram-config.json`

### Log Files
- **Server Logs**: `logs/wave.log`
- **Telegram Stream**: `logs/telegram-stream.log`
- **PM2 Logs**: Managed by PM2

## 📡 API Endpoints

### RTMP Server Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/stream/rtmp/start` | Start RTMP Docker container |
| `POST` | `/api/stream/rtmp/stop` | Stop RTMP server |
| `POST` | `/api/stream/rtmp/restart` | Restart RTMP server |
| `GET` | `/api/stream/rtmp/config` | Get RTMP configuration |
| `PUT` | `/api/stream/rtmp/config` | Update RTMP configuration |

### Telegram Integration
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/stream/telegram/start` | Start Telegram stream via PM2 |
| `POST` | `/api/stream/telegram/stop` | Stop Telegram stream |
| `POST` | `/api/stream/telegram/restart` | Restart Telegram stream |
| `GET` | `/api/stream/telegram/config` | Get Telegram config |
| `PUT` | `/api/stream/telegram/config` | Update Telegram config |

### Health & Monitoring
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |

### Service Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/monitoring/*` | Future monitoring endpoints |

## 🔄 WebSocket Events

### Client → Server
- **Connection**: Automatic connection on client connect
- **Authentication**: Optional authentication (future feature)

### Server → Client
- **Status Updates**: Real-time streaming status
- **Track Changes**: Now playing updates
- **Error Notifications**: Error and warning messages
- **System Events**: Server events and notifications

## 🛠️ Development

### Local Development
```bash
# Start development server
pnpm dev

# Start with hot reload
bun run --hot src/index.ts

# Check TypeScript types
pnpm check-types
```

### Scripts Available
```bash
# Development
pnpm dev                    # Start with hot reload
pnpm check-types           # TypeScript type checking

# RTMP Server
pnpm rtmp                  # Start RTMP server

# Telegram Streaming
pnpm telegram              # Start Telegram stream directly
pnpm telegram:start        # Start via PM2
pnpm telegram:stop         # Stop via PM2
pnpm telegram:restart      # Restart via PM2
pnpm telegram:status       # Check status
pnpm telegram:logs         # View logs

# PM2 Management
pnpm pm2:start             # Start all services
pnpm pm2:stop              # Stop all services
pnpm pm2:restart           # Restart all services
pnpm pm2:logs              # View all logs
```

## 🏭 Production Deployment

### PM2 Configuration
The `ecosystem.config.js` file defines two applications:

#### Wave Server
```javascript
{
  name: 'radio.wave',
  script: 'src/index.ts',
  interpreter: 'bun',
  instances: 1,
  env_production: { 
    PORT: 6970, 
    SOCKET_PORT: 6971 
  }
}
```

#### Telegram Stream
```javascript
{
  name: 'telegram-stream',
  script: 'src/scripts/telegramStreamProcess.ts',
  interpreter: 'bun',
  instances: 1,
  autorestart: false,
  max_memory_restart: '500M'
}
```

### Production Commands
```bash
# Start all services
pnpm pm2:start

# Check status
pm2 status

# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart services
pm2 restart all
```

## 🔧 Service Architecture

### StreamService
The main orchestrator that coordinates all streaming operations:
- **Service Coordination**: Manages RTMP and Telegram services
- **Configuration Management**: Handles stream configuration updates
- **Error Handling**: Centralized error management
- **Status Tracking**: Monitors service states

### TelegramStreamService
Handles Telegram streaming via PM2:
- **Process Management**: PM2-based process control
- **Configuration**: Telegram stream settings
- **Status Monitoring**: Real-time status tracking
- **Error Recovery**: Automatic error handling

### RtmpService
Manages Docker-based RTMP server:
- **Container Management**: Docker container control
- **Status Monitoring**: Container health checks
- **Port Management**: RTMP port configuration
- **Error Handling**: Container error management

### RtmpConfigService
Manages RTMP server configuration:
- **Configuration Storage**: JSON-based config storage
- **Validation**: Configuration validation
- **Updates**: Configuration update handling
- **Defaults**: Default configuration management

### MonitoringService
Provides comprehensive system monitoring:
- **System Health**: CPU, memory, uptime monitoring
- **Service Status**: RTMP and Telegram service monitoring
- **Log Management**: System and service log aggregation
- **Metrics Collection**: Performance metrics gathering

## 📊 Monitoring & Logging

### Health Checks
```bash
# Basic health check
curl http://localhost:6970/health

# Detailed status
curl http://localhost:6970/api/streaming/status
```

### Log Monitoring
```bash
# Server logs
tail -f logs/wave.log

# PM2 logs
pm2 logs radio.wave
pm2 logs telegram-stream

# Real-time monitoring
pm2 monit
```

### Performance Metrics
- **Memory Usage**: Monitored via PM2
- **CPU Usage**: Tracked in PM2 dashboard
- **Network I/O**: WebSocket and HTTP traffic
- **Error Rates**: Logged and monitored

## 🚨 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check port usage
sudo lsof -i :6970
sudo lsof -i :6971

# Kill conflicting processes
sudo kill -9 <PID>
```

#### PM2 Issues
```bash
# Reset PM2
pm2 kill
pm2 start ecosystem.config.js --env production

# Check PM2 logs
pm2 logs --err
```

#### Docker Issues
```bash
# Check Docker status
docker ps
docker logs <container-id>

# Restart RTMP server
pnpm rtmp
```

#### FFmpeg Issues
```bash
# Test FFmpeg
ffmpeg -version

# Check audio source
ffmpeg -i "https://your-source.com/audio.mp3" -f null -
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* pnpm dev

# Verbose PM2 logging
pm2 start ecosystem.config.js --env production --log-date-format="YYYY-MM-DD HH:mm:ss Z"
```

## 🔄 Data Flow

### Streaming Request Flow
1. **Client Request** → API endpoint
2. **Route Handler** → Validates request
3. **StreamingService** → Orchestrates operation
4. **Specific Service** → Executes operation (RTMP/Telegram)
5. **Response** → Returns status to client
6. **WebSocket** → Broadcasts update to connected clients

### Real-time Updates
1. **Service Change** → Detects status change
2. **WebSocket Broadcast** → Sends update to clients
3. **Client Update** → UI updates automatically
4. **Status Sync** → All clients stay synchronized

## 🎯 Performance Optimization

### Caching Strategy
- **In-memory Caching**: Frequently accessed data
- **File-based Storage**: Persistent configuration
- **PM2 Clustering**: Process-level optimization

### Resource Management
- **Memory Limits**: PM2 memory restart limits
- **Process Monitoring**: Automatic restart on failure
- **Connection Pooling**: Efficient database connections

### Scalability Considerations
- **Horizontal Scaling**: Multiple PM2 instances
- **Load Balancing**: Reverse proxy configuration
- **Database Optimization**: Efficient data storage

---

**Next**: [Admin Panel Documentation](admin.md) | [API Reference](../api/streaming.md)
