import type { ServerWebSocket } from 'bun';

export interface ChatPayload {
  type: 'chat';
  nickname: string;
  text: string;
  timestamp: string;
}

export interface JoinPayload {
  type: 'join';
  nickname: string;
}

export interface WebSocketData {
  nickname?: string;
}

export interface WebSocketClient {
  ws: ServerWebSocket<WebSocketData>;
  lastPong: number;
}

export interface WebSocketServer {
  stop: () => void;
}
