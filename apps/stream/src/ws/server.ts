import { serve } from 'bun';
import type { ServerWebSocket } from 'bun';
import type { WebSocketData, WebSocketServer } from './types';
import { handleChatMessage } from './handlers/chatHandler';
import { clientStore } from './utils/clientStore';
import { getHistory } from '../utils/chatStore';
import { getUsers, removeUser, type User } from '../utils/userStore';

// Debounce broadcasts to prevent excessive updates
let broadcastTimeout: ReturnType<typeof setTimeout> | null = null;

function debouncedBroadcastListeners() {
  if (broadcastTimeout) {
    clearTimeout(broadcastTimeout);
  }
  broadcastTimeout = setTimeout(() => {
    broadcastListeners();
    broadcastTimeout = null;
  }, 100); // 100ms debounce
}

export function startWsServer(port = 3001): WebSocketServer {
  const server = serve({
    fetch(req, server) {
      if (server.upgrade(req)) return;
      return new Response('ws only', { status: 400 });
    },
    websocket: {
      open(ws: ServerWebSocket<WebSocketData>) {
        clientStore.addClient(ws);

        // Send chat history
        for (const msg of getHistory()) {
          ws.send(JSON.stringify({ type: 'chat', ...msg }));
        }

        // Send initial users list
        ws.send(JSON.stringify({ type: 'users', users: getUsers() }));

        // Broadcast updated listener count (debounced)
        debouncedBroadcastListeners();
      },

      close(ws: ServerWebSocket<WebSocketData>) {
        if (ws.data?.nickname) {
          removeUser(ws.data.nickname);
        }
        clientStore.removeClient(ws);
        debouncedBroadcastListeners();
      },

      message(ws: ServerWebSocket<WebSocketData>, message: string | Buffer) {
        handleChatMessage(ws, message);
        // Only broadcast if there might be nickname changes
        debouncedBroadcastListeners();
      },

      pong(ws: ServerWebSocket<WebSocketData>) {
        clientStore.updateLastPong(ws);
      },
    },
    port,
  });

  const interval = setInterval(() => {
    const now = Date.now();
    let hasChanges = false;
    for (const ws of clientStore.getClients()) {
      const last = clientStore.getLastPong(ws);
      if (now - last > 30000) {
        try {
          ws.close();
        } catch {}
        clientStore.removeClient(ws);
        hasChanges = true;
        continue;
      }
      try {
        ws.ping();
      } catch {}
    }
    // Only broadcast if there were actual changes
    if (hasChanges) {
      debouncedBroadcastListeners();
    }
  }, 10000);

  return {
    stop() {
      clearInterval(interval);
      if (broadcastTimeout) {
        clearTimeout(broadcastTimeout);
      }
      server.stop();
    },
  };
}

function broadcastListeners() {
  const count = clientStore.getClientCount();

  // Get connected users with nicknames and lastSeen info
  const connectedUsers: User[] = [];
  for (const ws of clientStore.getClients()) {
    if (ws.data?.nickname) {
      connectedUsers.push({
        nickname: ws.data.nickname,
        lastSeen: new Date().toISOString(), // Currently active
      });
    }
  }

  const message = JSON.stringify({
    type: 'listeners',
    listeners: count,
    users: connectedUsers,
  });

  clientStore.broadcast(message);
}
