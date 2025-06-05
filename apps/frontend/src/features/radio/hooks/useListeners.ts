import { useEffect, useState, useRef, useCallback } from 'react';
import { subscribe } from '@/services/socket';
import { useSound } from './useSound';

export const useListeners = () => {
  const [listeners, setListeners] = useState<number>(0);
  const prevListenersRef = useRef<number>(0);
  const { play } = useSound();

  const handleMessage = useCallback(
    (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        if (data?.type === 'listeners' && typeof data.listeners === 'number') {
          const newListeners = data.listeners;
          // Play sound if someone joined (listeners count increased)
          if (newListeners > prevListenersRef.current) {
            play('join');
          }
          prevListenersRef.current = newListeners;
          setListeners(newListeners);
        }
      } catch {}
    },
    [play],
  );

  const handleClose = useCallback(() => setListeners(0), []);

  useEffect(() => {
    let ws: WebSocket | null = null;

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
  }, [handleMessage, handleClose]);

  return listeners;
};
