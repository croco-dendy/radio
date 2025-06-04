import type React from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useStream } from '@/hooks/useStream';

export const Radio: React.FC = () => {
  const { videoRef, streamAvailable } = useStream();
  const listeners = useSocket();

  return (
    <div className="min-h-screen w-full bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-100">
      <h1 className="font-bold text-3xl mb-6 drop-shadow-xl">Вінілове Радіо</h1>

      {streamAvailable ? (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-800 bg-black"
          style={{ aspectRatio: '16/9' }}
        >
          <track
            kind="captions"
            src=""
            srcLang="uk"
            label="Ukrainian captions"
            default
          />
        </video>
      ) : (
        <div className="relative w-full max-w-2xl aspect-video flex flex-col items-center justify-center rounded-2xl shadow-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden">
          <div className="text-xl font-bold opacity-20">Відпочиваємо...</div>
        </div>
      )}
      <div className="mt-8 px-8 py-3 rounded-xl bg-neutral-800 text-xl font-semibold shadow-lg flex items-center gap-2">
        <span role="img" aria-label="sound">
          🔊
        </span>
        Слухають: {listeners}
      </div>
    </div>
  );
};
