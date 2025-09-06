# 📱 Frontend

The Frontend is the public-facing React application that provides the radio player interface for listeners. Built with React 18, Vite, and modern web technologies, it delivers a smooth listening experience.

## 🏗️ Architecture

### Technology Stack
- **React 18**: Modern React with concurrent features
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state management
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **HLS.js**: HTTP Live Streaming support

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── icons/           # Icon components
│   ├── player/          # Audio player components
│   ├── chat/            # Chat components
│   └── user/            # User interface components
├── features/            # Feature-specific modules
├── services/            # API and external services
├── styles/              # Global styles and themes
├── routes/              # Route components
└── lib/                 # Utility libraries
```

## 🚀 Features

### Audio Player
- **HLS Streaming**: HTTP Live Streaming support
- **Playback Controls**: Play, pause, volume control
- **Now Playing**: Current track information
- **Progress Bar**: Track progress visualization
- **Volume Control**: Audio level management
- **Quality Selection**: Multiple stream quality options

### User Interface
- **Modern Design**: Clean, intuitive interface
- **Responsive Layout**: Works on all devices
- **Dark Theme**: Professional dark theme
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error recovery

### Real-time Features
- **Live Updates**: Real-time track information
- **Status Indicators**: Stream status display
- **Listener Count**: Live listener statistics
- **Chat Integration**: Real-time chat (if enabled)
- **Notifications**: Stream notifications

## 🎨 Design System

### Color Palette
- **Moss**: Primary green for active states
- **Bark**: Dark brown for backgrounds
- **Coal**: Deep black for cards and surfaces
- **Clay**: Warm brown for accents
- **River**: Blue for information
- **Paper**: Light colors for text
- **Sun**: Yellow for highlights
- **Ember**: Red for active states

### Typography
- **Tiny5**: Display font for headings
- **KyivType Sans**: Primary sans-serif font
- **KyivType Serif**: Serif font for emphasis
- **Montserrat**: Alternative sans-serif

### Components
- **Player Controls**: Custom audio player interface
- **Track Display**: Now playing information
- **Status Indicators**: Stream status visualization
- **Progress Bars**: Audio progress tracking
- **Volume Slider**: Audio level control

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971

# Stream Configuration
VITE_HLS_URL=http://localhost:8069/hls/stream.m3u8
VITE_STREAM_URL=https://stream.adoo.one

# Development
VITE_APP_ENV=development
```

### Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    // PWA plugin for offline support
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
});
```

## 🎵 Audio Player

### HLS Streaming
```typescript
// HLS.js integration
import Hls from 'hls.js';

const initializePlayer = () => {
  const video = document.getElementById('audio-player');
  const hls = new Hls();
  
  hls.loadSource('http://localhost:8069/hls/stream.m3u8');
  hls.attachMedia(video);
  
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    video.play();
  });
};
```

### Player Controls
- **Play/Pause**: Toggle playback
- **Volume**: Audio level control
- **Progress**: Track progress bar
- **Quality**: Stream quality selection
- **Fullscreen**: Fullscreen mode (if video)

### Audio Features
- **Auto-play**: Automatic playback start
- **Crossfade**: Smooth track transitions
- **Equalizer**: Audio equalization
- **Visualizer**: Audio visualization
- **Metadata**: Track information display

## 🎛️ User Interface

### Main Player Interface
- **Now Playing Card**: Current track information
- **Player Controls**: Playback controls
- **Volume Control**: Audio level slider
- **Progress Bar**: Track progress
- **Status Display**: Stream status

### Track Information
- **Track Title**: Current track name
- **Artist**: Track artist
- **Album**: Album information
- **Duration**: Track length
- **Genre**: Music genre
- **Cover Art**: Album artwork

### Stream Status
- **Live Indicator**: Live stream status
- **Listener Count**: Current listeners
- **Uptime**: Stream duration
- **Quality**: Stream quality indicator
- **Bitrate**: Audio bitrate display

## 🔄 Real-time Updates

### WebSocket Integration
```typescript
// WebSocket connection for real-time updates
const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:6971');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle real-time updates
    };
    
    setSocket(ws);
    return () => ws.close();
  }, []);
};
```

### Update Types
- **Track Changes**: New track information
- **Status Updates**: Stream status changes
- **Listener Count**: Live listener updates
- **Error Notifications**: Stream error alerts
- **System Messages**: Server notifications

## 🛠️ Development

### Local Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Type checking
pnpm check-types

# Linting
pnpm lint
pnpm lint:write
```

