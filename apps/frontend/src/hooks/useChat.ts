import { useEffect, useState, useRef } from 'react';
import { subscribe, getSocket } from '@/services/socket';

export interface ChatMessage {
  nickname: string;
  text: string;
  timestamp: string;
}

const DEBOUNCE_TIME = 1000; // 1 second debounce

export const useChat = (nickname: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messageSoundRef = useRef<HTMLAudioElement | null>(null);
  const sendSoundRef = useRef<HTMLAudioElement | null>(null);
  const lastSoundTimeRef = useRef<number>(0);

  useEffect(() => {
    // Initialize audio elements
    messageSoundRef.current = new Audio('/sounds/message.mp3');
    messageSoundRef.current.volume = 0.2; // Set volume to 20%

    sendSoundRef.current = new Audio('/sounds/send.wav');
    sendSoundRef.current.volume = 0.2; // Set volume to 20%

    let ws: WebSocket | null = null;
    const onMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data?.type === 'chat' &&
          typeof data.text === 'string' &&
          typeof data.nickname === 'string'
        ) {
          const newMessage = {
            nickname: data.nickname,
            text: data.text,
            timestamp: data.timestamp ?? new Date().toISOString(),
          };

          setMessages((prev) => [...prev, newMessage]);

          // Play sound only for messages from other users
          if (data.nickname !== nickname) {
            const now = Date.now();
            if (now - lastSoundTimeRef.current > DEBOUNCE_TIME) {
              messageSoundRef.current?.play().catch(() => {});
              lastSoundTimeRef.current = now;
            }
          }
        }
      } catch {}
    };
    const attach = (socket: WebSocket) => {
      ws?.removeEventListener('message', onMessage);
      ws = socket;
      ws.addEventListener('message', onMessage);
    };

    const unsubscribe = subscribe(attach);

    return () => {
      ws?.removeEventListener('message', onMessage);
      unsubscribe();
    };
  }, [nickname]); // Added nickname to dependencies since we use it in the effect

  const sendMessage = (text: string) => {
    if (!nickname) return;
    const ws = getSocket();
    ws.send(JSON.stringify({ type: 'chat', nickname, text }));
    // Play send sound when user sends a message
    sendSoundRef.current?.play().catch(() => {});
  };

  return { messages, sendMessage };
};
