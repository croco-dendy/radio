import type React from 'react';
import { useStream } from '@/hooks/useStream';
import clsx from 'clsx';
import { Chat } from './chat';
import { useState } from 'react';
import { useListeners } from '@/hooks/useListeners';

const getMelomanLabel = (count: number) => {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return `${count} Меломанів`;
  if (n1 > 1 && n1 < 5) return `${count} Меломани`;
  if (n1 === 1) return `${count} Меломан`;
  return `${count} Меломанів`;
};

export const Radio: React.FC = () => {
  const { videoRef, streamAvailable } = useStream();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [nickname, setNickname] = useState<string>(
    () => localStorage.getItem('nickname') || '',
  );
  const listeners = useListeners();

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePauseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.headerContent)}>
          <div className={clsx(styles.titleWrapper)}>
            <img
              src="/logo.png"
              alt="Вінілове Радіо"
              className={clsx(styles.favicon)}
            />
            <h1 className={clsx(styles.title)}>Вінілове Радіо</h1>
          </div>
          <div className={clsx(styles.toolbar)}>
            {isPlaying && (
              <button
                type="button"
                onClick={handleMuteClick}
                className={clsx(styles.muteButton)}
              >
                <span className={clsx(styles.muteIcon)}>
                  {isMuted ? 'unmute' : 'mute'}
                </span>
              </button>
            )}
            <span className={clsx(styles.listeners)}>
              {getMelomanLabel(listeners - 1)} онлайн
            </span>
            {nickname && (
              <span className={clsx(styles.nickname)}>
                <span className={clsx(styles.plus)}>+</span>
                {nickname}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={clsx(styles.layout)}>
        <div className={clsx(styles.left)}>
          {streamAvailable ? (
            <div
              className={clsx(styles.videoWrapper)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <video
                ref={videoRef}
                playsInline
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
              {(isMuted || !isPlaying) && (
                <div className={clsx(styles.overlay)} />
              )}
              {isMuted && <div className={clsx(styles.mutedLabel)}>MUTED</div>}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  className={clsx(styles.playButton)}
                >
                  <span className={clsx(styles.playIcon)}>▶</span>
                </button>
              )}
              {isPlaying && isHovering && (
                <button
                  type="button"
                  onClick={handlePauseClick}
                  className={clsx(styles.pauseButton)}
                >
                  <span className={clsx(styles.pauseIcon)}>⏸</span>
                </button>
              )}
            </div>
          ) : (
            <div className={clsx(styles.fallback)}>
              <div className={clsx(styles.fallbackText)}>Відпочиваємо...</div>
            </div>
          )}
        </div>
        <div className={clsx(styles.chat)}>
          <Chat nickname={nickname} setNickname={setNickname} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: [
    'min-h-screen w-full bg-neutral-900/50 flex flex-col items-center justify-center text-neutral-100 p-4',
  ],
  header: ['w-full max-w-[1200px] mb-5 p-2 md:p-4'],
  headerContent: ['flex justify-between items-center gap-4'],
  titleWrapper: ['flex items-center gap-3'],
  favicon: ['w-10 h-10'],
  title: ['font-bold text-xl md:text-2xl drop-shadow-xl'],
  toolbar: ['flex items-center gap-4'],
  listeners: ['text-xs md:text-base text-white/40 font-display uppercase'],
  nickname: ['text-sun font-display uppercase'],
  plus: ['lowercase mr-2 text-white/60'],
  layout: [
    'flex flex-col md:flex-row gap-4 w-full max-w-[1200px] justify-center',
  ],
  left: ['w-full md:w-2/3 h-[45vh] md:h-[55vh] flex flex-col items-center'],
  videoWrapper: [
    'relative w-full h-full border border-moss-relic/40 rounded-2xl shadow-2xl overflow-hidden',
  ],
  video: ['w-full h-full bg-black object-cover'],
  playButton: [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-16 h-16 md:w-24 md:h-24 rounded-full bg-sun-calm/90 hover:bg-sun-calm',
    'flex items-center justify-center transition-colors duration-200',
    'shadow-lg hover:shadow-xl',
  ],
  playIcon: ['text-4xl text-black'],
  pauseButton: [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-16 h-16 md:w-24 md:h-24 rounded-full bg-neutral-900/80 hover:bg-neutral-900',
    'flex items-center justify-center transition-colors duration-200',
    'shadow-lg hover:shadow-xl',
  ],
  pauseIcon: ['text-4xl'],
  overlay: ['absolute inset-0 bg-black/50 backdrop-blur-sm'],
  mutedLabel: [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'text-4xl md:text-6xl font-display font-bold uppercase tracking-widest',
    'text-white/80 drop-shadow-lg',
  ],
  muteButton: [
    'px-4 py-2 rounded-full bg-neutral-900/80 hover:bg-neutral-900',
    'flex items-center justify-center transition-colors duration-200',
    'shadow-lg hover:shadow-xl text-sm uppercase tracking-wider',
  ],
  muteIcon: ['font-display'],
  fallback: [
    'relative w-full h-full flex flex-col items-center justify-center rounded-2xl shadow-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden',
  ],
  fallbackText: ['text-xl font-bold opacity-20'],
  chat: ['h-[45vh] md:h-[55vh]'],
};
