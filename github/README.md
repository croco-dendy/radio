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
│   └── frontend/      # Public frontend (React + Vite)
├── packages/
│   └── types/         # Shared TypeScript types
├── github/            # Documentation (this folder)
│   ├── docs/          # Technical documentation
│   ├── apps/          # App-specific documentation
│   ├── setup/         # Setup and deployment guides
│   └── api/           # API documentation
└── scripts/           # Utility scripts
```

## 🎯 Key Features

### Streaming Capabilities
- **Dual Mode Operation**: Live streaming and playlist-based radio
- **Real-time Control**: Start/stop streaming via web interface
- **Track Management**: Add, edit, and delete audio tracks
- **Now Playing**: Real-time track information display
- **Skip Functionality**: Skip to next track in radio mode

### Admin Panel
- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Real-time Updates**: Live status monitoring with 5-second refresh
- **Stream Controls**: Complete streaming management interface
- **RTMP Management**: Start/stop/restart RTMP server
- **Telegram Integration**: Manage Telegram streaming
- **Error Handling**: Comprehensive error reporting and recovery

### Technical Stack
- **Backend**: Bun runtime with Hono framework
- **Frontend**: React 18 with Vite build system
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS with custom design system
- **Type Safety**: Full TypeScript coverage
- **Process Management**: PM2 for production deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 22.15.0+
- Bun 1.2.9+
- Docker (for RTMP server)
- PM2 (for production deployment)

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

# Public frontend
pnpm frontend:dev
```

## 📚 Documentation

### Setup & Deployment
- [📋 Complete Setup Guide](setup/README.md)
- [🐳 Docker Deployment](setup/docker.md)
- [☁️ Production Deployment](setup/production.md)
- [🔧 Environment Configuration](setup/environment.md)

### Applications
- [🌊 Wave Backend](apps/wave.md)
- [🎛️ Admin Panel](apps/admin.md)
- [📱 Frontend](apps/frontend.md)

### API Reference
- [📡 Streaming API](api/streaming.md)
- [🔌 WebSocket API](api/websocket.md)
- [📊 Status Endpoints](api/status.md)

### Technical Documentation
- [🏗️ Architecture Overview](docs/architecture.md)
- [🔄 Data Flow](docs/data-flow.md)
- [🎨 Design System](docs/design-system.md)
- [🧪 Testing](docs/testing.md)

## 🎛️ Usage

### Admin Panel Access
Navigate to `http://localhost:3001/streaming` to access the streaming controls.

### API Endpoints
All streaming operations are available via REST API at `http://localhost:6970/api/streaming/`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/status` | Get streaming status |
| `GET` | `/mode` | Get current mode |
| `POST` | `/mode` | Set streaming mode |
| `GET` | `/tracks` | Get audio tracks |
| `POST` | `/tracks` | Add audio track |
| `PUT` | `/tracks/:id` | Update audio track |
| `DELETE` | `/tracks/:id` | Delete audio track |
| `POST` | `/start` | Start streaming |
| `POST` | `/stop` | Stop streaming |
| `GET` | `/now-playing` | Get current track info |
| `POST` | `/skip` | Skip to next track |
| `GET` | `/telegram/status` | Get Telegram stream status |
| `POST` | `/telegram/start` | Start Telegram stream |
| `POST` | `/telegram/stop` | Stop Telegram stream |
| `GET` | `/rtmp/status` | Get RTMP server status |
| `POST` | `/rtmp/start` | Start RTMP server |
| `POST` | `/rtmp/stop` | Stop RTMP server |
| `POST` | `/rtmp/restart` | Restart RTMP server |

### Streaming Modes

#### Live Mode
- Streams directly from external audio sources
- Real-time audio streaming
- No playlist management needed
- Perfect for live shows and events

#### Radio Mode
- Plays from a managed playlist of audio tracks
- Supports track management (add/remove tracks)
- Skip to next track functionality
- Automatic playlist looping
- Perfect for automated radio stations

## 🔧 Configuration

### Environment Variables
Each application has its own environment configuration:

- **Wave Backend**: `apps/wave/.env`
- **Admin Panel**: `apps/admin/.env`
- **Frontend**: `apps/frontend/.env`

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
- **Port Conflicts**: Check that ports 6970, 6971, 3001, and 1935 are available
- **FFmpeg Issues**: Ensure FFmpeg is installed and accessible
- **Docker Issues**: Verify Docker is running and accessible
- **PM2 Issues**: Check PM2 installation and process status

### Debug Commands
```bash
# Check all services status
pnpm wave:logs
pm2 status

# Check RTMP server
docker ps | grep rtmp

# Check Telegram stream
pm2 logs telegram-stream

# Check admin panel
curl http://localhost:3001/health
```

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
- Check the documentation in the `github/` folder
- Review the troubleshooting section above

---

**Built with ❤️ for the radio streaming community**
