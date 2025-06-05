import type { ServerWebSocket } from 'bun';
import type { WebSocketClient, WebSocketData } from '../types';

class ClientStore {
  private clients: Set<ServerWebSocket<WebSocketData>> = new Set();
  private lastPongMap: Map<ServerWebSocket<WebSocketData>, number> = new Map();

  addClient(ws: ServerWebSocket<WebSocketData>) {
    this.clients.add(ws);
    this.lastPongMap.set(ws, Date.now());
  }

  removeClient(ws: ServerWebSocket<WebSocketData>) {
    this.clients.delete(ws);
    this.lastPongMap.delete(ws);
  }

  updateLastPong(ws: ServerWebSocket<WebSocketData>) {
    this.lastPongMap.set(ws, Date.now());
  }

  getLastPong(ws: ServerWebSocket<WebSocketData>): number {
    return this.lastPongMap.get(ws) ?? 0;
  }

  getClients(): Set<ServerWebSocket<WebSocketData>> {
    return this.clients;
  }

  getClientCount(): number {
    return this.clients.size;
  }

  broadcast(message: string) {
    for (const ws of this.clients) {
      ws.send(message);
    }
  }
}

export const clientStore = new ClientStore();
