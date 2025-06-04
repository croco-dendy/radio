import { useEffect, useState } from 'react';
import { getSocket } from '@/services/socket';

export interface ChatMessage {
  nickname: string;
  text: string;
  timestamp: string;
}

export const useChat = (nickname: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const ws = getSocket();
    const onMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data?.type === 'chat' &&
          typeof data.text === 'string' &&
          typeof data.nickname === 'string'
        ) {
          setMessages((prev) => [
            ...prev,
            {
              nickname: data.nickname,
              text: data.text,
              timestamp: data.timestamp ?? new Date().toISOString(),
            },
          ]);
        }
      } catch {}
    };
    ws.addEventListener('message', onMessage);
    return () => ws.removeEventListener('message', onMessage);
  }, []);

  const sendMessage = (text: string) => {
    if (!nickname) return;
    const ws = getSocket();
    ws.send(JSON.stringify({ type: 'chat', nickname, text }));
  };

  return { messages, sendMessage };
};
