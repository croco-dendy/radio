import type React from 'react';
import clsx from 'clsx';
import { getMelomanLabel } from '../utils';

interface HeaderProps {
  isPlaying: boolean;
  isMuted: boolean;
  listeners: number;
  nickname: string;
  onMuteClick: () => void;
  onUserListClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isPlaying,
  isMuted,
  listeners,
  nickname,
  onMuteClick,
  onUserListClick,
}) => {
  return (
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
              onClick={onMuteClick}
              className={clsx(styles.muteButton)}
            >
              <span className={clsx(styles.muteLabel)}>
                {isMuted ? 'muted' : 'mute'}
              </span>
            </button>
          )}
          {nickname && (
            <button
              type="button"
              onClick={onUserListClick}
              className={clsx(styles.userListButton)}
            >
              <span className={clsx(styles.listeners)}>
                {getMelomanLabel(listeners - 1)} онлайн
              </span>
            </button>
          )}
          {nickname && (
            <span className={clsx(styles.nickname)}>
              <span className={clsx(styles.plus)}>+</span>
              {nickname}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: ['w-full max-w-[1200px] md:mb-2 p-2'],
  headerContent: [
    'flex justify-between md:items-center gap-4 flex-col md:flex-row',
  ],
  titleWrapper: ['flex items-center gap-3'],
  favicon: ['w-10 h-10'],
  title: ['font-bold text-xl md:text-2xl drop-shadow-xl whitespace-nowrap'],
  toolbar: ['flex items-center gap-4 w-full justify-between md:justify-end'],
  listeners: ['text-base text-white/40 font-display uppercase'],
  nickname: ['text-sun font-display uppercase'],
  plus: ['mr-2 text-white/60'],
  muteButton: [
    'px-4 py-2 rounded-full bg-neutral-900/80 hover:bg-neutral-900',
    'flex items-center gap-2 transition-colors duration-200',
    'shadow-lg hover:shadow-xl text-sm uppercase tracking-wider',
  ],
  userListButton: [
    'flex items-center gap-2 transition-colors duration-200',
    'shadow-lg hover:shadow-xl text-sm uppercase tracking-wider',
    'cursor-pointer',
  ],
  buttonMuted: ['opacity-50'],
  muteLabel: ['font-display'],
} as const;
