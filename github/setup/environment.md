# 🔧 Environment Configuration

This guide covers all environment configuration for the Radio Streaming Platform.

## 📋 Environment Files

### Wave Backend (`apps/wave/.env`)
```env
# Server Configuration
PORT=6970
SOCKET_PORT=6971
NODE_ENV=development

# Optional: Custom paths
DATA_DIR=./data
LOG_DIR=./logs

# Optional: External services
EXTERNAL_API_URL=https://api.example.com
```

### Admin Panel (`apps/admin/.env`)
```env
# API Configuration
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971

# Development
VITE_APP_ENV=development

# Optional: Custom configuration
VITE_APP_NAME=Radio Admin
VITE_APP_VERSION=1.0.0
```

### Frontend (`apps/frontend/.env`)
```env
# API Configuration
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971

# Stream Configuration
VITE_HLS_URL=http://localhost:8069/hls/stream.m3u8
VITE_STREAM_URL=https://stream.adoo.one

# Development
VITE_APP_ENV=development

# Optional: Custom configuration
VITE_APP_NAME=Radio Player
VITE_APP_VERSION=1.0.0
```

## 🌍 Environment Modes

### Development
- **API URLs**: Localhost endpoints
- **Debug Mode**: Enabled
- **Hot Reload**: Enabled
- **Source Maps**: Enabled
- **CORS**: Permissive

### Production
- **API URLs**: Production endpoints
- **Debug Mode**: Disabled
- **Optimization**: Enabled
- **Security**: Enhanced
- **CORS**: Restricted

## 🔐 Security Configuration

### CORS Settings
```typescript
// Wave Backend CORS configuration
const allowedOrigins = [
  'http://localhost:3000',    // Development frontend
  'http://localhost:3001',    // Admin panel
  'http://127.0.0.1:3001',    // Local admin
  'http://deimos:3001',       // Local network
  'https://stream.adoo.one',  // Production frontend
  'https://wave.adoo.one',    // Production backend
];
```

### SSL/TLS Configuration
```nginx
# Nginx SSL configuration
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
}
```

## 🐳 Docker Configuration

### RTMP Server Environment
```yaml
# docker-compose.yml
version: '3.8'
services:
  rtmp-server:
    image: tiangolo/nginx-rtmp
    ports:
      - "1935:1935"
      - "8069:80"
    environment:
      - RTMP_STREAM_KEY=your-stream-key
      - HLS_OUTPUT_PATH=/var/www/html/hls
    volumes:
      - ./hls:/var/www/html/hls
```

### Environment Variables for Docker
```env
# Docker environment
COMPOSE_PROJECT_NAME=radio-streaming
RTMP_PORT=1935
HLS_PORT=8069
STREAM_KEY=your-stream-key
```

## 📊 Monitoring Configuration

### PM2 Environment
```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'radio.wave',
      script: 'src/index.ts',
      interpreter: 'bun',
      instances: 1,
      env_production: { 
        PORT: 6970, 
        SOCKET_PORT: 6971,
        NODE_ENV: 'production'
      },
      env_development: {
        PORT: 6970,
        SOCKET_PORT: 6971,
        NODE_ENV: 'development'
      }
    }
  ]
};
```

### Logging Configuration
```env
# Logging levels
LOG_LEVEL=info
LOG_FORMAT=json
LOG_FILE=./logs/wave.log
LOG_MAX_SIZE=10m
LOG_MAX_FILES=5
```

## 🔧 Development Tools

### VS Code Configuration
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "files.associations": {
    "*.env*": "dotenv"
  }
}
```

### Debug Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Wave Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/wave/src/index.ts",
      "runtimeExecutable": "bun",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

## 🌐 Network Configuration

### Port Configuration
```env
# Port allocation
WAVE_API_PORT=6970
WAVE_SOCKET_PORT=6971
ADMIN_PORT=3001
FRONTEND_PORT=5173
RTMP_PORT=1935
HLS_PORT=8069
```

### Firewall Configuration
```bash
# UFW firewall rules
sudo ufw allow 6970/tcp  # Wave API
sudo ufw allow 6971/tcp  # WebSocket
sudo ufw allow 3001/tcp  # Admin Panel
sudo ufw allow 1935/tcp  # RTMP
sudo ufw allow 8069/tcp  # HLS
```

## 📱 Mobile Configuration

### PWA Configuration
```json
// apps/frontend/public/manifest.json
{
  "name": "Radio Player",
  "short_name": "Radio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#4ade80",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔄 Environment Switching

### Development to Production
```bash
# Update environment files
cp apps/wave/.env.development apps/wave/.env
cp apps/admin/.env.development apps/admin/.env
cp apps/frontend/.env.development apps/frontend/.env

# Build applications
pnpm build

# Start with PM2
pnpm pm2:start
```

### Environment Validation
```typescript
// Environment validation
const requiredEnvVars = [
  'PORT',
  'SOCKET_PORT',
  'NODE_ENV'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

## 🚨 Troubleshooting

### Common Environment Issues

#### Port Conflicts
```bash
# Check port usage
sudo lsof -i :6970
sudo lsof -i :3001

# Kill conflicting processes
sudo kill -9 <PID>
```

#### Environment Variable Issues
```bash
# Check environment variables
echo $NODE_ENV
echo $PORT

# Reload environment
source .env
```

#### CORS Issues
```bash
# Check CORS configuration
curl -H "Origin: http://localhost:3001" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:6970/api/streaming/status
```

### Environment Debugging
```bash
# Debug environment loading
node -e "console.log(process.env)"

# Check specific variables
node -e "console.log('PORT:', process.env.PORT)"
```

---

**Next**: [Production Deployment](production.md) | [Docker Setup](docker.md)
