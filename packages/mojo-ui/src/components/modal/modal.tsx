import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { CloseIcon } from '../../icons';
import styles from './modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = 'max-w-4xl',
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          className={styles.overlay}
          onClick={handleBackdropClick}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (
              (e.key === 'Enter' || e.key === ' ') &&
              e.target === e.currentTarget
            ) {
              onClose();
            }
          }}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        >
          <motion.div
            key="modal-content"
            className={clsx(styles.modal, maxWidth, className)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {(title || showCloseButton) && (
              <div className={styles.header}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Close modal"
                  >
                    <CloseIcon size={24} />
                  </button>
                )}
              </div>
            )}
            <div className={styles.content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
