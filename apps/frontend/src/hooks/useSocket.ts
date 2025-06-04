import { useEffect, useState } from 'react';
import { getSocket } from '@/services/socket';

export const useSocket = () => {
  const [listeners, setListeners] = useState<number>(0);

  useEffect(() => {
    const ws = getSocket();

    const handleMessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        if (typeof data.listeners === 'number') setListeners(data.listeners);
      } catch {}
    };

    const handleClose = () => setListeners(0);

    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', handleClose);

    return () => {
      ws.removeEventListener('message', handleMessage);
      ws.removeEventListener('close', handleClose);
    };
  }, []);

  return listeners;
};
