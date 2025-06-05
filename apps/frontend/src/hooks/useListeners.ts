import { useEffect, useState, useRef } from 'react';
import { subscribe } from '@/services/socket';

export const useListeners = () => {
  const [listeners, setListeners] = useState<number>(0);
  const prevListenersRef = useRef<number>(0);
  const joinSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    joinSoundRef.current = new Audio('/sounds/join.wav');
    joinSoundRef.current.volume = 0.3; // Set volume to 30%

    let ws: WebSocket | null = null;

    const handleMessage = (msg: MessageEvent) => {
      try {
        const data = JSON.parse(msg.data);
        if (typeof data.listeners === 'number') {
          const newListeners = data.listeners;
          // Play sound if someone joined (listeners count increased)
          if (newListeners > prevListenersRef.current) {
            joinSoundRef.current?.play().catch(() => {});
          }
          prevListenersRef.current = newListeners;
          setListeners(newListeners);
        }
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
