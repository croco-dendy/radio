export const sharedStyles = {
  // Layout
  container: ['w-full h-full p-3 overflow-auto pb-24'],
  content: ['mx-auto max-w-6xl'],
  title: ['mb-4 font-display text-2xl font-bold text-sun'],

  // Stats Grid
  statsGrid: ['grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'],
  statsCard: [
    'rounded-lg bg-coal-deep/90 backdrop-blur-sm border border-white/10 p-3 text-paper-fog',
    'shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-coal-deep/95',
  ],
  statsTitle: ['mb-2 text-lg font-semibold text-moss'],
  statsValue: ['text-3xl font-bold'],
  statsValueOnline: ['text-3xl font-bold text-ember'],

  // Actions Section
  actionsSection: [
    'mt-3 rounded-lg bg-coal-deep/90 backdrop-blur-sm border border-white/10 p-3',
    'shadow-xl hover:shadow-2xl transition-all duration-300',
  ],
  actionsTitle: ['mb-2 text-lg font-semibold text-paper-fog'],
  actionsGrid: ['flex flex-wrap gap-3'],

  // Buttons
  buttonPrimary: [
    'rounded-lg bg-moss px-4 py-2 text-paper-fog transition-all duration-300',
    'hover:bg-moss-deep hover:scale-105 active:scale-95 shadow-lg',
  ],
  buttonSecondary: [
    'rounded-lg bg-river px-4 py-2 text-paper-fog transition-all duration-300',
    'hover:bg-river-deep hover:scale-105 active:scale-95 shadow-lg',
  ],
  buttonAccent: [
    'rounded-lg bg-sun px-4 py-2 text-coal transition-all duration-300',
    'hover:bg-sun-deep hover:scale-105 active:scale-95 shadow-lg',
  ],

  // Recent Section
  recentSection: [
    'mt-3 rounded-lg bg-coal-deep/90 backdrop-blur-sm border border-white/10 p-3',
    'shadow-xl hover:shadow-2xl transition-all duration-300',
  ],
  recentList: ['space-y-3'],
  recentItem: [
    'flex justify-between items-center p-3 rounded-lg bg-coal/50',
    'hover:bg-coal/70 transition-colors duration-200',
  ],
  recentTitle: ['font-medium text-paper-fog'],
  recentMeta: ['text-sm text-paper-calm'],
} as const;
