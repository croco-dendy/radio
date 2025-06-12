import type { ServerWebSocket } from 'bun';
import type { WebSocketData } from '../types';

class ClientStore {
  private clients: Set<ServerWebSocket<WebSocketData>> = new Set();
  private lastPongMap: Map<ServerWebSocket<WebSocketData>, number> = new Map();
  private lastActivityMap: Map<ServerWebSocket<WebSocketData>, number> =
    new Map();

  addClient(ws: ServerWebSocket<WebSocketData>) {
    this.clients.add(ws);
    const now = Date.now();
    this.lastPongMap.set(ws, now);
    this.lastActivityMap.set(ws, now);
  }

  removeClient(ws: ServerWebSocket<WebSocketData>) {
    this.clients.delete(ws);
    this.lastPongMap.delete(ws);
    this.lastActivityMap.delete(ws);
  }

  updateLastPong(ws: ServerWebSocket<WebSocketData>) {
    const now = Date.now();
    this.lastPongMap.set(ws, now);
    this.lastActivityMap.set(ws, now);
  }

  updateLastActivity(ws: ServerWebSocket<WebSocketData>) {
    this.lastActivityMap.set(ws, Date.now());
  }

  getLastPong(ws: ServerWebSocket<WebSocketData>): number {
    return this.lastPongMap.get(ws) ?? 0;
  }

  getLastActivity(ws: ServerWebSocket<WebSocketData>): number {
    return this.lastActivityMap.get(ws) ?? 0;
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
