import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Message } from './chat-message';
import type { ChatMessagesProps } from './types';

export const ChatMessages = ({ messages, nickname }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!nickname) {
    return (
      <div className={clsx(styles.chatArea)}>
        <div className={clsx(styles.placeholder)}>
          <p className={clsx(styles.placeholderText)}>
            Введи ім'я, щоб побачити чатік
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.chatArea)}>
      <div ref={containerRef} className={clsx(styles.messages)}>
        {messages.length === 0 ? (
          <div className={clsx(styles.placeholder)}>
            <p className={clsx(styles.placeholderText)}>
              Поки пусто, будь першим!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              message={message}
              nickname={nickname}
              key={message.timestamp}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  chatArea: ['h-full overflow-hidden flex md:border-t border-moss/40'],
  messages: [
    'w-full overflow-y-auto overflow-x-hidden space-y-1 p-2 flex flex-col flex-start',
    'scrollbar-thin scrollbar-thumb-moss/30 scrollbar-track-transparent',
    'overflow-y-scroll scrollbar-gutter-stable [&::-webkit-scrollbar-button]:hidden',
    'scrollbar-none',
  ],
  placeholder: ['w-full h-full flex items-center justify-center p-4'],
  placeholderText: ['text-white/40 text-center'],
};
