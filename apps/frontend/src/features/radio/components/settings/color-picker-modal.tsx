import type React from 'react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useUserColor } from '@/features/radio/hooks/useUserColor';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  nickname,
}) => {
  const {
    selectedColor,
    saveColor,
    resetToAuto,
    isAutoMode,
    colorOptions,
    generateNicknameColor,
  } = useUserColor();

  // Local state for preview
  const [previewColor, setPreviewColor] = useState<string | null>(
    selectedColor,
  );
  const [previewIsAuto, setPreviewIsAuto] = useState(isAutoMode);

  // Reset preview state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPreviewColor(selectedColor);
      setPreviewIsAuto(isAutoMode);
    }
  }, [isOpen, selectedColor, isAutoMode]);

  if (!isOpen) return null;

  const handleColorPreview = (color: string) => {
    setPreviewColor(color);
    setPreviewIsAuto(false);
  };

  const handleAutoPreview = () => {
    setPreviewColor(null);
    setPreviewIsAuto(true);
  };

  const handleConfirm = () => {
    if (previewIsAuto) {
      resetToAuto();
    } else if (previewColor) {
      saveColor(previewColor);
    }
    onClose();
  };

  const handleCancel = () => {
    // Reset preview to current settings
    setPreviewColor(selectedColor);
    setPreviewIsAuto(isAutoMode);
    onClose();
  };

  // Determine what color to show in preview
  const displayColor = previewIsAuto
    ? generateNicknameColor(nickname)
    : previewColor || selectedColor || generateNicknameColor(nickname);

  const currentMode = previewIsAuto ? 'auto' : 'manual';
  const hasChanges =
    previewIsAuto !== isAutoMode || previewColor !== selectedColor;

  return (
    <div
      className={clsx(styles.overlay)}
      onClick={handleCancel}
      onKeyDown={(e) => e.key === 'Escape' && handleCancel()}
      role="presentation"
    >
      <dialog
        className={clsx(styles.modal)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && handleCancel()}
        open
        aria-labelledby="color-picker-title"
      >
        <div className={clsx(styles.header)}>
          <h3 id="color-picker-title" className={clsx(styles.title)}>
            Оберіть колір імені
          </h3>
          <button
            type="button"
            onClick={handleCancel}
            className={clsx(styles.closeButton)}
            aria-label="Закрити вибір кольору"
          >
            ✕
          </button>
        </div>

        <div className={clsx(styles.content)}>
          <div className={clsx(styles.previewSection)}>
            <span className={clsx(styles.label)}>Попередній перегляд:</span>
            <span className={clsx(styles.nicknamePreview, displayColor)}>
              {nickname}
            </span>
            {currentMode === 'auto' && (
              <span className={clsx(styles.modeIndicator)}>Авто</span>
            )}
          </div>

          <div className={clsx(styles.section)}>
            <h4 className={clsx(styles.sectionTitle)}>Автоматичний режим</h4>
            <button
              type="button"
              onClick={handleAutoPreview}
              className={clsx(
                styles.autoButton,
                previewIsAuto && styles.autoButtonActive,
              )}
            >
              {previewIsAuto ? '✓ Обрано автоматичний' : 'Обрати автоматичний'}
            </button>
            <p className={clsx(styles.description)}>
              Колір генерується автоматично на основі імені
            </p>
          </div>

          <div className={clsx(styles.section)}>
            <h4 className={clsx(styles.sectionTitle)}>Обрати колір вручну</h4>
            <div className={clsx(styles.colorGrid)}>
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleColorPreview(color.value)}
                  className={clsx(
                    styles.colorButton,
                    previewColor === color.value &&
                      !previewIsAuto &&
                      styles.colorButtonActive,
                  )}
                  title={color.name}
                  style={{ backgroundColor: color.preview }}
                >
                  {previewColor === color.value && !previewIsAuto && (
                    <span className={clsx(styles.colorCheckmark)}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={clsx(styles.actions)}>
            <button
              type="button"
              onClick={handleCancel}
              className={clsx(styles.cancelButton)}
            >
              Скасувати
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!hasChanges}
              className={clsx(
                styles.confirmButton,
                !hasChanges && styles.confirmButtonDisabled,
              )}
            >
              Підтвердити
            </button>
          </div>
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
    'w-full max-w-sm bg-coal-relic/95 backdrop-blur-l rounded-2xl border border-moss/20',
    'flex flex-col max-h-[80vh]',
  ],
  header: ['flex items-center justify-between p-4'],
  title: ['text-lg font-display uppercase text-white/80'],
  closeButton: [
    'w-8 h-8 flex items-center justify-center rounded-full',
    'bg-neutral-900/40 hover:bg-neutral-900/60',
    'text-white/60 hover:text-white/80',
    'transition-colors duration-200',
  ],
  content: [
    'flex flex-col gap-6 p-4 overflow-y-auto',
    'scrollbar-thin scrollbar-thumb-moss/30 scrollbar-track-transparent',
  ],
  previewSection: [
    'flex items-center justify-between gap-2 p-3 rounded-lg bg-neutral-900/30',
  ],
  label: ['text-white/60 text-sm'],
  nicknamePreview: ['font-display uppercase text-lg'],
  modeIndicator: ['text-xs text-white/40 bg-moss/30 px-2 py-1 rounded'],
  section: ['flex flex-col gap-3'],
  sectionTitle: ['text-base font-display uppercase text-white/60'],
  autoButton: [
    'w-full px-4 py-3 rounded-lg bg-moss/40 hover:bg-moss/60',
    'text-white/90 hover:text-white text-sm',
    'transition-colors duration-200',
    'border border-moss/20',
  ],
  autoButtonActive: ['bg-moss/60 border-moss/80 ring-2 ring-moss/40'],
  description: ['text-white/40 text-xs'],
  colorGrid: ['flex flex-wrap gap-3'],
  colorButton: [
    'w-12 h-12 rounded-lg transition-colors duration-200',
    'border border-white/10 hover:border-white/30',
    'flex items-center justify-center',
  ],
  colorButtonActive: ['border-white/50 ring-2 ring-moss/40'],
  colorCheckmark: ['text-black text-lg font-bold'],
  actions: ['flex gap-3 pt-2'],
  cancelButton: [
    'flex-1 px-4 py-2 rounded-lg bg-neutral-900/40 hover:bg-neutral-900/60',
    'text-white/60 hover:text-white/80 text-sm',
    'transition-colors duration-200',
    'border border-neutral-700',
  ],
  confirmButton: [
    'flex-1 px-4 py-2 rounded-lg bg-moss/60 hover:bg-moss/80',
    'text-white text-sm font-medium',
    'transition-colors duration-200',
    'border border-moss/40',
  ],
  confirmButtonDisabled: [
    'opacity-50 cursor-not-allowed bg-moss/40 hover:bg-moss/40',
  ],
} as const;
