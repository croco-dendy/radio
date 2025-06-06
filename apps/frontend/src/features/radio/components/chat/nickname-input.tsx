import clsx from 'clsx';
import { useState } from 'react';
import type { NicknameInputProps } from './types';

export const NicknameInput = ({
  initialNickname,
  onSetNickname,
  onNicknameChange,
  error,
}: NicknameInputProps) => {
  const [nickInput, setNickInput] = useState(initialNickname);

  const handleSetNickname = () => {
    const name = nickInput.trim();
    if (!name) return;
    onSetNickname(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickInput(e.target.value);
    onNicknameChange?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSetNickname();
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.join)}>
        <input
          value={nickInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Твоє ім'я..."
          className={clsx(styles.input, error && styles.inputError)}
        />
        <button
          disabled={!nickInput}
          type="button"
          onClick={handleSetNickname}
          className={clsx(styles.joinButton)}
        >
          {nickInput ? 'Погнали' : 'Хочу в чат'}
        </button>
      </div>
      {error && <div className={clsx(styles.error)}>{error}</div>}
    </div>
  );
};

const styles = {
  container: ['flex flex-col gap-2'],
  join: [
    'flex flex-row items-center gap-2 bg-coal-relic/40',
    'backdrop-blur-l rounded-2xl border border-moss/20 p-3',
  ],
  input: [
    'flex-grow w-full p-2 rounded font-sans text-white bg-neutral-800/0',
    'focus:bg-neutral-800/0 focus:outline-none',
  ],
  inputError: ['border border-red-500/50 bg-red-500/10'],
  joinButton: [
    'bg-ember shadow-md font-display font-bold text-l uppercase',
    'w-auto h-full whitespace-nowrap text-black px-4 py-1 rounded-xl',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  error: [
    'text-red-400 text-sm px-3 py-1 bg-red-500/10 rounded-lg',
    'border border-red-500/20',
  ],
};
