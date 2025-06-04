import type React from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useStream } from '@/hooks/useStream';
import { Chat } from './chat';
import { Library } from './library';
import { useState } from 'react';

export const Radio: React.FC = () => {
  const { videoRef, streamAvailable } = useStream();
  const listeners = useSocket();
  const [tab, setTab] = useState<'chat' | 'library'>('chat');

  return (
    <div className="min-h-screen w-full bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-100 p-4">
      <h1 className="font-bold text-3xl mb-6 drop-shadow-xl">Вінілове Радіо</h1>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl">
        <div className="flex-1 flex flex-col items-center">
          {streamAvailable ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full rounded-2xl shadow-2xl border border-neutral-800 bg-black"
              style={{ aspectRatio: '16/9' }}
            >
              <track kind="captions" src="" srcLang="uk" label="Ukrainian captions" default />
            </video>
          ) : (
            <div className="relative w-full aspect-video flex flex-col items-center justify-center rounded-2xl shadow-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
              <div className="text-xl font-bold opacity-20">Відпочиваємо...</div>
            </div>
          )}
          <div className="mt-4 px-8 py-3 rounded-xl bg-neutral-800 text-xl font-semibold shadow-lg flex items-center gap-2">
            <span role="img" aria-label="sound">
              🔊
            </span>
            Слухають: {listeners}
          </div>
        </div>
        <div className="w-full md:w-80">
          <div className="mb-2 flex justify-center gap-2">
            <button
              onClick={() => setTab('chat')}
              className={`px-3 py-1 rounded-md text-sm font-semibold ${tab === 'chat' ? 'bg-moss text-white' : 'bg-neutral-700 text-white/70'}`}
            >
              Chat
            </button>
            <button
              onClick={() => setTab('library')}
              className={`px-3 py-1 rounded-md text-sm font-semibold ${tab === 'library' ? 'bg-moss text-white' : 'bg-neutral-700 text-white/70'}`}
            >
              Library
            </button>
          </div>
          {tab === 'chat' ? <Chat /> : <Library />}
        </div>
      </div>
    </div>
  );
};
