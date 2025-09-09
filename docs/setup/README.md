# 🚀 Complete Setup Guide

This guide will walk you through setting up the Radio Streaming Platform from scratch.

## 📋 Prerequisites

### Required Software
- **Node.js**: 22.15.0 or higher
- **Bun**: 1.2.9 or higher  
- **pnpm**: 10.8.0 or higher (package manager)
- **Docker**: Latest version with Docker Compose
- **PM2**: For production process management
- **FFmpeg**: For audio processing and Telegram streaming (critical dependency)

### System Requirements
- **OS**: Linux, macOS, or Windows with WSL2
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: At least 5GB free space
- **Network**: Stable internet connection

## 🔧 Installation

### 1. Install Node.js and Bun

#### Node.js
```bash
# Using Node Version Manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22.15.0
nvm use 22.15.0

# Or download from https://nodejs.org/
```

#### Bun
```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

### 2. Install Docker

#### Ubuntu/Debian
```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
```

#### macOS
```bash
# Install Docker Desktop from https://www.docker.com/products/docker-desktop
# Or using Homebrew
brew install --cask docker
```

#### Windows
- Download Docker Desktop from https://www.docker.com/products/docker-desktop
- Install and restart your computer

### 3. Install PM2
```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version
```

### 4. Install FFmpeg

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install ffmpeg

# Verify installation
ffmpeg -version
which ffmpeg  # Should show /usr/bin/ffmpeg
```

#### macOS
```bash
brew install ffmpeg

# Verify installation
ffmpeg -version
which ffmpeg
```

#### Windows
- Download from https://ffmpeg.org/download.html
- Extract to C:\ffmpeg
- Add C:\ffmpeg\bin to PATH environment variable
- Verify: `ffmpeg -version` in Command Prompt

#### ⚠️ Critical Note
FFmpeg is **required** for Telegram streaming functionality. The Telegram stream daemon will fail with `ENOENT` errors if FFmpeg is not properly installed and accessible in PATH.

## 📦 Project Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd radio
```

### 2. Install Dependencies
```bash
# Install all dependencies
pnpm install

# Verify installation
pnpm --version
```

### 3. Environment Configuration

#### Wave Backend
```bash
cd apps/wave
cp .env.example .env
```

Edit `apps/wave/.env`:
```env
PORT=6970
SOCKET_PORT=6971
NODE_ENV=development
```

#### Admin Panel
```bash
cd apps/admin
cp .env.example .env
```

Edit `apps/admin/.env`:
```env
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971
```

#### Player
```bash
cd apps/player
cp .env.example .env
```

Edit `apps/player/.env`:
```env
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971
```

## 🚀 Development Setup

### 1. Start RTMP Server
```bash
cd apps/wave
pnpm rtmp
```

This starts a Docker container with:
- **RTMP Input**: `rtmp://localhost:1935/live`
- **HLS Output**: `http://localhost:8069/hls/`

### 2. Start Backend Services
```bash
# In root folder you can start everything by running:
pnpm dev

# Or start Wave backend
pnpm wave:dev

# In another terminal, start admin panel
pnpm admin:dev

# In another terminal, start player
pnpm player:dev
```

### 3. Verify Installation

#### Check Services
- **Wave API**: http://localhost:6970/health
- **Admin Panel**: http://localhost:3001
- **Frontend**: http://localhost:5173
- **RTMP Server**: rtmp://localhost:1935/live

#### Test Streaming
1. Open admin panel at http://localhost:3001/stream-control
2. Check RTMP server status in the Monitoring tab
3. Start a test stream using the service controls
4. Verify audio is playing

## 🏭 Production Setup

### 1. Build Applications
```bash
# Build all applications
pnpm build

# Or build individually
pnpm --filter @radio/wave build
pnpm --filter @radio/admin build
pnpm --filter @radio/player build
```

### 2. Start with PM2
```bash
# Start all services
pnpm wave:start

# Check status
pm2 status

# View logs
pm2 logs
```

### 3. Configure Reverse Proxy (Optional)

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Wave API
    location /api/ {
        proxy_pass http://localhost:6970;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Admin Panel
    location /admin/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Frontend
    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔧 Configuration

### Audio Sources
Edit `apps/wave/data/audio-tracks.json` to add your audio sources:
```json
[
  {
    "id": "track-1",
    "url": "https://your-audio-source.com/stream.mp3",
    "title": "Your Radio Station",
    "duration": 0,
    "addedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Telegram Integration
Edit `apps/wave/data/telegram-config.json`:
```json
{
  "rtmpUrl": "rtmps://dc4-1.rtmp.t.me/s/",
  "streamKey": "your-telegram-stream-key",
  "inputUrl": "rtmp://localhost:1935/live/test"
}
```

### Streaming Configuration
Edit `apps/wave/data/streaming-config.json`:
```json
{
  "mode": "radio",
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :6970
sudo lsof -i :3001
sudo lsof -i :1935

# Kill the process
sudo kill -9 <PID>
```

#### Docker Issues
```bash
# Check Docker status
docker --version
docker ps

# Restart Docker service
sudo systemctl restart docker
```

#### PM2 Issues
```bash
# Check PM2 status
pm2 status

# Restart all processes
pm2 restart all

# Clear PM2 logs
pm2 flush
```

#### FFmpeg Issues
```bash
# Test FFmpeg
ffmpeg -version

# Check if FFmpeg can access audio sources
ffmpeg -i "https://your-audio-source.com/stream.mp3" -f null -
```

### Debug Commands
```bash
# Check all services
pnpm wave:logs
pm2 status
docker ps

# Test API endpoints
curl http://localhost:6970/health
curl http://localhost:6970/api/monitoring/

# Check logs
tail -f apps/wave/logs/wave.log
pm2 logs telegram-stream
```

## 📊 Monitoring

### Health Checks
- **API Health**: `GET /health`
- **Monitoring Data**: `GET /api/monitoring/`
- **System Health**: `GET /api/monitoring/health`
- **Telegram Status**: `GET /api/monitoring/telegram`
- **RTMP Status**: `GET /api/monitoring/rtmp`

### Log Files
- **Wave Server**: `apps/wave/logs/wave.log`
- **Telegram Stream**: `apps/wave/logs/telegram-stream.log`
- **PM2 Logs**: `~/.pm2/logs/`

### Performance Monitoring
```bash
# Monitor system resources
htop
pm2 monit

# Check Docker resources
docker stats

# Monitor network
netstat -tulpn | grep :6970
```

## 🔄 Updates

### Updating the Platform
```bash
# Pull latest changes
git pull origin main

# Update dependencies
pnpm install

# Rebuild applications
pnpm build

# Restart services
pm2 restart all
```

### Backup Configuration
```bash
# Backup configuration files
cp -r apps/wave/data/ backup/data-$(date +%Y%m%d)/
cp apps/wave/.env backup/env-$(date +%Y%m%d)/
```

## 🎯 Next Steps

After successful setup:

1. **Configure Audio Sources**: Add your radio station's audio sources
2. **Set Up Telegram**: Configure Telegram streaming if needed
3. **Customize UI**: Modify the admin panel and player as needed
4. **Set Up Monitoring**: Configure logging and monitoring
5. **Deploy to Production**: Follow the production deployment guide

## 📚 Additional Resources

- [Docker Deployment Guide](#2-start-rtmp-server)
- [Production Deployment](#production-setup)
- [Environment Configuration](environment.md)
- [API Documentation](../api/README.md)
- [Architecture Overview](../docs/architecture.md)

---

**Need help?** Check the troubleshooting section or create an issue in the repository.
