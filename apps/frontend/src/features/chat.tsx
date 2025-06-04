import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useListeners } from '@/hooks/useListeners';
import clsx from 'clsx';
import { Message } from '@/components/message';

const getMelomanLabel = (count: number) => {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return `${count} Меломанів`;
  if (n1 > 1 && n1 < 5) return `${count} Меломани`;
  if (n1 === 1) return `${count} Меломан`;
  return `${count} Меломанів`;
};

export const Chat = () => {
  const [nickname, setNickname] = useState<string>(
    () => localStorage.getItem('nickname') || '',
  );
  const [nickInput, setNickInput] = useState(nickname);
  const [message, setMessage] = useState('');

  const { messages, sendMessage } = useChat(nickname || null);
  const listeners = useListeners();

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
    <div className="flex flex-col h-full max-h-[500px]">
      <div className="p-2 font-display uppercase w-full flex items-center justify-between gap-2">
        <span className="text-white/40">{getMelomanLabel(listeners - 1)}</span>
        <span className="text-sun">
          <span className="lowercase mr-2 text-white/60">+</span>
          {nickname}
        </span>
      </div>
      <div className="flex-1 h-full overflow-hidden flex border-y border-moss/40">
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
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 rounded font-sans text-white bg-neutral-800/0 focus:bg-neutral-800/0 focus:outline-none"
            placeholder="Шо кажеш?"
          />
          <button
            type="submit"
            className="bg-sun-calm shadow-md font-display font-bold text-l uppercase text-black px-4 py-1 rounded-full"
          >
            Пук
          </button>
        </form>
      ) : (
        <div className="flex gap-2">
          <input
            value={nickInput}
            onChange={(e) => setNickInput(e.target.value)}
            placeholder="Введи нік"
            className="flex-grow p-2 rounded font-sans text-white bg-neutral-800/0 focus:bg-neutral-800/0 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSetNickname}
            className="bg-sun-calm shadow-md font-display font-bold text-l uppercase whitespace-nowrap text-black px-4 py-1 rounded-full"
          >
            Я тут
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  messages: [
    'w-full overflow-y-auto overflow-x-hidden space-y-1 p-2 flex flex-col flex-start',
    'scrollbar-thin scrollbar-thumb-moss/30 scrollbar-track-transparent',
  ],
};
