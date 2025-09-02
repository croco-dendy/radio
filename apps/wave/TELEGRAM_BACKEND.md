# 🎥 Telegram Streaming - Shell Script Solution

Professional backend solution for streaming your RTMP content to Telegram using FFmpeg with shell scripts and PM2 integration.

## 🚀 Quick Start

### 1. Start your RTMP server
```bash
pnpm --filter @radio/wave rtmp
```

### 2. Start your Wave server
```bash
pnpm --filter @radio/wave dev
```

### 3. Start Telegram streaming
```bash
# Using the shell script directly
./scripts/telegram-stream.sh start

# Or via package.json
pnpm --filter @radio/wave telegram start
```

## 📁 File Structure

```
apps/wave/
├── scripts/
│   ├── telegram-stream.sh      # Main streaming script
│   └── start-rtmp.sh          # RTMP server script
├── ecosystem.config.js         # PM2 configuration
├── package.json               # Scripts and dependencies
└── logs/                      # PM2 log files
```

## 🛠️ Management Commands

### **Direct Script Usage:**
```bash
# Start streaming
./scripts/telegram-stream.sh start

# Stop streaming
./scripts/telegram-stream.sh stop

# Restart streaming
./scripts/telegram-stream.sh restart

# Check status
./scripts/telegram-stream.sh status

# View configuration
./scripts/telegram-stream.sh config show

# Update configuration
./scripts/telegram-stream.sh config set quality high

# View logs
./scripts/telegram-stream.sh logs

# Get help
./scripts/telegram-stream.sh help
```

### **Via Package.json:**
```bash
# Start streaming
pnpm --filter @radio/wave telegram start

# Stop streaming
pnpm --filter @radio/wave telegram stop

# Restart streaming
pnpm --filter @radio/wave telegram restart

# Check status
pnpm --filter @radio/wave telegram status
```

## ⚙️ Configuration

### **Script Configuration (in `telegram-stream.sh`):**
```bash
RTMP_URL="rtmps://dc4-1.rtmp.t.me/s/"
STREAM_KEY="3018999425:AeNfd0UEE2q5j2lc1PjFbg"
INPUT_URL="rtmp://deimos.adoo.one:1935/live"
QUALITY="medium"
STREAM_TYPE="audio"  # Options: "audio", "video", "auto"
```

### **Stream Types:**
- **`audio`** - Audio-only streaming (perfect for radio!)
- **`video`** - Full video + audio streaming
- **`auto`** - Automatic detection and copying

### **Quality Presets:**
- **Low**: 800k video, 64k audio (or 64k audio-only)
- **Medium**: 1500k video, 128k audio (or 128k audio-only)  
- **High**: 2500k video, 192k audio (or 192k audio-only)

### **Audio-Only Features:**
- **Sample Rate**: 44.1kHz (CD quality)
- **Channels**: Stereo (2-channel)
- **Codec**: AAC (better audio quality)
- **No Video**: `-vn` flag for audio-only output

## 🎵 Audio-Only Streaming

### **Perfect for Radio Content:**
- **Music streaming** - High-quality audio without video overhead
- **Voice content** - Podcasts, interviews, announcements
- **Lower bandwidth** - Ideal for mobile and slow connections
- **Better audio quality** - Dedicated audio processing

### **Configuration Examples:**
```bash
# Set to audio-only mode
./scripts/telegram-stream.sh config set stream_type audio

# Set high-quality audio (192k)
./scripts/telegram-stream.sh config set quality high

# Check configuration
./scripts/telegram-stream.sh config show
```

### **Audio-Only FFmpeg Settings:**
```bash
ffmpeg -i 'input' \
    -vn -c:a aac -b:a 128k \
    -ar 44100 -ac 2 \
    -preset ultrafast \
    -f flv 'output'
```

## 🔧 How It Works

1. **OBS streams** to nginx RTMP (port 1935)
2. **nginx creates HLS files** for your frontend
3. **FFmpeg picks up** the RTMP stream
4. **FFmpeg processes** based on STREAM_TYPE setting:
   - **`audio`**: Audio-only with AAC encoding
   - **`video`**: Video + audio with copy codecs
   - **`auto`**: Automatic detection and copying
5. **FFmpeg pushes** to Telegram via RTMP
6. **CLI manages** start/stop/restart

## 📊 Monitoring

The CLI shows real-time:
- Stream status (running/stopped)
- Uptime tracking
- Error messages
- Performance stats (FPS, bitrate, frames)

## 🚨 Troubleshooting

### FFmpeg not found
```bash
sudo apt update && sudo apt install ffmpeg
```

### Check if stream is running
```bash
# Direct script
./scripts/telegram-stream.sh status

# Or via package.json
pnpm --filter @radio/wave telegram status
```

### Restart if issues
```bash
# Direct script
./scripts/telegram-stream.sh restart

# Or via package.json
pnpm --filter @radio/wave telegram restart
```

### View logs for debugging
```bash
./scripts/telegram-stream.sh logs
```

## 🚀 PM2 Integration (Production)

### **Start with PM2:**
```bash
# Start all services (including Telegram stream)
pnpm --filter @radio/wave pm2:dev

# Check PM2 status
pm2 status

# View logs
pnpm --filter @radio/wave pm2:logs

# Restart services
pnpm --filter @radio/wave pm2:restart

# Stop all services
pnpm --filter @radio/wave pm2:stop
```

### **PM2 Benefits:**
- **Auto-restart** on crashes
- **Process monitoring** and management
- **Log rotation** and management
- **Production deployment** ready
- **Easy scaling** and management

## 📱 Integration

The system integrates with your existing:
- nginx RTMP server
- HLS streaming
- WebSocket server
- PM2 process management

## 🎯 Benefits

- **Low latency** (~100-200ms)
- **Zero re-encoding** when using `copy` codecs
- **Audio-only streaming** - Perfect for radio and music content
- **Proper background execution** - No hanging terminals
- **Professional logging** - All logs saved to files
- **PM2 integration** - Production-grade process management
- **Shell script reliability** - Native system process handling
- **Easy configuration** - Simple script editing
- **Real-time monitoring** - Live status and stats
- **Bandwidth efficient** - Audio-only mode uses minimal bandwidth

## 🎵 Use Cases & Examples

### **Radio Streaming:**
```bash
# Perfect setup for radio
./scripts/telegram-stream.sh config set stream_type audio
./scripts/telegram-stream.sh config set quality high
./scripts/telegram-stream.sh start
```

### **Video Streaming:**
```bash
# Full video + audio streaming
./scripts/telegram-stream.sh config set stream_type video
./scripts/telegram-stream.sh config set quality medium
./scripts/telegram-stream.sh start
```

### **Auto Mode:**
```bash
# Let FFmpeg detect and copy the stream
./scripts/telegram-stream.sh config set stream_type auto
./scripts/telegram-stream.sh start
```

## 🔧 Why Shell Scripts?
- **Native process management** - Uses `nohup` for real background execution
- **No hanging terminals** - Returns control immediately after starting
- **System-level reliability** - Direct OS process handling
- **Easy debugging** - Standard shell tools and commands
- **PM2 compatibility** - Perfect integration with process managers
- **Configuration simplicity** - Just edit the script file
- **No compilation needed** - Instant changes and testing

### **Production Ready:**
- **PID file management** - Proper process tracking
- **Signal handling** - Graceful shutdown on SIGTERM/SIGINT
- **Log rotation** - PM2 handles log management
- **Auto-restart** - PM2 restarts on crashes
- **Resource monitoring** - PM2 tracks memory and CPU usage

---

**Ready to stream audio and video! 🎵🎥✨**
