import { useState } from 'react';
import { useChat } from '@/hooks/useChat';

export const Chat = () => {
  const [nickname, setNickname] = useState<string>(
    () => localStorage.getItem('nickname') || '',
  );
  const [nickInput, setNickInput] = useState(nickname);
  const [message, setMessage] = useState('');

  const { messages, sendMessage } = useChat(nickname || null);

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

  if (!nickname) {
    return (
      <div className="p-4 bg-neutral-800/60 rounded-xl flex flex-col gap-2">
        <input
          value={nickInput}
          onChange={(e) => setNickInput(e.target.value)}
          placeholder="Nickname"
          className="px-3 py-2 rounded text-black"
        />
        <button
          type="button"
          onClick={handleSetNickname}
          className="bg-moss text-white rounded px-4 py-2"
        >
          Join chat
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-1 mb-2 p-2 rounded bg-neutral-800/60">
        {messages.map((message) => (
          <div
            key={`${message.nickname}-${message.text}-${message.timestamp ?? ''}`}
          >
            <span className="font-semibold text-moss">{message.nickname}:</span>{' '}
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-3 py-2 rounded text-black"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-ember text-white px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
};
