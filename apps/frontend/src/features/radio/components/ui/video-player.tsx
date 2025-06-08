import React, { useEffect } from 'react';
import clsx from 'clsx';
import { PlayIcon, PauseIcon } from '../icons/player-icons';
import { Button } from '@/components/ui';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  isMuted: boolean;
  isHovering: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  isPlaying,
  isMuted,
  isHovering,
  onPlayClick,
  onPauseClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={clsx(styles.videoWrapper)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <video
        ref={videoRef}
        playsInline
        controls
        autoPlay={false}
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
      {(isMuted || !isPlaying) && <div className={clsx(styles.overlay)} />}
      {isMuted && <div className={clsx(styles.mutedLabel)}>MUTED</div>}
      {!isPlaying && (
        <Button
          variant="player"
          onClick={onPlayClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className={clsx(styles.playIcon)}>
            <PlayIcon className="w-24 h-24" />
          </span>
        </Button>
      )}
      {isPlaying && isHovering && (
        <Button
          variant="player"
          onClick={onPauseClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className={clsx(styles.pauseIcon)}>
            <PauseIcon className="w-24 h-24" />
          </span>
        </Button>
      )}
    </div>
  );
};

const styles = {
  videoWrapper: [
    'relative w-full h-full border border-moss-relic/40 rounded-2xl shadow-2xl overflow-hidden',
  ],
  video: ['w-full h-full bg-black object-cover'],

  playIcon: ['text-black'],
  pauseIcon: ['text-white'],
  overlay: ['absolute inset-0 bg-black/50 backdrop-blur-sm'],
  mutedLabel: [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'text-4xl md:text-6xl font-display font-bold uppercase tracking-widest',
    'text-white/80 drop-shadow-lg',
  ],
} as const;
