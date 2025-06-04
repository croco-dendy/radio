import { useState } from 'react';

const ip = 'io.adoo.one';

export const CopyIp = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="group relative font-display px-3 py-1 rounded bg-black/20 hover:bg-black/30 text-white/80 transition text-lg"
      >
        {ip}
      </button>
      <span className="pl-2 pointer-events-none">
        {copied ? ' Скопійовано!' : 'Натисни щоб зкопіювати'}
      </span>
    </>
  );
};
