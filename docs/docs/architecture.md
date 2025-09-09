# 🏗️ Architecture Overview

This document provides a comprehensive overview of the Radio Streaming Platform architecture, including system design, component relationships, and data flow.

## 🎯 System Overview

The Radio Streaming Platform is a distributed system designed for high-performance audio streaming with real-time management capabilities. It consists of three main applications working together to provide a complete streaming solution.

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Admin Panel   │    │   Wave Backend  │
│   (React)       │    │   (React)       │    │   (Bun + Hono)  │
│   Port: 3030    │    │   Port: 3001    │    │   Port: 6970    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   RTMP Server   │
                    │   (Docker)      │
                    │   Port: 1935    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Telegram      │
                    │   Streaming     │
                    │   (FFmpeg)      │
                    └─────────────────┘
```

## 🏗️ Component Architecture

### 1. Wave Backend (Core Server)

The Wave backend is the central orchestrator that manages all streaming operations.

#### Core Services
```
Wave Backend
├── StreamingService (Orchestrator)
│   ├── AudioTrackService (Track Management)
│   ├── TelegramStreamService (Telegram Integration)
│   └── RtmpService (RTMP Management)
├── API Routes (Hono Framework)
│   ├── Streaming Endpoints
│   ├── Track Management
│   └── Health Checks
├── WebSocket Server (Real-time Updates)
└── Process Management (PM2 Integration)
```

#### Key Responsibilities
- **Stream Orchestration**: Coordinates all streaming operations
- **API Management**: Provides RESTful API endpoints
- **Real-time Communication**: WebSocket server for live updates
- **Process Management**: Manages external processes (RTMP, Telegram)
- **Data Persistence**: Manages configuration and track data
- **Error Handling**: Centralized error management and recovery

### 2. Admin Panel (Management Interface)

The Admin Panel provides a comprehensive web interface for managing the streaming platform.

#### Component Structure
```
Admin Panel
├── React Query (State Management)
│   ├── Streaming Queries
│   ├── Track Management
│   └── Real-time Updates
├── UI Components
│   ├── Stream Controls
│   ├── Track Management
│   └── Status Displays
├── API Integration
│   ├── Streaming API Client
│   └── Error Handling
└── Real-time Updates (5-second refresh)
```

#### Key Features
- **Real-time Monitoring**: Live status updates every 5 seconds
- **Stream Management**: Complete control over streaming operations
- **Track Management**: Add, edit, delete audio tracks
- **Server Management**: RTMP and Telegram server controls
- **Error Handling**: Comprehensive error reporting and recovery

### 3. Frontend (Public Interface)

The Frontend provides the public-facing radio player interface.

#### Component Structure
```
Frontend
├── Audio Player (HLS.js)
│   ├── Playback Controls
│   ├── Volume Management
│   └── Progress Tracking
├── Real-time Updates
│   ├── Now Playing Info
│   ├── Stream Status
│   └── Listener Count
├── Responsive Design
│   ├── Mobile Support
│   ├── PWA Features
│   └── Offline Support
└── API Integration
    ├── Status Updates
    └── Stream Information
```

## 🔄 Data Flow Architecture

### 1. Streaming Data Flow

```
Audio Source → RTMP Server → HLS Stream → Frontend Player
     ↓              ↓            ↓
Telegram Stream → Telegram → Telegram Channel
     ↓
Wave Backend → Admin Panel (Management)
```

#### Detailed Flow
1. **Audio Input**: External audio source (file, stream, microphone)
2. **RTMP Processing**: Docker-based RTMP server processes audio
3. **HLS Generation**: RTMP server generates HLS segments
4. **Stream Distribution**: 
   - HLS stream to player apps
   - Telegram stream to Telegram channels
5. **Management**: Wave backend coordinates all operations
6. **Monitoring**: Admin panel provides real-time management

### 2. API Data Flow

```
Client Request → Wave Backend → Service Layer → External Services
     ↓              ↓              ↓
