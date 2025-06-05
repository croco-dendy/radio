import clsx from 'clsx';
import { SoundOnIcon, SoundOffIcon } from '../icons/sound-icons';
import { useSound } from '../../hooks/useSound';

export const SoundControl = () => {
  const { isEnabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(styles.muteButton, !isEnabled && styles.buttonMuted)}
    >
      <span className={clsx(styles.muteIcon)}>
        {isEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
      </span>
    </button>
  );
};

const styles = {
  muteButton: [
    'flex items-center gap-2 transition-colors duration-200',
    'shadow-lg hover:shadow-xl text-sm uppercase tracking-wider',
  ],
  buttonMuted: ['opacity-50'],
  muteIcon: ['font-display'],
  muteLabel: ['font-display'],
} as const;
