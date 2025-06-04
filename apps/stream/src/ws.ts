console.log('Socket server starting...');
import { serve } from 'bun';
import type { ServerWebSocket } from 'bun';

interface ChatPayload {
  type: 'chat';
  nickname: string;
  text: string;
}

const clients = new Set<ServerWebSocket<unknown>>();

export function startWsServer(port = 3001) {
  serve({
    fetch(req, server) {
      if (server.upgrade(req)) return;
      return new Response('ws only', { status: 400 });
    },
    websocket: {
      open(ws: ServerWebSocket<unknown>) {
        console.log('🚀 New client:', ws.remoteAddress);
        clients.add(ws);
        broadcastListeners();
      },
      close(ws: ServerWebSocket<unknown>) {
        clients.delete(ws);
        broadcastListeners();
      },
      message(_ws: ServerWebSocket<unknown>, message: string | Buffer) {
        try {
          const data = JSON.parse(message.toString()) as ChatPayload;
          if (data?.type === 'chat') {
            broadcastChat(data);
          }
        } catch {}
      },
    },
    port,
  });

  function broadcastListeners() {
    const count = clients.size;
    for (const ws of clients) {
      ws.send(JSON.stringify({ listeners: count }));
    }
  }

  function broadcastChat(payload: ChatPayload) {
    const msg = JSON.stringify(payload);
    for (const ws of clients) {
      ws.send(msg);
    }
  }
}
