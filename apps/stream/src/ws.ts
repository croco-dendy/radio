// ws-server.js
import { serve } from 'bun';

import type { ServerWebSocket } from 'bun';

const clients = new Set<ServerWebSocket<unknown>>();

export function startWsServer(port = 3001) {
  serve({
    fetch(req, server) {
      if (server.upgrade(req)) return;
      return new Response('ws only', { status: 400 });
    },
    websocket: {
      open(ws: ServerWebSocket<unknown>) {
        clients.add(ws);
        broadcast();
      },
      close(ws: ServerWebSocket<unknown>) {
        clients.delete(ws);
        broadcast();
      },
      message(ws: ServerWebSocket<unknown>, message: string | Buffer) {
        // No-op or handle incoming messages here if needed
      },
    },
    port,
  });

  function broadcast() {
    const count = clients.size;
    for (const ws of clients) {
      ws.send(JSON.stringify({ listeners: count }));
    }
  }
}
