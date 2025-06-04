import type React from 'react';
import { useStream } from '@/hooks/useStream';
import clsx from 'clsx';
import { Chat } from './chat';

export const Radio: React.FC = () => {
  const { videoRef, streamAvailable } = useStream();

  return (
    <div className={clsx(styles.container)}>
      <h1 className={clsx(styles.title)}>Вінілове Радіо</h1>

      <div className={clsx(styles.layout)}>
        <div className={clsx(styles.left)}>
          {streamAvailable ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              className={clsx(styles.video)}
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
            <div className={clsx(styles.fallback)}>
              <div className={clsx(styles.fallbackText)}>
                Відпочиваємо...
              </div>
            </div>
          )}
        </div>
        <div className={clsx(styles.chat)}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: [
    'min-h-screen w-full bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-100 p-4',
  ],
  title: ['font-bold text-3xl mb-6 drop-shadow-xl'],
  layout: ['flex flex-col md:flex-row gap-4 w-full max-w-[1200px]'],
  left: ['flex-1 flex flex-col items-center'],
  video: ['w-full rounded-2xl shadow-2xl border border-neutral-800 bg-black'],
  fallback: [
    'relative w-full aspect-video flex flex-col items-center justify-center rounded-2xl shadow-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden',
  ],
  fallbackText: ['text-xl font-bold opacity-20'],
  chat: ['w-full md:w-80'],
};
