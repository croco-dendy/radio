import { useEffect, useState } from 'react';
import { subscribe } from '@/services/socket';

export const useListeners = () => {
  const [listeners, setListeners] = useState<number>(0);

  useEffect(() => {
    let ws: WebSocket | null = null;

    const handleMessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        if (typeof data.listeners === 'number') setListeners(data.listeners);
      } catch {}
    };

    const handleClose = () => setListeners(0);

    const attach = (socket: WebSocket) => {
      ws?.removeEventListener('message', handleMessage);
      ws?.removeEventListener('close', handleClose);
      ws = socket;
      ws.addEventListener('message', handleMessage);
      ws.addEventListener('close', handleClose);
    };

    const unsubscribe = subscribe(attach);

    return () => {
      ws?.removeEventListener('message', handleMessage);
      ws?.removeEventListener('close', handleClose);
      unsubscribe();
    };
  }, []);

  return listeners;
};
