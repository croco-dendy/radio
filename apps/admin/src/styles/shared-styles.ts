export const sharedStyles = {
  // Layout
  container: ['w-full h-full p-4 overflow-auto pb-24'],
  content: ['mx-auto max-w-7xl'],
  title: ['mb-6 font-display text-3xl font-bold text-sun tracking-wide'],

  // Stats Grid - Consistent spacing and sizing
  statsGrid: ['grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'],
  statsCard: [
    'rounded-2xl bg-stone-900/40 backdrop-blur-xl border border-white/5 p-6 text-white',
    'shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
    'relative overflow-hidden transition-all duration-300 hover:bg-stone-900/50',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none',
  ],
  statsTitle: [
    'mb-3 text-sm font-display font-semibold text-gray-300 uppercase tracking-wide',
  ],
  statsValue: ['text-base font-semibold font-mono text-white'],
  statsValueOnline: ['text-base font-semibold font-mono text-green-400'],

  // Service Control Section - Modern glassmorphism
  serviceSection: [
    'mt-6 rounded-2xl bg-stone-900/30 backdrop-blur-2xl border border-white/5 p-8',
    'shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
    'relative overflow-hidden transition-all duration-300 hover:bg-stone-900/40',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:pointer-events-none',
  ],
  serviceSectionTitle: [
    'mb-4 text-lg font-display font-semibold text-gray-200 uppercase tracking-wide',
  ],
  serviceGrid: ['grid grid-cols-1 gap-6 lg:grid-cols-2'],

  // Actions Section
  actionsSection: [
    'mt-6 rounded-2xl bg-stone-900/30 backdrop-blur-2xl border border-white/5 p-8',
    'shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
    'relative overflow-hidden transition-all duration-300 hover:bg-stone-900/40',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:pointer-events-none',
  ],
  actionsTitle: [
    'mb-4 text-lg font-display font-semibold text-gray-200 uppercase tracking-wide',
  ],
  actionsGrid: [
    'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 place-items-center',
  ],

  // Vinyl record style button - fully rounded with double border effect
  buttonPrimary: [
    'inline-flex items-center justify-center rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 px-5 py-2.5 text-coal font-bold font-display',
    'relative overflow-hidden transform transition-all duration-300',
    'shadow-[0_0_0_2px_rgba(245,158,11,0.8),0_0_0_4px_rgba(245,158,11,0.3),0_8px_32px_rgba(0,0,0,0.4)]',
    'hover:shadow-[0_0_0_2px_rgba(245,158,11,1),0_0_0_6px_rgba(245,158,11,0.5),0_12px_40px_rgba(245,158,11,0.3)]',
    'hover:scale-105 active:scale-95',
    // Vinyl record grooves effect - concentric circles
    'before:absolute before:inset-2 before:rounded-full before:border before:border-amber-600/30',
    'after:absolute after:inset-4 after:rounded-full after:border after:border-amber-700/20',
    // Center hole effect
    '[&>*]:relative [&>*]:z-10',
    // Disabled states
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100',
    'disabled:shadow-[0_0_0_2px_rgba(245,158,11,0.4),0_0_0_4px_rgba(245,158,11,0.2),0_4px_16px_rgba(0,0,0,0.2)]',
  ],
  buttonSecondary: [
    'inline-flex items-center justify-center rounded-full bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 px-4 py-2 text-stone-100 font-semibold font-display',
    'relative overflow-hidden transform transition-all duration-300',
    'shadow-[0_0_0_2px_rgba(120,113,108,0.6),0_0_0_4px_rgba(120,113,108,0.2),0_6px_24px_rgba(0,0,0,0.3)]',
    'hover:shadow-[0_0_0_2px_rgba(120,113,108,0.8),0_0_0_5px_rgba(120,113,108,0.3),0_8px_32px_rgba(0,0,0,0.4)]',
    'hover:scale-105 active:scale-95',
    // Vinyl record grooves effect - concentric circles
    'before:absolute before:inset-2 before:rounded-full before:border before:border-stone-600/30',
    'after:absolute after:inset-4 after:rounded-full after:border after:border-stone-500/20',
    // Center hole effect
    '[&>*]:relative [&>*]:z-10',
    // Disabled states
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100',
    'disabled:shadow-[0_0_0_2px_rgba(120,113,108,0.3),0_0_0_4px_rgba(120,113,108,0.1),0_4px_16px_rgba(0,0,0,0.2)]',
  ],
  buttonAccent: [
    'inline-flex items-center justify-center rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 px-4 py-2 text-coal font-semibold font-display',
    'relative overflow-hidden transform transition-all duration-300',
    'shadow-[0_0_0_2px_rgba(251,191,36,0.7),0_0_0_4px_rgba(251,191,36,0.3),0_6px_24px_rgba(251,191,36,0.2)]',
    'hover:shadow-[0_0_0_2px_rgba(251,191,36,0.9),0_0_0_5px_rgba(251,191,36,0.4),0_8px_32px_rgba(251,191,36,0.3)]',
    'hover:scale-105 active:scale-95',
    // Vinyl record grooves effect - concentric circles with golden accent
    'before:absolute before:inset-2 before:rounded-full before:border before:border-amber-500/40',
    'after:absolute after:inset-4 after:rounded-full after:border after:border-amber-600/30',
    // Center hole effect with golden shine
    '[&>*]:relative [&>*]:z-10',
    // Disabled states
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100',
    'disabled:shadow-[0_0_0_2px_rgba(251,191,36,0.3),0_0_0_4px_rgba(251,191,36,0.1),0_4px_16px_rgba(0,0,0,0.2)]',
  ],

  // Recent Section
  recentSection: [
    'mt-6 rounded-2xl bg-stone-900/30 backdrop-blur-2xl border border-white/5 p-8',
    'shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
    'relative overflow-hidden transition-all duration-300 hover:bg-stone-900/40',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:pointer-events-none',
  ],
  recentList: ['space-y-3'],
  recentItem: [
    'flex justify-between items-center p-5 rounded-xl bg-stone-800/30 border border-white/5',
    'backdrop-blur-xl transition-all duration-300 hover:bg-stone-800/40 hover:border-white/10',
    'shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]',
  ],
  recentTitle: ['font-medium text-gray-100'],
  recentMeta: ['text-sm text-gray-400'],
} as const;
