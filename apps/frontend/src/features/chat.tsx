import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import clsx from 'clsx';
import { Message } from '@/components/message';

type ChatProps = {
  nickname: string;
  setNickname: (nickname: string) => void;
};

export const Chat = ({ nickname, setNickname }: ChatProps) => {
  const [nickInput, setNickInput] = useState(nickname);
  const [message, setMessage] = useState('');

  const { messages, sendMessage } = useChat(nickname || null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSetNickname = () => {
    const name = nickInput.trim();
    if (!name) return;
    setNickname(name);
    localStorage.setItem('nickname', name);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    sendMessage(text);
    setMessage('');
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <h2 className={clsx(styles.title)}>Чатик</h2>
      </div>
      <div className={clsx(styles.chatArea)}>
        <div ref={containerRef} className={clsx(styles.messages)}>
          {messages.map((message) => (
            <Message
              message={message}
              nickname={nickname}
              key={message.timestamp}
            />
          ))}
        </div>
      </div>
      {nickname ? (
        <form onSubmit={handleSend} className={clsx(styles.form)}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={clsx(styles.input)}
            placeholder="Шо кажеш?"
          />
          <button type="submit" className={clsx(styles.sendButton)}>
            Пук
          </button>
        </form>
      ) : (
        <div className={clsx(styles.join)}>
          <input
            value={nickInput}
            onChange={(e) => setNickInput(e.target.value)}
            placeholder="Введи нік"
            className={clsx(styles.input)}
          />
          <button
            type="button"
            onClick={handleSetNickname}
            className={clsx(styles.joinButton)}
          >
            Я тут
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: ['flex flex-col h-full'],
  header: [
    'p-2 font-display uppercase w-full flex items-center justify-end',
    'border-b border-moss/40',
  ],
  title: ['text-xl font-bold text-white/80'],
  chatArea: ['flex-1 h-full overflow-hidden flex border-y border-moss/40'],
  messages: [
    'w-full overflow-y-auto overflow-x-hidden space-y-1 p-2 flex flex-col flex-start',
    'scrollbar-thin scrollbar-thumb-moss/30 scrollbar-track-transparent',
    'overflow-y-scroll scrollbar-gutter-stable',
  ],
  form: ['flex items-center gap-2'],
  input: [
    'flex-grow p-2 rounded font-sans text-white bg-neutral-800/0',
    'focus:bg-neutral-800/0 focus:outline-none',
  ],
  sendButton: [
    'bg-sun-calm shadow-md font-display font-bold text-l uppercase text-black px-4 py-1 rounded-full',
  ],
  join: ['flex gap-2'],
  joinButton: [
    'bg-sun-calm shadow-md font-display font-bold text-l uppercase whitespace-nowrap text-black px-4 py-1 rounded-full',
  ],
};
