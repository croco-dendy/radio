# 🎛️ Admin Panel

The Admin Panel is a modern React-based web interface for managing the radio streaming platform. Built with React 18, TypeScript, and Tailwind CSS, it provides comprehensive control over all streaming operations.

## 🏗️ Architecture

### Technology Stack
- **React 18**: Modern React with concurrent features
- **TypeScript**: Full type safety throughout
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state management
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Vite**: Fast build tool and dev server

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── icons/           # Icon components
│   └── layout/          # Layout components
├── features/            # Feature-specific modules
│   └── stream/          # Streaming management
│       ├── components/  # Stream-specific components
│       ├── hooks/       # Custom hooks
│       └── stream-page.tsx
├── services/            # API and external services
│   ├── streaming-api.ts # Streaming API client
│   └── env.ts          # Environment configuration
├── styles/              # Global styles and themes
├── routes/              # Route components
└── lib/                 # Utility libraries
    └── query-client.ts  # React Query configuration
```

## 🚀 Features

### Streaming Management
- **Real-time Status**: Live streaming status with 5-second updates
- **Mode Control**: Switch between Live and Radio modes
- **Stream Controls**: Start/stop streaming with one click
- **Track Management**: Add, edit, and delete audio tracks
- **Now Playing**: Real-time track information display
- **Skip Functionality**: Skip to next track in radio mode

### Server Management
- **RTMP Server Control**: Start, stop, and restart RTMP server
- **Telegram Integration**: Manage Telegram streaming
- **Process Monitoring**: Real-time process status
- **Error Handling**: Comprehensive error reporting
- **Health Checks**: System health monitoring

### User Interface
- **Modern Design**: Clean, intuitive interface
- **Responsive Layout**: Works on desktop and mobile
- **Real-time Updates**: Live data without page refresh
- **Loading States**: Smooth loading indicators
- **Error Feedback**: Clear error messages and recovery
- **Dark Theme**: Professional dark theme design

## 🎨 Design System

### Color Palette
- **Moss**: Primary green for active states
- **Bark**: Dark brown for backgrounds
- **Coal**: Deep black for cards and surfaces
- **Clay**: Warm brown for accents
- **River**: Blue for information
- **Paper**: Light colors for text
- **Sun**: Yellow for warnings
- **Ember**: Red for errors and active states

### Typography
- **Tiny5**: Display font for headings
- **KyivType Sans**: Primary sans-serif font
- **KyivType Serif**: Serif font for emphasis
- **Montserrat**: Alternative sans-serif

### Components
- **Cards**: Elevated surfaces with rounded corners
- **Buttons**: Consistent button styles with hover states
- **Forms**: Clean form inputs with validation
- **Status Indicators**: Color-coded status displays
- **Progress Bars**: Animated progress indicators

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971

# Development
VITE_APP_ENV=development
```

### API Integration
The admin panel communicates with the Wave backend through:
- **REST API**: All CRUD operations
- **React Query**: Caching and state management
- **WebSocket**: Real-time updates (future feature)

## 📡 API Integration

### React Query Setup
```typescript
// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### API Service Layer
```typescript
// Streaming API client
class StreamingApiService {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    // HTTP request implementation
  }

  // All streaming operations
  async getStatus(): Promise<StreamingStatus>
  async setMode(mode: 'live' | 'radio'): Promise<Response>
  async startStreaming(): Promise<Response>
  // ... more methods
}
```

### Custom Hooks
```typescript
// Main streaming hook
export const useStream = () => {
  // Combines all streaming operations
  // Provides unified interface for components
  // Handles loading states and errors
}

// Individual query hooks
export const useStreamingStatus = () => {
  // Real-time status with 5-second refresh
}

