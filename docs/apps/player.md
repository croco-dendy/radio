# 🎵 Player App

The Player app is the public-facing radio streaming interface that allows users to listen to live radio streams and participate in real-time chat.

## 📋 Overview

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query + Zustand
- **Routing**: TanStack Router
- **Streaming**: HLS.js for video/audio playback
- **Real-time**: WebSocket for chat functionality

## 🏗️ Architecture

### Core Components

```
src/
├── features/radio/           # Main radio functionality
│   ├── components/          # UI components
│   │   ├── chat/           # Chat system
│   │   ├── settings/       # User settings
│   │   └── ui/             # Core UI elements
│   ├── hooks/              # Custom hooks
│   ├── queries/            # API queries
│   └── radio-layout.tsx    # Main layout component
├── services/               # External services
│   ├── api/               # API client
│   ├── socket.ts          # WebSocket connection
│   └── sound.ts           # Audio management
└── stores/                # State management
```

### Key Features

1. **Live Streaming**: HLS video/audio playback
2. **Real-time Chat**: WebSocket-based messaging
3. **User Management**: Nickname and color customization
4. **Sound Effects**: Audio feedback for interactions
5. **Responsive Design**: Mobile and desktop support
6. **PWA Support**: Progressive Web App capabilities

## 🚀 Development

### Prerequisites

- Node.js 22.15.0+
- pnpm 10.8.0+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm player:dev
```

The app will be available at `http://localhost:3000`.

### Environment Configuration

Create `apps/player/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:6970
VITE_SOCKET_URL=ws://localhost:6971

# Optional: Custom configuration
VITE_APP_NAME=Radio Player
VITE_APP_VERSION=1.0.0
```

## 🎯 Key Components

### RadioLayout

The main component that orchestrates the entire player experience:

- **Video Player**: HLS stream playback with controls
- **Chat System**: Real-time messaging with other users
- **User Settings**: Nickname and color customization
- **Header**: Playback controls and user management

### Chat System

Real-time chat functionality with:

- **Message History**: Persistent chat messages
- **User Colors**: Unique colors for each user
- **Sound Effects**: Audio feedback for messages
- **Nickname Management**: User identification

### Streaming Integration

- **HLS Support**: Adaptive streaming for various devices
- **Error Handling**: Graceful fallbacks for stream issues
- **Auto-play**: Automatic stream initialization
- **Quality Adaptation**: Automatic quality adjustment

## 🔧 Configuration

### Build Configuration

```bash
# Development build
pnpm turbo run build --filter=@radio/player

# Production build
NODE_ENV=production pnpm turbo run build --filter=@radio/player
```

### PWA Configuration

The app includes Progressive Web App features:

- **Manifest**: `public/manifest.json`
- **Service Worker**: Automatic caching
- **Offline Support**: Basic offline functionality
- **Install Prompt**: Native app-like installation

## 📱 Mobile Support

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Touch Controls**: Touch-friendly interface
- **Adaptive Layout**: Responsive to screen size
- **Performance**: Optimized for mobile performance

### PWA Features

- **Installable**: Can be installed as a native app
- **Offline**: Basic offline functionality
- **Push Notifications**: Real-time notifications (future)
- **Background Sync**: Sync when connection restored

## 🎨 Styling

### Design System

- **Ukrainian Theme**: Pastel colors and cultural elements
- **Typography**: Custom Ukrainian fonts (KyivType)
- **Components**: Consistent component library
- **Animations**: Smooth transitions and interactions

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'kyiv-sans': ['KyivTypeSans', 'sans-serif'],
        'kyiv-serif': ['KyivTypeSerif', 'serif'],
        'kyiv-titling': ['KyivTypeTitling', 'serif'],
      },
      colors: {
        // Ukrainian-themed color palette
      },
    },
  },
}
```

## 🔌 API Integration

### REST API

- **Stream Info**: Current stream status and metadata
- **User Data**: User preferences and settings
- **Health Checks**: Service status monitoring

### WebSocket API

- **Chat Messages**: Real-time messaging
- **User Events**: User join/leave notifications
- **Stream Updates**: Live stream status changes
- **System Events**: General system notifications

## 🧪 Testing

### Test Setup

```bash
# Run tests
pnpm turbo run test --filter=@radio/player

# Run tests in watch mode
pnpm turbo run test:watch --filter=@radio/player
```

### Test Coverage

- **Component Tests**: React component testing
- **Hook Tests**: Custom hook testing
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end user flows

## 🚀 Deployment

### Production Build

```bash
# Build for production
pnpm turbo run build --filter=@radio/player

# Output will be in apps/player/dist/
```

### Deployment Options

1. **Static Hosting**: Deploy to Vercel, Netlify, etc.
2. **CDN**: Use CDN for global distribution
3. **Docker**: Containerized deployment
4. **PM2**: Process management for Node.js hosting

### Environment Variables

Production environment variables:

```env
VITE_API_URL=https://wave.adoo.one
VITE_SOCKET_URL=wss://wave.adoo.one
VITE_APP_NAME=Radio Player
VITE_APP_VERSION=1.0.0
```

## 🔍 Performance

### Optimization Strategies

- **Code Splitting**: Lazy loading of components
- **Bundle Analysis**: Regular bundle size monitoring
- **Image Optimization**: Optimized assets and fonts
- **Caching**: Aggressive caching strategies

### Monitoring

- **Performance Metrics**: Core Web Vitals tracking
- **Error Tracking**: Real-time error monitoring
- **User Analytics**: Usage pattern analysis
- **Stream Quality**: Stream performance monitoring

## 🛠️ Development Tools

### Available Scripts

```bash
# Development
pnpm player:dev          # Start dev server
pnpm turbo run dev --filter=@radio/player

# Building
pnpm turbo run build --filter=@radio/player
pnpm turbo run preview --filter=@radio/player

# Code Quality
pnpm turbo run lint --filter=@radio/player
pnpm turbo run check-types --filter=@radio/player
pnpm turbo run test --filter=@radio/player
```

### Development Workflow

1. **Feature Development**: Create feature branches
2. **Component Development**: Build components in isolation
3. **Integration Testing**: Test with real API
4. **Code Review**: Peer review process
5. **Deployment**: Automated deployment pipeline

## 🔮 Future Enhancements

### Planned Features

- **Playlist Support**: User-created playlists
- **Social Features**: User profiles and following
- **Advanced Chat**: Rich text, emojis, reactions
- **Stream Recording**: Record and replay streams
- **Multi-language**: Internationalization support

### Technical Improvements

- **Performance**: Further optimization
- **Accessibility**: Enhanced accessibility features
- **Testing**: Expanded test coverage
- **Monitoring**: Advanced analytics and monitoring

---

**Next**: [API Reference](../api/streaming.md) | [Setup Guide](../setup/README.md)
