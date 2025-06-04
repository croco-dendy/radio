import { useEffect, useState } from 'react';
import { subscribe, getSocket } from '@/services/socket';

export interface ChatMessage {
  nickname: string;
  text: string;
  timestamp: string;
}

export const useChat = (nickname: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let ws: WebSocket | null = null;
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
  }, []);

  const sendMessage = (text: string) => {
    if (!nickname) return;
    const ws = getSocket();
    ws.send(JSON.stringify({ type: 'chat', nickname, text }));
  };

  return { messages, sendMessage };
};
