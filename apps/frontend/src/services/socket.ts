import { socketUrl } from './env';

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const baseReconnectDelay = 1000;
const subscribers = new Set<(ws: WebSocket) => void>();

function notify(ws: WebSocket) {
  for (const cb of subscribers) {
    try {
      cb(ws);
    } catch (error) {
      console.error('Error in socket subscriber callback:', error);
    }
  }
}

function connect() {
  try {
    if (socket && socket.readyState !== WebSocket.CLOSED) {
      return; // Already connected or connecting
    }

    socket = new WebSocket(socketUrl);

    socket.addEventListener('open', () => {
      if (socket) {
        console.log('WebSocket connected');
        reconnectAttempts = 0; // Reset reconnect attempts on successful connection

        // Send nickname if available in localStorage
        try {
          const nickname = localStorage.getItem('nickname');
          if (nickname) {
            socket.send(JSON.stringify({ type: 'join', nickname }));
          }
        } catch (error) {
          console.error('Error sending nickname on connect:', error);
        }

        notify(socket);
      }
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
      scheduleReconnect();
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      scheduleReconnect();
    });
  } catch (error) {
    console.error('Error creating WebSocket:', error);
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (reconnectTimer || reconnectAttempts >= maxReconnectAttempts) {
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
    }
    return;
  }

  const delay = baseReconnectDelay * 2 ** reconnectAttempts; // Exponential backoff
  reconnectAttempts++;

  console.log(
    `Scheduling reconnection attempt ${reconnectAttempts} in ${delay}ms`,
  );

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, delay);
}

function ensureSocket() {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    connect();
  }
}

export const subscribe = (cb: (ws: WebSocket) => void) => {
  subscribers.add(cb);

  if (socket && socket.readyState === WebSocket.OPEN) {
    try {
      cb(socket);
    } catch (error) {
      console.error('Error in initial subscription callback:', error);
    }
  }

  ensureSocket();

  return () => {
    try {
      subscribers.delete(cb);
    } catch (error) {
      console.error('Error removing subscriber:', error);
    }
  };
};

export const getSocket = () => {
  ensureSocket();
  if (!socket) {
    throw new Error('WebSocket is not connected.');
  }
  return socket;
};

export const closeSocket = () => {
  try {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }

    if (socket) {
      socket.close(1000, 'Manual close');
      socket = null;
    }

    reconnectAttempts = 0;
  } catch (error) {
    console.error('Error closing socket:', error);
  }
};

export const isConnected = () => {
  return socket && socket.readyState === WebSocket.OPEN;
};

export const getConnectionState = () => {
  if (!socket) return 'disconnected';

  switch (socket.readyState) {
    case WebSocket.CONNECTING:
      return 'connecting';
    case WebSocket.OPEN:
      return 'connected';
    case WebSocket.CLOSING:
      return 'closing';
    case WebSocket.CLOSED:
      return 'disconnected';
    default:
      return 'unknown';
  }
};
