# 🎵 Radio Streaming Platform

A complete streaming solution for radio stations with live and playlist-based streaming, featuring a modern admin panel and real-time management capabilities.

## 🚀 Overview

This is a monorepo containing a full-featured radio streaming platform with:

- **🔴 Live Streaming**: Real-time audio streaming from external sources
- **📻 Radio Mode**: Playlist-based streaming with track management
- **🎛️ Admin Panel**: Complete web-based control interface
- **📱 Frontend**: Public-facing radio player interface
- **🔧 Backend API**: RESTful API with WebSocket support
- **📡 Telegram Integration**: Stream to Telegram channels
- **🖥️ RTMP Server**: Docker-based streaming infrastructure

## 📁 Project Structure

```
radio/
├── apps/
│   ├── wave/          # Backend streaming server (Bun + Hono)
│   ├── admin/         # Admin panel (React + TypeScript)
│   └── player/        # Public player (React + Vite)
├── packages/
│   └── types/         # Shared TypeScript types
├── docs/              # Documentation (this folder)
│   ├── docs/          # Technical documentation
│   ├── apps/          # App-specific documentation
│   ├── setup/         # Setup and deployment guides
│   └── api/           # API documentation
└── scripts/           # Utility scripts
```

## 🎯 Key Features

### Streaming Capabilities
- **RTMP Server Management**: Start, stop, and restart RTMP streaming server
- **Telegram Integration**: Stream to Telegram channels via PM2 daemon
- **Configuration Management**: Update RTMP and Telegram stream settings
- **Real-time Monitoring**: System health and service status monitoring
- **Docker Integration**: Container-based RTMP server management

### Admin Panel
- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Real-time Updates**: Live status monitoring with WebSocket support
- **Stream Control Interface**: Complete streaming management with tabs
  - **Monitoring Tab**: Real-time service status and system health
  - **Configuration Tab**: Service configuration management
  - **Logs Tab**: System and service logs
- **Service Management**: 
  - RTMP server start/stop/restart
  - Telegram streaming with daemon control
  - Configuration updates for both services
- **Error Handling**: Comprehensive error reporting and recovery

### Technical Stack
- **Backend**: Bun runtime with Hono framework
- **Frontend**: React 18 with Vite build system
- **State Management**: React Query for server state, Zustand for client state
- **Styling**: Tailwind CSS with custom Ukrainian-themed design system
- **Type Safety**: Full TypeScript coverage with shared types package
- **Process Management**: PM2 for production deployment
- **Real-time**: WebSocket connections for live updates

## 🚀 Quick Start

### Prerequisites
- Node.js 22.15.0+
- Bun 1.2.9+
- pnpm 10.8.0+ (package manager)
- Docker (for RTMP server)
- PM2 (for production deployment)
- FFmpeg (for Telegram streaming)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd radio

# Install dependencies
pnpm install

# Start all services in development
pnpm dev
```

### Individual Services
```bash
# Backend API server
pnpm wave:dev

# Admin panel
pnpm admin:dev

# Public player
pnpm player:dev
```

## 📚 Documentation

### Setup & Deployment
- [📋 Complete Setup Guide](setup/README.md)
- [🐳 Docker Deployment](setup/README.md#docker-setup)
- [☁️ Production Deployment](setup/README.md#production-setup)
- [🔧 Environment Configuration](setup/environment.md)

### Applications
- [🌊 Wave Backend](apps/wave.md)
- [🎛️ Admin Panel](apps/admin.md)
- [🎵 Player](apps/player.md)

### API Reference
- [📡 Streaming API](api/streaming.md)
- [🔌 WebSocket API](api/streaming.md#websocket-events)
- [📊 Status Endpoints](api/streaming.md#monitoring-endpoints)

### Technical Documentation
- [🏗️ Architecture Overview](docs/architecture.md)
- [🔄 Data Flow](docs/data-flow.md)
- [📡 Streaming Setup Guide](docs/streaming-setup.md)
- [🎨 Design System](apps/admin.md#design-system)
- [🧪 Testing](apps/admin.md#testing)

## 🎛️ Usage

### Admin Panel Access
Navigate to `http://localhost:3001/stream-control` to access the stream control interface.

