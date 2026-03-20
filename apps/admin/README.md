# @radio/admin

Admin panel for the Radio streaming platform. Built with React 18, Vite, and Tailwind CSS.

## Quick Start

```bash
# From monorepo root
pnpm admin:dev
# Open http://localhost:3001
```

## Features

- **Collection Management** - Albums, songs, playlists with filtering and search
- **Stream Control** - RTMP server and Telegram stream management
- **User Management** - Create and manage user accounts
- **Real-time Monitoring** - System health and service status via WebSocket
- **PWA Support** - Installable as a Progressive Web App

## Tech Stack

- React 18 + TypeScript
- Vite (dev server and build)
- TanStack Router (file-based routing)
- TanStack Query (server state)
- Zustand (client state)
- Tailwind CSS + @radio/mojo-ui components
- Framer Motion (animations)

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server (port 3001) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests (Vitest) |
| `pnpm lint` | Lint with Biome |
| `pnpm check-types` | TypeScript type check |

## Project Structure

```
src/
├── components/       # Shared UI components (form inputs, notifications)
├── features/
│   ├── admin/        # Admin layout, navigation, user menu
│   ├── auth/         # Login page
│   ├── collection/   # Album and playlist management
│   ├── main/         # Main dashboard
│   ├── stream/       # Stream control interface
│   └── users/        # User management
├── routes/           # TanStack Router route definitions
├── services/api/     # API clients and hooks
└── styles/           # Global styles
```

## Environment Variables

```env
VITE_APP_ENV=development
VITE_API_URL=http://localhost:6870
VITE_SOCKET_URL=ws://localhost:6871
```
