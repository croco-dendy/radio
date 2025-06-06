import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { PlayIcon, PauseIcon } from '../icons/player-icons';

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
  const [showControls, setShowControls] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = useCallback(() => {
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2000);
  }, [isPlaying]);

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
      onTouchStart={handleTouchStart}
    >
      <video
        ref={videoRef}
        playsInline
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
        <button
          type="button"
          onClick={onPlayClick}
          className={clsx(styles.playerButton)}
        >
          <span className={clsx(styles.playIcon)}>
            <PlayIcon className="w-24 h-24" />
          </span>
        </button>
      )}
      {isPlaying && (isHovering || (!isTouchDevice && showControls)) && (
        <button
          type="button"
          onClick={onPauseClick}
          className={clsx(styles.playerButton)}
        >
          <span className={clsx(styles.pauseIcon)}>
            <PauseIcon className="w-24 h-24" />
          </span>
        </button>
      )}
    </div>
  );
};

const styles = {
  videoWrapper: [
    'relative w-full h-full border border-moss-relic/40 rounded-2xl shadow-2xl overflow-hidden',
  ],
  video: ['w-full h-full bg-black object-cover'],
  playerButton: [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'flex items-center justify-center opacity-70 hover:opacity-100',
    'transition-opacity duration-200',
  ],
  playIcon: ['text-black'],
  pauseIcon: ['text-white'],
  overlay: ['absolute inset-0 bg-black/50 backdrop-blur-sm'],
  mutedLabel: [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'text-4xl md:text-6xl font-display font-bold uppercase tracking-widest',
    'text-white/80 drop-shadow-lg',
  ],
} as const;
