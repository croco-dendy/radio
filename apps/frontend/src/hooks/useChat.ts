import { useEffect, useState } from 'react';
import { getSocket } from '@/services/socket';

export interface ChatMessage {
  nickname: string;
  text: string;
}

export const useChat = (nickname: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const ws = getSocket();
    const onMessage = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data);
        if (data?.type === 'chat' && typeof data.text === 'string' && typeof data.nickname === 'string') {
          setMessages((prev) => [...prev, { nickname: data.nickname, text: data.text }]);
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
