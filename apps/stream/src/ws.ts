console.log('Socket server starting...');
import { serve } from 'bun';
import type { ServerWebSocket } from 'bun';
import { addMessage, getHistory } from './utils/chatStore';

interface ChatPayload {
  type: 'chat';
  nickname: string;
  text: string;
  timestamp: string;
}

const clients = new Set<ServerWebSocket<unknown>>();
const lastPong = new Map<ServerWebSocket<unknown>, number>();

export function startWsServer(port = 3001) {
  const server = serve({
    fetch(req, server) {
      if (server.upgrade(req)) return;
      return new Response('ws only', { status: 400 });
    },
    websocket: {
      open(ws: ServerWebSocket<unknown>) {
        console.log('🚀 New client:', ws.remoteAddress);
        clients.add(ws);
        lastPong.set(ws, Date.now());
        broadcastListeners();
        for (const msg of getHistory()) {
          ws.send(JSON.stringify({ type: 'chat', ...msg }));
        }
      },
      close(ws: ServerWebSocket<unknown>) {
        clients.delete(ws);
        lastPong.delete(ws);
        broadcastListeners();
      },
      message(_ws: ServerWebSocket<unknown>, message: string | Buffer) {
        try {
          const data = JSON.parse(message.toString()) as ChatPayload;
          if (data?.type === 'chat') {
            const payload: ChatPayload = {
              type: 'chat',
              nickname: data.nickname,
              text: data.text,
              timestamp: new Date().toISOString(),
            };
            addMessage(payload);
            broadcastChat(payload);
          }
        } catch {}
      },
      pong(ws: ServerWebSocket<unknown>) {
        lastPong.set(ws, Date.now());
      },
    },
    port,
  });

  const interval = setInterval(() => {
    const now = Date.now();
    for (const ws of clients) {
      const last = lastPong.get(ws) ?? 0;
      if (now - last > 30000) {
        try {
          ws.close();
        } catch {}
        clients.delete(ws);
        lastPong.delete(ws);
        broadcastListeners();
        continue;
      }
      try {
        ws.ping();
      } catch {}
    }
  }, 10000);

  return {
    stop() {
      clearInterval(interval);
      server.stop();
    },
  };

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