export const useAudioTracks = () => {
  // Track management operations
}
```

## 🎛️ User Interface

### Main Dashboard
- **Stream Status Card**: Current streaming status
- **Mode Selection**: Live/Radio mode toggle
- **Control Buttons**: Start/stop streaming
- **Now Playing**: Current track information
- **Service Status**: RTMP and Telegram status

### Track Management
- **Track List**: All available audio tracks
- **Add Track Form**: Add new tracks with URL and title
- **Edit Track**: Modify existing tracks
- **Delete Track**: Remove tracks with confirmation
- **Track Details**: Duration, URL, and metadata

### Server Management
- **RTMP Server**: Start/stop/restart controls
- **Telegram Stream**: Telegram streaming management
- **Status Monitoring**: Real-time service status
- **Error Display**: Clear error messages and recovery

### Real-time Updates
- **Auto-refresh**: Status updates every 5 seconds
- **Optimistic Updates**: Immediate UI feedback
- **Error Recovery**: Automatic retry on failures
- **Loading States**: Smooth loading indicators

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
- **React Query DevTools**: Query debugging
- **Error Boundaries**: Graceful error handling
- **Source Maps**: Easy debugging

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

### StreamPage
Main streaming management interface:
- **Status Display**: Real-time streaming status
- **Mode Controls**: Live/Radio mode switching
- **Stream Controls**: Start/stop functionality
- **Track Management**: Complete track CRUD
- **Service Management**: RTMP and Telegram controls

### useStream Hook
Central hook for all streaming operations:
```typescript
const {
  status,           // Current streaming status
  mode,             // Current mode (live/radio)
  tracks,           // Audio tracks list
  nowPlaying,       // Current track info
  isLoading,        // Loading state
  error,            // Error state
  setMode,          // Change mode
  startStream,      // Start streaming
  stopStream,       // Stop streaming
  addTrack,         // Add new track
  deleteTrack,      // Delete track
  // ... more operations
} = useStream();
```

### API Integration
- **Automatic Caching**: React Query handles caching
- **Background Refetch**: Data stays fresh
- **Error Handling**: Centralized error management
- **Loading States**: Built-in loading management
- **Optimistic Updates**: Immediate UI feedback

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Query Caching**: Intelligent data caching
- **Bundle Optimization**: Tree shaking and minification

### Caching Strategy
- **Query Caching**: 5-minute stale time
- **Background Refetch**: Automatic data updates
- **Optimistic Updates**: Immediate UI feedback
- **Error Recovery**: Automatic retry logic

## 🔒 Security

### Security Features
- **Input Validation**: All inputs validated
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: API request validation
- **Error Sanitization**: Safe error messages
- **Type Safety**: TypeScript prevents many issues

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Touch-friendly**: Large touch targets
- **Responsive Layout**: Adapts to screen size
- **Mobile Navigation**: Optimized for mobile
- **Gesture Support**: Swipe and touch gestures

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
- **Visual Tests**: UI component testing

## 🚨 Troubleshooting

### Common Issues

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

#### Development Issues
```bash
# Restart dev server
pnpm dev

# Check browser console
# Verify network requests
```

### Debug Tools
- **React Query DevTools**: Query debugging
- **React DevTools**: Component debugging
- **Browser DevTools**: Network and console
- **Vite DevTools**: Build debugging

## 🔄 Data Flow

### Request Flow
1. **User Action** → Component event handler
2. **Hook Call** → useStream or specific hook
3. **API Request** → StreamingApiService
4. **Backend Processing** → Wave server
5. **Response** → React Query cache
6. **UI Update** → Component re-render

### Real-time Updates
1. **Status Change** → Backend detects change
2. **API Response** → Updated data returned
3. **Query Invalidation** → React Query refetches
4. **UI Update** → Component updates automatically

## 🎯 Future Enhancements

### Planned Features
- **WebSocket Integration**: Real-time updates
- **User Authentication**: Multi-user support
- **Advanced Analytics**: Detailed streaming metrics
- **Custom Themes**: Theme customization
- **Mobile App**: React Native mobile app
- **Plugin System**: Extensible functionality

### Performance Improvements
- **Service Worker**: Offline support
- **Progressive Web App**: PWA features
- **Advanced Caching**: More sophisticated caching
- **Bundle Optimization**: Further size reduction

---

**Next**: [Player Documentation](player.md) | [API Reference](../api/streaming.md)