Response ← JSON Response ← Service Response ← Process Result
```

#### Request Processing
1. **Client Request**: HTTP request to API endpoint
2. **Route Handler**: Hono framework routes request
3. **Service Layer**: Appropriate service processes request
4. **External Integration**: Service interacts with external systems
5. **Response**: JSON response returned to client
6. **Real-time Update**: WebSocket broadcasts update (if applicable)

### 3. Real-time Updates Flow

```
System Change → Wave Backend → WebSocket Server → Connected Clients
     ↓              ↓              ↓
Status Update → Broadcast → Client Update → UI Refresh
```

#### Update Process
1. **System Change**: Streaming status, track change, error occurs
2. **Backend Detection**: Wave backend detects change
3. **WebSocket Broadcast**: Update sent to all connected clients
4. **Client Processing**: Clients receive and process update
5. **UI Update**: User interface updates automatically

## 🗄️ Data Architecture

### 1. Data Storage

#### File-based Storage
```
data/
├── audio-tracks.json      # Audio track database
├── streaming-config.json  # Streaming configuration
└── telegram-config.json   # Telegram configuration
```

#### In-memory Storage
- **Current Status**: Real-time streaming status
- **Active Connections**: WebSocket connections
- **Process States**: RTMP and Telegram process states
- **Cache**: Frequently accessed data

### 2. Data Models

#### AudioTrack
```typescript
interface AudioTrack {
  id: string;           // Unique identifier
  url: string;          // Audio file URL
  title: string;        // Track title
  duration?: number;    // Duration in seconds
  addedAt: string;      // ISO timestamp
}
```

#### StreamingStatus
```typescript
interface StreamingStatus {
  isActive: boolean;    // Stream active status
  mode: 'live' | 'radio'; // Streaming mode
  currentTrack?: AudioTrack; // Currently playing
  uptime?: number;      // Stream uptime in ms
  listeners: number;    // Current listener count
  error?: string;       // Error message if any
  rtmpStatus?: RtmpServerStatus;
  telegramStatus?: TelegramStreamStatus;
}
```

#### Configuration
```typescript
interface TelegramStreamConfig {
  rtmpUrl: string;      // Telegram RTMP URL
  streamKey: string;    // Telegram stream key
  inputUrl: string;     // Input stream URL
}
```

## 🔧 Service Architecture

### 1. Service Layer Pattern

Each major functionality is encapsulated in a dedicated service:

#### StreamingService (Orchestrator)
- **Purpose**: Main coordinator for all streaming operations
- **Responsibilities**: Mode management, stream lifecycle, error handling
- **Dependencies**: All other services

#### AudioTrackService
- **Purpose**: Audio track and playlist management
- **Responsibilities**: CRUD operations, playlist logic, now playing
- **Storage**: JSON file-based storage

#### TelegramStreamService
- **Purpose**: Telegram streaming integration
- **Responsibilities**: Process management, configuration, status monitoring
- **Integration**: PM2 process management

#### RtmpService
- **Purpose**: RTMP server management
- **Responsibilities**: Docker container control, status monitoring
- **Integration**: Docker API

### 2. Service Communication

```
StreamingService
    ├── AudioTrackService (Track operations)
    ├── TelegramStreamService (Telegram streaming)
    └── RtmpService (RTMP management)
```

#### Communication Pattern
- **Synchronous**: Direct method calls for immediate operations
- **Asynchronous**: Promise-based operations for external integrations
- **Event-driven**: WebSocket broadcasts for real-time updates

## 🌐 Network Architecture

### 1. Port Allocation

| Service | Port | Protocol | Purpose |
|---------|------|----------|---------|
| Wave API | 6970 | HTTP | REST API server |
| WebSocket | 6971 | WebSocket | Real-time updates |
| Admin Panel | 3001 | HTTP | Admin interface |
| Frontend | 5173 | HTTP | Public interface (dev) |
| RTMP Server | 1935 | RTMP | Audio input from OBS |
| HLS Output | 8069 | HTTP | HLS stream output |

### 2. Service Dependencies

```
Docker (RTMP Server)
    ↓
Wave Backend (API + WebSocket)
    ↓
┌─────────────────┬─────────────────┐
│  Admin Panel    │  Telegram       │
│  (Port 3001)    │  Daemon (PM2)   │
└─────────────────┴─────────────────┘
    ↓                    ↓
