import { useState } from 'react';

export const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);

  const handleClick = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
  };

  return (
    <a
      href="/croco-pack.mrpack"
      download
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display text-lg text-shadow-strong font-semibold transition-all shadow-lg
        ${
          downloading
            ? 'bg-green-900 text-white animate-pulse cursor-wait'
            : 'bg-green-700 hover:bg-green-600 text-white hover:scale-105'
        }`}
    >
      {downloading ? <>⏳ Завантаження...</> : <>⬇️ Завантажити збірку</>}
    </a>
  );
};
