import clsx from 'clsx';

export const paper = clsx(
  `bg-[url('/paper.png')] bg-center bg-paper/50 backdrop-blur-xl`,
  'border border-white/50',
);

export const paperWhite = clsx(
  `bg-[url('/paper.png')] bg-center bg-paper-fog backdrop-blur-xl`,
  'border border-white/90',
);

export const paperWarm = clsx(
  `bg-[url('/paper.png')] bg-center bg-coal-calm/50 backdrop-blur-md`,
  'border border-white/20',
);

export const paperDark = clsx(
  `bg-[url('/paper.png')] bg-center bg-coal-relic/70 backdrop-blur-lg`,
  'border-2 border-coal-relic',
  'text-clay-fog text-shadow-strong',
);

export const container = clsx(
  'flex flex-grow items-center justify-center text-center',
);

export const panel = clsx(
  'p-8 rounded-xl shadow-2xl space-y-6 max-w-lg shadow-2xl',
);

export const paperPanel = clsx(
  'p-8 rounded-xl shadow-lg space-y-8 max-w-xl shadow-2xl',
  paper,
);

export const fogPanel = clsx(
  'space-y-6 max-w-md backdrop-blur-md bg-white/5 p-8',
  'rounded-xl border border-white/10 shadow-2xl',
);

export const fullPaperPanel = clsx(
  'h-full w-full overflow-y-auto p-8 pb-[140px] space-y-6 shadow-2xl',
  paperDark,
);

export const scrollablePage = clsx('overflow-y-auto', 'scroll-smooth');
