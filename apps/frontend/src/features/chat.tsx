import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useListeners } from '@/hooks/useListeners';
import clsx from 'clsx';

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
        <span className="text-white">Друзів онлайн: {listeners}</span>
        <span className="text-white">{nickname}</span>
      </div>
      <div className="flex-1 h-full overflow-hidden flex border-y border-moss/40">
        <div ref={containerRef} className={clsx(styles.messages)}>
          {messages.map((message) => (
            <div
              className={clsx(message.nickname === nickname && 'text-right')}
              key={`${message.nickname}-${message.text}-${message.timestamp ?? ''}`}
            >
              {message.nickname !== nickname && (
                <span className="font-display font-semibold text-moss/80 mr-2 uppercase">
                  {message.nickname}
                </span>
              )}
              {message.text}
            </div>
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
    'flex-1 overflow-y-auto space-y-1 p-2',
    'scrollbar-thin scrollbar-thumb-moss/80 scrollbar-track-transparent',
  ],
};
