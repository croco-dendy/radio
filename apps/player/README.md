# @radio/player

Public-facing radio player for listeners. Built with React 18, Vite, and HLS.js.

## Quick Start

```bash
# From monorepo root
pnpm player:dev
# Open http://localhost:3030
```

## Features

- **HLS Streaming** - HTTP Live Streaming playback via HLS.js
- **Real-time Chat** - WebSocket-based live chat
- **Collection Browse** - Browse albums and playlists
- **Now Playing** - Current track info with live updates
- **PWA Support** - Installable as a Progressive Web App
- **Responsive** - Works on desktop and mobile

## Tech Stack

- React 18 + TypeScript
- Vite (dev server and build)
- TanStack Router (routing)
- TanStack Query (server state)
- Zustand (client state)
- HLS.js (audio streaming)
- Tailwind CSS
- Framer Motion (animations)

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server (port 3030) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests (Vitest) |
| `pnpm lint` | Lint with Biome |
| `pnpm check-types` | TypeScript type check |

## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout, container, footer
│   └── ui/           # Buttons, toggles
├── features/
│   ├── collection/   # Album browsing and detail views
│   └── radio/        # Player, chat, settings
├── routes/           # Route definitions
├── services/
│   ├── api/          # API clients
│   └── storage/      # Local storage utilities
├── stores/           # Zustand stores
└── styles/           # Global styles
```

## Environment Variables

```env
VITE_API_URL=http://localhost:6870
VITE_SOCKET_URL=ws://localhost:6871
VITE_STREAM_URL=https://stream.adoo.one/hls/test.m3u8
VITE_APP_ENV=development
```

## Deployment

Deployed to Vercel. See `vercel.json` for configuration.
