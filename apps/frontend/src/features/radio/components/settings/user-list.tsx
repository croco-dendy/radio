import type React from 'react';
import clsx from 'clsx';
import type { User } from '@/features/radio/hooks/useUserList';
import { useUserList } from '@/features/radio/hooks/useUserList';
import { StatusIcon } from '../icons/status-icon';
import { useUserColor } from '../../hooks/useUserColor';

interface UserListProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to get status display based on online status
const getStatusDisplay = (isOnline: boolean) => {
  return {
    indicator: (
      <StatusIcon
        className={isOnline ? 'text-green-500' : 'text-gray-500 opacity-60'}
        aria-label={isOnline ? 'Online status' : 'Offline status'}
      />
    ),
    title: isOnline ? 'Онлайн' : 'Офлайн',
  };
};

export const UserList: React.FC<UserListProps> = ({ isOpen, onClose }) => {
  const users = useUserList();
  const { getEffectiveColor } = useUserColor();
  console.log('🚀 ~ users:', users);

  if (!isOpen) return null;

  return (
    <div
      className={clsx(styles.overlay)}
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="presentation"
    >
      <dialog
        className={clsx(styles.modal)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        open
        aria-labelledby="user-list-title"
      >
        <div className={clsx(styles.header)}>
          <h3 id="user-list-title" className={clsx(styles.title)}>
            Список користувачів ({users.length})
          </h3>
          <button
            type="button"
            onClick={onClose}
            onKeyDown={(e) => e.key === 'Enter' && onClose()}
            className={clsx(styles.closeButton)}
            aria-label="Close user list"
          >
            ✕
          </button>
        </div>
        <div className={clsx(styles.list)}>
          {users.length === 0 ? (
            <div className={clsx(styles.empty)}>Список порожній</div>
          ) : (
            users.map((user) => (
              <div key={user.nickname} className={clsx(styles.user)}>
                <span
                  className={clsx(
                    styles.nickname,
                    getEffectiveColor(user.nickname, false),
                  )}
                >
                  {user.nickname}
                </span>
                <StatusIcon
                  className={clsx(
                    styles.status,
                    user.isOnline ? 'text-green-500' : 'text-gray-500',
                  )}
                  aria-label={user.isOnline ? 'Онлайн' : 'Офлайн'}
                />
              </div>
            ))
          )}
        </div>
      </dialog>
    </div>
  );
};

const styles = {
  overlay: [
    'fixed inset-0 bg-black/50 backdrop-blur-sm z-50',
    'flex items-center justify-center p-4',
  ],
  modal: [
    'w-full max-w-md bg-coal-relic/95 backdrop-blur-l rounded-2xl border border-moss/20',
    'flex flex-col max-h-[80vh]',
  ],
  header: ['flex items-center justify-between p-4'],
  title: ['text-lg font-display text-white/40 px-2'],
  closeButton: [
    'w-8 h-8 flex items-center justify-center rounded-full',
    'bg-neutral-900/40 hover:bg-neutral-900/60',
    'text-white/60 hover:text-white/80',
    'transition-colors duration-200',
  ],
  list: [
    'flex flex-col gap-2 p-4 overflow-y-auto',
    'scrollbar-thin scrollbar-thumb-moss/30 scrollbar-track-transparent',
    'overflow-y-auto',
  ],
  user: [
    'flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-900/40',
    'hover:bg-neutral-900/60 transition-colors duration-200',
  ],
  nickname: ['font-display uppercase'],
  status: ['transition-colors duration-200 cursor-help'],
  empty: ['text-white/40 text-center py-4'],
} as const;
