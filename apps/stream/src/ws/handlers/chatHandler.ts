import type { ServerWebSocket } from 'bun';
import type { ChatPayload, JoinPayload, WebSocketData } from '../types';
import { addMessage } from '../../utils/chatStore';
import { addUser, updateUserLastSeen } from '../../utils/userStore';
import { clientStore } from '../utils/clientStore';

function setUserNickname(
  ws: ServerWebSocket<WebSocketData>,
  nickname: string,
): boolean {
  // Return true if nickname was actually set (not already set)
  if (ws.data?.nickname === nickname) {
    updateUserLastSeen(nickname);
    return false; // No change
  }

  ws.data = { ...ws.data, nickname };
  addUser(nickname);
  updateUserLastSeen(nickname);
  return true; // Nickname was set/changed
}

export function handleChatMessage(
  ws: ServerWebSocket<WebSocketData>,
  message: string | Buffer,
) {
  try {
    const data = JSON.parse(message.toString()) as ChatPayload | JoinPayload;

    if (data?.type === 'join') {
      const joinData = data as JoinPayload;
      if (joinData.nickname) {
        const wasChanged = setUserNickname(ws, joinData.nickname);
        // Broadcast will be handled by server.ts broadcastListeners
        // Only trigger if this is a new nickname
        if (wasChanged) {
          // The server will handle broadcasting through broadcastListeners
        }
      }
    } else if (data?.type === 'chat') {
      const chatData = data as ChatPayload;
      const payload: ChatPayload = {
        type: 'chat',
        nickname: chatData.nickname,
        text: chatData.text,
        timestamp: new Date().toISOString(),
      };

      if (chatData.nickname) {
        setUserNickname(ws, chatData.nickname);
        // Don't broadcast user changes here - let broadcastListeners handle it
      }

      addMessage(payload);
      clientStore.broadcast(JSON.stringify(payload));
    }
  } catch (error) {
    console.error('Error handling chat message:', error);
  }
}
