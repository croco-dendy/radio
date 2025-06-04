import { socketUrl } from './env';

let socket: WebSocket | null = null;

export const getSocket = () => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(socketUrl);
  }
  return socket;
};

export const closeSocket = () => {
  socket?.close();
  socket = null;
};
