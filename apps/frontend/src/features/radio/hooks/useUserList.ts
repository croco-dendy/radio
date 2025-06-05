import { useEffect, useState, useCallback } from 'react';
import { subscribe } from '@/services/socket';

export interface User {
  nickname: string;
  lastSeen: string;
}

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleMessage = useCallback((msg: MessageEvent) => {
    try {
      const data = JSON.parse(msg.data);

      if (data?.type === 'listeners' && Array.isArray(data.users)) {
        const userList = [...data.users];

        if (
          typeof data.listeners === 'number' &&
          data.listeners > userList.length
        ) {
          const anonymousCount = data.listeners - userList.length;
          for (let i = 0; i < anonymousCount; i++) {
            userList.push({
              nickname: 'Анонім',
              lastSeen: new Date().toISOString(),
            });
          }
        }

        setUsers(userList);
      } else if (data?.type === 'users' && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let ws: WebSocket | null = null;

    const attach = (socket: WebSocket) => {
      ws?.removeEventListener('message', handleMessage);
      ws = socket;
      ws.addEventListener('message', handleMessage);
    };

    const unsubscribe = subscribe(attach);

    return () => {
      ws?.removeEventListener('message', handleMessage);
      unsubscribe();
    };
  }, [handleMessage]);

  return users;
};
