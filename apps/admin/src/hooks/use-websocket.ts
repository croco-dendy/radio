import { useEffect, useState } from 'react';
import {
  initializeWebSocket,
  getWebSocketService,
} from '@/services/websocket-service';
import { socketUrl } from '@/services/env';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {
    url = socketUrl, // Use environment variable or fallback
    autoConnect = false, // Disable auto-connect by default to prevent connection errors during development
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<
    'connecting' | 'connected' | 'disconnected' | 'error'
  >('disconnected');

  useEffect(() => {
    if (!autoConnect) return;

    // Initialize WebSocket service
    initializeWebSocket(url);

    // Monitor connection state
    const checkConnectionState = () => {
      const service = getWebSocketService();
      if (service) {
        const connected = service.isConnected();
        setIsConnected(connected);
        setConnectionState(connected ? 'connected' : 'disconnected');
      }
    };

    // Check connection state periodically
    const interval = setInterval(checkConnectionState, 1000);
    checkConnectionState(); // Initial check

    return () => {
      clearInterval(interval);
    };
  }, [url, autoConnect]);

  const connect = () => {
    if (!getWebSocketService()) {
      initializeWebSocket(url);
    }
  };

  const disconnect = () => {
    const service = getWebSocketService();
    if (service) {
      service.disconnect();
      setIsConnected(false);
      setConnectionState('disconnected');
    }
  };

  return {
    isConnected,
    connectionState,
    connect,
    disconnect,
  };
};
