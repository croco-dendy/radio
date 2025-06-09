# Stream Server

Bun service that provides a WebSocket endpoint and serves the HLS stream.

## Environment

Create a `.env` file in this directory:

```bash
PORT=8888 # HTTP port for the Bun server
```

## Development

Start the Bun server with hot reload:

```bash
pnpm dev
```

### Local RTMP server

For local streaming you can launch an RTMP server via Docker:

```bash
pnpm rtmp:dev
```

This exposes port `1935` for incoming streams and port `8069` for the generated HLS output.


