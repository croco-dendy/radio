import type React from 'react';
import clsx from 'clsx';
import { useNowPlaying } from '../hooks/useNowPlaying';

interface NowPlayingProps {
  className?: string;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({ className }) => {
  const { currentSong, isLoading, refresh } = useNowPlaying();

  const handleClick = () => {
    refresh();
  };

  return (
    <button
      className={clsx(styles.container, className, isLoading && styles.loading)}
      onClick={handleClick}
      title="Click to refresh song info"
      type="button"
    >
      <div className={clsx(styles.icon)}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Music note"
          role="img"
        >
          <path
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.title)}>
          {isLoading ? 'Loading...' : currentSong.title}
        </div>
        <div className={clsx(styles.artist)}>
          {isLoading ? '...' : currentSong.artist}
        </div>
      </div>
      <div
        className={clsx(styles.status, currentSong.isPlaying && styles.playing)}
      >
        <div className={clsx(styles.dot)} />
      </div>
    </button>
  );
};

const styles = {
  container: [
    'flex items-center gap-2.5 px-4',
    'hover:from-sun/25 hover:to-sun/15 transition-all duration-300',
    'cursor-pointer select-none text-paper-fog',
    'shadow-lg',
  ],
  icon: ['text-sun/90', 'drop-shadow-sm'],
  content: ['flex flex-col min-w-0 items-start'],
  title: ['text-sm font-semibold whitespace-nowrap', 'leading-tight'],
  artist: ['text-xs text-paper/80 truncate', 'leading-tight', 'max-w-32'],
  status: ['flex items-center'],
  playing: ['animate-pulse'],
  dot: ['w-2 h-2 rounded-full bg-sun', 'animate-pulse', 'drop-shadow-sm'],
  loading: ['opacity-70 cursor-wait'],
} as const;