### API Endpoints
All streaming operations are available via REST API at `http://localhost:6970/api/stream/`:

#### Stream Control API (`/api/stream`)
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

#### Monitoring API (`/api/monitoring`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get complete monitoring data |
| `GET` | `/health` | Get system health overview |
| `GET` | `/telegram` | Get Telegram service statistics |
| `GET` | `/rtmp` | Get RTMP service statistics |
| `GET` | `/metrics/:service` | Get metrics for specific service |
| `GET` | `/logs` | Get system logs |
| `GET` | `/logs/:service` | Get logs for specific service |

### Streaming Services

#### RTMP Server
- Docker-based RTMP streaming server
- Accepts RTMP input streams
- Provides HLS output for web playback
- Configurable stream keys and URLs
- Perfect for live streaming from external sources

#### Telegram Integration
- Stream to Telegram channels via PM2 daemon
- Automatic stream management
- Configuration-based setup
- Error handling and recovery
- Perfect for broadcasting to Telegram audiences

## 🔧 Configuration

### Environment Variables
Each application has its own environment configuration:

- **Wave Backend**: `apps/wave/.env`
- **Admin Panel**: `apps/admin/.env`
- **Player**: `apps/player/.env`

### Data Storage
- **Audio Tracks**: `data/audio-tracks.json`
- **Streaming Config**: `data/streaming-config.json`
- **Telegram Config**: `data/telegram-config.json`

### Logs
- **Wave Server**: `logs/wave.log`
- **Telegram Stream**: `logs/telegram-stream.log`
- **RTMP Server**: Docker container logs

## 🚨 Troubleshooting

### Common Issues

#### FFmpeg Not Found (Telegram Streaming)
**Error**: `ENOENT: no such file or directory, posix_spawn 'ffmpeg'`
**Solution**: Install FFmpeg:
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# macOS
brew install ffmpeg

# Verify installation
ffmpeg -version
```

#### Port Conflicts
**Error**: Address already in use
**Solution**: Check and kill processes using required ports:
```bash
# Check ports
sudo lsof -i :6970  # Wave API
sudo lsof -i :6971  # WebSocket
sudo lsof -i :3001  # Admin Panel
sudo lsof -i :1935  # RTMP Server
sudo lsof -i :8069  # HLS Output

# Kill process
sudo kill -9 <PID>
```

#### Telegram Stream Daemon Errors
**Error**: Telegram process keeps restarting
**Solution**: Check configuration and dependencies:
```bash
# Check PM2 status
pm2 status

# Check Telegram stream logs
pm2 logs radio.telegram

# Restart Telegram service
pm2 restart radio.telegram
```

#### Docker RTMP Server Issues
**Error**: RTMP server not responding
**Solution**: 
```bash
# Check Docker container
docker ps --filter "name=rtmp-server"

# Check container logs
docker logs rtmp-server

# Restart RTMP server
docker restart rtmp-server
```

### Debug Commands
```bash
# Check all services status
pm2 status
pnpm wave:logs

# Check RTMP server
docker ps | grep rtmp-server
docker logs rtmp-server

# Check Telegram stream
pm2 logs radio.telegram --lines 50

# Check Wave backend
pm2 logs radio.wave --lines 50

# Test API endpoints
curl http://localhost:6970/health
curl http://localhost:6970/api/monitoring/
curl http://localhost:6970/api/stream/telegram/config

# Check FFmpeg installation
which ffmpeg
ffmpeg -version
```

### Service Dependencies
Ensure services start in this order:
1. **Docker** (RTMP server)
2. **Wave Backend** (API server)
3. **Telegram Daemon** (requires Wave backend and RTMP)
4. **Admin Panel** (requires Wave backend)
5. **Frontend** (requires Wave backend)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the troubleshooting section above

---

**Built with ❤️ for the radio streaming community**