### Development Features
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type checking
- **Source Maps**: Easy debugging
- **Error Boundaries**: Graceful error handling
- **DevTools**: React and browser dev tools

### Build Process
```bash
# Development build
pnpm dev

# Production build
pnpm build

# Preview build
pnpm preview
```

## 🎯 Key Components

### AudioPlayer
Main audio player component:
```typescript
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  // Player logic and controls
  return (
    <div className="audio-player">
      {/* Player interface */}
    </div>
  );
};
```

### NowPlaying
Current track information display:
```typescript
const NowPlaying = () => {
  const { data: nowPlaying } = useNowPlaying();
  
  return (
    <div className="now-playing">
      <img src={nowPlaying?.cover} alt="Cover" />
      <div className="track-info">
        <h3>{nowPlaying?.title}</h3>
        <p>{nowPlaying?.artist}</p>
      </div>
    </div>
  );
};
```

### StreamStatus
Stream status indicator:
```typescript
const StreamStatus = () => {
  const { data: status } = useStreamingStatus();
  
  return (
    <div className="stream-status">
      <div className={`status-indicator ${status?.isActive ? 'live' : 'offline'}`}>
        {status?.isActive ? 'LIVE' : 'OFFLINE'}
      </div>
      <span>{status?.listeners} listeners</span>
    </div>
  );
};
```

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Bundle Optimization**: Tree shaking and minification
- **PWA Support**: Progressive Web App features

### Caching Strategy
- **Service Worker**: Offline support
- **Asset Caching**: Static asset caching
- **API Caching**: React Query caching
- **Local Storage**: User preferences

## 📱 Mobile Support

### Responsive Design
- **Mobile-first**: Designed for mobile devices
- **Touch-friendly**: Large touch targets
- **Gesture Support**: Swipe and touch gestures
- **Adaptive Layout**: Responsive design

### Mobile Features
- **PWA**: Progressive Web App capabilities
- **Offline Support**: Works without internet
- **Push Notifications**: Stream notifications
- **Background Play**: Continues playing in background

## 🔒 Security

### Security Features
- **HTTPS**: Secure connections
- **CSP**: Content Security Policy
- **Input Validation**: All inputs validated
- **XSS Protection**: React's built-in protection
- **Error Sanitization**: Safe error messages

## 🧪 Testing

### Test Setup
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Testing Strategy
- **Unit Tests**: Component testing
- **Integration Tests**: API integration
- **E2E Tests**: Full user workflows
- **Audio Tests**: Player functionality
- **Responsive Tests**: Mobile compatibility

## 🚨 Troubleshooting

### Common Issues

#### Audio Playback Issues
```bash
# Check HLS stream
curl http://localhost:8069/hls/stream.m3u8

# Check audio codec support
# Verify browser compatibility
```

#### API Connection Issues
```bash
# Check API server
curl http://localhost:6970/health

# Check CORS settings
# Verify VITE_API_URL in .env
```

#### Build Issues
```bash
# Clear cache
rm -rf node_modules/.vite
pnpm install

# Check TypeScript
pnpm check-types
```

### Debug Tools
- **React DevTools**: Component debugging
- **Browser DevTools**: Network and console
- **Vite DevTools**: Build debugging
- **Audio DevTools**: Audio debugging

## 🔄 Data Flow

### Audio Stream Flow
1. **HLS Stream** → Audio source
2. **HLS.js** → Stream processing
3. **Audio Element** → Browser audio
4. **Player Controls** → User interaction
5. **UI Updates** → Visual feedback

### Real-time Updates
1. **WebSocket** → Real-time connection
2. **Status Updates** → Stream information
3. **Track Changes** → Now playing updates
4. **UI Updates** → Component re-renders

## 🎯 Future Enhancements

### Planned Features
- **Chat Integration**: Real-time chat
- **User Accounts**: User authentication
- **Playlists**: User playlists
- **Favorites**: Favorite tracks
- **Social Features**: Sharing and social
- **Advanced Player**: Equalizer and effects

### Performance Improvements
- **WebAssembly**: Audio processing
- **Web Workers**: Background processing
- **Advanced Caching**: More sophisticated caching
- **CDN Integration**: Content delivery optimization

---

**Next**: [API Reference](../api/streaming.md) | [Architecture Overview](../docs/architecture.md)
