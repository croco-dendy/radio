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

export interface ColorUpdatePayload {
  type: 'color_update';
  nickname: string;
  color: string | null; // null means auto mode
}

export interface WebSocketData {
  nickname?: string;
  color?: string | null; // null means auto mode, undefined means not set
}

export interface WebSocketClient {
  ws: ServerWebSocket<WebSocketData>;
  lastPong: number;
}

export interface WebSocketServer {
  stop: () => void;
}
