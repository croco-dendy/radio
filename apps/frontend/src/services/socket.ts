import { socketUrl } from './env';

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
const subscribers = new Set<(ws: WebSocket) => void>();

function notify(ws: WebSocket) {
  for (const cb of subscribers) cb(ws);
}

function connect() {
  socket = new WebSocket(socketUrl);
  socket.addEventListener('open', () => notify(socket!));
  socket.addEventListener('close', scheduleReconnect);
  socket.addEventListener('error', scheduleReconnect);
}

function scheduleReconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, 1000);
}

function ensureSocket() {
  if (!socket || socket.readyState === WebSocket.CLOSED) connect();
}

export const subscribe = (cb: (ws: WebSocket) => void) => {
  subscribers.add(cb);
  if (socket && socket.readyState === WebSocket.OPEN) cb(socket);
  ensureSocket();
  return () => subscribers.delete(cb);
};

export const getSocket = () => {
  ensureSocket();
  return socket!;
};

export const closeSocket = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  socket?.close();
  socket = null;
};
