import clsx from 'clsx';
import { useChat } from '@/features/radio/hooks/useChat';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';
import { NicknameInput } from './nickname-input';
import type { ChatProps } from './types';
import { useSound } from '../../hooks/useSound';
import { SoundControl } from '../sound/sound-control';
import { getSocket } from '@/services/socket';

export const Chat = ({ nickname, setNickname }: ChatProps) => {
  const { messages, sendMessage } = useChat(nickname || null);

  const handleSetNickname = (name: string) => {
    setNickname(name);
    localStorage.setItem('nickname', name);

    // Send join message if socket is already connected
    try {
      const ws = getSocket();
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'join', nickname: name }));
      }
    } catch {
      // Socket not ready yet, will be sent on next connection
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <SoundControl />
        <h2 className={clsx(styles.title)}>Чатік</h2>
      </div>
      <ChatMessages messages={messages} nickname={nickname} />
      {nickname ? (
        <ChatInput onSend={sendMessage} />
      ) : (
        <NicknameInput
          initialNickname={nickname}
          onSetNickname={handleSetNickname}
        />
      )}
    </div>
  );
};

const styles = {
  container: ['flex flex-col w-full h-full'],
  header: [
    'flex p-2 font-display uppercase w-full items-center justify-between',
    'border-b border-moss/40',
  ],
  title: ['text-lg md:text-xl font-bold text-white/80'],
} as const;