Frontend (Port 5173)  Telegram Stream
```

### 3. Critical Dependencies
- **FFmpeg**: Required for Telegram streaming (must be in PATH)
- **Docker**: Required for RTMP server container
- **PM2**: Required for Telegram daemon process management

### 2. CORS Configuration

```typescript
// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',    // Development player
  'http://localhost:3001',    // Admin panel
  'http://127.0.0.1:3001',    // Local admin
  'http://deimos:3001',       // Local network
  'https://stream.adoo.one',  // Production player
  'https://wave.adoo.one',    // Production backend
];
```

### 3. Security Considerations

- **CORS**: Configured for specific origins
- **Input Validation**: All inputs validated and sanitized
- **Error Handling**: Safe error messages without sensitive data
- **Process Isolation**: External processes run in containers
- **Resource Limits**: Memory and CPU limits for processes

## 🚀 Deployment Architecture

### 1. Development Environment

```
Local Machine
├── Node.js + Bun (Wave Backend)
├── React Dev Server (Admin Panel)
├── Vite Dev Server (Frontend)
├── Docker (RTMP Server)
└── PM2 (Process Management)
```

### 2. Production Environment

```
Production Server
├── PM2 Cluster (Wave Backend)
├── Nginx (Reverse Proxy)
├── Docker (RTMP Server)
├── SSL/TLS (HTTPS)
└── Monitoring (Logs, Metrics)
```

### 3. Process Management

#### PM2 Configuration
```javascript
// Wave Backend Process
{
  name: 'radio.wave',
  script: 'src/index.ts',
  interpreter: 'bun',
  instances: 1,
  env_production: { PORT: 6970, SOCKET_PORT: 6971 }
}

// Telegram Stream Process
{
  name: 'telegram-stream',
  script: 'src/scripts/telegramStreamProcess.ts',
  interpreter: 'bun',
  instances: 1,
  autorestart: false,
  max_memory_restart: '500M'
}
```

## 📊 Monitoring & Observability

### 1. Health Checks

- **API Health**: `/health` endpoint
- **Stream Status**: `/api/streaming/status`
- **RTMP Status**: `/api/streaming/rtmp/status`
- **Telegram Status**: `/api/streaming/telegram/status`

### 2. Logging Strategy

#### Log Levels
- **Error**: System errors and failures
- **Warn**: Warning conditions
- **Info**: General information
- **Debug**: Detailed debugging information

#### Log Destinations
- **Console**: Development logging
- **Files**: Production log files
- **PM2**: Process management logs
- **Docker**: Container logs

### 3. Metrics Collection

- **Response Times**: API endpoint performance
- **Error Rates**: Error frequency per endpoint
- **Resource Usage**: CPU, memory, network
- **Stream Metrics**: Listener count, uptime, quality

## 🔄 Scalability Considerations

### 1. Horizontal Scaling

- **Load Balancing**: Multiple Wave backend instances
- **Database Scaling**: External database for track storage
- **CDN Integration**: Content delivery for audio files
- **Microservices**: Split services into separate applications

### 2. Performance Optimization

- **Caching**: Redis for frequently accessed data
- **Connection Pooling**: Database connection optimization
- **Compression**: Response compression
- **CDN**: Static asset delivery

### 3. High Availability

- **Process Monitoring**: PM2 automatic restarts
- **Health Checks**: Automated health monitoring
- **Backup Strategy**: Configuration and data backup
- **Disaster Recovery**: Recovery procedures

## 🎯 Future Architecture Evolution

### 1. Planned Improvements

- **Microservices**: Split into smaller, focused services
- **Event Sourcing**: Event-driven architecture
- **CQRS**: Command Query Responsibility Segregation
- **Message Queues**: Asynchronous processing

### 2. Technology Upgrades

- **Database**: PostgreSQL for persistent storage
- **Cache**: Redis for caching layer
- **Message Queue**: RabbitMQ or Apache Kafka
- **Monitoring**: Prometheus and Grafana

### 3. Cloud Integration

- **Container Orchestration**: Kubernetes deployment
- **Cloud Storage**: S3-compatible storage
- **CDN**: Global content delivery
- **Auto-scaling**: Dynamic resource allocation

---

**Next**: [Data Flow Documentation](data-flow.md) | [API Reference](../api/streaming.md)
