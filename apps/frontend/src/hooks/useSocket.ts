import { useEffect, useState } from 'react';
import { socketUrl } from '@/services/env';

export const useSocket = () => {
  const [listeners, setListeners] = useState<number>(0);

  useEffect(() => {
    const ws = new window.WebSocket(socketUrl);

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (typeof data.listeners === 'number') setListeners(data.listeners);
      } catch {}
    };

    ws.onclose = () => setListeners(0);
    return () => ws.close();
  }, []);

  return listeners;
};
