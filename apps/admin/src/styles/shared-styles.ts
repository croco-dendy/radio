export const sharedStyles = {
  // Layout
  container: ['w-full h-full p-4 overflow-auto pb-24'],
  content: ['mx-auto max-w-7xl'],
  title: ['mb-6 font-display text-3xl font-bold text-sun tracking-wide'],

  // Stats Grid - Consistent spacing and sizing
  statsGrid: ['grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'],
  statsCard: [
    'rounded-xl bg-coal-deep/95 backdrop-blur-sm border border-white/10 p-5 text-white',
    'shadow-[0_0_20px_rgba(0,0,0,0.3)]',
    'relative overflow-hidden',
  ],
  statsTitle: [
    'mb-3 text-sm font-display font-semibold text-amber-400 uppercase tracking-wide',
  ],
  statsValue: ['text-base font-semibold font-mono text-white'],
  statsValueOnline: ['text-base font-semibold font-mono text-green-400'],

  // Service Control Section - Vintage vinyl aesthetic
  serviceSection: [
    'mt-6 rounded-xl bg-coal-deep/95 backdrop-blur-sm border border-white/10 p-6',
    'shadow-[0_0_20px_rgba(0,0,0,0.3)]',
    'relative overflow-hidden',
  ],
  serviceSectionTitle: [
    'mb-4 text-lg font-display font-semibold text-amber-400 uppercase tracking-wide',
  ],
  serviceGrid: ['grid grid-cols-1 gap-6 lg:grid-cols-2'],

  // Actions Section
  actionsSection: [
    'mt-6 rounded-xl bg-coal-deep/95 backdrop-blur-sm border border-white/10 p-6',
    'shadow-[0_0_20px_rgba(0,0,0,0.3)]',
    'relative overflow-hidden',
  ],
  actionsTitle: [
    'mb-4 text-lg font-display font-semibold text-amber-400 uppercase tracking-wide',
  ],
  actionsGrid: ['grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'],

  // Physical vintage radio buttons with layered shadows
  buttonPrimary: [
    'rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 px-5 py-2.5 text-coal font-semibold',
    'transition-all duration-150 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500',
    'active:from-amber-600 active:via-amber-700 active:to-amber-800 active:translate-y-0.5',
    'shadow-[0_8px_0_0_rgb(180,83,9),0_8px_16px_0_rgb(180,83,9,0.4)] hover:shadow-[0_4px_0_0_rgb(180,83,9),0_4px_12px_0_rgb(180,83,9,0.3)]',
    'active:shadow-[0_2px_0_0_rgb(180,83,9),0_2px_8px_0_rgb(180,83,9,0.3)]',
    'border border-white/20 border-t-white/40 border-l-white/30',
    'relative overflow-hidden transform',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-amber-400 disabled:hover:via-amber-500 disabled:hover:to-amber-600',
    'disabled:before:translate-x-[-100%] disabled:shadow-[0_6px_0_0_rgb(180,83,9,0.5),0_6px_12px_0_rgb(180,83,9,0.2)]',
    'disabled:active:translate-y-0',
  ],
  buttonSecondary: [
    'rounded-full bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 px-5 py-2.5 text-amber-100 font-semibold',
    'transition-all duration-150 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800',
    'active:from-amber-800 active:via-amber-900 active:to-amber-950 active:translate-y-0.5',
    'shadow-[0_8px_0_0_rgb(92,25,2),0_8px_16px_0_rgb(92,25,2,0.5)] hover:shadow-[0_4px_0_0_rgb(92,25,2),0_4px_12px_0_rgb(92,25,2,0.4)]',
    'active:shadow-[0_2px_0_0_rgb(92,25,2),0_2px_8px_0_rgb(92,25,2,0.4)]',
    'border border-white/15 border-t-white/25 border-l-white/20',
    'backdrop-blur-sm relative overflow-hidden transform',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
    'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-amber-700 disabled:hover:via-amber-800 disabled:hover:to-amber-900',
    'disabled:before:translate-x-[-100%] disabled:shadow-[0_6px_0_0_rgb(92,25,2,0.5),0_6px_12px_0_rgb(92,25,2,0.3)]',
    'disabled:active:translate-y-0',
  ],
  buttonAccent: [
    'rounded-full bg-gradient-to-b from-amber-300 via-sun to-amber-500 px-5 py-2.5 text-coal font-semibold',
    'transition-all duration-150 hover:from-amber-200 hover:via-amber-300 hover:to-amber-400',
    'active:from-amber-500 active:via-amber-600 active:to-amber-700 active:translate-y-0.5',
    'shadow-[0_8px_0_0_rgb(217,119,6),0_8px_16px_0_rgb(217,119,6,0.4)] hover:shadow-[0_4px_0_0_rgb(217,119,6),0_4px_12px_0_rgb(217,119,6,0.3)]',
    'active:shadow-[0_2px_0_0_rgb(217,119,6),0_2px_8px_0_rgb(217,119,6,0.3)]',
    'border border-white/25 border-t-white/50 border-l-white/35',
    'relative overflow-hidden transform',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent',
    'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-amber-300 disabled:hover:via-sun disabled:hover:to-amber-500',
    'disabled:before:translate-x-[-100%] disabled:shadow-[0_6px_0_0_rgb(217,119,6,0.5),0_6px_12px_0_rgb(217,119,6,0.2)]',
    'disabled:active:translate-y-0',
  ],

  // Recent Section
  recentSection: [
    'mt-6 rounded-xl bg-coal-deep/95 backdrop-blur-sm border border-white/10 p-6',
    'shadow-[0_0_20px_rgba(0,0,0,0.3)]',
    'relative overflow-hidden',
  ],
  recentList: ['space-y-3'],
  recentItem: [
    'flex justify-between items-center p-4 rounded-lg bg-coal/60 border border-white/10',
    'backdrop-blur-sm',
  ],
  recentTitle: ['font-medium text-white'],
  recentMeta: ['text-sm text-amber-400/80'],
} as const;
