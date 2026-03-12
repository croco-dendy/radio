# Radio Streaming Platform - Documentation

## Overview

Monorepo for a radio streaming platform featuring live and playlist-based streaming, an admin panel, and a public player interface.

### Apps

| App | Package | Port | Description |
|-----|---------|------|-------------|
| Wave | `@radio/wave` | 6870 (API), 6871 (WS) | Backend server (Bun + Hono + SQLite) |
| Admin | `@radio/admin` | 3001 | Admin panel (React + Vite) |
| Player | `@radio/player` | 3030 | Public player (React + Vite + HLS.js) |

### Packages

| Package | Description |
|---------|-------------|
| `@radio/types` | Shared TypeScript types (source-only, no build step) |
| `@radio/mojo-ui` | Retro UI component library (React + SCSS Modules) |

## Documentation Index

### Setup & Deployment
- [Complete Setup Guide](setup/README.md) - Prerequisites, installation, environment config
- [Environment Configuration](setup/environment.md) - Environment variables reference
- [Admin Setup](setup/admin-setup.md) - Creating admin users

### API Reference
- [API Documentation](api/README.md) - REST API overview and examples
- [Streaming API](api/streaming.md) - Stream control and monitoring endpoints

### App Documentation
- [Wave Backend](apps/wave.md)
- [Admin Panel](apps/admin.md)
- [Player](apps/player.md)

### Technical Documentation
- [Architecture Overview](docs/architecture.md)
- [Data Flow](docs/data-flow.md)
- [Streaming Setup Guide](docs/streaming-setup.md)
- [Development Workflows](docs/workflows.md)

### Component Library
- [Mojo UI](../packages/mojo-ui/README.md) - Retro-styled component library

## Quick Start

```bash
pnpm install
pnpm dev          # Start everything
```

Or individually:

```bash
pnpm wave:dev     # Backend
pnpm admin:dev    # Admin panel
pnpm player:dev   # Public player
pnpm mojo:dev     # Component showcase
```

## Tech Stack

- **Runtime**: Bun 1.2.9+, Node.js 22.15+
- **Backend**: Hono, Drizzle ORM, SQLite, WebSocket
- **Frontend**: React 18, Vite, TanStack Router & Query
- **Styling**: Tailwind CSS, SCSS Modules
- **UI Library**: @radio/mojo-ui
- **State**: Zustand (client), React Query (server)
- **Monorepo**: Turborepo + pnpm workspaces
- **Linting**: Biome
- **CI/CD**: GitHub Actions
