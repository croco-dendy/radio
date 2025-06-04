# Radio Monorepo

This repository contains a small streaming setup with two applications managed in a pnpm/Turbo monorepo:

- **`apps/frontend`** – a React web client built with Vite.
- **`apps/stream`** – a Bun based server that exposes an HLS stream and a WebSocket endpoint for listener counts.

## Requirements

- Node.js and pnpm
- Bun
- Docker (for the optional RTMP server)

Install dependencies from the repository root:

```bash
pnpm install
```

## Running the applications

### Frontend

Start the development server:

```bash
pnpm --filter @radio/frontend dev
```

Build for production:

```bash
pnpm --filter @radio/frontend build
```

### Stream server

Run the Bun server in development mode:

```bash
pnpm --filter @radio/stream dev
```

Start the local RTMP/HLS Docker container (required for streaming input):

```bash
pnpm --filter @radio/stream rtmp:dev
```

The RTMP container exposes port `1935` for incoming streams and serves generated HLS segments on port `8069`.

The Bun server reads configuration from an `.env` file and listens on `PORT` (defaults to `8888`).


