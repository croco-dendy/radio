# Frontend

This directory contains the Vite powered React client.

This project uses Vite for the frontend build. Several `.env` files specify the `VITE_APP_ENV` variable to describe the current environment. Expected values are:

- `development` - used when running locally using `.env.example`.
- `preview` - used by preview deployments via `.env.preview`.
- `production` - used for production builds via `.env.production`.

Adjust other variables (API URLs, sockets, etc.) as required for each environment.

## Install dependencies

From the repository root run:

```bash
pnpm install
```

## Development

Copy the provided environment file and start the server:

```bash
cp .env.example .env
pnpm dev
```

The app will be available on <http://localhost:5173> by default.

## Build

Create an optimized production bundle with:

```bash
pnpm build
```
