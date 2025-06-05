import clsx from 'clsx';
import { useState } from 'react';
import type { NicknameInputProps } from './types';

export const NicknameInput = ({
  initialNickname,
  onSetNickname,
}: NicknameInputProps) => {
  const [nickInput, setNickInput] = useState(initialNickname);

  const handleSetNickname = () => {
    const name = nickInput.trim();
    if (!name) return;
    onSetNickname(name);
  };

  return (
    <div className={clsx(styles.join)}>
      <input
        value={nickInput}
        onChange={(e) => setNickInput(e.target.value)}
        placeholder="Твоє ім'я..."
        className={clsx(styles.input)}
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
  );
};

const styles = {
  join: [
    'flex flex-row items-center gap-2 bg-coal-relic/40',
    'backdrop-blur-l rounded-2xl border border-moss/20 p-3',
  ],
  input: [
    'flex-grow w-full p-2 rounded font-sans text-white bg-neutral-800/0',
    'focus:bg-neutral-800/0 focus:outline-none',
  ],
  joinButton: [
    'bg-ember shadow-md font-display font-bold text-l uppercase',
    'w-auto h-full whitespace-nowrap text-black px-4 py-1 rounded-xl',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
};
